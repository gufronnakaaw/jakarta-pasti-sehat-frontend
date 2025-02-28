import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type DashboardContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function DashboardContainer({
  children,
  className,
}: DashboardContainerProps) {
  return (
    <div className="min-h-screen">
      <div className={twMerge("grid", `${className}`)}>{children}</div>
    </div>
  );
}
