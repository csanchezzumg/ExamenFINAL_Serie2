import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Dashboard Logística
          </h1>
          <p className="text-lg text-gray-600">
            Plataforma de Control de Pedidos Multiplataforma
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Componente A - Gestión de Clientes y Pedidos */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                📦 Componente A
              </h2>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                MariaDB
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Gestión de Clientes y Pedidos
            </p>
            <div className="space-y-3">
              <Link
                href="/clientes"
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
              >
                Ver Clientes
              </Link>
              <Link
                href="/pedidos"
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
              >
                Ver Pedidos
              </Link>
              <a
                href="http://localhost:8081/swagger-ui.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors text-center"
              >
                🔗 Swagger UI
              </a>
            </div>
          </div>

          {/* Componente B - Gestión de Proveedores y Facturas */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                🏢 Componente B
              </h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                PostgreSQL
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Gestión de Proveedores y Facturas
            </p>
            <div className="space-y-3">
              <Link
                href="/proveedores"
                className="block w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
              >
                Ver Proveedores
              </Link>
              <Link
                href="/facturas"
                className="block w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
              >
                Ver Facturas
              </Link>
              <a
                href="http://localhost:8082/swagger-ui.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors text-center"
              >
                🔗 Swagger UI
              </a>
            </div>
          </div>
        </div>

        {/* Footer con información técnica */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🏗️ Arquitectura del Sistema
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-800 mb-1">Frontend</p>
              <p>Next.js 16 + TypeScript + Tailwind CSS</p>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-1">Backend</p>
              <p>Spring Boot 3.2.0 + Java 17</p>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-1">Bases de Datos</p>
              <p>MariaDB 12.0 + PostgreSQL 16</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
