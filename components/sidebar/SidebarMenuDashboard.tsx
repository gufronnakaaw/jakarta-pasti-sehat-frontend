import {
  Bag,
  CalendarStar,
  Camera,
  FileText,
  HandHeart,
  Handshake,
  Icon,
  Image,
  Key,
  Monitor,
  Newspaper,
  Users,
} from "@phosphor-icons/react";

type SidebarMainMenuDashboard = {
  label: string;
  path: string;
  icon: Icon;
};

const baseUrl = "/dashboard";

export function SidebarMainMenuDashboard(): SidebarMainMenuDashboard[] {
  const mainMenuItems: SidebarMainMenuDashboard[] = [
    {
      label: "Dashboard",
      path: `${baseUrl}`,
      icon: Monitor,
    },
    {
      label: "Banner",
      path: `${baseUrl}/banners`,
      icon: Image,
    },
    {
      label: "Artikel",
      path: `${baseUrl}/articles`,
      icon: Newspaper,
    },
    {
      label: "Event",
      path: `${baseUrl}/events`,
      icon: CalendarStar,
    },
    {
      label: "Dokumentasi",
      path: `${baseUrl}/documentations`,
      icon: Camera,
    },
    {
      label: "Tim",
      path: `${baseUrl}/teams`,
      icon: Users,
    },
    {
      label: "Mitra",
      path: `${baseUrl}/partners`,
      icon: Handshake,
    },
    {
      label: "Karir",
      path: `${baseUrl}/careers`,
      icon: Bag,
    },
    {
      label: "Volunteer",
      path: `${baseUrl}/volunteers`,
      icon: HandHeart,
    },
  ];

  return mainMenuItems;
}

export function SidebarOtherMenuDashboard(
  role: string,
): SidebarMainMenuDashboard[] {
  const isSuperAdmin = role === "superadmin";

  const otherMenuItems: SidebarMainMenuDashboard[] = [
    {
      label: "Pilar",
      path: `${baseUrl}/pillars`,
      icon: FileText,
    },
    {
      label: "Jabatan",
      path: `${baseUrl}/positions`,
      icon: FileText,
    },
    ...(isSuperAdmin
      ? [
          {
            label: "Akses",
            path: `${baseUrl}/keys`,
            icon: Key,
          },
          {
            label: "Admin",
            path: `${baseUrl}/admins`,
            icon: Users,
          },
        ]
      : []),
  ];

  return otherMenuItems;
}
