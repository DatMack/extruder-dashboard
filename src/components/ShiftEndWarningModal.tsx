import React from 'react';

interface Props {
  onClose: () => void;
}

const ShiftEndWarningModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4 text-red-600">⚠️ End-of-Shift Summary Incomplete</h2>
        <p className="mb-4 text-gray-700">
          Please complete the End-of-Shift Summary before the shift ends.
        </p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftEndWarningModal;
