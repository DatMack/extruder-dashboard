import { SubmissionContext } from './submissionContext';
import type { SubmissionData } from './submissionContext';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export const SubmissionProvider = ({ children }: { children: ReactNode }) => {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("shift-submissions");
    if (stored) {
      setSubmissions(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shift-submissions", JSON.stringify(submissions));
  }, [submissions]);

  const addSubmission = (submission: SubmissionData) => {
    if (submissions.length < 24) {
      setSubmissions(prev => [...prev, submission]);
    }
  };

  return (
    <SubmissionContext.Provider value={{ submissions, addSubmission }}>
      {children}
    </SubmissionContext.Provider>
  );
};