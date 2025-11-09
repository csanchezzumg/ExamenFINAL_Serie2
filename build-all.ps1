# Script para compilar todo el proyecto
# Uso: .\build-all.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Compilando Proyecto Completo" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Componente C (dependencia compartida)
Write-Host "[1/3] Compilando Componente C (biblioteca compartida)..." -ForegroundColor Yellow
Set-Location componente-c
mvn clean install -DskipTests
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error compilando Componente C" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..
Write-Host "[OK] Componente C compilado exitosamente" -ForegroundColor Green
Write-Host ""

# Componente A
Write-Host "[2/3] Compilando Componente A (Spring Boot + MariaDB)..." -ForegroundColor Yellow
Set-Location componente-a
mvn clean package -DskipTests
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error compilando Componente A" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..
Write-Host "[OK] Componente A compilado exitosamente" -ForegroundColor Green
Write-Host ""

# Componente B
Write-Host "[3/3] Compilando Componente B (Spring Boot + PostgreSQL)..." -ForegroundColor Yellow
Set-Location componente-b
mvn clean package -DskipTests
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error compilando Componente B" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..
Write-Host "[OK] Componente B compilado exitosamente" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "  [OK] COMPILACION COMPLETA EXITOSA" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Proximos pasos:" -ForegroundColor Cyan
Write-Host "  1. Configurar bases de datos (ver README.md)" -ForegroundColor White
Write-Host "  2. Ejecutar: .\run-componente-a.ps1" -ForegroundColor White
Write-Host "  3. Ejecutar: .\run-componente-b.ps1" -ForegroundColor White
Write-Host ""
