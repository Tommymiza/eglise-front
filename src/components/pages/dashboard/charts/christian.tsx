"use client";

import christianStore from "@/store/christian";
import { ChristianItem } from "@/store/christian/type";
import churchStore from "@/store/church";
import { Select } from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DataItem {
  month: string;
  nb_christian: number;
}

const convertData = (
  data: ChristianItem[],
  year: number,
  church: string
): DataItem[] => {
  const months = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sept",
    "Oct",
    "Nov",
    "Déc",
  ];

  const result: DataItem[] = months.map((month, index) => ({
    month: month,
    nb_christian: data
      .filter((item) => item?.apv?.church_id?.includes(church))
      .filter(
        (item) =>
          new Date(item.createdAt).getFullYear() === year &&
          new Date(item.createdAt).getMonth() === index
      ).length,
  }));

  return result;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="border p-2 rounded-md border-slate-400 bg-[#ffffff33]">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const Christian = () => {
  const { christianList } = christianStore();
  const [chartData, setChartData] = useState<DataItem[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [years, setYears] = useState<number[]>([]);
  const [church, setChurch] = useState<string>("");
  const { churchList } = churchStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = convertData(christianList, year, church);
      setChartData(data);
    };
    fetchData();
  }, [year, church, christianList]);

  const generateYearList = () => {
    "use strict";
    const yearSet = new Set(
      christianList.map((item) => new Date(item.createdAt).getFullYear())
    );
    const yearList: number[] = [...yearSet];
    setYears(yearList);
  };
  useEffect(() => {
    generateYearList();
  }, [christianList]);
  return (
    <div className="flex flex-col gap-6 w-1/2 max-md:w-full border p-2 dark:border-zinc-800 border-slate-200 rounded-md">
      <div className="flex justify-between w-full items-center p-2">
        <h1 className="font-bold text-lg">Nombre de chrétiens</h1>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <Select
            value={church}
            onChange={(e) => setChurch(e.target.value)}
            className="flex h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
          >
            <option value="">Toutes les églises</option>
            {churchList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="flex h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          style={{
            top: 0,
            left: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="2 3"
            strokeOpacity={0.2}
            vertical={false}
          />
          <XAxis dataKey="month" tickLine={false} />
          <YAxis allowDecimals={false} tickLine={false} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#334155",
            }}
          />
          <defs>
            <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
              <stop offset="30%" stopColor="#6584FF" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="nb_christian"
            stroke="#8884d8"
            strokeWidth={3}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Christian;
