import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Check } from 'lucide-react';

export default function FarmSelector({ 
  farms, 
  currentFarm, 
  onSelectFarm, 
  onCreateFarm,
  onDeleteFarm 
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newFarmName, setNewFarmName] = useState('');

  const handleCreate = () => {
    if (newFarmName.trim()) {
      onCreateFarm(newFarmName.trim());
      setNewFarmName('');
      setIsCreating(false);
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition text-sm sm:text-base w-full sm:w-auto justify-between"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          <span className="font-medium text-gray-700">
            {currentFarm ? currentFarm.name : 'Seleccionar terreno'}
          </span>
        </div>
        <span className="text-gray-400">▼</span>
      </button>

      {showDropdown && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute top-full mt-2 left-0 w-full sm:w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            {/* Lista de terrenos */}
            <div className="max-h-60 overflow-y-auto">
              {farms.map(farm => (
                <div
                  key={farm.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-100"
                >
                  <button
                    onClick={() => {
                      onSelectFarm(farm);
                      setShowDropdown(false);
                    }}
                    className="flex-1 text-left flex items-center gap-2"
                  >
                    {currentFarm?.id === farm.id && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                    <span className="text-sm">{farm.name}</span>
                  </button>
                  {farms.length > 1 && (
                    <button
                      onClick={() => {
                        onDeleteFarm(farm.id);
                        setShowDropdown(false);
                      }}
                      className="p-1 hover:bg-red-100 rounded text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Crear nuevo terreno */}
            <div className="p-3 border-t border-gray-200">
              {isCreating ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newFarmName}
                    onChange={(e) => setNewFarmName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
                    placeholder="Nombre del terreno..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreate}
                      className="flex-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                    >
                      Crear
                    </button>
                    <button
                      onClick={() => {
                        setIsCreating(false);
                        setNewFarmName('');
                      }}
                      className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsCreating(true)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100"
                >
                  <Plus className="w-4 h-4" />
                  Nuevo Terreno
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}