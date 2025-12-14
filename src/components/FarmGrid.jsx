import React from 'react';
import { Sprout } from 'lucide-react';

export default function FarmGrid({ plants, rows, cols, onPlantClick }) {
  // Ajustar tamaño de grid según columnas
  const getGridSize = () => {
    if (cols <= 4) return 'gap-3';
    if (cols <= 6) return 'gap-2.5';
    if (cols <= 8) return 'gap-2';
    return 'gap-1.5';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6">
      <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-6 text-center">
        Vista del Terreno
      </h2>
      
      <div 
        className={`grid ${getGridSize()} mx-auto`}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          maxWidth: '100%'
        }}
      >
        {plants.map((plant) => (
          <button
            key={plant.id}
            onClick={() => onPlantClick(plant)}
            className="aspect-square bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 active:from-green-600 active:to-green-800 rounded-lg shadow-md hover:shadow-xl transition-all transform active:scale-95 flex flex-col items-center justify-center p-1 sm:p-2 touch-manipulation"
          >
            <Sprout className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white mb-0.5 sm:mb-1" />
            <span className="text-[10px] sm:text-xs text-white font-medium text-center leading-tight">
              {plant.row + 1}-{plant.col + 1}
            </span>
            {plant.records.length > 0 && (
              <span className="text-[9px] sm:text-xs bg-white text-green-700 px-1 sm:px-2 py-0.5 rounded-full mt-0.5 sm:mt-1 font-semibold">
                {plant.records.length}
              </span>
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600">
        Toca una planta para ver sus detalles
      </div>
    </div>
  );
}