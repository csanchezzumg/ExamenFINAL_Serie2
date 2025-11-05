# Componente B - Proveedores y Facturas

## Descripción
Microservicio Spring Boot para gestión de proveedores y facturas con persistencia en PostgreSQL.

## Tecnologías
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL
- OpenAPI 3 / Swagger
- Maven
- Componente-C (dependencia compartida)

## Puerto
`8082`

## Endpoints

### Proveedores
- `GET /api/proveedores` - Listar proveedores
- `GET /api/proveedores/{id}` - Obtener por ID
- `POST /api/proveedores` - Crear proveedor
- `DELETE /api/proveedores/{id}` - Eliminar

### Facturas
- `GET /api/facturas` - Listar facturas
- `GET /api/facturas/{id}` - Obtener por ID
- `POST /api/facturas` - Crear factura
- `DELETE /api/facturas/{id}` - Eliminar

## Configuración PostgreSQL

```sql
CREATE DATABASE logistica_proveedores;
CREATE USER logistica_user WITH PASSWORD 'logistica_pass';
GRANT ALL PRIVILEGES ON DATABASE logistica_proveedores TO logistica_user;
```

## Ejecutar

```bash
cd componente-b
mvn spring-boot:run
```

## Documentación
- **Swagger UI**: http://localhost:8082/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8082/api-docs
