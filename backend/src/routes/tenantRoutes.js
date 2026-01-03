import express from "express";
import pool from "../config/db.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { requireSuperAdmin } from "../middlewares/roleMiddleware.js";


const router = express.Router();

// 🔹 GET all tenants (SUPER ADMIN ONLY)
router.get("/", authenticate, requireSuperAdmin, async (req, res) => {
  const result = await pool.query(
    "SELECT id, name, subdomain, created_at FROM tenants"
  );
  res.json({ success: true, data: result.rows });
});

// 🔹 GET tenant by ID
router.get("/:id", authenticate, async (req, res) => {
  const result = await pool.query(
    "SELECT id, name, subdomain, created_at FROM tenants WHERE id = $1",
    [req.params.id]
  );

  res.json({ success: true, data: result.rows[0] });
});

// 🔹 UPDATE tenant (SUPER ADMIN ONLY)
router.put("/:id", authenticate, requireSuperAdmin, async (req, res) => {
  const { name } = req.body;

  await pool.query(
    "UPDATE tenants SET name = $1 WHERE id = $2",
    [name, req.params.id]
  );

  res.json({ success: true, message: "Tenant updated" });
});

export default router;
