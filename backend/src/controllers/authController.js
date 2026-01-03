import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import { generateToken } from '../utils/jwt.js';

export const login = async (req, res) => {
  const { email, password, tenantSubdomain } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  try {
    // 1️⃣ Find user by email FIRST
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const user = userResult.rows[0];

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // 🔥 SUPER ADMIN LOGIN (NO TENANT)
    // 🔥 SUPER ADMIN LOGIN (MUST NOT HAVE tenantSubdomain)
if (user.role === 'super_admin') {
  if (tenantSubdomain && tenantSubdomain.trim() !== '') {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  const token = generateToken({
    userId: user.id,
    role: user.role,
    tenant_Id: null,
  });

  return res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        tenant_Id: null,
      },
      token,
      expiresIn: 86400,
    },
  });
}

    // 🔒 TENANT USER LOGIN
    if (!tenantSubdomain || tenantSubdomain.trim() === '') {
  return res.status(401).json({
    success: false,
    message: 'Invalid credentials',
  });
}


    // 3️⃣ Find tenant
    const tenantResult = await pool.query(
      'SELECT * FROM tenants WHERE subdomain = $1',
      [tenantSubdomain]
    );

    if (tenantResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Tenant not found',
      });
    }

    const tenant = tenantResult.rows[0];

    // 4️⃣ Validate user belongs to tenant
    if (user.tenant_id !== tenant.id) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken({
      userId: user.id,
      tenant_Id: tenant.id,
      role: user.role,
    });

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
          tenant_Id: tenant.id,
        },
        token,
        expiresIn: 86400,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


export const me = async (req, res) => {
  try {
    // user is attached by authenticate middleware
    res.json({
      success: true,
      data: req.user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
};

export const logout = async (req, res) => {
  // JWT logout is handled client-side by deleting token
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

