# Script para ejecutar Componente B
# Uso: .\run-componente-b.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Ejecutando Componente B" -ForegroundColor Cyan
Write-Host "  Puerto: 8082" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Verificando compilación..." -ForegroundColor Yellow
if (-Not (Test-Path "componente-b\target\componente-b-1.0.0.jar")) {
    Write-Host "El JAR no existe. Ejecutando compilación..." -ForegroundColor Yellow
    Set-Location componente-b
    mvn clean package -DskipTests
    Set-Location ..
}

Write-Host ""
Write-Host "Iniciando Componente B..." -ForegroundColor Green
Write-Host "Swagger UI: http://localhost:8082/swagger-ui.html" -ForegroundColor Cyan
Write-Host "API Docs: http://localhost:8082/api-docs" -ForegroundColor Cyan
Write-Host "Health: http://localhost:8082/actuator/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

Set-Location componente-b
mvn spring-boot:run
