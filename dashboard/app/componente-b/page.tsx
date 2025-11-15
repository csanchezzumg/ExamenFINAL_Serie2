"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Proveedor {
  id: number;
  codigo: string;
  nombre: string;
  contacto: string;
  telefono?: string;
  direccion?: string;
}

interface Factura {
  id: number;
  codigo: string;
  fechaFactura: string;
  total: number;
  estado: string;
  proveedorId?: number;
  proveedorNombre?: string;
  subtotal?: number;
  impuestos?: number;
}

interface ItemFactura {
  productoCodigo: string;
  productoNombre: string;
  precioUnitario: number;
  cantidad: number;
}

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precioUnitario: number;
}

export default function ComponenteBPage() {
  const [activeTab, setActiveTab] = useState<"proveedores" | "facturas">("proveedores");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-purple-600 hover:text-purple-800 font-medium mb-4 inline-block">
            ← Volver al Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🏢 Gestión de Compras
              </h1>
              <p className="text-gray-600">Componente B - Proveedores y Facturas</p>
            </div>
            <a
              href="http://localhost:8082/swagger-ui.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 transition-colors"
              title="Ver documentación API"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-xl shadow-lg">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("proveedores")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                activeTab === "proveedores"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                🏢 Proveedores
              </span>
            </button>
            <button
              onClick={() => setActiveTab("facturas")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                activeTab === "facturas"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                📄 Facturas
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "proveedores" && <ProveedoresTab />}
            {activeTab === "facturas" && <FacturasTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== COMPONENTE: Tab de Proveedores ==========
function ProveedoresTab() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    telefono: "",
    direccion: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    try {
      const res = await fetch("http://localhost:8082/api/proveedores");
      const data = await res.json();
      setProveedores(data);
    } catch (error) {
      console.error("Error al cargar proveedores:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `http://localhost:8082/api/proveedores/${editingId}`
        : "http://localhost:8082/api/proveedores";
      
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(editingId ? "Proveedor actualizado" : "Proveedor creado");
        setFormData({ nombre: "", contacto: "", telefono: "", direccion: "" });
        setEditingId(null);
        cargarProveedores();
      }
    } catch (error) {
      alert("Error al guardar proveedor");
    }
  };

  const handleEdit = (proveedor: Proveedor) => {
    setFormData({
      nombre: proveedor.nombre,
      contacto: proveedor.contacto || "",
      telefono: proveedor.telefono || "",
      direccion: proveedor.direccion || "",
    });
    setEditingId(proveedor.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este proveedor?")) return;
    try {
      const res = await fetch(`http://localhost:8082/api/proveedores/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Proveedor eliminado");
        cargarProveedores();
      }
    } catch (error) {
      alert("Error al eliminar proveedor");
    }
  };

  return (
    <div className="space-y-8">
      {/* Formulario */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {editingId ? "✏️ Editar Proveedor" : "➕ Registrar Nuevo Proveedor"}
        </h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
              placeholder="Ej: Constructora XYZ"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contacto *
            </label>
            <input
              type="text"
              required
              value={formData.contacto}
              onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
              placeholder="Nombre del contacto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.telefono || ""}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
              placeholder="5551234567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              value={formData.direccion || ""}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
              placeholder="Ciudad, País"
            />
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {editingId ? "💾 Actualizar" : "➕ Crear Proveedor"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ nombre: "", contacto: "", telefono: "", direccion: "" });
                }}
                className="px-6 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabla */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          📋 Lista de Proveedores ({proveedores.length})
        </h3>
        {loading ? (
          <p className="text-center py-8 text-gray-500">Cargando...</p>
        ) : proveedores.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No hay proveedores registrados</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {proveedores.map((proveedor) => (
                  <tr key={proveedor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{proveedor.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{proveedor.codigo}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{proveedor.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{proveedor.telefono || "-"}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleEdit(proveedor)}
                        className="text-purple-600 hover:text-purple-800 font-medium"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDelete(proveedor.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ========== COMPONENTE: Tab de Facturas ==========
function FacturasTab() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  // Estado del formulario
  const [proveedorId, setProveedorId] = useState<number | null>(null);
  const [items, setItems] = useState<ItemFactura[]>([]);
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [resFacturas, resProveedores, resProductos] = await Promise.all([
        fetch("http://localhost:8082/api/facturas"),
        fetch("http://localhost:8082/api/proveedores"),
        fetch("http://localhost:8081/api/productos"), // Productos del Componente A
      ]);
      
      const dataFacturas = await resFacturas.json();
      const dataProveedores = await resProveedores.json();
      const dataProductos = await resProductos.json();
      
      setFacturas(dataFacturas);
      setProveedores(dataProveedores);
      setProductos(dataProductos);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const agregarItem = () => {
    setItems([...items, { productoCodigo: "", productoNombre: "", precioUnitario: 0, cantidad: 1 }]);
  };

  const quitarItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const actualizarItem = (index: number, campo: string, valor: any) => {
    const nuevosItems = [...items];
    if (campo === "producto") {
      const producto = productos.find(p => p.id === parseInt(valor));
      if (producto) {
        nuevosItems[index] = {
          ...nuevosItems[index],
          productoCodigo: producto.codigo,
          productoNombre: producto.nombre,
          precioUnitario: producto.precioUnitario,
        };
      }
    } else if (campo === "cantidad") {
      nuevosItems[index] = { ...nuevosItems[index], cantidad: parseInt(valor) || 1 };
    }
    setItems(nuevosItems);
  };

  const calcularTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.precioUnitario * item.cantidad), 0);
    return subtotal;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!proveedorId) {
      alert("Selecciona un proveedor");
      return;
    }
    
    if (items.length === 0) {
      alert("Agrega al menos un item");
      return;
    }

    const payload = {
      proveedorId,
      items: items.map(item => ({
        productoCodigo: item.productoCodigo,
        productoNombre: item.productoNombre,
        precioUnitario: item.precioUnitario,
        cantidad: item.cantidad,
      })),
      observaciones: observaciones || null,
    };

    try {
      const res = await fetch("http://localhost:8082/api/facturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ Factura creada exitosamente");
        setProveedorId(null);
        setItems([]);
        setObservaciones("");
        setMostrarFormulario(false);
        cargarDatos();
      } else {
        const error = await res.text();
        alert(`Error al crear factura: ${error}`);
      }
    } catch (error) {
      alert("Error de conexión. ¿Está corriendo el Componente B en el puerto 8082?");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar esta factura?")) return;
    try {
      const res = await fetch(`http://localhost:8082/api/facturas/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Factura eliminada");
        cargarDatos();
      }
    } catch (error) {
      alert("Error al eliminar factura");
    }
  };

  return (
    <div className="space-y-8">
      {/* Botón para mostrar/ocultar formulario */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-900">📄 Gestión de Facturas</h3>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          {mostrarFormulario ? "❌ Cancelar" : "➕ Crear Nueva Factura"}
        </button>
      </div>

      {/* Formulario de creación */}
      {mostrarFormulario && (
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">➕ Crear Nueva Factura</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selección de Proveedor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏢 Seleccionar Proveedor *
              </label>
              <select
                required
                value={proveedorId || ""}
                onChange={(e) => setProveedorId(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
              >
                <option value="">-- Seleccione un proveedor --</option>
                {proveedores.map((proveedor) => (
                  <option key={proveedor.id} value={proveedor.id}>
                    {proveedor.nombre} - {proveedor.contacto}
                  </option>
                ))}
              </select>
            </div>

            {/* Items de la Factura */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  📦 Items de la Factura *
                </label>
                <button
                  type="button"
                  onClick={agregarItem}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-1 px-3 rounded transition-colors"
                >
                  ➕ Agregar Item
                </button>
              </div>

              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
                  No hay items. Haz clic en "Agregar Item" para comenzar.
                </p>
              ) : (
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Producto</label>
                        <select
                          value={productos.find(p => p.codigo === item.productoCodigo)?.id || ""}
                          onChange={(e) => actualizarItem(index, "producto", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-700"
                          required
                        >
                          <option value="">-- Seleccionar --</option>
                          {productos.map((producto) => (
                            <option key={producto.id} value={producto.id}>
                              {producto.nombre} - Q{producto.precioUnitario.toFixed(2)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-32">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Cantidad</label>
                        <input
                          type="number"
                          min="1"
                          value={item.cantidad}
                          onChange={(e) => actualizarItem(index, "cantidad", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-700"
                          required
                        />
                      </div>
                      <div className="w-40">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Subtotal</label>
                        <div className="px-3 py-2 bg-gray-100 rounded text-sm font-semibold text-gray-900">
                          Q{(item.precioUnitario * item.cantidad).toFixed(2)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => quitarItem(index)}
                        className="mt-6 text-red-600 hover:text-red-800 font-medium"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total */}
            {items.length > 0 && (
              <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                <div className="flex justify-between text-lg font-bold">
                  <span>💰 Total:</span>
                  <span className="text-purple-600">Q{calcularTotal().toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  * El backend calculará automáticamente el subtotal, impuestos (12%) y total
                </p>
              </div>
            )}

            {/* Observaciones */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📝 Observaciones (Opcional)
              </label>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                rows={3}
                placeholder="Notas adicionales sobre la factura..."
              />
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              💾 Crear Factura
            </button>
          </form>
        </div>
      )}

      {/* Tabla de Facturas */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          📊 Lista de Facturas ({facturas.length})
        </h3>
        {loading ? (
          <p className="text-center py-8 text-gray-500">Cargando...</p>
        ) : facturas.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No hay facturas registradas</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proveedor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impuestos (12%)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {facturas.map((factura) => (
                  <tr key={factura.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{factura.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{factura.codigo}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {factura.fechaFactura ? new Date(factura.fechaFactura).toLocaleDateString("es-GT", {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }) : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {factura.proveedorNombre || `ID: ${factura.proveedorId}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      Q{Number(factura.subtotal || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      Q{Number(factura.impuestos || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-purple-600">
                      Q{Number(factura.total).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          factura.estado === "PAGADA"
                            ? "bg-green-100 text-green-800"
                            : factura.estado === "PENDIENTE"
                            ? "bg-yellow-100 text-yellow-800"
                            : factura.estado === "VENCIDA"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {factura.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDelete(factura.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
