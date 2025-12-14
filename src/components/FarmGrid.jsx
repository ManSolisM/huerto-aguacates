import React from 'react';
import { Sprout } from 'lucide-react';

export default function FarmGrid({ plants, rows, cols, onPlantClick }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Vista del Terreno
      </h2>
      
      <div 
        className="grid gap-3 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          maxWidth: '100%'
        }}
      >
        {plants.map((plant) => (
          <button
            key={plant.id}
            onClick={() => onPlantClick(plant)}
            className="aspect-square bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105 flex flex-col items-center justify-center p-2"
          >
            <Sprout className="w-6 h-6 md:w-8 md:h-8 text-white mb-1" />
            <span className="text-xs text-white font-medium text-center">
              {plant.row + 1}-{plant.col + 1}
            </span>
            {plant.records.length > 0 && (
              <span className="text-xs bg-white text-green-700 px-2 py-0.5 rounded-full mt-1">
                {plant.records.length}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}