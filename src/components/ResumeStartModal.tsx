import React, { useState } from 'react';

interface ResumeStartModalProps {
  onClose: () => void;
  onConfirm: (data: {
    rpm: string;
    feedRate: string;
    waterSP: string;
    knifeSpeed: string;
    density: string;
    moisture: string;
  }) => void;
}

const ResumeStartModal: React.FC<ResumeStartModalProps> = ({ onClose, onConfirm }) => {
  const [rpm, setRpm] = useState('');
  const [feedRate, setFeedRate] = useState('');
  const [waterSP, setWaterSP] = useState('');
  const [knifeSpeed, setKnifeSpeed] = useState('');
  const [density, setDensity] = useState('');
  const [moisture, setMoisture] = useState('');

  const handleSubmit = () => {
    if (!rpm || !feedRate || !waterSP || !knifeSpeed || !density || !moisture) {
      alert('Please fill in all fields.');
      return;
    }
    onConfirm({ rpm, feedRate, waterSP, knifeSpeed, density, moisture });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Resume Order Startup</h2>

        <div className="grid grid-cols-1 gap-4">
          <input type="text" value={rpm} onChange={(e) => setRpm(e.target.value)} placeholder="Rpm" className="border p-2 rounded" />
          <input type="text" value={feedRate} onChange={(e) => setFeedRate(e.target.value)} placeholder="Feed Rate" className="border p-2 rounded" />
          <input type="text" value={waterSP} onChange={(e) => setWaterSP(e.target.value)} placeholder="Water SP" className="border p-2 rounded" />
          <input type="text" value={knifeSpeed} onChange={(e) => setKnifeSpeed(e.target.value)} placeholder="Knife Speed" className="border p-2 rounded" />
          <input type="text" value={density} onChange={(e) => setDensity(e.target.value)} placeholder="Density" className="border p-2 rounded" />
          <input type="text" value={moisture} onChange={(e) => setMoisture(e.target.value)} placeholder="Moisture" className="border p-2 rounded" />
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeStartModal;