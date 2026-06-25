'use client';

import bookings from '../../../../data/bookings.json';
import packages from '../../../../data/packages.json';

type Props = {
  agencyId: string;
};

const tableClass = 'border border-neutral-200 p-4 text-center';

export default function UpcomingDepartures({ agencyId }: Props) {
  const departure = bookings
    .filter((booking) => booking.agency_id === agencyId)
    .sort((a, b) => new Date(a.departure_date).getTime() - new Date(b.departure_date).getTime());

  const upcomingDepartureArr = departure.map((item) => {
    const pkg = packages.find((pkg) => pkg.id === item.package_id);

    return {
      id: item.id,
      packageName: pkg?.title,
      departureDate: item.departure_date,
      groupSize: item.group_size,
      assignedGuide: 'Processing...',
    };
  });

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6">
      <h3 className="font-semibold text-neutral-900">Upcoming Departure</h3>
      <table className="border-collapse border border-neutral-200 table-auto">
        <thead>
          <tr>
            <th className={tableClass}>Package name</th>
            <th className={tableClass}>Departure date</th>
            <th className={tableClass}>Group size</th>
            <th className={tableClass}>Assigned Guide</th>
          </tr>
        </thead>
        <tbody>
          {upcomingDepartureArr.map((item) => {
            return (
              <tr key={item.id}>
                <td className={tableClass}>{item.packageName}</td>
                <td className={tableClass}>{item.departureDate}</td>
                <td className={tableClass}>{item.groupSize}</td>
                <td className={tableClass}>{item.assignedGuide}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
