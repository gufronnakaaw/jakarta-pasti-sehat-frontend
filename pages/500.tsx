import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@heroui/react";
import { ArrowClockwise } from "@phosphor-icons/react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function ServerErrorPage() {
  return (
    <>
      <Navbar />

      <Layout title="Server Error">
        <section className="base pt-[130px]">
          <div
            className={twMerge(
              "wrapper justify-items-center",
              "lg:max-w-[700px]",
            )}
          >
            <Image
              src="/img/disconnected.svg"
              alt="500 img"
              width={900}
              height={900}
              className="h-auto w-full"
            />

            <div className="grid justify-items-center gap-4 text-center">
              <h1 className="text-[36px] font-black capitalize leading-[110%] -tracking-[1px] text-black sm:text-[52px]">
                Oh uh! Terjadi kesalahan pada server
              </h1>

              <p className="font-medium leading-[180%] text-gray">
                Kami sedang mengalami kendala teknis yang menyebabkan halaman
                ini tidak dapat dimuat dengan benar. Hal ini bisa disebabkan
                oleh berbagai faktor, seperti gangguan sistem, pemeliharaan
                server, atau lonjakan trafik yang tidak terduga.
              </p>

              <Button
                color="primary"
                startContent={<ArrowClockwise weight="bold" size={18} />}
                onPress={() => window.location.reload()}
                className="mt-10 w-max px-16 font-bold"
              >
                Refresh Halaman
              </Button>
            </div>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
