# Script para ejecutar Componente A
# Uso: .\run-componente-a.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Ejecutando Componente A" -ForegroundColor Cyan
Write-Host "  Puerto: 8081" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Verificando compilación..." -ForegroundColor Yellow
if (-Not (Test-Path "componente-a\target\componente-a-1.0.0.jar")) {
    Write-Host "El JAR no existe. Ejecutando compilación..." -ForegroundColor Yellow
    Set-Location componente-a
    mvn clean package -DskipTests
    Set-Location ..
}

Write-Host ""
Write-Host "Iniciando Componente A..." -ForegroundColor Green
Write-Host "Swagger UI: http://localhost:8081/swagger-ui.html" -ForegroundColor Cyan
Write-Host "API Docs: http://localhost:8081/api-docs" -ForegroundColor Cyan
Write-Host "Health: http://localhost:8081/actuator/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

Set-Location componente-a
mvn spring-boot:run
