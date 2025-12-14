import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Navbar from '../components/Navbar';
import InitialSetup from '../components/InitialSetup';
import SearchBar from '../components/SearchBar';
import ViewModeSelector from '../components/ViewModeSelector';
import FarmGrid from '../components/FarmGrid';
import PlantListView from '../components/PlantListView';
import ConfigModal from '../components/ConfigModal';
import PlantDetailModal from '../components/PlantDetailModal';

export default function FarmManager() {
  const [plants, setPlants] = useLocalStorage('avocadoPlants', []);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(40);
  const [showConfig, setShowConfig] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Nuevos estados para búsqueda y filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'

  const initializeFarm = () => {
    const newPlants = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        newPlants.push({
          id: `${i}-${j}`,
          row: i,
          col: j,
          name: `Aguacate ${i + 1}-${j + 1}`,
          records: []
        });
      }
    }
    setPlants(newPlants);
    setShowConfig(false);
  };

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
    setShowPlantModal(true);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Navbar
        plantsCount={plants.length}
        onConfigClick={() => setShowConfig(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="max-w-7xl mx-auto p-3 sm:p-4">
        {plants.length === 0 ? (
          <InitialSetup 
            rows={rows} 
            cols={cols} 
            setRows={setRows} 
            setCols={setCols}
            onInitialize={initializeFarm}
          />
        ) : (
          <>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
            
            <ViewModeSelector
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
            
            {viewMode === 'grid' ? (
              <FarmGrid 
                plants={plants} 
                rows={rows} 
                cols={cols} 
                onPlantClick={handlePlantClick}
                searchTerm={searchTerm}
                filterBy={filterBy}
              />
            ) : (
              <PlantListView
                plants={plants}
                onPlantClick={handlePlantClick}
                searchTerm={searchTerm}
                filterBy={filterBy}
              />
            )}
          </>
        )}
      </div>

      {showConfig && (
        <ConfigModal
          rows={rows}
          cols={cols}
          setRows={setRows}
          setCols={setCols}
          onClose={() => setShowConfig(false)}
          onSave={initializeFarm}
        />
      )}

      {showPlantModal && selectedPlant && (
        <PlantDetailModal
          plant={selectedPlant}
          onClose={() => setShowPlantModal(false)}
          onSave={(updatedPlant) => {
            setPlants(plants.map(p => p.id === updatedPlant.id ? updatedPlant : p));
            setShowPlantModal(false);
          }}
        />
      )}
    </div>
  );
}