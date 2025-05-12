import type { SectionConfig } from '../types/section';

const isEndOfShift = () => {
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const dayShiftEnd = totalMinutes >= 1050 && totalMinutes < 1080; // 17:30–18:00
  const nightShiftEnd = totalMinutes >= 330 && totalMinutes < 360; // 05:30–06:00
  return dayShiftEnd || nightShiftEnd;
};

export const sections: SectionConfig[] = [
  {
    id: 'feeder',
    title: 'Feeder',
    fields: [
      { id: 'blended_bulk_density', label: 'Blended Bulk Density', unit: 'g/L', type: 'number' },
      { id: 'agitator_rpm', label: 'Horizontal Agitator RPM', type: 'number' },
      { id: 'feed_rate_sp_cv', label: 'Feed Rate – SP / CV', unit: 'lbs/hr', type: 'number' },
      { id: 'screw_speed', label: 'Feeder Screw Speed', unit: 'RPM', type: 'number' },
    ],
  },
  {
    id: 'pre_conditioner',
    title: 'Pre-Conditioner',
    fields: [
      { id: 'cylinder_water_sp', label: 'Cylinder Water – Set Point', unit: '%', type: 'number' },
      { id: 'cylinder_water_cv', label: 'Cylinder Water – Current Value', unit: '%', type: 'number' },
      { id: 'steam_sp', label: 'Steam – Set Point', unit: 'lbs/hr', type: 'number' },
      { id: 'steam_cv', label: 'Steam – Current Value', unit: 'lbs/hr', type: 'number' },
    ],
  },
  {
    id: 'extruder',
    title: 'Extruder',
    fields: [
      { id: 'extruder_speed', label: 'Extruder Speed', unit: 'RPM', type: 'number' },
      { id: 'motor_load', label: 'Motor Load', unit: '%', type: 'number' },
      { id: 'sme', label: 'SME', unit: 'kWhr/ton', type: 'number' },
      { id: 'knife_speed', label: 'Knife Speed', unit: 'RPM', type: 'number' },
      { id: 'extruder_water_sp', label: 'Water – Set Point', unit: '%', type: 'number' },
      { id: 'extruder_water_cv', label: 'Water – Actual', unit: '%', type: 'number' },
      { id: 'extruder_steam_sp', label: 'Steam – Set Point', unit: 'lbs/hr', type: 'number' },
      { id: 'extruder_steam_cv', label: 'Steam – Actual', unit: 'lbs/hr', type: 'number' },
      { id: 'down_spout_temp', label: 'Down Spout Temperature', unit: '°F', type: 'number' },
      { id: 'zone1_temp', label: 'Zone 1 Temperature', unit: '°F', type: 'number' },
      { id: 'zone2_temp', label: 'Zone 2 Temperature', unit: '°F', type: 'number' },
      { id: 'zone3_temp', label: 'Zone 3 Temperature', unit: '°F', type: 'number' },
      { id: 'die_temp', label: 'Die Temperature', unit: '°F', type: 'number' },
      { id: 'head_pressure', label: 'Head Pressure', unit: 'PSI', type: 'number' },
    ],
  },
  {
    id: 'dryer',
    title: 'Dryer',
    fields: [
      { id: 'retention_time', label: 'Retention Time', unit: 'minutes', type: 'number' },
      { id: 'dryer_zone1_temp', label: 'Zone 1 Temperature', unit: '°F', type: 'number' },
      { id: 'dryer_zone2_temp', label: 'Zone 2 Temperature', unit: '°F', type: 'number' },
      { id: 'dryer_zone3_temp', label: 'Zone 3 Temperature', unit: '°F', type: 'number' },
      { id: 'recirculation_fan1', label: 'Recirculation Fan Speed – Zone 1', unit: '%', type: 'number' },
      { id: 'recirculation_fan2', label: 'Recirculation Fan Speed – Zone 2', unit: '%', type: 'number' },
      { id: 'recirculation_fan3', label: 'Recirculation Fan Speed – Zone 3', unit: '%', type: 'number' },
    ],
  },
  {
    id: 'product_characteristics',
    title: 'Product Characteristics',
    fields: [
      { id: 'wet_density', label: 'Wet Density', unit: 'g/L', type: 'number' },
      { id: 'dry_density', label: 'Dry Density', unit: 'g/L', type: 'number' },
      { id: 'moisture_content', label: 'Moisture Content', unit: '%', type: 'number' },
      { id: 'diameter', label: 'Diameter', unit: 'mm', type: 'number' },
      { id: 'length', label: 'Length', unit: 'mm', type: 'number' },
      { id: 'height', label: 'Height', unit: 'mm', type: 'number' },
    ],
  },
  {
    id: 'end_shift_summary',
    title: 'End-of-Shift Summary',
    condition: isEndOfShift,
    fields: [
      { id: 'total_pounds_run', label: 'Total Pounds Run', unit: 'lbs', type: 'number' },
      { id: 'last_tote_batch', label: 'Last Tote & Batch Info', type: 'text' },
      { id: 'scrap_regrind', label: 'Scrap & Regrind Run', unit: 'lbs', type: 'number' },
      { id: 'totes_on_hold', label: 'Totes on Hold (and reasons)', type: 'text' },
      { id: 'supervisor_notes', label: 'Supervisor Notes', type: 'text' },
      { id: 'supervisor_signature', label: 'Supervisor Signature', type: 'text' },
    ],
  },
];