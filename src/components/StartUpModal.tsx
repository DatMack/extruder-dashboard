import React, { useState } from 'react';

const StartupModal = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: (startupInfo: string) => void;
  onCancel: () => void;
}) => {
  const [rpm, setRpm] = useState('');
  const [feedRate, setFeedRate] = useState('');
  const [waterSP, setWaterSP] = useState('');
  const [knifeSpeed, setKnifeSpeed] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    const formattedInfo = `RPM: ${rpm}, Feed Rate: ${feedRate}, Water SP: ${waterSP}, Knife Speed: ${knifeSpeed}, Notes: ${notes}`;
    onSubmit(formattedInfo);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Startup Information</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Initial RPM</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={rpm}
            onChange={(e) => setRpm(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Feed Rate</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={feedRate}
            onChange={(e) => setFeedRate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Water SP</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={waterSP}
            onChange={(e) => setWaterSP(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Knife Speed</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={knifeSpeed}
            onChange={(e) => setKnifeSpeed(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
          <textarea
            className="w-full border rounded p-2 h-24"
            placeholder="Optional details..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartupModal;