# Script para configurar PostgreSQL 16
Write-Host "Configurando PostgreSQL 16..." -ForegroundColor Cyan

$psqlPath = "C:\Program Files\PostgreSQL\16\bin\psql.exe"

if (-not (Test-Path $psqlPath)) {
    Write-Host "[ERROR] No se encontro psql.exe de PostgreSQL 16" -ForegroundColor Red
    exit 1
}

Write-Host "[OK] Ejecutando SQL para crear base de datos y usuario..." -ForegroundColor Green
Write-Host ""
Write-Host "Se te pedira la contrasena de postgres (la que configuraste al instalar)" -ForegroundColor Yellow
Write-Host ""

# Crear base de datos y usuario
& $psqlPath -U postgres -c "CREATE DATABASE logistica_proveedores;"
& $psqlPath -U postgres -c "CREATE USER logistica_user WITH PASSWORD 'logistica_pass';"
& $psqlPath -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE logistica_proveedores TO logistica_user;"
& $psqlPath -U postgres -d logistica_proveedores -c "GRANT ALL ON SCHEMA public TO logistica_user;"

Write-Host ""
Write-Host "[OK] Base de datos configurada correctamente!" -ForegroundColor Green
Write-Host ""
Write-Host "Ahora puedes ejecutar el Componente B con: mvn spring-boot:run" -ForegroundColor Cyan
