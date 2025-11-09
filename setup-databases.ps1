# Script para configurar bases de datos
# Requiere MariaDB y PostgreSQL instalados
# Uso: .\setup-databases.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Configuración de Bases de Datos" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuración MariaDB
Write-Host "[1/2] Configurando MariaDB para Componente A..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Ejecuta estos comandos en MariaDB:" -ForegroundColor White
Write-Host ""
Write-Host "CREATE DATABASE logistica_clientes;" -ForegroundColor Green
Write-Host "CREATE USER 'logistica_user'@'localhost' IDENTIFIED BY 'logistica_pass';" -ForegroundColor Green
Write-Host "GRANT ALL PRIVILEGES ON logistica_clientes.* TO 'logistica_user'@'localhost';" -ForegroundColor Green
Write-Host "FLUSH PRIVILEGES;" -ForegroundColor Green
Write-Host ""

$mariadbReady = Read-Host "¿MariaDB configurado? (s/n)"
if ($mariadbReady -eq 's') {
    Write-Host "✓ MariaDB configurado" -ForegroundColor Green
} else {
    Write-Host "⚠ Recuerda configurar MariaDB antes de ejecutar Componente A" -ForegroundColor Yellow
}
Write-Host ""

# Configuración PostgreSQL
Write-Host "[2/2] Configurando PostgreSQL para Componente B..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Ejecuta estos comandos en PostgreSQL:" -ForegroundColor White
Write-Host ""
Write-Host "CREATE DATABASE logistica_proveedores;" -ForegroundColor Green
Write-Host "CREATE USER logistica_user WITH PASSWORD 'logistica_pass';" -ForegroundColor Green
Write-Host "GRANT ALL PRIVILEGES ON DATABASE logistica_proveedores TO logistica_user;" -ForegroundColor Green
Write-Host ""

$postgresReady = Read-Host "¿PostgreSQL configurado? (s/n)"
if ($postgresReady -eq 's') {
    Write-Host "✓ PostgreSQL configurado" -ForegroundColor Green
} else {
    Write-Host "⚠ Recuerda configurar PostgreSQL antes de ejecutar Componente B" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Configuración Completada" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Proximos pasos:" -ForegroundColor Cyan
Write-Host "  1. Ejecutar: .\build-all.ps1" -ForegroundColor White
Write-Host "  2. Ejecutar: .\run-componente-a.ps1" -ForegroundColor White
Write-Host "  3. Ejecutar: .\run-componente-b.ps1" -ForegroundColor White
Write-Host ""
