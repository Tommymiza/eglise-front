import churchStore from "@/store/church";
import sacramentStore from "@/store/sacrament";
import { Select } from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
];
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
const CustomBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <g onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <defs>
        <filter id="shadow" x="-10%" y="0%" width="140%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#8791E9B9" />
        </filter>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        fill={fill}
        filter={isHovered ? "url(#shadow)" : ""}
        style={{
          transition: "all 0.3s ease", // Smooth transition
          fill: isHovered ? "#6584FF" : fill, // Change fill on hover
        }}
      />
    </g>
  );
};

export default function SacramentChart() {
  const [data, setData] = useState<{ name: string; length: number }[]>([]);
  const { sacramentList } = sacramentStore();
  const [church, setChurch] = useState<string>("");
  const { churchList } = churchStore();
  useEffect(() => {
    const newData = sacramentList.map((sacrament) => ({
      name: sacrament.name,
      length: sacrament.christians?.filter((c) => c.church_id.includes(church))
        .length,
    }));
    setData(newData);
  }, [sacramentList, church]);
  return (
    <div className="flex flex-col gap-6 border p-2 w-1/2 dark:border-zinc-800 border-slate-200 rounded-md">
      <div className="flex justify-between w-full items-center p-2">
        <h1 className="font-bold text-lg">Sacraments</h1>
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
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            tickFormatter={(value) => {
              if (value) {
                return (value.toString() as string).substring(0, 4);
              }
              return "";
            }}
            tickLine={false}
          />
          <YAxis allowDecimals={false} tickLine={false} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar dataKey="length" shape={<CustomBar />}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="rounded-md"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
