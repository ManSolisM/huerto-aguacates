import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Activity, ChevronDown, ChevronUp } from 'lucide-react';

export default function Statistics({ plants }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calcular estadísticas
  const totalPlants = plants.length;
  const plantsWithRecords = plants.filter(p => p.records.length > 0).length;
  const plantsWithoutRecords = totalPlants - plantsWithRecords;
  const totalRecords = plants.reduce((sum, p) => sum + p.records.length, 0);

  // Actividades por tipo
  const activityCounts = {
    fumigacion: 0,
    fertilizacion: 0,
    riego: 0,
    poda: 0,
    ablandar: 0,
    otro: 0
  };

  plants.forEach(plant => {
    plant.records.forEach(record => {
      const activityKey = record.activity.toLowerCase();
      if (activityCounts.hasOwnProperty(activityKey)) {
        activityCounts[activityKey]++;
      } else {
        activityCounts.otro++;
      }
    });
  });

  const activityLabels = {
    fumigacion: 'Fumigación',
    fertilizacion: 'Fertilización',
    riego: 'Riego',
    poda: 'Poda',
    ablandar: 'Ablandar Tierra',
    otro: 'Otro'
  };

  // Actividades recientes (últimos 7 días)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  let recentActivities = 0;
  plants.forEach(plant => {
    plant.records.forEach(record => {
      const recordDate = new Date(record.date);
      if (recordDate >= sevenDaysAgo) {
        recentActivities++;
      }
    });
  });

  // Calcular porcentajes
  const percentageWithRecords = totalPlants > 0 ? Math.round((plantsWithRecords / totalPlants) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg mb-4 overflow-hidden">
      {/* Header colapsable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          <h3 className="text-base sm:text-lg font-bold text-gray-800">Estadísticas del Terreno</h3>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {/* Contenido expandible */}
      {isExpanded && (
        <div className="p-3 sm:p-4 border-t border-gray-200 space-y-4">
          {/* Cards de estadísticas principales */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-xs sm:text-sm text-gray-600 mb-1">Total Plantas</div>
              <div className="text-xl sm:text-2xl font-bold text-green-700">{totalPlants}</div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-xs sm:text-sm text-gray-600 mb-1">Con Registros</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-700">{plantsWithRecords}</div>
              <div className="text-xs text-blue-600">{percentageWithRecords}%</div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-xs sm:text-sm text-gray-600 mb-1">Sin Registros</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-700">{plantsWithoutRecords}</div>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-xs sm:text-sm text-gray-600 mb-1">Última Semana</div>
              <div className="text-xl sm:text-2xl font-bold text-purple-700">{recentActivities}</div>
            </div>
          </div>

          {/* Actividades por tipo */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <h4 className="text-sm sm:text-base font-semibold text-gray-700">
                Actividades por Tipo
              </h4>
            </div>

            <div className="space-y-2">
              {Object.entries(activityCounts).map(([key, count]) => {
                const percentage = totalRecords > 0 ? (count / totalRecords) * 100 : 0;
                
                return (
                  <div key={key}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-gray-700">{activityLabels[key]}</span>
                      <span className="font-semibold text-gray-900">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total de registros */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Total de Registros</span>
            </div>
            <span className="text-xl font-bold text-green-700">{totalRecords}</span>
          </div>
        </div>
      )}
    </div>
  );
}