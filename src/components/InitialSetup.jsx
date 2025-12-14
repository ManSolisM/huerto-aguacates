import React from 'react';
import { Sprout } from 'lucide-react';

export default function InitialSetup({ 
  rows, 
  cols, 
  setRows, 
  setCols, 
  onInitialize 
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto mt-12">
      <div className="text-center mb-6">
        <Sprout className="w-16 h-16 mx-auto text-green-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Configura tu Huerto</h2>
        <p className="text-gray-600">Define las dimensiones de tu terreno</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Filas
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Columnas
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            Total de plantas: <span className="font-bold text-green-700">{rows * cols}</span>
          </p>
        </div>

        <button
          onClick={onInitialize}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Crear Huerto
        </button>
      </div>
    </div>
  );
}