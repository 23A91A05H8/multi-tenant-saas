-- =========================
-- TENANTS (INSERT FIRST)
-- =========================
INSERT INTO tenants (id, name, subdomain, status)
VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'Demo Tenant',
  'demo',
  'active'
);

-- =========================
-- USERS
-- =========================

-- Super Admin (NO tenant)
INSERT INTO users (
  id,
  email,
  password_hash,
  full_name,
  role,
  is_active,
  tenant_id
)
VALUES (
  gen_random_uuid(),
  'superadmin@system.com',
  '$2b$10$vgEzOlHciWbHe/tV4EIrdu23xzAcs9KHn5c/n5pU8Q3CbJiGC3jFq', -- Admin@123
  'System Admin',
  'super_admin',
  true,
  NULL
);

-- Tenant Admin
INSERT INTO users (
  id,
  email,
  password_hash,
  full_name,
  role,
  is_active,
  tenant_id
)
VALUES (
  gen_random_uuid(),
  'admin@demo.com',
  '$2b$10$DDeppsfsd6ZVK2MoFByRtuM90wHmI8KBZcYeO4/ozIKNy/O3xvGKi', -- Demo@123
  'Demo Admin',
  'tenant_admin',
  true,
  '11111111-1111-1111-1111-111111111111'
);

-- Normal User
INSERT INTO users (
  id,
  email,
  password_hash,
  full_name,
  role,
  is_active,
  tenant_id
)
VALUES (
  gen_random_uuid(),
  'user1@demo.com',
  '$2b$10$t8xEvCwwya01VFOXRT2FaOwzZqy.y.S74s3uZu61RgEAAzvSbE9KG', -- User@123
  'Demo User One',
  'user',
  true,
  '11111111-1111-1111-1111-111111111111'
);
