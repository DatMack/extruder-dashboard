import React, { useState } from 'react';

interface EndShiftModalProps {
  onClose: () => void;
  onConfirm: (data: Record<string, string>) => void;
}

const fields = [
  { id: 'total_pounds_run', label: 'Total Pounds Run', type: 'number' },
  { id: 'last_tote_batch', label: 'Last Tote & Batch Info', type: 'text' },
  { id: 'scrap_regrind', label: 'Scrap & Regrind Run (lbs)', type: 'number' },
  { id: 'totes_on_hold', label: 'Totes on Hold (and reasons)', type: 'text' },
  { id: 'supervisor_notes', label: 'Team Lead Notes', type: 'text' },
  { id: 'supervisor_signature', label: 'Team Lead Signature', type: 'text' },
];

const EndShiftModal: React.FC<EndShiftModalProps> = ({ onClose, onConfirm }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const allFilled = fields.every(field => formData[field.id]?.trim());
    if (!allFilled) {
      alert('Please fill out all fields.');
      return;
    }
    onConfirm(formData);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">End of Shift Summary</h2>
        <div className="space-y-4">
          {fields.map(field => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block font-medium mb-1">
                {field.label}
              </label>
              {field.type === 'text' ? (
                <textarea
                  id={field.id}
                  rows={2}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              ) : (
                <input
                  id={field.id}
                  type="number"
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndShiftModal;