
'use client';
import { useState } from 'react';
interface Props {
  slots: string[];
  onSelect: (slot: string) => void;
  unavailableSlots?: Set<string>;
}

const TimeSlotPicker = ({ slots, onSelect, unavailableSlots = new Set() }: Props) => {
  const [selectedSlot, setSelectedSlot] = useState('');

  const grouped = {
    Morning: slots.filter((s) => parseInt(s.split(':')[0]) < 13),
    Evening: slots.filter((s) => parseInt(s.split(':')[0]) >= 14),
  };

  return (
    <div className="space-y-4 mt-2">
      {Object.entries(grouped).map(([label, groupSlots]) => (
        <div key={label}>
          <h4 className="text-sm font-medium mb-2">{label}</h4>
          <div className="flex flex-wrap gap-2">
            {groupSlots.length > 0 ? (
              groupSlots.map((slot) => {
                const isUnavailable = unavailableSlots.has(slot);
                return (
                  <button
                    key={slot}
                    onClick={() => {
                      if (!isUnavailable) {
                        setSelectedSlot(slot);
                        onSelect(slot);
                      }
                    }}
                    className={`px-4 py-2 rounded-lg text-sm border ${
                      isUnavailable
                        ? 'bg-red-100 text-red-500 cursor-not-allowed border-red-200'
                        : selectedSlot === slot
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white'
                    }`}
                    disabled={isUnavailable}
                  >
                    {slot}
                  </button>
                );
              })
            ) : (
              <p className="text-sm text-gray-400">No slots available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeSlotPicker;
