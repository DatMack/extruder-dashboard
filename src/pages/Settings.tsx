import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import LoginModal from '../components/LoginModal';

export default function Settings() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [operator, setOperator] = useState<string | null>(localStorage.getItem('operator'));

  if (!operator) {
    return (
      <LoginModal
        onLogin={(name) => {
          localStorage.setItem('operator', name);
          setOperator(name);
        }}
      />
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('operator');
    navigate('/');
    window.location.reload();
  };

  const weeklyData = [
    { period: 'Mon', weight: 1200 },
    { period: 'Tue', weight: 1500 },
    { period: 'Wed', weight: 1000 },
    { period: 'Thu', weight: 1400 },
    { period: 'Fri', weight: 1600 },
    { period: 'Sat', weight: 1800 },
    { period: 'Sun', weight: 1700 },
  ];

  const monthlyData = [
    { period: 'Week 1', weight: 5500 },
    { period: 'Week 2', weight: 6200 },
    { period: 'Week 3', weight: 5900 },
    { period: 'Week 4', weight: 6300 },
  ];

  const yearlyData = [
    { period: 'Jan', weight: 23000 },
    { period: 'Feb', weight: 21000 },
    { period: 'Mar', weight: 25000 },
    { period: 'Apr', weight: 27000 },
    { period: 'May', weight: 20000 },
  ];

  const getDayType = (date: Date) => {
    const start = new Date(2025, 4, 13); // May 13, 2025 — Yellow start day
    const diff = Math.floor((date.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const cycle = ['Y', 'Y', 'B', 'B', 'Y', 'Y', 'Y', 'B', 'B', 'Y', 'Y', 'B', 'B', 'B'];
    return cycle[diff % cycle.length];
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayType = getDayType(date);
      return dayType === 'Y' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700';
    }
    return '';
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Settings</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-semibold mb-4">User Info</h2>
          <div className="text-gray-800 font-medium text-lg">
            Logged in as: {operator}
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Log Out
          </button>
        </div>

        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-semibold mb-4">Weekly Production</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="weight" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-semibold mb-4">Monthly Production</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="weight" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-semibold mb-4">Yearly Production</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={yearlyData}>
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="weight" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow border mx-auto w-fit">
          <h2 className="text-xl font-semibold mb-4 text-center">Work Schedule</h2>
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={tileClassName}
          />
          <div className="mt-2 text-sm text-gray-600 text-center">
            Yellow = Team A / Blue = Team B
          </div>
        </div>
      </div>
    </div>
  );
}