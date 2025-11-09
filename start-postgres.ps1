# Script para iniciar PostgreSQL manualmente
Write-Host "Iniciando PostgreSQL 18..." -ForegroundColor Cyan

$postgresPath = "C:\Program Files\PostgreSQL\18\bin\postgres.exe"
$dataPath = "C:\Program Files\PostgreSQL\18\data"

# Verificar si postgres.exe existe
if (-not (Test-Path $postgresPath)) {
    Write-Host "[ERROR] No se encontro postgres.exe en: $postgresPath" -ForegroundColor Red
    exit 1
}

# Verificar si el directorio de datos existe
if (-not (Test-Path $dataPath)) {
    Write-Host "[ERROR] No se encontro el directorio de datos en: $dataPath" -ForegroundColor Red
    Write-Host "Ejecuta: & '$postgresPath\initdb.exe' -D '$dataPath'" -ForegroundColor Yellow
    exit 1
}

Write-Host "[INFO] PostgreSQL ejecutable: $postgresPath" -ForegroundColor Green
Write-Host "[INFO] Directorio de datos: $dataPath" -ForegroundColor Green
Write-Host ""
Write-Host "Iniciando servidor PostgreSQL..." -ForegroundColor Yellow
Write-Host "IMPORTANTE: NO CIERRES ESTA VENTANA - PostgreSQL estara corriendo aqui" -ForegroundColor Red
Write-Host "Para detener PostgreSQL, presiona Ctrl+C en esta ventana" -ForegroundColor Yellow
Write-Host ""

# Iniciar PostgreSQL
& $postgresPath -D $dataPath
