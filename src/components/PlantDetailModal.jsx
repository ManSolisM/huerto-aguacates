import React, { useState } from 'react';
import { Plus, X, Calendar, Package, FileText, Tag, Image } from 'lucide-react';

export default function PlantDetailModal({ plant, onClose, onSave }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    activity: 'fumigacion',
    customActivity: '',
    product: '',
    notes: '',
    tags: []
  });

  const [newTag, setNewTag] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  const activityLabels = {
    fumigacion: 'Fumigación',
    fertilizacion: 'Fertilización/Abono',
    riego: 'Riego',
    poda: 'Poda',
    ablandar: 'Ablandar Tierra',
    otro: 'Otro'
  };

  const availableTags = [
    'Hass', 'Fuerte', 'Pinkerton', 'Bacon',
    'Joven', 'Adulto', 'Producción',
    'Prioridad Alta', 'Revisar', 'Saludable'
  ];

  const handleSubmit = () => {
    if (!formData.product.trim()) {
      alert('Por favor ingresa el producto o detalle');
      return;
    }

    // Si seleccionó "Otro" y puso actividad personalizada, usar esa
    // Si no, usar el valor de activity (será "otro" por defecto)
    const finalActivity = formData.activity === 'otro' && formData.customActivity.trim() 
      ? formData.customActivity.trim()
      : formData.activity;

    const newRecord = {
      id: Date.now(),
      date: formData.date,
      activity: finalActivity,
      product: formData.product,
      notes: formData.notes,
      tags: formData.tags,
      photo: photoPreview,
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
      customActivity: '',
      product: '',
      notes: '',
      tags: []
    });
    setPhotoPreview(null);
  };

  const addTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData({...formData, tags: [...formData.tags, tag]});
    }
  };

  const removeTag = (tag) => {
    setFormData({...formData, tags: formData.tags.filter(t => t !== tag)});
  };

  const addCustomTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({...formData, tags: [...formData.tags, newTag.trim()]});
      setNewTag('');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between z-10">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-800">{plant.name}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
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
              {/* Fecha y Actividad */}
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

              {/* Campo personalizado cuando selecciona "Otro" */}
              {formData.activity === 'otro' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Especifica la actividad (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.customActivity}
                    onChange={(e) => setFormData({...formData, customActivity: e.target.value})}
                    placeholder="Ej: Control de plagas, Injerto, etc."
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    💡 Si no especificas, se guardará como "Otro"
                  </p>
                </div>
              )}

              {/* Producto */}
              <div>
                <label className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                  Producto/Detalle *
                </label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  placeholder="Ej: Fungicida XYZ, Abono orgánico..."
                  className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Etiquetas */}
              <div>
                <label className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                  Etiquetas (opcional)
                </label>
                
                {/* Etiquetas seleccionadas */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:bg-green-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Etiquetas predefinidas */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => addTag(tag)}
                      disabled={formData.tags.includes(tag)}
                      className={`px-2 py-1 rounded-full text-xs transition ${
                        formData.tags.includes(tag)
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      + {tag}
                    </button>
                  ))}
                </div>

                {/* Agregar etiqueta personalizada */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                    placeholder="Etiqueta personalizada..."
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={addCustomTag}
                    className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
                  >
                    Agregar
                  </button>
                </div>
              </div>

              {/* Foto (opcional) */}
              <div>
                <label className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  <Image className="w-3 h-3 sm:w-4 sm:h-4" />
                  Foto (opcional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                {photoPreview && (
                  <div className="mt-2 relative">
                    <img src={photoPreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                    <button
                      onClick={() => setPhotoPreview(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Notas */}
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
                      <span className="font-semibold text-green-700 text-xs sm:text-sm capitalize">
                        {activityLabels[record.activity] || record.activity}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
                        {record.date}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mb-1">
                      <strong>Producto:</strong> {record.product}
                    </p>
                    {record.tags && record.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {record.tags.map((tag, i) => (
                          <span key={i} className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {record.photo && (
                      <img src={record.photo} alt="Registro" className="w-full h-24 object-cover rounded mt-2" />
                    )}
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