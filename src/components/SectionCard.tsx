import React, { useEffect, useState } from 'react';
import type { SectionConfig } from '../types/section';

interface Props {
  section: SectionConfig;
}

const SectionCard: React.FC<Props> = ({ section }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 max-w-3xl w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">{section.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {section.fields.map((field) => (
            <div key={field.id} className="flex flex-col">
                <input
                id={field.id}
                name={field.id}
                type="number"
                inputMode="decimal"
                pattern="[0-9]*"
                placeholder={`${field.label}${field.unit ? ` (${field.unit})` : ''}`}
                className="appearance-none border border-gray-300 rounded px-3 py-2 focus:outline-none text-black bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
