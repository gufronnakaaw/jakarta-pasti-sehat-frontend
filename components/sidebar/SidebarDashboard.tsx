import {
  SidebarMainMenuDashboard,
  SidebarOtherMenuDashboard,
} from "@/components/sidebar/SidebarMenuDashboard";
import { LogoJPS } from "@/public/img/logo";
import { IconContext } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SidebarDashboard() {
  const router = useRouter();
  const adminId: string = "JPSSA1";

  const route = SidebarMainMenuDashboard();
  const otherRoute = SidebarOtherMenuDashboard(adminId);

  return (
    <div className="static left-0 top-0 z-50 grid h-screen min-w-[250px] grid-rows-[24px_1fr] gap-8 border-r border-gray/15 bg-gray/5 [padding:2rem_1rem]">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 justify-self-center"
      >
        <LogoJPS className="h-auto w-[100px] text-green" />
      </Link>

      <div className="overflow-y-scroll scrollbar-hide">
        <div className="mb-10 flex flex-1 flex-col gap-8">
          <IconContext.Provider
            value={{
              weight: "bold",
              size: 18,
            }}
          >
            <div className="grid gap-1">
              {route.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className={`flex h-10 items-center justify-between rounded-xl [padding:0.5rem_1rem] ${
                    router.asPath.includes(item.path)
                      ? "bg-orange text-white hover:bg-orange/90"
                      : "bg-transparent text-gray hover:bg-gray/10"
                  }`}
                >
                  <div className="flex flex-1 items-center gap-2">
                    <item.icon
                      weight={
                        router.asPath.includes(item.path) ? "fill" : "bold"
                      }
                    />
                    <div className="text-sm font-bold">{item.label}</div>
                  </div>
                </Link>
              ))}
            </div>
          </IconContext.Provider>
        </div>

        <div className="grid gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-gray">
            Menu Lainnya
          </span>

          <div className="grid gap-1">
            {otherRoute.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`flex h-10 items-center justify-between rounded-xl [padding:0.5rem_1rem] ${
                  router.asPath.includes(item.path)
                    ? "bg-orange text-white hover:bg-orange/90"
                    : "bg-transparent text-gray hover:bg-gray/10"
                }`}
              >
                <div className="flex flex-1 items-center gap-2">
                  <item.icon
                    weight={router.asPath.includes(item.path) ? "fill" : "bold"}
                  />
                  <div className="text-sm font-bold">{item.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
