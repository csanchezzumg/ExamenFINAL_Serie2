# Componente A - Clientes y Pedidos

## Descripción
Microservicio Spring Boot para gestión de clientes y pedidos con persistencia en MariaDB.

## Tecnologías
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- MariaDB
- OpenAPI 3 / Swagger
- Maven
- Componente-C (dependencia compartida)

## Puerto
`8081`

## Endpoints Principales

### Clientes
- `GET /api/clientes` - Listar todos los clientes
- `GET /api/clientes/{id}` - Obtener cliente por ID
- `GET /api/clientes/codigo/{codigo}` - Obtener cliente por código
- `POST /api/clientes` - Crear nuevo cliente
- `PUT /api/clientes/{id}` - Actualizar cliente
- `DELETE /api/clientes/{id}` - Eliminar cliente

### Pedidos
- `GET /api/pedidos` - Listar todos los pedidos
- `GET /api/pedidos/{id}` - Obtener pedido por ID
- `POST /api/pedidos` - Crear nuevo pedido
- `DELETE /api/pedidos/{id}` - Eliminar pedido

## Configuración de Base de Datos

### Crear base de datos en MariaDB

```sql
CREATE DATABASE logistica_clientes;
CREATE USER 'logistica_user'@'localhost' IDENTIFIED BY 'logistica_pass';
GRANT ALL PRIVILEGES ON logistica_clientes.* TO 'logistica_user'@'localhost';
FLUSH PRIVILEGES;
```

### Configurar credenciales

Editar `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mariadb://localhost:3306/logistica_clientes
spring.datasource.username=logistica_user
spring.datasource.password=logistica_pass
```

## Compilar y Ejecutar

```bash
# Desde la carpeta componente-a
mvn clean install
mvn spring-boot:run
```

## Documentación API

Una vez iniciado el servidor, acceder a:

- **Swagger UI**: http://localhost:8081/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8081/api-docs

## Ejemplo de uso

### Crear un cliente

```bash
curl -X POST http://localhost:8081/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "50212345678",
    "direccion": "Guatemala, GT",
    "nit": "12345678"
  }'
```

### Crear un pedido

```bash
curl -X POST http://localhost:8081/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": 1,
    "observaciones": "Pedido urgente",
    "items": [
      {
        "productoCodigo": "P001",
        "productoNombre": "Laptop Dell",
        "precioUnitario": 5000.00,
        "cantidad": 2
      }
    ]
  }'
```

## Uso del Componente C

Este componente utiliza la biblioteca compartida (Componente C) para:

- Generar códigos únicos para clientes y pedidos: `LogisticaUtils.generarCodigoUnico()`
- Calcular totales: `LogisticaUtils.calcularTotal()`

## Health Check

```bash
curl http://localhost:8081/actuator/health
```
