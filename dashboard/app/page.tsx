"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Stats {
  clientes: number;
  pedidos: number;
  productos: number;
  proveedores: number;
  facturas: number;
}

interface Pedido {
  id: number;
  clienteId: number;
  clienteNombre?: string;
  clienteCodigo?: string;
  fecha: string;
  total: number;
}

interface Factura {
  id: number;
  proveedorId: number;
  proveedorNombre?: string;
  proveedorCodigo?: string;
  fecha: string;
  total: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    clientes: 0,
    pedidos: 0,
    productos: 0,
    proveedores: 0,
    facturas: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [ultimosPedidos, setUltimosPedidos] = useState<Pedido[]>([]);
  const [ultimasFacturas, setUltimasFacturas] = useState<Factura[]>([]);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const [
        resClientes,
        resPedidos,
        resProductos,
        resProveedores,
        resFacturas,
      ] = await Promise.all([
        // Aquí se realiza la llamada a los endpoints de ambos componentes
        fetch("http://localhost:8081/api/clientes"),
        fetch("http://localhost:8081/api/pedidos"),
        fetch("http://localhost:8081/api/productos"),
        fetch("http://localhost:8082/api/proveedores"),
        fetch("http://localhost:8082/api/facturas"),
      ]);

      const [clientes, pedidos, productos, proveedores, facturas] =
        await Promise.all([
          resClientes.json(),
          resPedidos.json(),
          resProductos.json(),
          resProveedores.json(),
          resFacturas.json(),
        ]);

      setStats({
        clientes: clientes.length || 0,
        pedidos: pedidos.length || 0,
        productos: productos.length || 0,
        proveedores: proveedores.length || 0,
        facturas: facturas.length || 0,
      });

      // Obtener los últimos 2 pedidos
      const pedidosOrdenados = pedidos
        .sort((a: Pedido, b: Pedido) => b.id - a.id)
        .slice(0, 2);
      
      // Obtener nombres y códigos de clientes para los pedidos
      const pedidosConNombres = await Promise.all(
        pedidosOrdenados.map(async (pedido: Pedido) => {
          try {
            const resCliente = await fetch(`http://localhost:8081/api/clientes/${pedido.clienteId}`);
            const cliente = await resCliente.json();
            return { ...pedido, clienteNombre: cliente.nombre, clienteCodigo: cliente.codigo };
          } catch {
            return { ...pedido, clienteNombre: 'Cliente desconocido', clienteCodigo: 'N/A' };
          }
        })
      );
      
      setUltimosPedidos(pedidosConNombres);

      // Obtener las últimas 2 facturas
      const facturasOrdenadas = facturas
        .sort((a: Factura, b: Factura) => b.id - a.id)
        .slice(0, 2);
      
      // Obtener nombres y códigos de proveedores para las facturas
      const facturasConNombres = await Promise.all(
        facturasOrdenadas.map(async (factura: Factura) => {
          try {
            const resProveedor = await fetch(`http://localhost:8082/api/proveedores/${factura.proveedorId}`);
            const proveedor = await resProveedor.json();
            return { ...factura, proveedorNombre: proveedor.nombre, proveedorCodigo: proveedor.codigo };
          } catch {
            return { ...factura, proveedorNombre: 'Proveedor desconocido', proveedorCodigo: 'N/A' };
          }
        })
      );
      
      setUltimasFacturas(facturasConNombres);
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-left">
          <h1 className="text-3xl font-bold text-white">
            MultiPedidos S.A.
          </h1>
          <p className="text-sm text-blue-100 mt-1">
            Sistema de Gestión Logística Multiplataforma
          </p>
        </div>
      </div>

      {/* Layout con Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Barra Lateral Izquierda - Estadísticas */}
        <aside className="w-80 bg-white shadow-xl p-6 overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Estadísticas
          </h3>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4 text-sm">Cargando...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Componente A - MariaDB */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {stats.clientes}
                </div>
                <div className="text-sm font-medium text-gray-700">Clientes</div>
                <div className="text-xs text-gray-500 mt-1">Gestión de Ventas</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {stats.pedidos}
                </div>
                <div className="text-sm font-medium text-gray-700">Pedidos</div>
                <div className="text-xs text-gray-500 mt-1">Gestión de Ventas</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {stats.productos}
                </div>
                <div className="text-sm font-medium text-gray-700">Productos</div>
                <div className="text-xs text-gray-500 mt-1">Gestión de Ventas</div>
              </div>

