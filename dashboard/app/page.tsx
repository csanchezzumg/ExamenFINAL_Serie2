import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Sistema de Gestión Logística
          </h1>
          <p className="text-xl text-gray-600">
            Plataforma Multiplataforma de Control de Pedidos
          </p>
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

        {/* Footer Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            🏗️ Arquitectura del Sistema
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-medium text-gray-800 mb-2">Componente A - Gestión de Ventas</p>
              <div className="space-y-1 text-gray-600">
                <p>• Base de datos: <span className="font-medium text-green-700">MariaDB 12.0</span></p>
                <p>• Puerto: <span className="font-medium text-blue-700">8081</span></p>
                <p>• Backend: Spring Boot 3.2.0</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-2">Componente B - Gestión de Compras</p>
              <div className="space-y-1 text-gray-600">
                <p>• Base de datos: <span className="font-medium text-blue-700">PostgreSQL 16</span></p>
                <p>• Puerto: <span className="font-medium text-purple-700">8082</span></p>
                <p>• Backend: Spring Boot 3.2.0</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-800">Frontend:</span> Next.js 16 + TypeScript + Tailwind CSS (Puerto 3000)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
