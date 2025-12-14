import React from 'react';
import { Sprout, Menu, X } from 'lucide-react';

export default function Navbar({ 
  plantsCount, 
  onConfigClick, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) {
  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Sprout className="w-8 h-8" />
            <h1 className="text-xl font-bold">Gestión de Aguacates</h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onConfigClick}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition"
            >
              Configurar Terreno
            </button>
            <div className="text-sm">
              <span className="font-semibold">{plantsCount}</span> plantas
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <button
              onClick={onConfigClick}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition mb-2"
            >
              Configurar Terreno
            </button>
            <div className="text-center text-sm">
              <span className="font-semibold">{plantsCount}</span> plantas registradas
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}