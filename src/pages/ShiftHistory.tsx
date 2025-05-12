import { useState } from 'react';
import { useSubmissions } from '../context/useSubmissions';

const ShiftHistory = () => {
  const { submissions } = useSubmissions();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📋 Shift History</h1>

      {submissions.length === 0 && (
        <p className="text-gray-600">No entries logged yet.</p>
      )}

      {submissions.map((entry, index) => (
        <div
          key={index}
          className="mb-4 border border-gray-300 rounded-md overflow-hidden"
        >
          {/* Collapsed View */}
          <div
            className="bg-gray-100 px-4 py-2 font-semibold cursor-pointer hover:bg-gray-200 transition"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            {entry.lotNumber} – {entry.product} @ {entry.time} on {entry.date}
          </div>

          {/* Expanded View */}
          {expandedIndex === index && (
            <div className="bg-white px-4 py-3 text-sm space-y-2">
              <p><strong>Operator:</strong> {entry.operator}</p>
              <p><strong>Reading:</strong> {entry.reading}</p>
              <p><strong>Comments:</strong> {entry.comments || 'N/A'}</p>
              <p><strong>Die Type:</strong> {entry.dieType || 'N/A'}</p>
              <p><strong>Knife Count:</strong> {entry.knifeCount || 'N/A'}</p>
              <p><strong>Screw Type:</strong> {entry.screwType || 'N/A'}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShiftHistory;