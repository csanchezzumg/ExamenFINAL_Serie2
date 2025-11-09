# Script para ejecutar el Dashboard NextJS
# Uso: .\run-dashboard.ps1

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Dashboard NextJS - Logistica" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Cambiar al directorio del dashboard
Set-Location -Path "dashboard"

# Verificar que node_modules existe
if (-Not (Test-Path "node_modules")) {
    Write-Host "[INFO] Instalando dependencias npm..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Fallo la instalacion de dependencias" -ForegroundColor Red
        Set-Location -Path ".."
        exit 1
    }
}

Write-Host "[INFO] Iniciando servidor de desarrollo NextJS..." -ForegroundColor Green
Write-Host ""
Write-Host "Dashboard disponible en: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

# Ejecutar el servidor de desarrollo
npm run dev

# Volver al directorio raiz
Set-Location -Path ".."
