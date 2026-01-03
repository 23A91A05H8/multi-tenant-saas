import pool from '../config/db.js';

export const getProjects = async (req, res) => {
  try {
    const { tenantId } = req.user;

    const result = await pool.query(
      `SELECT id, name, description, created_at
       FROM projects
       WHERE tenant_id = $1
       ORDER BY created_at DESC`,
      [tenantId]
    );

    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const createProject = async (req, res) => {
  const { name, description } = req.body;
  const { tenantId: tenantId, userId } = req.user;

  if (!name) {
    return res.status(400).json({ message: 'Name required' });
  }

  try {
    const tenantResult = await pool.query(
      `SELECT max_projects FROM tenants WHERE id = $1`,
      [tenantId]
    );

    const maxProjects = tenantResult.rows[0]?.max_projects;

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM projects WHERE tenant_id = $1`,
      [tenantId]
    );

    const currentProjects = parseInt(countResult.rows[0].count, 10);

    if (maxProjects !== null && currentProjects >= maxProjects) {
      return res.status(403).json({
        success: false,
        message: 'Project limit reached for this tenant',
      });
    }

    const result = await pool.query(
      `INSERT INTO projects (id, tenant_id, name, description, created_by)
       VALUES (uuid_generate_v4(), $1, $2, $3, $4)
       RETURNING id, name`,
      [tenantId, name, description, userId]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};


export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const { tenantId } = req.user;

  const result = await pool.query(
    `UPDATE projects
     SET name=$1, description=$2
     WHERE id=$3 AND tenant_id=$4`,
    [name, description, id, tenantId]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json({ success: true });
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const { tenantId } = req.user;

  const result = await pool.query(
    `DELETE FROM projects WHERE id=$1 AND tenant_id=$2`,
    [id, tenantId]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json({ success: true });
};
