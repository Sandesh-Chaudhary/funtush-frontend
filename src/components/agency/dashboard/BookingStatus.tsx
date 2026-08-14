'use client';

import { useState } from 'react';
import { PieChart, Pie, Tooltip, Label, Cell } from 'recharts';
import { getAgencyData } from '@/lib/agency/getAgencyData';

type Props = {
  agencyId: string;
};

type BookingStatusType = {
  created_at: string;
  status: string;
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getBookingsByMonth = (month: number, data: BookingStatusType[]) => {
  return data.filter((booking) => {
    const bookingMonth = new Date(booking.created_at).getMonth();
    return bookingMonth === month;
  });
};

export default function BookingStatus({ agencyId }: Props) {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[currentMonth]);
  const month = MONTHS.indexOf(selectedMonth);
  const monthArr = MONTHS.slice(0, currentMonth + 1);

  const { bookings } = getAgencyData(agencyId);
  const bookingsByMonth = getBookingsByMonth(month, bookings);

  const bookingStatus = [
    { name: 'confirmed', count: bookingsByMonth.filter((booking) => booking.status === 'confirmed').length },
    {
      name: 'pending',
      count: bookingsByMonth.filter(
        (booking) => booking.status !== 'confirmed' && booking.status !== 'cancelled' && booking.status !== 'completed'
      ).length,
    },
    { name: 'cancelled', count: bookingsByMonth.filter((booking) => booking.status === 'cancelled').length },
    { name: 'completed', count: bookingsByMonth.filter((booking) => booking.status === 'completed').length },
  ];

  const totalBookings = bookingStatus.reduce((total, item) => total + item.count, 0);

  return (
    <section className="min-w-0 min-h-0 flex flex-col gap-2 p-5 rounded-sm bg-white shadow-sm">
      <div className="flex item-center justify-between">
        <h3 className="text-sm font-semibold">Booking Status</h3>
        <label htmlFor="months"></label>
        <select
          name="months"
          id="months"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="text-[10px] border border-neutral-100 rounded p-1 gap-2 outline-none hover:text-red-700 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500"
        >
          {monthArr.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-center justify-between whitespace-nowrap md:flex-row">
        <PieChart width={180} height={240}>
          <Pie data={bookingStatus} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80}>
            {bookingStatus.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={['#0088FF', '#FF2D55', '#FFCC00', '#00C8B3'][index % 4]} />
            ))}

            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} dy="-5" fontSize="24" fontWeight="bold">
                        {totalBookings}
                      </tspan>
                      <tspan x={viewBox.cx} dy="20" fontSize="12">
                        Total
                      </tspan>
                    </text>
                  );
                }

                return null;
              }}
            />
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Custom Legend */}
        <div className="flex flex-col gap-y-8 justify-center">
          {bookingStatus.map((item, index) => {
            const percentage = totalBookings ? Math.round((item.count / totalBookings) * 100) : 0;

            return (
              <div key={item.name} className="flex items-center gap-2">
                {/* Circle */}
                <span
                  className="h-4 w-4 rounded-full"
                  style={{
                    backgroundColor: ['#0088FF', '#FF2D55', '#FFCC00', '#00C8B3'][index % 4],
                  }}
                />

                {/* Text */}
                <span className="text-xs font-semibold">
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)} <span className="pl-4"></span>
                  {item.count} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
