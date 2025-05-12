import { useEffect, useState } from 'react';
import { useLocation, Routes, Route, NavLink } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import Home from './pages/Home';
import ShiftHistory from './pages/ShiftHistory';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import ShiftEndWarningModal from './components/ShiftEndWarningModal';
import LoginModal from './components/LoginModal';
import EndShiftModal from './components/EndShiftModal';

const HeaderInfo = ({
  toggleSidebar,
  operator,
}: {
  toggleSidebar: () => void;
  operator: string | null;
}) => {
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
  const [showEndShiftModal, setShowEndShiftModal] = useState(false);
  const [wasForcedClosed, setWasForcedClosed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const checkWarning = () => {
      const now = new Date();
      const totalMinutes = now.getHours() * 60 + now.getMinutes();
      const dayWarn = totalMinutes >= 1070 && totalMinutes < 1080;
      const nightWarn = totalMinutes >= 350 && totalMinutes < 360;
      const warningWindow = dayWarn || nightWarn;

      if (!warningWindow) return;
      setShowWarning(true);
    };

    const interval = setInterval(checkWarning, 60000);
    checkWarning();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!wasForcedClosed) return;

    const interval = setInterval(() => {
      const now = new Date();
      const totalMinutes = now.getHours() * 60 + now.getMinutes();
      const isLast10Min =
        (totalMinutes >= 1070 && totalMinutes <= 1080) ||
        (totalMinutes >= 350 && totalMinutes <= 360);

      if (isLast10Min) {
        setShowEndShiftModal(true);
        setWasForcedClosed(false);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [wasForcedClosed]);

  if (!operator) {
    return <LoginModal onLogin={(name) => setOperator(name)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-32 px-6">
      <HeaderInfo toggleSidebar={() => setSidebarOpen(!sidebarOpen)} operator={operator} />

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Start Order
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          End Order
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Home onLogout={() => setOperator(null)} />} />
        <Route path="/shift-history" element={<ShiftHistory />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {showWarning && (
        <ShiftEndWarningModal onClose={() => setShowWarning(false)} />
      )}

      <EndShiftModal
        isForcedOpen={showWarning || showEndShiftModal}
        onClose={() => {
          setShowEndShiftModal(false);
          if (showWarning) setWasForcedClosed(true);
        }}
        onSubmit={(data) => {
          console.log('End shift data submitted:', data);
          setShowWarning(false);
          setShowEndShiftModal(false);
        }}
      />

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-300 flex justify-around items-center p-4 shadow-md">
        <button className="w-full max-w-xs mx-2 bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Submit Data
        </button>
        <button className="w-full max-w-xs mx-2 bg-red-600 text-white py-3 rounded hover:bg-red-700">
          Shutdown
        </button>
        <button
          className="w-full max-w-xs mx-2 bg-yellow-600 text-white py-3 rounded hover:bg-yellow-700"
          onClick={() => setShowEndShiftModal(true)}
        >
          End Shift
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-4 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-bold mb-4">Navigation</h2>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block p-2 rounded hover:bg-gray-100 ${
                  isActive ? 'bg-gray-200 font-semibold' : ''
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shift-history"
              className={({ isActive }) =>
                `block p-2 rounded hover:bg-gray-100 ${
                  isActive ? 'bg-gray-200 font-semibold' : ''
                }`
              }
            >
              Shift History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `block p-2 rounded hover:bg-gray-100 ${
                  isActive ? 'bg-gray-200 font-semibold' : ''
                }`
              }
            >
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `block p-2 rounded hover:bg-gray-100 ${
                  isActive ? 'bg-gray-200 font-semibold' : ''
                }`
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}