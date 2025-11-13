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
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            MultiPedidos S.A.
          </h1>
          <p className="text-xl text-gray-600">
            Sistema de Gestión Logística Multiplataforma
          </p>
        </div>

        {/* Estadísticas Combinadas - Integración de Ambos Servicios */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📊 Estadísticas del Sistema
          </h3>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Cargando estadísticas...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {/* Componente A - MariaDB */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border-2 border-blue-200">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats.clientes}
                </div>
                <div className="text-sm font-medium text-gray-700">Clientes</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border-2 border-blue-200">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats.pedidos}
                </div>
                <div className="text-sm font-medium text-gray-700">Pedidos</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border-2 border-blue-200">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stats.productos}
                </div>
                <div className="text-sm font-medium text-gray-700">Productos</div>
              </div>

              {/* Componente B - PostgreSQL */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center border-2 border-purple-200">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {stats.proveedores}
                </div>
                <div className="text-sm font-medium text-gray-700">Proveedores</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center border-2 border-purple-200">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {stats.facturas}
                </div>
                <div className="text-sm font-medium text-gray-700">Facturas</div>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600">Componente A</span> (Gestión de Ventas - MariaDB) · 
              <span className="font-semibold text-purple-600 ml-2">Componente B</span> (Gestión de Compras - PostgreSQL)
            </p>
          </div>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Componente A - Gestión de Ventas */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
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
              <p className="text-blue-100 text-sm">Componente A - MariaDB</p>
            </div>
            
            <div className="p-8">
              <p className="text-gray-600 mb-6">
                Gestiona la información de clientes y sus pedidos asociados
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
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-center shadow-lg hover:shadow-xl"
              >
                Acceder al Módulo de Ventas →
              </Link>
            </div>
          </div>

          {/* Componente B - Gestión de Compras */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  Gestión de Compras
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
              <p className="text-purple-100 text-sm">Componente B - PostgreSQL</p>
            </div>
            
            <div className="p-8">
              <p className="text-gray-600 mb-6">
                Administra proveedores y facturas del sistema de logística
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
                  <span>Integración con pedidos</span>
                </div>
              </div>

              <Link
                href="/componente-b"
                className="block w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-center shadow-lg hover:shadow-xl"
              >
                Acceder al Módulo de Compras →
              </Link>
            </div>
          </div>
        </div>

        {/* Botón de Información de Arquitectura */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowArchitecture(!showArchitecture)}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Información de Arquitectura</span>
            <svg 
              className={`w-4 h-4 transition-transform ${showArchitecture ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Panel Expandible de Arquitectura */}
        {showArchitecture && (
          <div className="mt-6 bg-white rounded-xl shadow-2xl p-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏗️</span>
              Arquitectura del Sistema
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-200">
                <p className="font-semibold text-blue-700 mb-3">Componente A - Gestión de Ventas</p>
                <div className="space-y-2 text-gray-700">
                  <p>• Base de datos: <span className="font-medium text-green-700">MariaDB 12.0</span></p>
                  <p>• Backend: <span className="font-medium">Spring Boot 3.2.0</span></p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-2 border-purple-200">
                <p className="font-semibold text-purple-700 mb-3">Componente B - Gestión de Compras</p>
                <div className="space-y-2 text-gray-700">
                  <p>• Base de datos: <span className="font-medium text-blue-700">PostgreSQL 16</span></p>
                  <p>• Backend: <span className="font-medium">Spring Boot 3.2.0</span></p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 border-2 border-cyan-200">
                <p className="font-semibold text-cyan-700 mb-3">Frontend</p>
                <div className="space-y-2 text-gray-700">
                  <p>• Framework: <span className="font-medium">Next.js 16</span></p>
                  <p>• Tecnologías: <span className="font-medium">TypeScript + Tailwind CSS</span></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
