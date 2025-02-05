import { House, Icon, Newspaper } from "@phosphor-icons/react";

type SidebarMainMenuDashboard = {
  label: string;
  path: string;
  icon: Icon;
};

export function SidebarMainMenuDashboard(): SidebarMainMenuDashboard[] {
  return [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: House,
    },
    {
      label: "Artikel",
      path: "/dashboard/articles",
      icon: Newspaper,
    },
  ];
}
