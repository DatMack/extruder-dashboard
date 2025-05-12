import React, { useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';

interface HeaderInfoProps {
  toggleSidebar: () => void;
  operator: string | null;
  orderInfo: {
    lotNumber: string;
    productName: string;
    startTime: string;
    startDate: string;
  } | null;
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({ toggleSidebar, operator, orderInfo }) => {
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
          <span>{orderInfo?.lotNumber || '(Not Set)'}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-semibold">Product Name</span>
          <span>{orderInfo?.productName || '(Not Set)'}</span>
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

export default HeaderInfo;