import React, { useState, useEffect } from 'react';

interface StartOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lotNumber: string, productName: string, time: string, date: string) => void;
}

const StartOrderModal: React.FC<StartOrderModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [lotNumber, setLotNumber] = useState('');
  const [productName, setProductName] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setDate(now.toLocaleDateString());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Start New Order</h2>
        <div className="mb-4">
          <label className="block mb-1">Lot Number</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={lotNumber}
            onChange={(e) => setLotNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Product Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Date:</strong> {date}</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(lotNumber, productName, time, date)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Start Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartOrderModal;
