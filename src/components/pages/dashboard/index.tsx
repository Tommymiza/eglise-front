"use client";
import christianStore from "@/store/christian";
import churchStore from "@/store/church";
import sacramentStore from "@/store/sacrament";
import userStore from "@/store/user";
import { useEffect } from "react";
import Christian from "./charts/christian";
import SacramentRate from "./charts/rate";
import SacramentChart from "./charts/sacrament";
import UserActif from "./charts/user";

export default function Dashboard() {
  const { getChristians } = christianStore();
  const { getSacraments } = sacramentStore();
  const { getChurchs } = churchStore();
  const { getUsers } = userStore();
  useEffect(() => {
    getChristians({
      include: {
        sacraments: true,
        apv: true,
      },
    });
    getSacraments({
      include: {
        christians: true,
      },
    });
    getChurchs();
    getUsers();
  }, []);
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className="font-bold text-xl">Tableau de bord</h1>
      <div className="flex flex-row gap-4 w-full justify-between max-md:justify-center max-md:flex-wrap">
        <Christian />
        <SacramentRate />
      </div>
      <div className="flex flex-row gap-4 w-full justify-between max-md:justify-center max-md:flex-wrap">
        <UserActif />
        <SacramentChart />
      </div>
    </div>
  );
}
