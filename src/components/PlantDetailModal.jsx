import React, { useState } from 'react';
import { Plus, X, Calendar, Package, FileText } from 'lucide-react';

export default function PlantDetailModal({ plant, onClose, onSave }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    activity: 'fumigacion',
    product: '',
    notes: ''
  });

  const handleSubmit = () => {
    if (!formData.product.trim()) {
      alert('Por favor ingresa el producto o detalle');
      return;
    }

    const newRecord = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString()
    };

    const updatedPlant = {
      ...plant,
      records: [...plant.records, newRecord]
    };

    onSave(updatedPlant);
    
    setFormData({
      date: new Date().toISOString().split('T')[0],
      activity: 'fumigacion',
      product: '',
      notes: ''
    });
  };

  const activityLabels = {
    fumigacion: 'Fumigación',
    fertilizacion: 'Fertilización/Abono',
    riego: 'Riego',
    poda: 'Poda',
    ablandar: 'Ablandar Tierra',
    otro: 'Otro'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
        {/* Header fijo */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between z-10">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-800">{plant.name}</h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Formulario */}
          <div className="mb-4 sm:mb-6 bg-green-50 p-3 sm:p-4 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
              Agregar Registro
            </h4>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                    Actividad
                  </label>
                  <select
                    value={formData.activity}
                    onChange={(e) => setFormData({...formData, activity: e.target.value})}
                    className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="fumigacion">Fumigación</option>
                    <option value="fertilizacion">Fertilización/Abono</option>
                    <option value="riego">Riego</option>
                    <option value="poda">Poda</option>
                    <option value="ablandar">Ablandar Tierra</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                  Producto/Detalle
                </label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  placeholder="Ej: Fungicida XYZ, Abono orgánico..."
                  className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Notas (opcional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Observaciones adicionales..."
                  rows="2"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Agregar Registro
              </button>
            </div>
          </div>

          {/* Historial */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">
              Historial ({plant.records.length} registro{plant.records.length !== 1 ? 's' : ''})
            </h4>
            <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 overflow-y-auto">
              {plant.records.length === 0 ? (
                <p className="text-gray-500 text-center py-6 sm:py-8 text-xs sm:text-sm">
                  No hay registros aún
                </p>
              ) : (
                plant.records.slice().reverse().map((record) => (
                  <div key={record.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-green-700 text-xs sm:text-sm">
                        {activityLabels[record.activity]}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
                        {record.date}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mb-1">
                      <strong>Producto:</strong> {record.product}
                    </p>
                    {record.notes && (
                      <p className="text-xs sm:text-sm text-gray-600 bg-white p-2 rounded mt-1">
                        <strong>Notas:</strong> {record.notes}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}