import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export default function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  filterBy, 
  setFilterBy,
  showFilters,
  setShowFilters 
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4">
      {/* Barra de búsqueda */}
      <div className="flex gap-2 mb-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Buscar planta (ej: 5-10, Aguacate 5-10)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-9 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-3 sm:px-4 py-2 rounded-lg transition flex items-center gap-2 ${
            showFilters ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Filtros</span>
        </button>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="border-t pt-3 space-y-2 animate-fade-in">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterBy('all')}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm transition ${
                filterBy === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilterBy('with-records')}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm transition ${
                filterBy === 'with-records'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Con registros
            </button>
            <button
              onClick={() => setFilterBy('no-records')}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm transition ${
                filterBy === 'no-records'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sin registros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}