              {/* Componente B - PostgreSQL */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {stats.proveedores}
                </div>
                <div className="text-sm font-medium text-gray-700">Proveedores</div>
                <div className="text-xs text-gray-500 mt-1">Gestión de Compras</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {stats.facturas}
                </div>
                <div className="text-sm font-medium text-gray-700">Facturas</div>
                <div className="text-xs text-gray-500 mt-1">Gestión de Compras</div>
              </div>
            </div>
          )}

          {/* Botón de Información de Arquitectura */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowArchitecture(!showArchitecture)}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-sm font-semibold py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Información de Arquitectura</span>
              <svg 
                className={`w-3 h-3 transition-transform ${showArchitecture ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Panel Expandible de Arquitectura en Sidebar */}
          {showArchitecture && (
            <div className="mt-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 border-2 border-cyan-200 animate-fadeIn">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-lg">🏗️</span>
                Arquitectura del Sistema
              </h3>
              <div className="space-y-3 text-xs">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="font-semibold text-blue-700 mb-2">Componente A - Ventas</p>
                  <div className="space-y-1 text-gray-700">
                    <p>• BD: <span className="font-medium text-green-700">MariaDB 12.0</span></p>
                    <p>• Backend: <span className="font-medium">Spring Boot 3.2.0</span></p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <p className="font-semibold text-purple-700 mb-2">Componente B - Compras</p>
                  <div className="space-y-1 text-gray-700">
                    <p>• BD: <span className="font-medium text-blue-700">PostgreSQL 16</span></p>
                    <p>• Backend: <span className="font-medium">Spring Boot 3.2.0</span></p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-cyan-200">
                  <p className="font-semibold text-cyan-700 mb-2">Frontend</p>
                  <div className="space-y-1 text-gray-700">
                    <p>• Framework: <span className="font-medium">Next.js 16</span></p>
                    <p>• Tecnologías: <span className="font-medium">TypeScript + Tailwind</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              <span className="font-semibold text-blue-600">Componente A</span> · 
              <span className="font-semibold text-purple-600 ml-1">Componente B</span>
            </p>
          </div>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="h-full flex items-center justify-center">
            {/* Main Cards */}
            <div className="grid md:grid-cols-2 gap-6 w-full">
          {/* Componente A - Gestión de Ventas */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-[680px]">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  Gestión de Ventas
                </h2>
                <a
                  href="http://localhost:8081/swagger-ui.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-100 transition-colors"
                  title="Ver documentación API"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="p-8">
              <p className="text-gray-600 mb-6">
                Información de clientes e información de pedidos
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Registrar y consultar clientes</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Crear y listar pedidos</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Editar y eliminar registros</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Cálculo automático de totales</span>
                </div>
              </div>

              <Link
                href="/componente-a"
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-center shadow-lg hover:shadow-xl mb-6"
              >
                Acceder al Módulo de Ventas →
              </Link>

              {/* Sección de Últimos Pedidos */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Últimos Pedidos
                </h3>
                <div className="space-y-2">
                  {ultimosPedidos.length > 0 ? (
                    ultimosPedidos.map((pedido) => (
                      <div key={pedido.id} className="bg-blue-50 rounded-lg p-3 text-xs">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-gray-700">#{pedido.id}</span>
                          <span className="font-semibold text-blue-600">Q{pedido.total.toFixed(2)}</span>
                        </div>
                        <div className="text-gray-600">{pedido.clienteNombre}</div>
                        <div className="text-gray-400 text-xs mt-1">
                          {pedido.clienteCodigo}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400 text-xs py-2">
                      No hay pedidos registrados
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Componente B - Proveedores y Facturas */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-[680px]">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  Proveedores y Facturas
                </h2>
                <a
                  href="http://localhost:8082/swagger-ui.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-100 transition-colors"
                  title="Ver documentación API"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="p-8">
              <p className="text-gray-600 mb-6">
                Administración de proveedores y facturas
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Registrar y consultar proveedores</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Crear y listar facturas</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Editar y eliminar registros</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Cálculo de facturas</span>
                </div>
              </div>

              <Link
                href="/componente-b"
                className="block w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-center shadow-lg hover:shadow-xl mb-6"
              >
                Acceder al Módulo de Compras →
              </Link>

              {/* Sección de Últimas Facturas */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Últimas Facturas
                </h3>
                <div className="space-y-2">
                  {ultimasFacturas.length > 0 ? (
                    ultimasFacturas.map((factura) => (
                      <div key={factura.id} className="bg-purple-50 rounded-lg p-3 text-xs">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-gray-700">#{factura.id}</span>
                          <span className="font-semibold text-purple-600">Q{factura.total.toFixed(2)}</span>
                        </div>
                        <div className="text-gray-600">{factura.proveedorNombre}</div>
                        <div className="text-gray-400 text-xs mt-1">
                          {factura.proveedorCodigo}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400 text-xs py-2">
                      No hay facturas registradas
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </main>
      </div>
    </div>
  );
}
