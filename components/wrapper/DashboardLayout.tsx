import NavbarDashboard from "@/components/navbar/NavbarDashboard";
import SidebarDashboard from "@/components/sidebar/SidebarDashboard";
import Head from "next/head";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type DashboardLayoutProps = {
  title?: string;
  className?: string;
  children: ReactNode;
};

export default function DashboardLayout({
  title,
  className,
  children,
}: DashboardLayoutProps) {
  return (
    <>
      <Head>
        <title>{`${title} | Jakarta Pasti Sehat`}</title>
      </Head>

      <main className="flex h-screen">
        <SidebarDashboard />

        <div className="grid w-full">
          <NavbarDashboard />

          <div
            className={twMerge("overflow-y-scroll bg-gray/5", `${className}`)}
          >
            <div className="mx-auto w-full max-w-[1200px] p-[0_1.5rem_6rem]">
              {children}
            </div>

            <footer className="flex h-16 items-center justify-center px-6 text-center">
              <p className="text-sm font-medium capitalize text-gray">
                &copy; Part of{" "}
                <span className="text-purple font-bold">
                  Pharma Metrocity Group
                </span>{" "}
                {new Date().getFullYear()}
              </p>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}
