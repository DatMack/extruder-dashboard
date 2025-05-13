import { useContext } from 'react';
import { SubmissionContext } from './SubmissionProvider';

export const useSubmissions = () => {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error('useSubmissions must be used within SubmissionProvider');
  }

  const submitCompleteEntry = (values: Record<string, string>, operator: string) => {
    const allFilled = Object.values(values).every((val) => val.trim() !== '');
    if (!allFilled) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    const now = new Date();
    const newEntry = {
      timestamp: now.toLocaleTimeString(),
      operator,
      date: now.toLocaleDateString(),
      values,
    };

    context.addEntry(newEntry);
  };

  return {
    ...context,
    submitCompleteEntry,
  };
};