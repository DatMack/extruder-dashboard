import React, { useState } from 'react';

interface PreStartCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (startupData: {
    feedRate: string;
    screws: string;
    water: string;
    knives: string;
    steam?: string;
    precon?: {
      water?: string;
      steam?: string;
      upperDwell?: string;
      lowerDwell?: string;
    };
  }) => void;
}

const PreStartCheckModal: React.FC<PreStartCheckModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [confirmChecklist, setConfirmChecklist] = useState({
    checksDone: false,
    bulkSettings: false,
    weightChanged: false,
  });

  const [startupData, setStartupData] = useState({
    feedRate: '',
    screws: '',
    water: '',
    knives: '',
    steam: '',
    precon: {
      water: '',
      steam: '',
      upperDwell: '',
      lowerDwell: '',
    },
  });

  const handleChange = (field: string, value: string) => {
    setStartupData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreconChange = (field: string, value: string) => {
    setStartupData((prev) => ({
      ...prev,
      precon: { ...prev.precon, [field]: value },
    }));
  };

  const allConfirmed = Object.values(confirmChecklist).every(Boolean);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Pre-Start Checklist</h2>

        <div className="space-y-2 mb-4">
          <label className="block">
            <input type="checkbox" checked={confirmChecklist.checksDone} onChange={(e) => setConfirmChecklist({ ...confirmChecklist, checksDone: e.target.checked })} />
            <span className="ml-2">Pre-start checkup filled out</span>
          </label>
          <label className="block">
            <input type="checkbox" checked={confirmChecklist.bulkSettings} onChange={(e) => setConfirmChecklist({ ...confirmChecklist, bulkSettings: e.target.checked })} />
            <span className="ml-2">Bulk density and feeder settings set</span>
          </label>
          <label className="block">
            <input type="checkbox" checked={confirmChecklist.weightChanged} onChange={(e) => setConfirmChecklist({ ...confirmChecklist, weightChanged: e.target.checked })} />
            <span className="ml-2">Weight has been changed</span>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input className="border px-3 py-2 rounded" placeholder="Feed Rate" value={startupData.feedRate} onChange={(e) => handleChange('feedRate', e.target.value)} />
          <input className="border px-3 py-2 rounded" placeholder="Screws" value={startupData.screws} onChange={(e) => handleChange('screws', e.target.value)} />
          <input className="border px-3 py-2 rounded" placeholder="Water" value={startupData.water} onChange={(e) => handleChange('water', e.target.value)} />
          <input className="border px-3 py-2 rounded" placeholder="Knives" value={startupData.knives} onChange={(e) => handleChange('knives', e.target.value)} />
        </div>

        <div className="mb-2">
          <input className="border px-3 py-2 rounded w-full mb-2" placeholder="Steam (optional)" value={startupData.steam} onChange={(e) => handleChange('steam', e.target.value)} />
          <h3 className="font-semibold mb-2">Pre-Con (optional)</h3>
          <div className="grid grid-cols-2 gap-2">
            <input className="border px-3 py-2 rounded" placeholder="Pre-Con Water" value={startupData.precon.water} onChange={(e) => handlePreconChange('water', e.target.value)} />
            <input className="border px-3 py-2 rounded" placeholder="Pre-Con Steam" value={startupData.precon.steam} onChange={(e) => handlePreconChange('steam', e.target.value)} />
            <input className="border px-3 py-2 rounded" placeholder="Upper Dwell Speed" value={startupData.precon.upperDwell} onChange={(e) => handlePreconChange('upperDwell', e.target.value)} />
            <input className="border px-3 py-2 rounded" placeholder="Lower Dwell Speed" value={startupData.precon.lowerDwell} onChange={(e) => handlePreconChange('lowerDwell', e.target.value)} />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button
            onClick={() => onSubmit(startupData)}
            disabled={!allConfirmed}
            className={`px-4 py-2 text-white rounded ${allConfirmed ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreStartCheckModal;
