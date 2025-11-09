CREATE DATABASE IF NOT EXISTS logistica_clientes;
CREATE USER IF NOT EXISTS 'logistica_user'@'localhost' IDENTIFIED BY 'logistica_pass';
GRANT ALL PRIVILEGES ON logistica_clientes.* TO 'logistica_user'@'localhost';
FLUSH PRIVILEGES;
