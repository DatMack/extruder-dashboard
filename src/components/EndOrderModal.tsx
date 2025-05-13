import React, { useState } from 'react';

interface EndOrderModalProps {
  onClose: () => void;
  onConfirm?: (data: { reason: string; lotNumber?: string; productName?: string }) => void;
}

const EndOrderModal: React.FC<EndOrderModalProps> = ({ onClose, onConfirm }) => {
  const [reason, setReason] = useState('Changeover');
  const [lotNumber, setLotNumber] = useState('');
  const [productName, setProductName] = useState('');

  const handleSubmit = () => {
    onConfirm?.({ reason, lotNumber, productName });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">End Order</h2>

        <label className="block mb-2 font-medium">Reason for Ending Order</label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="Changeover">Changeover</option>
          <option value="Wet Wash">Wet Wash</option>
          <option value="Dry Clean">Dry Clean</option>
        </select>

        <label className="block mb-1 font-medium">New Lot Number (optional)</label>
        <input
          type="text"
          value={lotNumber}
          onChange={(e) => setLotNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="e.g. LOT-123"
        />

        <label className="block mb-1 font-medium">New Product Name (optional)</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="e.g. XYZ Pellets"
        />

        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Confirm End Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndOrderModal;
