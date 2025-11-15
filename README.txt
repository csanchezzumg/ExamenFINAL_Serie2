# Examen Final - Serie 2
## Sistema de Gestión de Logística con Microservicios

### Descripción del Proyecto

Sistema empresarial de logística que gestiona **clientes/pedidos** y **proveedores/facturas** mediante una arquitectura de microservicios con bases de datos heterogéneas y lógica compartida.

### Arquitectura

```
┌─────────────────┐                    ┌─────────────────┐
│  Componente A   │◄──── REST API ────►│  Componente B   │
│ (Spring Boot +  │                    │ (Spring Boot +  │
│    MariaDB)     │                    │   PostgreSQL)   │
└────────┬────────┘                    └────────┬────────┘
         │                                      │
         │          ┌──────────────┐            │
         └─────────►│ Componente C │◄───────────┘
                    │ (Maven Lib)  │
                    └──────────────┘
                           ▲
                           │
                  ┌────────┴────────┐
                  │   Dashboard     │
                  │   (Next.js 16)  │
                  └─────────────────┘
```

### Componentes

#### **Componente A - Spring Boot + MariaDB**
- Gestión de **Clientes** y **Pedidos**
- API REST documentada con OpenAPI 3
- Persistencia: JPA + MariaDB
- Puerto: `8081`

#### **Componente B - Spring Boot + PostgreSQL**
- Gestión de **Proveedores** y **Facturas**
- API REST documentada con OpenAPI 3
- Persistencia: JPA + PostgreSQL
- Puerto: `8082`

#### **Componente C - Biblioteca Maven Compartida**
- Dependencia JAR reutilizable
- Métodos utilitarios:
  - `calcularTotal(List<Producto>)`
  - `generarCodigoUnico(String tipoEntidad)`
  - Método de integración con API REST

### Tecnologías

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Java 17, Spring Boot 3.x, Maven
- **Bases de datos**: MariaDB, PostgreSQL
- **Documentación API**: OpenAPI 3 (Swagger)
- **Build**: Maven, npm
- **Control de versiones**: Git

### Estructura del Proyecto


ExamenFINAL_Serie2/
├── componente-a/          # Spring Boot + MariaDB
├── componente-b/          # Spring Boot + PostgreSQL
├── componente-c/          # Maven Library
├── dashboard/             # Next.js 16 Frontend
├── docs/                  # Especificaciones OpenAPI
│   ├── openapiA.yaml
│   └── openapiB.yaml
├── README.txt
├── setup-mariadb.sql
└── setup-postgres.sql