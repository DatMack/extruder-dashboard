import React from 'react';
import { useSubmissions } from '../context/useSubmissions';

const ShiftHistory: React.FC = () => {
  const { shiftLogs } = useSubmissions();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shift History</h1>
      {shiftLogs.map((shift, index) => (
        <div key={index} className="mb-6 border rounded shadow p-4 bg-white">
          <div className="font-semibold mb-2">
            Lot #: {shift.lotNumber} | Product: {shift.productName} | Date: {shift.date} | Shift: {shift.shift}
          </div>
          <div className="overflow-auto">
            <table className="table-auto w-full text-sm border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-1">Time</th>
                  <th className="border px-2 py-1">Operator</th>
                  <th className="border px-2 py-1">Date</th>
                  {shift.entries.length > 0 &&
                    Object.keys(shift.entries[0].values).map((key) => (
                      <th key={key} className="border px-2 py-1">{key}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {shift.entries.map((entry, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1">{entry.timestamp}</td>
                    <td className="border px-2 py-1">{entry.operator}</td>
                    <td className="border px-2 py-1">{entry.date}</td>
                    {Object.values(entry.values).map((val, j) => (
                      <td key={j} className="border px-2 py-1">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShiftHistory;