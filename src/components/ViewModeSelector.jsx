import React from 'react';
import { Grid3x3, List } from 'lucide-react';

export default function ViewModeSelector({ viewMode, setViewMode }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-2 mb-4 flex gap-2">
      <button
        onClick={() => setViewMode('grid')}
        className={`flex-1 py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 text-sm ${
          viewMode === 'grid'
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Grid3x3 className="w-4 h-4" />
        <span className="hidden sm:inline">Vista Cuadrícula</span>
        <span className="sm:hidden">Cuadrícula</span>
      </button>
      
      <button
        onClick={() => setViewMode('list')}
        className={`flex-1 py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 text-sm ${
          viewMode === 'list'
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">Vista Lista</span>
        <span className="sm:hidden">Lista</span>
      </button>
    </div>
  );
}