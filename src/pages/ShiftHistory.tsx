import { useState } from 'react';

export default function ShiftHistory() {
  const [expandedShift, setExpandedShift] = useState<string | null>(null);

  const generateEntries = () => {
    const entries = [];
    const baseTime = new Date();
    baseTime.setHours(6, 30, 0, 0);

    for (let i = 0; i < 24; i++) {
      const time = new Date(baseTime.getTime() + i * 30 * 60000);
      entries.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        blended_bulk_density: `${30 + i % 3} g/L`,
        agitator_rpm: `${110 + i % 5}`,
        feed_rate_sp_cv: `${135 + i % 5} lbs/hr`,
        screw_speed: `${60 + i % 4} RPM`,
        extruder_speed: `${220 + i % 10} RPM`,
        motor_load: `${85 - i % 3}%`,
        sme: `${12 + i % 3}.5 kWhr/ton`,
        knife_speed: `${4500 + i * 10} RPM`,
        extruder_water_sp: `${30 + i % 2}%`,
        extruder_water_cv: `${28 + i % 3}%`,
        extruder_steam_sp: `${100 + i % 5} lbs/hr`,
        extruder_steam_cv: `${98 + i % 5} lbs/hr`,
        down_spout_temp: `${180 + i % 2}°F`,
        zone1_temp: `${185 + i % 2}°F`,
        zone2_temp: `${190 + i % 2}°F`,
        zone3_temp: `${195 + i % 2}°F`,
        die_temp: `${200 + i % 3}°F`,
        head_pressure: `${220 + i % 5} PSI`,
        retention_time: `${18 + i % 2} min`,
        dryer_zone1_temp: `${120 + i % 3}°F`,
        dryer_zone2_temp: `${125 + i % 2}°F`,
        dryer_zone3_temp: `${128 + i % 2}°F`,
        recirculation_fan1: `${80 + i % 3}%`,
        recirculation_fan2: `${75 + i % 3}%`,
        recirculation_fan3: `${70 + i % 2}%`,
        wet_density: `${680 + i % 5} g/L`,
        dry_density: `${650 + i % 5} g/L`,
        moisture_content: `${9 + i % 2}.5%`,
        diameter: `${5 + i % 2} mm`,
        length: `${10 + i % 3} mm`,
        height: `${3 + i % 2} mm`,
      });
    }
    return entries;
  };

  const fakeShiftLogs = [
    {
      shiftId: 'Shift-001',
      date: '2025-05-13',
      operator: 'John Doe',
      lot: 'LOT1234',
      product: 'Product X',
      entries: generateEntries(),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Shift History</h1>

      {fakeShiftLogs.map((shift) => (
        <div
          key={shift.shiftId}
          className="bg-white shadow-md rounded-lg mb-4 p-4 border border-gray-200"
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() =>
              setExpandedShift(
                expandedShift === shift.shiftId ? null : shift.shiftId
              )
            }
          >
            <div>
              <p className="font-semibold text-gray-700">
                {shift.date} — {shift.lot} — {shift.product}
              </p>
              <p className="text-sm text-gray-500">Operator: {shift.operator}</p>
            </div>
            <span className="text-blue-600">
              {expandedShift === shift.shiftId ? '▲ Collapse' : '▼ Expand'}
            </span>
          </div>

          {expandedShift === shift.shiftId && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-t border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-3 text-left">Time</th>
                    <th className="py-2 px-3 text-left">Blended Bulk Density</th>
                    <th className="py-2 px-3 text-left">Agitator RPM</th>
                    <th className="py-2 px-3 text-left">Feed Rate SP/CV</th>
                    <th className="py-2 px-3 text-left">Screw Speed</th>
                    <th className="py-2 px-3 text-left">Extruder Speed</th>
                    <th className="py-2 px-3 text-left">Motor Load</th>
                    <th className="py-2 px-3 text-left">SME</th>
                    <th className="py-2 px-3 text-left">Knife Speed</th>
                    <th className="py-2 px-3 text-left">Water SP</th>
                    <th className="py-2 px-3 text-left">Water Actual</th>
                    <th className="py-2 px-3 text-left">Steam SP</th>
                    <th className="py-2 px-3 text-left">Steam Actual</th>
                    <th className="py-2 px-3 text-left">Down Spout Temp</th>
                    <th className="py-2 px-3 text-left">Zone 1 Temp</th>
                    <th className="py-2 px-3 text-left">Zone 2 Temp</th>
                    <th className="py-2 px-3 text-left">Zone 3 Temp</th>
                    <th className="py-2 px-3 text-left">Die Temp</th>
                    <th className="py-2 px-3 text-left">Head Pressure</th>
                    <th className="py-2 px-3 text-left">Retention Time</th>
                    <th className="py-2 px-3 text-left">Dryer Zone 1</th>
                    <th className="py-2 px-3 text-left">Dryer Zone 2</th>
                    <th className="py-2 px-3 text-left">Dryer Zone 3</th>
                    <th className="py-2 px-3 text-left">Fan Zone 1</th>
                    <th className="py-2 px-3 text-left">Fan Zone 2</th>
                    <th className="py-2 px-3 text-left">Fan Zone 3</th>
                    <th className="py-2 px-3 text-left">Wet Density</th>
                    <th className="py-2 px-3 text-left">Dry Density</th>
                    <th className="py-2 px-3 text-left">Moisture %</th>
                    <th className="py-2 px-3 text-left">Diameter</th>
                    <th className="py-2 px-3 text-left">Length</th>
                    <th className="py-2 px-3 text-left">Height</th>
                  </tr>
                </thead>
                <tbody>
                  {shift.entries.map((entry, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      {Object.values(entry).map((val, j) => (
                        <td key={j} className="py-2 px-3">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
