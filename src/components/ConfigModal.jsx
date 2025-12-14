import React from 'react';
import { X } from 'lucide-react';

export default function ConfigModal({ 
  rows, 
  cols, 
  setRows, 
  setCols, 
  onClose, 
  onSave 
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">
            Reconfigurar Terreno
          </h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        
        <p className="text-xs sm:text-sm text-red-600 mb-3 sm:mb-4 bg-red-50 p-2 sm:p-3 rounded-lg">
          ⚠️ Esto reiniciará todos los datos actuales
        </p>

        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filas
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value) || 1)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Columnas
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={cols}
              onChange={(e) => setCols(parseInt(e.target.value) || 1)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="bg-green-50 p-2 sm:p-3 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-700 text-center">
              Total: <span className="font-bold text-green-700">{rows * cols}</span> plantas
            </p>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-lg transition text-sm sm:text-base font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-lg transition text-sm sm:text-base font-medium"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}