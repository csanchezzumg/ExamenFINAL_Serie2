"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Proveedor {
  id: number;
  nombre: string;
  contacto: string;
  telefono?: string;
  direccion?: string;
}

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8082/api/proveedores")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar proveedores");
        return res.json();
      })
      .then((data) => {
        setProveedores(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-xl text-gray-700">Cargando proveedores...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <p className="text-sm mt-2">
            Asegúrate de que el Componente B esté corriendo en{" "}
            <a
              href="http://localhost:8082"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              localhost:8082
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            ← Volver al Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              🏢 Proveedores
            </h1>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
              {proveedores.length} registros
            </span>
          </div>

          {proveedores.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No hay proveedores registrados
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contacto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Teléfono
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dirección
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {proveedores.map((proveedor) => (
                    <tr key={proveedor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {proveedor.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {proveedor.nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {proveedor.contacto}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {proveedor.telefono || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {proveedor.direccion || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
