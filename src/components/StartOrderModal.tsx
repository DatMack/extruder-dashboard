;import React, { useState } from 'react';

interface StartOrderModalProps {
  onClose: () => void;
  onConfirm?: (data: { lotNumber: string; productName: string }) => void;
}

const StartOrderModal: React.FC<StartOrderModalProps> = ({ onClose, onConfirm }) => {
  const [lotNumber, setLotNumber] = useState('');
  const [productName, setProductName] = useState('');
  const [showPreCheck, setShowPreCheck] = useState(false);

  const handleStart = () => {
    if (!lotNumber || !productName) {
      alert('Please fill in all fields.');
      return;
    }
    setShowPreCheck(true);
  };

  const handlePreCheckComplete = () => {
    onConfirm?.({ lotNumber, productName });
    onClose();
  };

  return (
    <>
      {!showPreCheck ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Start Order</h2>

            <label className="block mb-1 font-medium">Lot Number</label>
            <input
              type="text"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="e.g. LOT-001"
            />

            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="e.g. ABC Pellets"
            />

            <div className="flex justify-between mt-6">
              <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
                Cancel
              </button>
              <button
                onClick={handleStart}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : (
        <PreStartCheckModal onConfirm={handlePreCheckComplete} onCancel={onClose} />
      )}
    </>
  );
};

export default StartOrderModal;

import PreStartCheckModal from './PreStartCheckModal';