import express from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { requireTenantAdmin } from "../middlewares/roleMiddleware.js";


const router = express.Router();


// 🔹 CREATE user under tenant
router.post(
  "/tenants/:id/users",
  authenticate,
  requireTenantAdmin,
  async (req, res) => {
    const { email, password, role, full_name } = req.body;

    if (!email || !password || !role || !full_name) {
      return res.status(400).json({
        success: false,
        message: "email, password, full_name and role are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `
      INSERT INTO users (email, password_hash, full_name, role, tenant_id)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [email, hashedPassword, full_name, role, req.params.id]
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  }
);

// 🔹 GET users of a tenant
router.get("/tenants/:id/users", authenticate, async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "SELECT id, email, role FROM users WHERE tenant_id = $1",
    [id]
  );

  res.json({ success: true, data: result.rows });
});

// 🔹 UPDATE user
router.put("/users/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { role, is_active } = req.body;

  await pool.query(
    "UPDATE users SET role = $1, is_active = $2 WHERE id = $3",
    [role, is_active, id]
  );

  res.json({ success: true, message: "User updated" });
});
  router.get("/users/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "SELECT id, email, full_name, role, is_active FROM users WHERE id = $1",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, data: result.rows[0] });
});


router.delete("/users/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "DELETE FROM users WHERE id = $1",
    [id]
  );

  res.json({ success: true, message: "User deleted" });
});

export default router;
