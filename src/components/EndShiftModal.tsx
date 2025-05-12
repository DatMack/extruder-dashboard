import { useEffect, useState } from 'react';

interface EndShiftModalProps {
  isForcedOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, string>) => void;
}

export default function EndShiftModal({ isForcedOpen, onClose, onSubmit }: EndShiftModalProps) {
  const [fields, setFields] = useState({
    totalPounds: '',
    lastTote: '',
    scrapRegrind: '',
    totesOnHold: '',
    holdReasons: '',
    teamLeadNotes: '',
    teamLeadSignature: ''
  });

  const isLast30Min = () => {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    return (minutes >= 1050 && minutes <= 1080) || (minutes >= 330 && minutes <= 360);
  };

  const isLast10Min = () => {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    return (minutes >= 1070 && minutes <= 1080) || (minutes >= 350 && minutes <= 360);
  };

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isForcedOpen || isLast10Min()) {
      setShow(true);
    } else if (isLast30Min()) {
      setShow(false);
    }
  }, [isForcedOpen]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(fields);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
  className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center overflow-hidden"
  onMouseDown={() => {
    if (!isForcedOpen) {
      setShow(false);
      onClose();
    }
  }}
>
     <div
  className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200"
  onMouseDown={(e) => e.stopPropagation()}
>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">End of Shift Summary</h2>

        <div className="space-y-4">
          {Object.entries(fields).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              {key === 'teamLeadNotes' ? (
                <textarea
                  name={key}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  value={value}
                  onChange={handleChange}
                />
              ) : (
                <input
                  name={key}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={value}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => {
              setShow(false);
              onClose();
            }}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!isLast30Min()}
          >
            Submit
          </button>
        </div>

        {!isLast30Min() && (
          <p className="text-sm text-red-600 mt-4 text-center">
            You may only submit during the last 30 minutes of the shift.
          </p>
        )}
      </div>
    </div>
  );
}