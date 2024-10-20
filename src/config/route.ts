import {
  Church,
  LayoutDashboard,
  MapPin,
  Sparkles,
  User,
  Users,
} from "lucide-react";

export type SidebarRoutesType = {
  label: string;
  href: string;
  icon: React.FC<any>;
};

export const sidebarRoutes: SidebarRoutesType[] = [
  {
    label: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Église",
    href: "/church",
    icon: Church,
  },
  {
    label: "APF",
    href: "/apv",
    icon: MapPin,
  },
  {
    label: "Chrétien",
    href: "/christian",
    icon: Users,
  },
  {
    label: "Sacrament",
    href: "/sacrament",
    icon: Sparkles,
  },
  {
    label: "Utilisateur",
    href: "/user",
    icon: User,
  },
];
