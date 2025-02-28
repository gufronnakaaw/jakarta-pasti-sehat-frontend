import ModalDonation from "@/components/modal/ModalDonation";
import { AppContext } from "@/context/AppContext";
import Head from "next/head";
import { ReactNode, useContext } from "react";
import { twMerge } from "tailwind-merge";

type LayoutProps = {
  children: ReactNode;
  className?: string;
  title?: string;
};

export default function Layout({ children, className, title }: LayoutProps) {
  const ctx = useContext(AppContext);

  return (
    <>
      <Head>
        <title>{`${title} | Jakarta Pasti Sehat`}</title>
      </Head>

      <div
        className={twMerge(
          "mx-auto min-h-[calc(100vh-6rem)] w-full max-w-[1440px] px-6",
          className,
        )}
      >
        <ModalDonation
          isOpen={ctx?.isOpenModal as boolean}
          onClose={ctx?.onCloseModal as () => void}
        />

        {children}
      </div>
    </>
  );
}
