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
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-md mx-auto mt-4 sm:mt-12">
      <div className="text-center mb-4 sm:mb-6">
        <Sprout className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-green-600 mb-3 sm:mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
          Configura tu Huerto
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Define las dimensiones de tu terreno
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Filas
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value) || 1)}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Recomendado: 10-20 filas</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Columnas
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value) || 1)}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Recomendado: 20-40 columnas</p>
        </div>

        <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
          <p className="text-sm sm:text-base text-gray-700 text-center mb-1">
            Total de plantas:{' '}
            <span className="font-bold text-green-700 text-lg">{rows * cols}</span>
          </p>
          {rows * cols > 500 && (
            <p className="text-xs text-orange-600 text-center mt-1">
              ⚠️ Terreno grande: se recomienda usar la vista de lista
            </p>
          )}
        </div>

        <button
          onClick={onInitialize}
          className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 sm:py-3.5 rounded-lg transition text-base sm:text-lg"
        >
          Crear Huerto
        </button>
      </div>
    </div>
  );
}