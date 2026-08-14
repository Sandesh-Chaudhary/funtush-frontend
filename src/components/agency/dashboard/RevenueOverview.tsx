'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAgencyData } from '@/lib/agency/getAgencyData';

type Props = {
  agencyId: string;
};

type Transaction = {
  id: string;
  date: string;
  amount: number;
};

type DisplayData = {
  date: string;
  revenue: number;
  expenses: number;
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getSortedTransaction = (data: Transaction[]) => {
  const newData = data.map((item) => ({ id: item.id, date: item.date, amount: item.amount }));
  return newData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const getTransactionByMonth = (year: number, month: number, data: Transaction[]) => {
  const newData = data.filter((item) => {
    const date = new Date(item.date);
    return date.getFullYear() === year && date.getMonth() === month;
  });
  return newData;
};

const getDisplayableData = (amountType: 'revenue' | 'expenses', arr: Transaction[], mainArr: DisplayData[]) => {
  arr.forEach((item) => {
    const day = new Date(item.date).getDate();
    mainArr[day - 1][amountType] += item.amount;
  });
};

export default function RevenueOverview({ agencyId }: Props) {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[currentMonth]);
  const [showRevenue, setShowRevenue] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);

  const month = MONTHS.indexOf(selectedMonth);
  const monthArr = MONTHS.slice(0, currentMonth + 1);

  const { income, expense } = getAgencyData(agencyId);
  const sortedIncome = getSortedTransaction(income);
  const sortedExpense = getSortedTransaction(expense);

  const incomeArr = getTransactionByMonth(2026, month, sortedIncome);
  const expenseArr = getTransactionByMonth(2026, month, sortedExpense);

  const chartdata: DisplayData[] = [];

  for (let i = 1; i <= 31; i++) {
    chartdata.push({
      date: `${MONTHS[month]} ${i}`,
      revenue: 0,
      expenses: 0,
    });
  }

  getDisplayableData('revenue', incomeArr, chartdata);
  getDisplayableData('expenses', expenseArr, chartdata);

  return (
    <section className="w-full flex flex-col gap-y-8 rounded-sm bg-[#fff] p-3 shadow-sm lg:col-span-2  xl:min-w-[500px] xl:min-h-[305px] xl:col-span-1">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-sm">Revenue Overview</h3>
          <div className="flex gap-2">
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
            <button className="text-[10px] font-semibold" onClick={() => setShowRevenue(!showRevenue)}>
              <span className={getLegendIndicatorClass(showRevenue)}>-- </span>Revenue
            </button>
            <button className="text-[10px] font-semibold" onClick={() => setShowExpenses(!showExpenses)}>
              <span className={getLegendIndicatorClass(showExpenses)}>-- </span>Expenses
            </button>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex flex-col gap-1 items-center font-semibold">
            <p className="text-xl">{`Rs ${chartdata.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}`}</p>
            <p className="text-[10px]">Total Revenue</p>
          </div>
          <div className="w-[2px] h-full bg-[#625B71]"></div>
          <div className="flex flex-col gap-1 items-center font-semibold text-[#625B71]">
            <p className="text-xl">{`Rs ${chartdata.reduce((sum, item) => sum + item.expenses, 0).toLocaleString()}`}</p>
            <p className="text-[10px]">Total Expenses</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartdata}
            margin={{
              top: 10,
              right: 15,
              left: 15,
              bottom: 5,
            }}
          >
            {/* Light grid like the second screenshot */}
            <CartesianGrid stroke="var(--color-neutral-200)" strokeDasharray="0" vertical={true} horizontal={true} />

            {/* X axis */}
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: 'var(--color-neutral-500)',
              }}
              tickMargin={10}
            />

            {/* Y axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: 'var(--color-neutral-500)',
              }}
              tickFormatter={(value) => {
                if (value === 0) return 'Rs0';
                return `Rs ${value / 1000}K`;
              }}
              tickMargin={10}
            />

            {/* Optional tooltip */}
            <Tooltip formatter={(value) => `Rs ${Number(value).toLocaleString()}`} />

            {/* Revenue */}
            {showRevenue && (
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0784ff"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            )}

            {/* Expenses */}
            {showExpenses && (
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#9dccff"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

const getLegendIndicatorClass = (isActive: boolean) =>
  `relative top-[2px] font-bold text-xl ${isActive ? 'text-[#14C935]' : 'text-[#D3F1BF]'}`;
