// src/data/logEntries.ts

export type LogEntry = {
  timestamp: string;
  operator: string;
  feedRate: string;
  screws: string;
  water: string;
  knives: string;
  steam?: string;
  precon?: {
    water?: string;
    steam?: string;
    upperDwell?: string;
    lowerDwell?: string;
  };
};

type LogStore = {
  [lot_product: string]: LogEntry[];
};

let logEntries: LogStore = {};

export const getLogEntries = () => logEntries;

export const addLogEntry = (lot: string, product: string, entry: LogEntry) => {
  const key = `${lot}_${product}`;
  if (!logEntries[key]) {
    logEntries[key] = [];
  }
  logEntries[key].push(entry);
};

export const clearLogEntries = () => {
  logEntries = {};
};