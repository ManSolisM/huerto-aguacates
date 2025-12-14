import React from 'react';
import { Sprout, Menu, X, Settings } from 'lucide-react';

export default function Navbar({ 
  plantsCount, 
  onConfigClick, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) {
  return (
    <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-2 sm:gap-3">
            <Sprout className="w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-base sm:text-xl font-bold truncate">Gestión Aguacates</h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onConfigClick}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Configurar Terreno
            </button>
            <div className="text-sm bg-green-600 px-3 py-1 rounded-full">
              <span className="font-semibold">{plantsCount}</span> plantas
            </div>
          </div>

          {/* Mobile: Plants count + Menu */}
          <div className="flex md:hidden items-center gap-2">
            <div className="text-xs bg-green-600 px-2 py-1 rounded-full">
              <span className="font-semibold">{plantsCount}</span>
            </div>
            <button
              className="p-2 hover:bg-green-600 rounded-lg transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3 animate-fade-in">
            <button
              onClick={() => {
                onConfigClick();
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-2.5 bg-green-600 hover:bg-green-500 rounded-lg transition flex items-center justify-center gap-2 text-sm"
            >
              <Settings className="w-4 h-4" />
              Configurar Terreno
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}