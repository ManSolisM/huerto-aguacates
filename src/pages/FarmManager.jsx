import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Navbar from '../components/Navbar';
import InitialSetup from '../components/InitialSetup';
import FarmSelector from '../components/FarmSelector';
import Statistics from '../components/Statistics';
import HeatMap from '../components/HeatMap';
import SearchBar from '../components/SearchBar';
import ViewModeSelector from '../components/ViewModeSelector';
import FarmGrid from '../components/FarmGrid';
import PlantListView from '../components/PlantListView';
import ConfigModal from '../components/ConfigModal';
import PlantDetailModal from '../components/PlantDetailModal';

export default function FarmManager() {
  // Sistema de múltiples terrenos
  const [farms, setFarms] = useLocalStorage('farms', []);
  const [currentFarmId, setCurrentFarmId] = useLocalStorage('currentFarmId', null);
  
  const currentFarm = farms.find(f => f.id === currentFarmId);
  const plants = currentFarm?.plants || [];
  
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(40);
  const [showConfig, setShowConfig] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Estados de búsqueda y filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Crear nuevo terreno
  const createFarm = (name) => {
    const newFarm = {
      id: Date.now().toString(),
      name,
      rows: 10,
      cols: 40,
      plants: [],
      createdAt: new Date().toISOString()
    };
    setFarms([...farms, newFarm]);
    setCurrentFarmId(newFarm.id);
  };

  // Seleccionar terreno
  const selectFarm = (farm) => {
    setCurrentFarmId(farm.id);
    setRows(farm.rows);
    setCols(farm.cols);
  };

  // Eliminar terreno
  const deleteFarm = (farmId) => {
    if (farms.length === 1) {
      alert('No puedes eliminar el único terreno. Crea otro primero.');
      return;
    }
    
    if (window.confirm('¿Estás seguro de eliminar este terreno? Se perderán todos los datos.')) {
      const newFarms = farms.filter(f => f.id !== farmId);
      setFarms(newFarms);
      if (currentFarmId === farmId) {
        setCurrentFarmId(newFarms[0]?.id || null);
      }
    }
  };

  // Inicializar terreno
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
    
    if (currentFarm) {
      setFarms(farms.map(f => 
        f.id === currentFarm.id 
          ? { ...f, plants: newPlants, rows, cols }
          : f
      ));
    } else {
      const newFarm = {
        id: Date.now().toString(),
        name: 'Mi Terreno',
        rows,
        cols,
        plants: newPlants,
        createdAt: new Date().toISOString()
      };
      setFarms([...farms, newFarm]);
      setCurrentFarmId(newFarm.id);
    }
    
    setShowConfig(false);
  };

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
    setShowPlantModal(true);
    setMobileMenuOpen(false);
  };

  const handlePlantSave = (updatedPlant) => {
    setFarms(farms.map(f => 
      f.id === currentFarm.id
        ? {
            ...f,
            plants: f.plants.map(p => p.id === updatedPlant.id ? updatedPlant : p)
          }
        : f
    ));
    setShowPlantModal(false);
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
        {/* Selector de terrenos */}
        {farms.length > 0 && (
          <div className="mb-4">
            <FarmSelector
              farms={farms}
              currentFarm={currentFarm}
              onSelectFarm={selectFarm}
              onCreateFarm={createFarm}
              onDeleteFarm={deleteFarm}
            />
          </div>
        )}

        {!currentFarm || plants.length === 0 ? (
          <InitialSetup 
            rows={rows} 
            cols={cols} 
            setRows={setRows} 
            setCols={setCols}
            onInitialize={initializeFarm}
          />
        ) : (
          <>
            {/* Estadísticas */}
            <Statistics plants={plants} />
            
            {/* Mapa de calor */}
            <HeatMap 
              plants={plants} 
              rows={currentFarm.rows} 
              cols={currentFarm.cols}
              onPlantClick={handlePlantClick}
            />
            
            {/* Búsqueda */}
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
            
            {/* Selector de vista */}
            <ViewModeSelector
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
            
            {/* Vista principal */}
            {viewMode === 'grid' ? (
              <FarmGrid 
                plants={plants} 
                rows={currentFarm.rows} 
                cols={currentFarm.cols} 
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

      {/* Modales */}
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
          onSave={handlePlantSave}
        />
      )}
    </div>
  );
}