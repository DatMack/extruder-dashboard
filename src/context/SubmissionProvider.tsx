import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DowntimeLog {
  start: string;
  end: string;
  startupInfo?: string;
}

export interface DataEntry {
  timestamp: string;
  operator: string;
  date: string;
  values: Record<string, string>;
}

export interface ShiftLog {
  lotNumber: string;
  productName: string;
  operator: string;
  date: string;
  shift: 'Day' | 'Night';
  startTime: string;
  endTime: string;
  entries: DataEntry[];
  downtimes: DowntimeLog[];
}

interface SubmissionContextType {
  shiftLogs: ShiftLog[];
  currentShift: ShiftLog | null;
  addEntry: (entry: DataEntry) => void;
  startShift: (shift: Omit<ShiftLog, 'entries' | 'downtimes'>) => void;
  logDowntime: (downtime: DowntimeLog) => void;
  endShift: () => void;
}

export const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);

export const SubmissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shiftLogs, setShiftLogs] = useState<ShiftLog[]>([]);
  const [currentShift, setCurrentShift] = useState<ShiftLog | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('shiftLogs');
    if (stored) {
      setShiftLogs(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shiftLogs', JSON.stringify(shiftLogs));
  }, [shiftLogs]);

  const addEntry = (entry: DataEntry) => {
    if (!currentShift) return;
    const updated = {
      ...currentShift,
      entries: [...currentShift.entries, entry],
    };
    setCurrentShift(updated);
  };

  const logDowntime = (downtime: DowntimeLog) => {
    if (!currentShift) return;
    const updated = {
      ...currentShift,
      downtimes: [...currentShift.downtimes, downtime],
    };
    setCurrentShift(updated);
  };

  const startShift = (shift: Omit<ShiftLog, 'entries' | 'downtimes'>) => {
    const newShift: ShiftLog = {
      ...shift,
      entries: [],
      downtimes: [],
    };
    setCurrentShift(newShift);
  };

  const endShift = () => {
    if (currentShift) {
      setShiftLogs(prev => [...prev, currentShift]);
      setCurrentShift(null);
    }
  };

  return (
    <SubmissionContext.Provider value={{ shiftLogs, currentShift, addEntry, logDowntime, startShift, endShift }}>
      {children}
    </SubmissionContext.Provider>
  );
};