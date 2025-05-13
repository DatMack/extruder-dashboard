import { createContext } from 'react';

export interface SubmissionData {
  date: string;
  time: string;
  operator: string;
  lotNumber: string;
  product: string;
  reading: string;
  comments: string;
  dieType: string;
  knifeCount: string;
  screwType: string;
}

interface SubmissionContextType {
  submissions: SubmissionData[];
  addSubmission: (submission: SubmissionData) => void;
}

export const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);