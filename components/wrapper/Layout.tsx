import Head from "next/head";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type LayoutProps = {
  children: ReactNode;
  className?: string;
  title?: string;
};

export default function Layout({ children, className, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{`${title} | Jakarta Pasti Sehat`}</title>
      </Head>

      <div className={twMerge("mx-auto w-full max-w-[1440px] px-6", className)}>
        {children}
      </div>
    </>
  );
}
