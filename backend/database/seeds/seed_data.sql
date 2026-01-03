-- =========================
-- TENANTS
-- =========================

INSERT INTO tenants (id, name, subdomain)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Demo Tenant',
  'demo'
)
ON CONFLICT (subdomain) DO NOTHING;

-- =========================
-- USERS
-- =========================

-- Super Admin
INSERT INTO users (
  id, email, password_hash, full_name, role, is_active, tenant_id
)
VALUES (
  gen_random_uuid(),
  'superadmin@system.com',
  '$2b$10$CoJQtPwDfw1qWTdpsFLWp.tiKASGUu7fn32J2Fr9n1ocjYGzyTCNG',
  'System Admin',
  'super_admin',
  true,
  NULL
)
ON CONFLICT DO NOTHING;



-- Tenant Admin
INSERT INTO users (
  id, email, password_hash, full_name, role, is_active, tenant_id
)
VALUES (
  gen_random_uuid(),
  'admin@demo.com',
  '$2b$10$WCfFMhcQuria4Oes3Bq8.uffSVRzdFigTrLns2EOMKQJxMtxb0QGK',
  'Demo Admin',
  'tenant_admin',
  true,
  '11111111-1111-1111-1111-111111111111'
)
ON CONFLICT (tenant_id, email) DO NOTHING;

-- Normal User
INSERT INTO users (
  id, email, password_hash, full_name, role, is_active, tenant_id
)
VALUES (
  gen_random_uuid(),
  'user1@demo.com',
  '$2b$10$Qfst8TekMZTWEsB27z49qezFWB0/SFK8U2H.AegN4l/LGDpNoPqQ',
  'Demo User One',
  'user',
  true,
  '11111111-1111-1111-1111-111111111111'
)
ON CONFLICT (tenant_id, email) DO NOTHING;

