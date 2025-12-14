import React from 'react';
import { Sprout } from 'lucide-react';

export default function FarmGrid({ 
  plants, 
  rows, 
  cols, 
  onPlantClick,
  searchTerm,
  filterBy 
}) {
  // Filtrar plantas según búsqueda y filtros
  const filteredPlants = plants.filter(plant => {
    // Filtro de búsqueda
    const matchesSearch = searchTerm === '' || 
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${plant.row + 1}-${plant.col + 1}`.includes(searchTerm);
    
    // Filtro por tipo
    let matchesFilter = true;
    if (filterBy === 'with-records') {
      matchesFilter = plant.records.length > 0;
    } else if (filterBy === 'no-records') {
      matchesFilter = plant.records.length === 0;
    }
    
    return matchesSearch && matchesFilter;
  });

  // Ajustar tamaño de grid según columnas
  const getGridSize = () => {
    if (cols <= 4) return 'gap-3';
    if (cols <= 6) return 'gap-2.5';
    if (cols <= 10) return 'gap-2';
    if (cols <= 20) return 'gap-1.5';
    return 'gap-1';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6">
      <div className="flex justify-between items-center mb-3 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
          Vista del Terreno
        </h2>
        <div className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {filteredPlants.length} de {plants.length}
        </div>
      </div>
      
      {filteredPlants.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Sprout className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm sm:text-base">No se encontraron plantas</p>
          <p className="text-xs sm:text-sm mt-1">Intenta con otro término de búsqueda</p>
        </div>
      ) : (
        <div 
          className={`grid ${getGridSize()} mx-auto`}
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            maxWidth: '100%'
          }}
        >
          {filteredPlants.map((plant) => {
            const isHighlighted = searchTerm !== '' && 
              (plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              `${plant.row + 1}-${plant.col + 1}`.includes(searchTerm));
            
            return (
              <button
                key={plant.id}
                onClick={() => onPlantClick(plant)}
                className={`aspect-square rounded-lg shadow-md hover:shadow-xl transition-all transform active:scale-95 flex flex-col items-center justify-center p-1 sm:p-2 touch-manipulation ${
                  isHighlighted 
                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 ring-2 ring-yellow-500' 
                    : 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700'
                }`}
              >
                <Sprout className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white mb-0.5 sm:mb-1" />
                <span className="text-[9px] sm:text-[10px] md:text-xs text-white font-medium text-center leading-tight">
                  {plant.row + 1}-{plant.col + 1}
                </span>
                {plant.records.length > 0 && (
                  <span className="text-[8px] sm:text-[9px] md:text-xs bg-white text-green-700 px-1 sm:px-1.5 py-0.5 rounded-full mt-0.5 font-semibold">
                    {plant.records.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
      
      <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600">
        Toca una planta para ver sus detalles
      </div>
    </div>
  );
}