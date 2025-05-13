import { useEffect, useState } from 'react';
import ShiftEndWarningModal from './components/ShiftEndWarningModal';
import { HiMenu } from 'react-icons/hi';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ShiftHistory from './pages/ShiftHistory';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import LoginModal from './components/LoginModal';
import StartOrderModal from './components/StartOrderModal';
import EndOrderModal from './components/EndOrderModal';
import ShutdownModal from './components/ShutdownModal';
import ResumeStartModal from './components/ResumeStartModal';
import EndShiftModal from './components/EndShiftModal';
import { useSubmissions } from './context/useSubmissions';
import { sections } from './utils/sections';

const HeaderInfo = ({ toggleSidebar, operator }: { toggleSidebar: () => void; operator: string | null }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-4 py-2 bg-white shadow border-b fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center text-sm text-gray-700">
        <button onClick={toggleSidebar} className="text-2xl p-2 mr-4">
          <HiMenu />
        </button>
        <div className="flex flex-col items-start">
          <span className="font-semibold">Lot Number</span>
          <span>(Auto-filled)</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-semibold">Product Name</span>
          <span>(Auto-filled)</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-semibold">Time</span>
          <span>{time.toLocaleTimeString()}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-semibold">Date</span>
          <span>{time.toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-semibold">Operator</span>
          <span>{operator || '(Pending Login)'}</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [operator, setOperator] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showShutdownModal, setShowShutdownModal] = useState(false);
  const [isShutdown, setIsShutdown] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showEndShiftModal, setShowEndShiftModal] = useState(false);
  const location = useLocation();
  const { submitCompleteEntry } = useSubmissions();

  useEffect(() => {
    const checkWarning = () => {
      const now = new Date();
      const totalMinutes = now.getHours() * 60 + now.getMinutes();
      const dayWarn = totalMinutes >= 1070 && totalMinutes < 1080;
      const nightWarn = totalMinutes >= 350 && totalMinutes < 360;
      const warningWindow = dayWarn || nightWarn;

      if (!warningWindow) return;

      const endSection = sections.find(s => s.id === 'end_shift_summary');
      const anyEmpty = endSection?.fields.some(field => {
        const el = document.getElementById(field.id) as HTMLInputElement;
        return !el || el.value.trim() === '';
      });

      if (anyEmpty) {
        setShowWarning(true);
      }
    };

    const interval = setInterval(checkWarning, 60000);
    checkWarning();
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    const values: Record<string, string> = {};
    sections.forEach((section) => {
      if (section.id === 'end_shift_summary') return;
      section.fields.forEach((field) => {
        const el = document.getElementById(field.id) as HTMLInputElement | null;
        if (el) values[field.id] = el.value;
      });
    });
    submitCompleteEntry(values, operator || 'Unknown');
  };

  if (!operator) {
    return <LoginModal onLogin={(name) => setOperator(name)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-32 px-6">
      <HeaderInfo toggleSidebar={() => setSidebarOpen(!sidebarOpen)} operator={operator} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shift-history" element={<ShiftHistory />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {showWarning && <ShiftEndWarningModal onClose={() => setShowWarning(false)} />}
      {showStartModal && <StartOrderModal onClose={() => setShowStartModal(false)} />}
      {showEndModal && <EndOrderModal onClose={() => setShowEndModal(false)} />}
      {showShutdownModal && (
        <ShutdownModal
          onClose={() => setShowShutdownModal(false)}
          onConfirm={({ reason, startTime }) => {
            console.log('Shutdown reason:', reason);
            console.log('Started at:', startTime);
            setIsShutdown(true);
            setShowShutdownModal(false);
          }}
        />
      )}
      {showResumeModal && (
        <ResumeStartModal
          onClose={() => setShowResumeModal(false)}
          onConfirm={(data) => {
            console.log('Resume with startup values:', data);
            setIsShutdown(false);
            setShowResumeModal(false);
          }}
        />
      )}
      {showEndShiftModal && (
        <EndShiftModal
          onClose={() => setShowEndShiftModal(false)}
          onConfirm={(data) => {
            console.log('End Shift Data:', data);
            setShowEndShiftModal(false);
          }}
        />
      )}

      {location.pathname === '/reports' && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-300 flex flex-wrap justify-around items-center p-4 shadow-md">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => setShowStartModal(true)}>
            Start Order
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" onClick={() => setShowEndModal(true)}>
            End Order
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => setShowShutdownModal(true)}>
            Shutdown
          </button>
          {isShutdown && (
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" onClick={() => setShowResumeModal(true)}>
              Resume Order
            </button>
          )}
          <button
            id="submit-data-button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Entry
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => setShowEndShiftModal(true)}
          >
            End Shift
          </button>
        </div>
      )}
    </div>
  );
} 