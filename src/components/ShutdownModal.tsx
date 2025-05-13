import React, { useState, useEffect } from 'react';

interface ShutdownModalProps {
  onClose: () => void;
  onConfirm: (data: { reason: string; startTime: string }) => void;
}

const ShutdownModal: React.FC<ShutdownModalProps> = ({ onClose, onConfirm }) => {
  const [reason, setReason] = useState('');
  const [startTime, setStartTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setStartTime(now.toLocaleString());
  }, []);

  const handleSubmit = () => {
    if (!reason.trim()) {
      alert('Please enter a shutdown reason.');
      return;
    }
    onConfirm({ reason, startTime });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Confirm Shutdown</h2>
        <p className="mb-4 text-gray-700">Please enter a reason for the shutdown to proceed.</p>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded mb-4"
          placeholder="Describe reason..."
          rows={4}
        />

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Confirm Shutdown
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShutdownModal;