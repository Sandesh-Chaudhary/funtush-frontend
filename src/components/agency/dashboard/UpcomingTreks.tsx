'use client';

import { getAgencyData } from '@/lib/agency/getAgencyData';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  agencyId: string;
};

const statusStyles = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  published: 'bg-red-100 text-red-700',
  available: 'bg-blue-100 text-blue-700',
};

export default function UpcomingTreks({ agencyId }: Props) {
  const { bookings, packages } = getAgencyData(agencyId);

  const departure = [...bookings].sort(
    (a, b) => new Date(a.departure_date).getTime() - new Date(b.departure_date).getTime()
  );

  const upcomingDepartureArr = departure
    .map((booking) => {
      const pkg = packages.find((pkg) => pkg.id === booking.package_id);
      const bookedSeats = (pkg?.group_size_max ?? 0) - (pkg?.available_slots ?? 0);

      const startDate = new Date(booking?.departure_date || '');
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + (pkg?.duration_days ?? 0));

      const formatDate = (date: Date, includeYear = false) =>
        date.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          ...(includeYear && { year: 'numeric' }),
        });

      return {
        id: booking.id,
        packageName: pkg?.title,
        duration: `${formatDate(startDate)} - ${formatDate(endDate, true)}`,
        currentSeats: `${bookedSeats}/${pkg?.group_size_max}`,
        status: pkg?.status,
        image: pkg?.image,
      };
    })
    .slice(0, 4);

  return (
    <section className="lg:min-w-[340px] lg:min-h-[305px] flex flex-col gap-4 px-2 py-5 rounded-sm bg-white">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm">Upcoming Treks</h3>
        <Link
          href="/dashboard/packages"
          className="text-xs text-[#0D2DFC] font-semibold hover:translate-y-[-1px] hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {upcomingDepartureArr.map((item) => {
          return (
            <div key={item.id} className="flex justify-between items-center pr-4">
              <div className="flex gap-3">
                <Image
                  src={item.image || '/assets/placeholder.jpg'}
                  alt="no image"
                  width={82}
                  height={57}
                  className="h-[57px] w-[82px] shrink-0 rounded-sm object-cover"
                ></Image>
                <div className="flex flex-col gap-1 font-semibold">
                  <h4 className="text-xs">{item.packageName}</h4>
                  <p className="text-[10px]">{item.duration}</p>
                  <p className="text-[10px]">{`${item.currentSeats} Seats`}</p>
                </div>
              </div>
              <p
                className={`w-fit rounded-full px-2 py-1 text-sm font-semibold text-xs ${statusStyles[item.status as keyof typeof statusStyles]}`}
              >
                {item.status}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
