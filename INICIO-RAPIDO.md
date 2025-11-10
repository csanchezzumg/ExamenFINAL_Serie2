# 🚀 Guía de Inicio Rápido

## Componente A
**Ruta:** `componente-a/`

**Comandos:**
```powershell
cd componente-a
mvn spring-boot:run
```

**URL:** http://localhost:8081/swagger-ui.html

---

## Componente B
**Ruta:** `componente-b/`

**Comandos:**
```powershell
cd componente-b
mvn spring-boot:run
```

**URL:** http://localhost:8082/swagger-ui.html

---

## Dashboard
**Ruta:** `dashboard/`

**Comandos:**
```powershell
cd dashboard
npm run dev
```

**URL:** http://localhost:3000

---

## 🧪 Probar las Funcionalidades

### A. Desde el Dashboard (http://localhost:3000)

1. **Clientes**: Click en "Ver Clientes" → verás la lista de clientes
2. **Pedidos**: Click en "Ver Pedidos" → verás la lista de pedidos
3. **Proveedores**: Click en "Ver Proveedores" → verás la lista de proveedores
4. **Facturas**: Click en "Ver Facturas" → verás la lista de facturas

### B. Desde Swagger UI

#### **Componente A (http://localhost:8081/swagger-ui.html)**

**Crear un Cliente:**
1. Expande `POST /api/clientes`
2. Click en "Try it out"
3. Usa este JSON:
```json
{
  "nombre": "Carlos Sánchez",
  "correo": "carlos@example.com",
  "telefono": "5551234567",
  "direccion": "Guatemala, Guatemala"
}
```
4. Click "Execute"
5. Verás el código generado automáticamente ✅

**Crear un Pedido:**
1. Primero copia el `id` del cliente creado
2. Expande `POST /api/pedidos`
3. Click en "Try it out"
4. Usa este JSON (cambia `clienteId` por el ID real):
```json
{
  "clienteId": 1,
  "items": [
    {
      "productoCodigo": "PROD-001",
      "productoNombre": "Laptop Dell",
      "precioUnitario": 15000.00,
      "cantidad": 2
    }
  ],
  "observaciones": "Pedido urgente"
}
```
5. Click "Execute"
6. ¡Verás el pedido creado con código único! ✅

#### **Componente B (http://localhost:8082/swagger-ui.html)**

**Crear un Proveedor:**
1. Expande `POST /api/proveedores`
2. Click en "Try it out"
3. Usa este JSON:
```json
{
  "nombre": "Constructora XYZ",
  "contacto": "Juan Pérez",
  "telefono": "5559876543",
  "direccion": "Zona 10, Guatemala"
}
```
4. Click "Execute"

**Crear una Factura:**
1. Copia el `id` del proveedor creado
2. Expande `POST /api/facturas`
3. Click en "Try it out"
4. Usa este JSON (cambia `proveedorId`):
```json
{
  "proveedorId": 1,
  "items": [
    {
      "productoCodigo": "MAT-001",
      "productoNombre": "Cemento 50kg",
      "precioUnitario": 85.00,
      "cantidad": 100
    }
  ],
  "observaciones": "Entrega para construcción"
}
```
5. Click "Execute"

**Crear una Factura con Referencias a Pedidos (Integración B→A):**
1. Asegúrate de tener un pedido creado en Componente A (copia su `id`)
2. Expande `POST /api/facturas`
3. Usa este JSON:
```json
{
  "proveedorId": 1,
  "pedidoIds": [1],
  "items": [
    {
      "productoCodigo": "SRV-001",
      "productoNombre": "Servicio de instalación",
      "precioUnitario": 500.00,
      "cantidad": 1
    }
  ],
  "observaciones": "Factura relacionada con pedido de laptops"
}
```
4. Click "Execute"
5. Verás que la respuesta incluye `pedidosReferenciados` con info del pedido ✅

---

## 🎯 Características del Sistema

### Componente A - Clientes y Pedidos
- ✅ CRUD completo de Clientes
- ✅ CRUD completo de Pedidos
- ✅ Generación automática de códigos únicos
- ✅ Cálculo automático de totales e impuestos
- ✅ Base de datos: MariaDB (puerto 3307)

### Componente B - Proveedores y Facturas
- ✅ CRUD completo de Proveedores
- ✅ CRUD completo de Facturas
- ✅ Integración con Componente A (referencias a pedidos)
- ✅ Validación de pedidos existentes
- ✅ Base de datos: PostgreSQL (puerto 5432)

### Componente C - Biblioteca Compartida
- ✅ `generarCodigoUnico()` - Códigos únicos con timestamp y UUID
- ✅ `calcularTotal()` - Suma de productos
- ✅ `calcularImpuestos()` - IVA 12%
- ✅ `validarCodigo()` - Validación de formato

### Dashboard - Next.js 16
- ✅ Interfaz moderna con Tailwind CSS
- ✅ Páginas para Clientes, Pedidos, Proveedores y Facturas
- ✅ Consumo de APIs REST de ambos componentes
- ✅ Responsive design
- ✅ Manejo de errores y estados de carga

---

## 🛑 Para Detener los Servicios

En cada terminal presiona: `Ctrl + C`

---

## 🐛 Solución de Problemas

### Error: "Port 8081 already in use"
```powershell
netstat -ano | findstr :8081
taskkill /PID <numero_pid> /F
```

### Error: "Could not connect to MariaDB"
- Verifica que MariaDB esté corriendo en puerto 3307
- Verifica usuario y contraseña en `componente-a/src/main/resources/application.properties`

### Error: "Could not connect to PostgreSQL"
- Verifica que PostgreSQL esté corriendo en puerto 5432
- Verifica usuario y contraseña en `componente-b/src/main/resources/application.properties`

### Error: "Failed to compile" en Dashboard
```powershell
cd dashboard
rm -r node_modules
rm package-lock.json
npm install
npm run dev
```

---

## 📚 Documentación Adicional

- **README Principal**: Ver `README.md` para arquitectura completa
- **OpenAPI Specs**: Ver carpeta `/docs` para especificaciones
- **Scripts**: Ver carpeta raíz para scripts `.ps1` de automatización

---

## 👨‍💻 Autor

**Carlos Sánchez**  
Universidad Mariano Gálvez - 2025  
Examen Final - Desarrollo Web

---

## 🎉 ¡Listo!

Si todo está corriendo correctamente, deberías ver:
- ✅ Dashboard en http://localhost:3000
- ✅ Swagger A en http://localhost:8081/swagger-ui.html
- ✅ Swagger B en http://localhost:8082/swagger-ui.html

¡Disfruta explorando la plataforma de logística! 🚀
