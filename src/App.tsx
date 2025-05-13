import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import ShiftHistory from './pages/ShiftHistory';
import Settings from './pages/Settings';
import HeaderInfo from './components/HeaderInfo';
import LoginModal from './components/LoginModal';
import StartOrderModal from './components/StartOrderModal';
import EndOrderModal from './components/EndOrderModal';
import ShutdownModal from './components/ShutdownModal';
import ResumeStartupModal from './components/StartUpModal';
import EndShiftModal from './components/EndShiftModal';
import ShiftEndWarningModal from './components/ShiftEndWarningModal';
import { useSubmissions } from './context/useSubmissions';
import { sections } from './utils/sections';

export default function App() {
  const [operator, setOperator] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [startOrder, setStartOrder] = useState(false);
  const [endOrder, setEndOrder] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [shutdownModalOpen, setShutdownModalOpen] = useState(false);
  const [resumeOrder, setResumeOrder] = useState(false);
  const [showEndShiftModal, setShowEndShiftModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const location = useLocation();

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

  if (!operator) return <LoginModal onLogin={setOperator} />;

  return (
    <div className="min-h-screen bg-gray-100 pt-32 px-6 overflow-x-hidden">
      <HeaderInfo toggleSidebar={() => setSidebarOpen(!sidebarOpen)} operator={operator} />

      {/* Animated Sidebar */}
      <div
        className={`fixed inset-0 z-40 transition duration-300 ${
          sidebarOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <ul className="space-y-2">
              <li><Link to="/" onClick={() => setSidebarOpen(false)} className="block px-3 py-2 hover:bg-gray-100">Home</Link></li>
              <li><Link to="/shift-history" onClick={() => setSidebarOpen(false)} className="block px-3 py-2 hover:bg-gray-100">Shift History</Link></li>
              <li><Link to="/reports" onClick={() => setSidebarOpen(false)} className="block px-3 py-2 hover:bg-gray-100">Reports</Link></li>
              <li><Link to="/settings" onClick={() => setSidebarOpen(false)} className="block px-3 py-2 hover:bg-gray-100">Settings</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shift-history" element={<ShiftHistory />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {location.pathname === '/reports' && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-300 flex justify-around items-center p-4 shadow-md">
          <button className="w-full max-w-xs mx-2 bg-blue-600 text-white py-3 rounded hover:bg-blue-700" onClick={() => setStartOrder(true)} disabled={shutdown && !resumeOrder}>Start Order</button>
          <button className="w-full max-w-xs mx-2 bg-green-600 text-white py-3 rounded hover:bg-green-700" onClick={() => setEndOrder(true)} disabled={shutdown && !resumeOrder}>End Order</button>
          {!shutdown && (
            <button className="w-full max-w-xs mx-2 bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600" onClick={() => setShutdownModalOpen(true)}>Shutdown</button>
          )}
          {shutdown && (
            <button className="w-full max-w-xs mx-2 bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700" onClick={() => setResumeOrder(true)}>Resume Order</button>
          )}
          <button className="w-full max-w-xs mx-2 bg-gray-800 text-white py-3 rounded hover:bg-gray-900" onClick={() => alert('Submitting Data...')} disabled={shutdown && !resumeOrder}>Submit Entry</button>
          <button className="w-full max-w-xs mx-2 bg-black text-white py-3 rounded hover:bg-gray-800" onClick={() => setShowEndShiftModal(true)} disabled={shutdown && !resumeOrder}>End Shift</button>
        </div>
      )}

      {showEndShiftModal && <EndShiftModal onClose={() => setShowEndShiftModal(false)} />}
      {showWarning && <ShiftEndWarningModal onClose={() => setShowWarning(false)} />}
      {startOrder && <StartOrderModal onClose={() => setStartOrder(false)} />}
      {endOrder && <EndOrderModal onClose={() => setEndOrder(false)} />}
      {shutdownModalOpen && <ShutdownModal onClose={() => setShutdownModalOpen(false)} onConfirm={() => { setShutdown(true); setShutdownModalOpen(false); }} />}
      {resumeOrder && <ResumeStartupModal onClose={() => { setResumeOrder(false); setShutdown(false); }} />}
    </div>
  );
}
