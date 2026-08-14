'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import users from '@/../data/users.json';

import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const boxStyle = 'flex items-center gap-2 bg-white p-2 rounded-lg';
const selectionStyle = 'bg-white text-xs rounded-2xl p-1 hover:bg-[#dfeefb]';

export default function DashboardHeader() {
  const [isActive, setIsActive] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const updateDate = () => {
      setDate(new Date());
    };

    const timeout = setTimeout(updateDate, 1000);

    const interval = setInterval(updateDate, 60000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const user = users[0].name.split(' ')[0];

  const year = date?.getFullYear();
  const month = date?.getMonth();
  const day = date?.getDate();

  const time = date
    ? date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : '--:-- --';

  return (
    <section className="flex flex-col xl:flex-row gap-4 justify-between">
      <div className="font-[500]">
        <h1 className="text-2xl">Good Morning, {user}</h1>
        <p className="text-sm text-[#625B71]">Here’s What’s happening with your agency today.</p>
        <div>
          <p className="mt-2">
            Live Visitor: <span className="font-bold text-green-500">120</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Weather */}
        <div className={boxStyle}>
          <WbSunnyIcon sx={{ fontSize: '2rem' }} />

          <div>
            <p className="text-base">Kathmandu, Nepal</p>

            <p>
              <span className="text-base font-semibold">27°C</span>{' '}
              <span className="text-xs text-[#625B71]">Sunny</span>
            </p>
          </div>
        </div>

        {/* Time */}
        <div className={boxStyle}>
          <AccessTimeIcon sx={{ fontSize: '2rem' }} />

          <div>
            <p className="text-base font-semibold">{time}</p>

            <p className="text-xs font-[500] text-[#525050]">
              {date ? `${MONTHS[month!]} ${day}, ${year}` : 'Loading...'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="relative ml-auto">
          <button
            onClick={() => setIsActive(!isActive)}
            className="bg-[#0088FF] text-xs text-white font-[500] p-3 rounded-lg"
          >
            Quick Actions
            <KeyboardArrowDownIcon />
          </button>

          {isActive && (
            <div className="absolute right-0 top-full mt-2 p-3 rounded-sm shadow-sm flex flex-col justify-center gap-2 whitespace-nowrap bg-[#8ec7ee]">
              <Link href="/dashboard/packages/new" className={selectionStyle}>
                <AddIcon sx={{ fontSize: 20 }} />
                New Package
              </Link>

              <Link href="/dashboard/blog/new" className={selectionStyle}>
                <AddIcon sx={{ fontSize: 20 }} />
                New Blog
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
