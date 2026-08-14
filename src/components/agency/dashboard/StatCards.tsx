'use client';

//import Image from 'next/image';
import { getAgencyData } from '@/lib/agency/getAgencyData';
import ChartWave from './ChartWave';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import WifiTetheringSharpIcon from '@mui/icons-material/WifiTetheringSharp';

type Props = {
  agencyId: string;
};

export default function StatCards({ agencyId }: Props) {
  const { bookings, income } = getAgencyData(agencyId);

  const totalBookings = bookings.reduce((sum, item) => sum + item.total_price, 0);
  const revenue = income.reduce((sum, item) => sum + item.amount, 0);
  const totalCustomers = bookings.length;

  const stat = [
    {
      label: 'Total Bookings',
      amount: `Rs ${totalBookings.toLocaleString()}`,
      icon: <CalendarMonthIcon />,
      iconBg: 'bg-[#DAEBFF]',
      color: '#0088FF',
      iconColor: 'text-[#0088FF]',
      gradientColor1: '#436CCC',
      gradientColor2: '#2282FF',
      sub: 18.2,
      comparison: 'VS last 30 days',
    },
    {
      label: 'Revenue (This month)',
      amount: `Rs ${revenue.toLocaleString()}`,
      icon: <AttachMoneyIcon />,
      iconBg: 'bg-[#E8FDE6]',
      color: '#34C759',
      iconColor: 'text-[#34C759]',
      gradientColor1: '#43CC55',
      gradientColor2: '#56FF22',
      sub: 12.2,
      comparison: 'VS last month',
    },
    {
      label: 'Total Customers',
      amount: totalCustomers,
      icon: <GroupIcon />,
      iconBg: 'bg-[#E1E3FB]',
      color: '#6155F5',
      iconColor: 'text-[#6155F5]',
      gradientColor1: '#5143CC',
      gradientColor2: '#485BFF',
      sub: 4.8,
      comparison: 'VS last 30 days',
    },
    {
      label: 'Active Treks',
      amount: 1,
      icon: <WifiTetheringSharpIcon />,
      iconBg: 'bg-[#FBFFDC]',
      color: '#FDA31C',
      iconColor: 'text-[#FDA31C]',
      gradientColor1: '#F1ED18',
      gradientColor2: '#FEC817',
      sub: 4.8,
      comparison: 'Live on trails',
    },
  ];

  return (
    <section className="w-full mt-2 grid gap-8 grid-cols-[repeat(4,minmax(260px,1fr))] xl:grid-cols-4 overflow-x-auto scrollbar-hide">
      {stat.map((item) => {
        return (
          <div
            key={item.label}
            className="flex w-full min-w-0 items-center justify-between gap-x-4 rounded-lg bg-white p-2.5 shadow-sm"
          >
            <div className="min-w-0 flex flex-col gap-y-2 whitespace-nowrap py-1.5">
              <h3 className="text-xs font-semibold">{item.label}</h3>
              <p className="text-sm font-semibold">{item.amount}</p>
              <p className="text-xs font-semibold text-[#34C759]">
                <span>
                  <PlayArrowIcon className="m-[-4px]" sx={{ transform: 'rotate(270deg)' }} />
                </span>
                {`${item.sub}%`}
              </p>
              <p className="text-[9.5px] font-medium">{item.comparison}</p>
            </div>
            <div className="flex flex-col">
              <div
                className={`flex h-9 w-9 items-center justify-center self-end rounded-full ${item.iconBg} ${item.iconColor}`}
              >
                {item.icon}
              </div>
              <ChartWave color={item.color} gradient={[item.gradientColor1, item.gradientColor2]} />
            </div>
          </div>
        );
      })}
    </section>
  );
}
