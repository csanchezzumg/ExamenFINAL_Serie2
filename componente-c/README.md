# Componente C - Biblioteca Compartida

## Descripción
Proyecto Maven que contiene lógica reutilizable para los componentes A y B del sistema de logística.

## Características

### Clases de Modelo
- **Producto**: Representa un producto genérico con código, nombre, precio y cantidad

### Utilidades
- **LogisticaUtils**:
  - `calcularTotal(List<Producto>)`: Calcula el total de una lista de productos
  - `generarCodigoUnico(String tipoEntidad)`: Genera códigos únicos para entidades
  - `calcularTotalConImpuestos(BigDecimal)`: Calcula total con IVA (12%)
  - `validarCodigo(String)`: Valida formato de códigos
  - `formatearMonto(BigDecimal)`: Formatea montos a string

### Integración
- **ApiClient**: Cliente HTTP para comunicación REST
- **IntegracionService**: Servicio que implementa flujo circular invocando APIs de componentes A y B

## Compilar e Instalar

```bash
cd componente-c
mvn clean install
```

Esto generará el JAR en `target/componente-c-1.0.0.jar` y lo instalará en el repositorio local de Maven.

## Uso en otros proyectos

Agregar la dependencia en el `pom.xml`:

```xml
<dependency>
    <groupId>com.umg.logistica</groupId>
    <artifactId>componente-c</artifactId>
    <version>1.0.0</version>
</dependency>
```

## Ejemplo de uso

```java
import com.umg.logistica.shared.util.LogisticaUtils;
import com.umg.logistica.shared.model.Producto;
import java.math.BigDecimal;
import java.util.Arrays;

// Generar código único
String codigo = LogisticaUtils.generarCodigoUnico("PEDIDO");
// Resultado: PEDIDO-20251104-143025-A3F5D891

// Calcular total de productos
List<Producto> productos = Arrays.asList(
    new Producto("P001", "Laptop", new BigDecimal("5000"), 2),
    new Producto("P002", "Mouse", new BigDecimal("150"), 5)
);
BigDecimal total = LogisticaUtils.calcularTotal(productos);
// Resultado: 10750.00
```

## Tecnologías
- Java 17
- Maven
- OkHttp (cliente HTTP)
- Gson (procesamiento JSON)
- SLF4J + Logback (logging)
