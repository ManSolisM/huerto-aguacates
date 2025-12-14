import React, { useState } from 'react';
import { Map, Info, ChevronDown, ChevronUp } from 'lucide-react';

export default function HeatMap({ plants, rows, cols, onPlantClick }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calcular intensidad de calor para cada planta
  const getHeatColor = (recordsCount) => {
    if (recordsCount === 0) return 'bg-red-400';
    if (recordsCount <= 2) return 'bg-orange-400';
    if (recordsCount <= 5) return 'bg-yellow-400';
    if (recordsCount <= 10) return 'bg-lime-400';
    return 'bg-green-400';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg mb-4 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          <h3 className="text-base sm:text-lg font-bold text-gray-800">Mapa de Calor</h3>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isExpanded && (
        <div className="p-3 sm:p-4 border-t border-gray-200">
          {/* Leyenda */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-gray-600" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">Leyenda</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 rounded"></div>
                <span>Sin registros</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-400 rounded"></div>
                <span>1-2 registros</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span>3-5 registros</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lime-400 rounded"></div>
                <span>6-10 registros</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-400 rounded"></div>
                <span>10+ registros</span>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="overflow-x-auto">
            <div 
              className="grid gap-1 sm:gap-1.5 mx-auto"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                minWidth: cols > 20 ? '600px' : 'auto'
              }}
            >
              {plants.map((plant) => {
                const recordsCount = plant.records.length;
                const heatColor = getHeatColor(recordsCount);
                
                return (
                  <button
                    key={plant.id}
                    onClick={() => onPlantClick(plant)}
                    className={`aspect-square ${heatColor} hover:ring-2 hover:ring-gray-800 rounded transition-all flex items-center justify-center text-[8px] sm:text-[10px] font-semibold text-white shadow-sm`}
                    title={`${plant.name} - ${recordsCount} registros`}
                  >
                    {recordsCount > 0 && recordsCount}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Haz clic en cualquier cuadro para ver detalles de la planta
          </p>
        </div>
      )}
    </div>
  );
}