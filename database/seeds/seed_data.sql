-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- SUPER ADMIN
-- =========================
INSERT INTO users (
    id,
    tenant_id,
    email,
    password_hash,
    full_name,
    role
) VALUES (
    uuid_generate_v4(),
    NULL,
    'superadmin@system.com',
    '$2b$10$CwTycUXWue0Thq9StjUM0uJ8lQpKQ9GxG1sX4Z1cdq9VHtV6nRvW.',
    'System Admin',
    'super_admin'
);

-- =========================
-- TENANT
-- =========================
INSERT INTO tenants (
    id,
    name,
    subdomain,
    status,
    subscription_plan,
    max_users,
    max_projects
) VALUES (
    uuid_generate_v4(),
    'Demo Company',
    'demo',
    'active',
    'pro',
    25,
    15
);

-- =========================
-- TENANT ADMIN
-- =========================
INSERT INTO users (
    id,
    tenant_id,
    email,
    password_hash,
    full_name,
    role
)
SELECT
    uuid_generate_v4(),
    t.id,
    'admin@demo.com',
    '$2b$10$eImiTXuWVxfM37uY4JANjQ==',
    'Demo Admin',
    'tenant_admin'
FROM tenants t
WHERE t.subdomain = 'demo';

-- =========================
-- REGULAR USERS
-- =========================
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
SELECT uuid_generate_v4(), t.id, 'user1@demo.com', '$2b$10$eImiTXuWVxfM37uY4JANjQ==', 'Demo User One', 'user'
FROM tenants t WHERE t.subdomain = 'demo';

INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
SELECT uuid_generate_v4(), t.id, 'user2@demo.com', '$2b$10$eImiTXuWVxfM37uY4JANjQ==', 'Demo User Two', 'user'
FROM tenants t WHERE t.subdomain = 'demo';

-- =========================
-- PROJECTS
-- =========================
INSERT INTO projects (id, tenant_id, name, description, created_by)
SELECT
    uuid_generate_v4(),
    t.id,
    'Project Alpha',
    'First demo project',
    u.id
FROM tenants t
JOIN users u ON u.role = 'tenant_admin'
WHERE t.subdomain = 'demo';

INSERT INTO projects (id, tenant_id, name, description, created_by)
SELECT
    uuid_generate_v4(),
    t.id,
    'Project Beta',
    'Second demo project',
    u.id
FROM tenants t
JOIN users u ON u.role = 'tenant_admin'
WHERE t.subdomain = 'demo';

-- =========================
-- TASKS (5 TOTAL)
-- =========================
INSERT INTO tasks (id, project_id, tenant_id, title, status, priority)
SELECT
    uuid_generate_v4(),
    p.id,
    p.tenant_id,
    'Initial Planning',
    'todo',
    'high'
FROM projects p
LIMIT 5;
