import { useEffect, useState } from 'react';
import { sections } from '../utils/sections';
import SectionCard from '../components/SectionCard';

export default function Reports() {
  const [showEndShift, setShowEndShift] = useState(false);

  useEffect(() => {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const isEndOfShift =
      (minutes >= 1070 && minutes <= 1080) || // 17:50–18:00
      (minutes >= 350 && minutes <= 360);     // 05:50–06:00
    setShowEndShift(isEndOfShift);
  }, []);

  return (
    <div className="pt-4 px-4 pb-16">
      <h2 className="text-2xl font-bold text-center mb-6">📄 Shift Reports</h2>
      {sections
        .filter(
          (section) =>
            section.id !== 'end_shift_summary' ||
            (section.id === 'end_shift_summary' && showEndShift)
        )
        .map((section) => (
          <SectionCard
            key={section.id}
            section={{
              ...section,
              title: section.title.replace(/Supervisor/g, 'Team Lead'),
              fields: section.fields.map(field => ({
                ...field,
                label: field.label.replace(/Supervisor/g, 'Team Lead')
              }))
            }}
          />
        ))}
    </div>
  );
}