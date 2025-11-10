"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Cliente {
  id: number;
  codigo: string;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
}

interface Pedido {
  id: number;
  codigo: string;
  fechaPedido: string;
  total: number;
  estado: string;
  clienteId?: number;
}

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion?: string;
  precioUnitario: number;
  stockDisponible?: number;
}

export default function ComponenteAPage() {
  const [activeTab, setActiveTab] = useState<"clientes" | "productos" | "pedidos">("clientes");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block">
            ← Volver al Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Gestión de Ventas
              </h1>
              <p className="text-gray-600">Componente A - Clientes, Productos y Pedidos</p>
            </div>
            <a
              href="http://localhost:8081/swagger-ui.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
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
              onClick={() => setActiveTab("clientes")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                activeTab === "clientes"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Clientes
              </span>
            </button>
            <button
              onClick={() => setActiveTab("productos")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                activeTab === "productos"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
                Productos
              </span>
            </button>
            <button
              onClick={() => setActiveTab("pedidos")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                activeTab === "pedidos"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Pedidos
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "clientes" && <ClientesTab />}
            {activeTab === "productos" && <ProductosTab />}
            {activeTab === "pedidos" && <PedidosTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== COMPONENTE: Tab de Clientes ==========
function ClientesTab() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/clientes");
      const data = await res.json();
      setClientes(data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `http://localhost:8081/api/clientes/${editingId}`
        : "http://localhost:8081/api/clientes";
      
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(editingId ? "Cliente actualizado" : "Cliente creado");
        setFormData({ nombre: "", email: "", telefono: "", direccion: "" });
        setEditingId(null);
        cargarClientes();
      }
    } catch (error) {
      alert("Error al guardar cliente");
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setFormData({
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono || "",
      direccion: cliente.direccion || "",
    });
    setEditingId(cliente.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este cliente?")) return;
    try {
      const res = await fetch(`http://localhost:8081/api/clientes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Cliente eliminado");
        cargarClientes();
      }
    } catch (error) {
      alert("Error al eliminar cliente");
    }
  };

  return (
    <div className="space-y-8">
      {/* Formulario */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {editingId ? "✏️ Editar Cliente" : "➕ Registrar Nuevo Cliente"}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="Ej: Carlos Sánchez"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="correo@ejemplo.com"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="Ciudad, País"
            />
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {editingId ? "💾 Actualizar" : "➕ Crear Cliente"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ nombre: "", email: "", telefono: "", direccion: "" });
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
          📋 Lista de Clientes ({clientes.length})
        </h3>
        {loading ? (
          <p className="text-center py-8 text-gray-500">Cargando...</p>
        ) : clientes.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No hay clientes registrados</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{cliente.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{cliente.codigo}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{cliente.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cliente.email || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cliente.telefono || "-"}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleEdit(cliente)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDelete(cliente.id)}
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

// ========== COMPONENTE: Tab de Productos ==========
function ProductosTab() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precioUnitario: "",
    stockDisponible: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/productos");
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nombre: formData.nombre,
      descripcion: formData.descripcion || null,
      precioUnitario: parseFloat(formData.precioUnitario),
      stockDisponible: formData.stockDisponible ? parseInt(formData.stockDisponible) : null,
    };

    try {
      const url = editingId
        ? `http://localhost:8081/api/productos/${editingId}`
        : "http://localhost:8081/api/productos";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(editingId ? "Producto actualizado" : "Producto creado");
        setFormData({ nombre: "", descripcion: "", precioUnitario: "", stockDisponible: "" });
        setEditingId(null);
        cargarProductos();
      } else {
        const errorText = await res.text();
        alert(`Error al guardar producto: ${errorText || res.status}`);
      }
    } catch (error) {
      alert("Error al guardar producto: " + (error instanceof Error ? error.message : "Error de conexión. ¿Está corriendo el Componente A en el puerto 8081?"));
      console.error("Error completo:", error);
    }
  };

  const handleEdit = (producto: Producto) => {
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion || "",
      precioUnitario: producto.precioUnitario.toString(),
      stockDisponible: producto.stockDisponible?.toString() || "",
    });
    setEditingId(producto.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      const res = await fetch(`http://localhost:8081/api/productos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Producto eliminado");
        cargarProductos();
      }
    } catch (error) {
      alert("Error al eliminar producto");
    }
  };

  return (
    <div className="space-y-8">
      {/* Formulario */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {editingId ? "Editar Producto" : "Registrar Nuevo Producto"}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="Ej: Cemento Portland"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio Unitario *
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.precioUnitario}
              onChange={(e) => setFormData({ ...formData, precioUnitario: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="250.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Disponible
            </label>
            <input
              type="number"
              value={formData.stockDisponible || ""}
              onChange={(e) => setFormData({ ...formData, stockDisponible: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <input
              type="text"
              value={formData.descripcion || ""}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="Descripción del producto"
            />
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {editingId ? "Actualizar" : "Crear Producto"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ nombre: "", descripcion: "", precioUnitario: "", stockDisponible: "" });
                }}
                className="px-6 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-blue-600">
          <h3 className="text-lg font-semibold text-white">Catálogo de Productos</h3>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando productos...</div>
        ) : productos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay productos registrados aún
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productos.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{producto.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{producto.codigo}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {producto.nombre}
                      {producto.descripcion && (
                        <p className="text-xs text-gray-500 mt-1">{producto.descripcion}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      Q{producto.precioUnitario.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {producto.stockDisponible !== null && producto.stockDisponible !== undefined
                        ? producto.stockDisponible
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleEdit(producto)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDelete(producto.id)}
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

// ========== COMPONENTE: Tab de Pedidos ==========
function PedidosTab() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Estado del formulario
  const [clienteId, setClienteId] = useState<number | "">("");
  const [items, setItems] = useState<Array<{
    productoId: number | "";
    cantidad: number;
  }>>([{ productoId: "", cantidad: 1 }]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [resPedidos, resClientes, resProductos] = await Promise.all([
        fetch("http://localhost:8081/api/pedidos"),
        fetch("http://localhost:8081/api/clientes"),
        fetch("http://localhost:8081/api/productos"),
      ]);
      const dataPedidos = await resPedidos.json();
      const dataClientes = await resClientes.json();
      const dataProductos = await resProductos.json();
      
      setPedidos(dataPedidos);
      setClientes(dataClientes);
      setProductos(dataProductos);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const agregarItem = () => {
    setItems([...items, { productoId: "", cantidad: 1 }]);
  };

  const quitarItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const actualizarItem = (index: number, campo: "productoId" | "cantidad", valor: any) => {
    const nuevosItems = [...items];
    nuevosItems[index][campo] = valor;
    setItems(nuevosItems);
  };

  const calcularTotal = () => {
    return items.reduce((total, item) => {
      if (item.productoId === "") return total;
      const producto = productos.find(p => p.id === item.productoId);
      if (!producto) return total;
      return total + (producto.precioUnitario * item.cantidad);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (clienteId === "") {
      alert("Selecciona un cliente");
      return;
    }

    if (items.some(item => item.productoId === "" || item.cantidad <= 0)) {
      alert("Completa todos los items con producto y cantidad válida");
      return;
    }

    const itemsParaEnviar = items.map(item => {
      const producto = productos.find(p => p.id === item.productoId);
      return {
        productoCodigo: producto?.codigo || "",
        productoNombre: producto?.nombre || "",
        precioUnitario: producto?.precioUnitario || 0,
        cantidad: item.cantidad
      };
    });

    const payload = {
      clienteId: clienteId,
      items: itemsParaEnviar
    };

    try {
      const res = await fetch("http://localhost:8081/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Pedido creado exitosamente");
        setClienteId("");
        setItems([{ productoId: "", cantidad: 1 }]);
        setShowForm(false);
        cargarDatos();
      } else {
        const error = await res.text();
        alert("Error al crear pedido: " + error);
      }
    } catch (error) {
      alert("Error al crear pedido");
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este pedido?")) return;
    try {
      const res = await fetch(`http://localhost:8081/api/pedidos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Pedido eliminado");
        cargarDatos();
      }
    } catch (error) {
      alert("Error al eliminar pedido");
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Cargando datos...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Botón para mostrar/ocultar formulario */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-900">
          Gestión de Pedidos
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          {showForm ? "Ocultar Formulario" : "Crear Nuevo Pedido"}
        </button>
      </div>

      {/* Formulario de Creación */}
      {showForm && (
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Nuevo Pedido
          </h3>
          
          {clientes.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800">⚠️ No hay clientes registrados. Crea un cliente primero en la pestaña "Clientes".</p>
            </div>
          )}
          
          {productos.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800">⚠️ No hay productos registrados. Crea productos primero en la pestaña "Productos".</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selección de Cliente */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cliente *
              </label>
              <select
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                required
              >
                <option value="">-- Selecciona un cliente --</option>
                {clientes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre} ({cliente.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Items del Pedido */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Items del Pedido *
                </label>
                <button
                  type="button"
                  onClick={agregarItem}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  + Agregar Item
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Producto
                      </label>
                      <select
                        value={item.productoId}
                        onChange={(e) => actualizarItem(index, "productoId", e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
                        required
                      >
                        <option value="">-- Selecciona --</option>
                        {productos.map(producto => (
                          <option key={producto.id} value={producto.id}>
                            {producto.nombre} - Q{producto.precioUnitario.toFixed(2)}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="w-24">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Cantidad
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.cantidad}
                        onChange={(e) => actualizarItem(index, "cantidad", Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
                        required
                      />
                    </div>

                    <div className="w-32">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Subtotal
                      </label>
                      <div className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium">
                        Q{item.productoId !== "" 
                          ? ((productos.find(p => p.id === item.productoId)?.precioUnitario || 0) * item.cantidad).toFixed(2)
                          : "0.00"
                        }
                      </div>
                    </div>

                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => quitarItem(index)}
                        className="mt-6 text-red-600 hover:text-red-800 font-medium"
                        title="Eliminar item"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="bg-blue-100 rounded-lg p-4 flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total del Pedido:</span>
              <span className="text-2xl font-bold text-blue-600">
                Q{calcularTotal().toFixed(2)}
              </span>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={clientes.length === 0 || productos.length === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Crear Pedido
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setClienteId("");
                  setItems([{ productoId: "", cantidad: 1 }]);
                }}
                className="px-6 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla de Pedidos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-blue-600">
          <h3 className="text-lg font-semibold text-white">
            Lista de Pedidos ({pedidos.length})
          </h3>
        </div>
        {pedidos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay pedidos registrados aún
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{pedido.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{pedido.codigo}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {pedido.fechaPedido ? new Date(pedido.fechaPedido).toLocaleDateString("es-GT", {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }) : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      Q{Number(pedido.total).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          pedido.estado === "COMPLETADO"
                            ? "bg-green-100 text-green-800"
                            : pedido.estado === "PENDIENTE"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {pedido.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDelete(pedido.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Eliminar
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
