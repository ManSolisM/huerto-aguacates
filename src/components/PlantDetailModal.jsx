import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full my-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{plant.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulario */}
        <div className="mb-6 bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-4">Agregar Registro</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Actividad</label>
              <select
                value={formData.activity}
                onChange={(e) => setFormData({...formData, activity: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Producto/Detalle
            </label>
            <input
              type="text"
              value={formData.product}
              onChange={(e) => setFormData({...formData, product: e.target.value})}
              placeholder="Ej: Fungicida XYZ, Abono orgánico..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Observaciones adicionales..."
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Agregar Registro
          </button>
        </div>

        {/* Historial */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">
            Historial ({plant.records.length} registros)
          </h4>
          <div className="max-h-64 overflow-y-auto space-y-3">
            {plant.records.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay registros aún</p>
            ) : (
              plant.records.slice().reverse().map((record) => (
                <div key={record.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-green-700 capitalize">
                      {record.activity}
                    </span>
                    <span className="text-sm text-gray-500">{record.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Producto:</strong> {record.product}
                  </p>
                  {record.notes && (
                    <p className="text-sm text-gray-600">
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
  );
}