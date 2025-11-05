# Examen Final - Serie 2
## Sistema de Gestión de Logística con Microservicios

### 📋 Descripción del Proyecto

Sistema empresarial de logística que gestiona **clientes/pedidos** y **proveedores/facturas** mediante una arquitectura de microservicios con bases de datos heterogéneas y lógica compartida.

### 🏗️ Arquitectura

```
┌─────────────────┐                    ┌─────────────────┐
│  Componente A   │◄──── REST API ────►│  Componente B   │
│ (Spring Boot +  │                    │ (Spring Boot +  │
│    MariaDB)     │                    │   PostgreSQL)   │
└────────┬────────┘                    └────────┬────────┘
         │                                      │
         │          ┌──────────────┐           │
         └─────────►│ Componente C │◄──────────┘
                    │ (Maven Lib)  │
                    └──────────────┘
```

### 📦 Componentes

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

### 🛠️ Tecnologías

- **Backend**: Java 17, Spring Boot 3.x, Maven
- **Bases de datos**: MariaDB, PostgreSQL
- **Documentación API**: OpenAPI 3 (Swagger)
- **Build**: Maven
- **Control de versiones**: Git

### 📂 Estructura del Proyecto

```
ExamenFINAL_Serie2/
├── componente-a/          # Spring Boot + MariaDB
├── componente-b/          # Spring Boot + PostgreSQL
├── componente-c/          # Maven Library
├── docs/                  # Especificaciones OpenAPI
│   ├── openapiA.yaml
│   └── openapiB.yaml
└── README.md
```

### 🚀 Instrucciones de Configuración

#### Prerrequisitos
- Java 17+
- Maven 3.8+
- MariaDB 10.x
- PostgreSQL 14+
- Git

#### 1. Clonar el repositorio
```bash
git clone https://github.com/csanchezzumg/ExamenFINAL_Serie2.git
cd ExamenFINAL_Serie2
```

#### 2. Compilar Componente C (dependencia compartida)
```bash
cd componente-c
mvn clean install
cd ..
```

#### 3. Configurar bases de datos

**MariaDB (Componente A)**
```sql
CREATE DATABASE logistica_clientes;
CREATE USER 'logistica_user'@'localhost' IDENTIFIED BY 'logistica_pass';
GRANT ALL PRIVILEGES ON logistica_clientes.* TO 'logistica_user'@'localhost';
FLUSH PRIVILEGES;
```

**PostgreSQL (Componente B)**
```sql
CREATE DATABASE logistica_proveedores;
CREATE USER logistica_user WITH PASSWORD 'logistica_pass';
GRANT ALL PRIVILEGES ON DATABASE logistica_proveedores TO logistica_user;
```

#### 4. Ejecutar Componente A
```bash
cd componente-a
mvn spring-boot:run
```
API disponible en: `http://localhost:8081`

#### 5. Ejecutar Componente B
```bash
cd componente-b
mvn spring-boot:run
```
API disponible en: `http://localhost:8082`

### 📚 Documentación API

- **Componente A (Swagger UI)**: http://localhost:8081/swagger-ui.html
- **Componente B (Swagger UI)**: http://localhost:8082/swagger-ui.html
- **OpenAPI Specs**: Ver carpeta `/docs`

### 🔄 Flujo de Integración

1. **Componente A** y **B** importan **Componente C** como dependencia Maven
2. Ambos componentes exponen APIs REST documentadas
3. **Componente C** puede invocar endpoints de A o B para integración circular
4. Comunicación entre A y B mediante REST API

### 👨‍💻 Autor

Carlos Sánchez - UMG 2025

### 📝 Licencia

Proyecto académico - Universidad Mariano Gálvez
