import ModalDonation from "@/components/modal/ModalDonation";
import { AppContext } from "@/context/AppContext";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";
import { twMerge } from "tailwind-merge";

type LayoutProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
};

export default function Layout({
  children,
  className,
  title,
  description,
}: LayoutProps) {
  const router = useRouter();
  const ctx = useContext(AppContext);
  const currentUrl = `https://jakartapastisehat.com${router.asPath}`;

  return (
    <>
      <NextSeo
        title={title ? `${title} | Jakarta Pasti Sehat` : "Jakarta Pasti Sehat"}
        description={
          description ||
          "Komunitas Kesehatan Yang Berkomitmen Untuk Memperkuat Kesadaran Gaya Hidup Sehat Masyarakat."
        }
        canonical={currentUrl}
        openGraph={{
          url: currentUrl,
          title: title
            ? `${title} | Jakarta Pasti Sehat`
            : "Jakarta Pasti Sehat",
          description:
            description ||
            "Komunitas Kesehatan Yang Berkomitmen Untuk Memperkuat Kesadaran Gaya Hidup Sehat Masyarakat.",
          site_name: "Jakarta Pasti Sehat",
        }}
      />

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
