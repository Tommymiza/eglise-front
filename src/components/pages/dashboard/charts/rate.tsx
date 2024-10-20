"use client";
import christianStore from "@/store/christian";
import sacramentStore from "@/store/sacrament";
import { Select } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const RenderCustomizedLabel = ({ cx, cy, data }: any) => {
  return (
    <>
      <text
        x={cx}
        y={cy - 10}
        fill={data[1].value > 50 ? "#0298D8" : "#E00614"}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={24}
        fontWeight="bold"
      >
        {data[1].value.toFixed(2)}%
      </text>
      <text
        x={cx}
        y={cy + 10}
        fill={data[1].value > 50 ? "#0298D8" : "#E00614"}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        <tspan x={cx} dy="1.6em" fontSize={12}>
          Chrétiens
        </tspan>
        <tspan x={cx} dy="1.6em" fontSize={12}>
          {data[1].name}
        </tspan>
      </text>
    </>
  );
};

const RateSacrament = () => {
  const { christianList } = christianStore();
  const { sacramentList } = sacramentStore();

  const [data, setData] = useState<{ name: string; value: number }[]>([
    {
      name: "Total",
      value: 0,
    },
    {
      name: "Rate",
      value: 0,
    },
  ]);
  const [sacrament, setSacrament] = useState<string>("");
  useEffect(() => {
    setSacrament(sacramentList[0]?.id || "");
  }, [sacramentList]);

  useEffect(() => {
    const rate =
      (christianList.filter((item) =>
        item.sacraments?.some((sac) => sac.sacrament_id === sacrament)
      ).length /
        christianList.length) *
      100;
    setData([
      {
        name: "non sanctifiés",
        value: 100 - rate,
      },
      {
        name: "sanctifiés",
        value: rate,
      },
    ]);
  }, [christianList, sacrament]);
  return (
    <div className="flex flex-col gap-6 border p-2 w-1/2 max-md:w-full dark:border-zinc-800 border-slate-200 rounded-md">
      <div className="flex justify-between w-full items-center p-2">
        <h1 className="font-bold text-lg">Taux des sacraments</h1>
        <Select
          value={sacrament}
          onChange={(e) => setSacrament(e.target.value)}
          className="flex h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        >
          {sacramentList.map((sac) => (
            <option key={sac.id} value={sac.id}>
              {sac.name}
            </option>
          ))}
        </Select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ccc" />
            </filter>
            <linearGradient id="gradientRed" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="10%"
                style={{ stopColor: "#E00614", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#5D0B0D", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient id="gradientBlue" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="10%"
                style={{ stopColor: "#0298D8", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#1F00AE", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={70}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            labelLine={false}
            style={{ filter: "url(#shadow)" }}
            label={<RenderCustomizedLabel data={data} />}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === 1
                    ? data[1].value > 50
                      ? "url(#gradientBlue)"
                      : "url(#gradientRed)"
                    : "#F4F4F4"
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RateSacrament;
