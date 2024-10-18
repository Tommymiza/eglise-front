import { Checkbox } from "@/components/ui/checkbox";
import userStore from "@/store/user";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="border p-2 rounded-md border-slate-400 bg-[#ffffff33]">
        <p className="label">{`${payload[0].payload.role} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function UserActif() {
  const [data, setData] = useState<{ role: string; value: number }[]>([]);
  const { userList } = userStore();
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    const userFiltered = [
      ...userList.filter((user) => user.isActive === isActive),
    ];
    setData([
      {
        role: "ADMIN",
        value: userFiltered.filter((user) => user.role === "ADMIN").length,
      },
      {
        role: "EVEQUE",
        value: userFiltered.filter((user) => user.role === "EVEQUE").length,
      },
      {
        role: "PRETRE",
        value: userFiltered.filter((user) => user.role === "PRETRE").length,
      },
      {
        role: "APV",
        value: userFiltered.filter((user) => user.role === "APV").length,
      },
    ]);
  }, [userList, isActive]);

  return (
    <div className="flex flex-col gap-6 border p-2 w-1/2 dark:border-zinc-800 border-slate-200 rounded-md">
      <div className="flex justify-between w-full items-center p-2">
        <h1 className="font-bold text-lg">Utilisateurs</h1>
        <div className="flex flex-row items-center gap-2 dark:border-zinc-800 border p-2 border-slate-200 rounded-md">
          <Checkbox
            checked={isActive}
            onCheckedChange={(c) =>
              c !== "indeterminate" ? setIsActive(c) : setIsActive(false)
            }
          />
          <p className="font-semibold">ACTIF</p>
        </div>
      </div>
      <div className="flex items-center flex-row relative">
        <div className="relative w-full">
          <div
            className="absolute flex flex-col items-center"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p className="font-bold text-[40px]">
              {data.reduce((acc, c) => acc + c.value, 0)}
            </p>
            <p>Utilisateurs</p>
          </div>
          <ResponsiveContainer
            width="100%"
            height={300}
            style={{ position: "relative" }}
          >
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={data}
                cx={"50%"}
                cy={"50%"}
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mr-2 flex flex-col gap-2">
          {data.map((entry, index) => (
            <Legend
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              entry={entry}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const Legend = ({ fill, entry }: any) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-6 w-4 rounded-md"
        style={{ backgroundColor: fill }}
      ></div>
      <p className="whitespace-nowrap font-bold">{`${entry.role}`}</p>
    </div>
  );
};
