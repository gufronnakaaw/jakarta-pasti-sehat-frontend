import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonSidebarDashboardProps = {
  label: string;
  path: string;
  className?: string;
  icon: ReactNode;
};

export default function ButtonSidebarDashboard({
  label,
  path,
  className,
  icon,
}: ButtonSidebarDashboardProps) {
  const router = useRouter();

  return (
    <Link
      href={path}
      className={twMerge(
        `flex h-10 items-center justify-between rounded-xl [padding:0.5rem_1rem] ${
          router.asPath.includes(path)
            ? "bg-orange text-white hover:bg-orange/90"
            : "bg-transparent text-gray hover:bg-gray/10"
        }`,
        `${className}`,
      )}
    >
      <div className="flex flex-1 items-center gap-2">
        <>{icon}</>
        <div className="text-sm font-bold">{label}</div>
      </div>
    </Link>
  );
}
