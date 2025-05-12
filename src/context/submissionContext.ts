import { createContext, useContext } from 'react';

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

export const useSubmissions = () => {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error('useSubmissions must be used within a SubmissionProvider');
  }
  return context;
};