CREATE DATABASE logistica_proveedores;
CREATE USER logistica_user WITH PASSWORD 'logistica_pass';
GRANT ALL PRIVILEGES ON DATABASE logistica_proveedores TO logistica_user;
\c logistica_proveedores
GRANT ALL ON SCHEMA public TO logistica_user;
