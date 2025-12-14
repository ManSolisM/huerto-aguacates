import React from 'react';
import { Sprout, Calendar, ChevronRight } from 'lucide-react';

export default function PlantListView({ plants, onPlantClick, searchTerm, filterBy }) {
  // Filtrar plantas
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = searchTerm === '' || 
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${plant.row + 1}-${plant.col + 1}`.includes(searchTerm);
    
    let matchesFilter = true;
    if (filterBy === 'with-records') {
      matchesFilter = plant.records.length > 0;
    } else if (filterBy === 'no-records') {
      matchesFilter = plant.records.length === 0;
    }
    
    return matchesSearch && matchesFilter;
  });

  // Obtener último registro
  const getLastRecord = (plant) => {
    if (plant.records.length === 0) return null;
    return plant.records[plant.records.length - 1];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Lista de Plantas
        </h2>
        <div className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {filteredPlants.length} plantas
        </div>
      </div>

      {filteredPlants.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Sprout className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No se encontraron plantas</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[70vh] overflow-y-auto">
          {filteredPlants.map((plant) => {
            const lastRecord = getLastRecord(plant);
            
            return (
              <button
                key={plant.id}
                onClick={() => onPlantClick(plant)}
                className="w-full bg-gray-50 hover:bg-gray-100 active:bg-gray-200 p-3 rounded-lg transition flex items-center gap-3 text-left"
              >
                <div className={`p-2 rounded-lg ${
                  plant.records.length > 0 ? 'bg-green-100' : 'bg-gray-200'
                }`}>
                  <Sprout className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    plant.records.length > 0 ? 'text-green-600' : 'text-gray-500'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                      {plant.name}
                    </h3>
                    {plant.records.length > 0 && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                        {plant.records.length} registros
                      </span>
                    )}
                  </div>
                  
                  {lastRecord ? (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="w-3 h-3" />
                      <span>Último: {lastRecord.activity} - {lastRecord.date}</span>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">Sin registros</p>
                  )}
                </div>
                
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}