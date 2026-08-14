'use client';

const destinations = [
  { name: 'Everest Region', value: 425 },
  { name: 'Annapurna Region', value: 325 },
  { name: 'Langtang Region', value: 225 },
  { name: 'Manaslu Region', value: 125 },
  { name: 'Upper Mustang', value: 95 },
];

export default function TopDestinations() {
  const maxValue = Math.max(...destinations.map((item) => item.value));

  return (
    <section className="flex flex-col bg-white rounded-sm p-2 gap-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm leading-xl">Top Destinations</h3>
        <select
          name="months"
          id="months"
          defaultValue="30"
          className="text-[10px] border border-neutral-100 rounded px-[4px] py-[5px] gap-2 outline-none hover:text-red-700 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500"
        >
          <option value="30">Last 30 days</option>
        </select>
      </div>
      {destinations.map((destination) => (
        <div key={destination.name} className="flex items-center">
          <span className="w-24 text-[10px] font-medium">{destination.name}</span>

          <div className="w-full h-1 flex-1 rounded-full bg-purple-200">
            <div
              className="h-full rounded-full bg-purple-500"
              style={{
                width: `${(destination.value / maxValue) * 100}%`,
              }}
            />
          </div>

          <span className="w-8 text-right text-[10px] font-medium">{destination.value}</span>
        </div>
      ))}
    </section>
  );
}
