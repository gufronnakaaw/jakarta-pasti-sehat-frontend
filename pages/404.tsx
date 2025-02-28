import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@heroui/react";
import { ArrowLeft } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <Layout title="Halaman Tidak Ditemukan">
        <section className="base pt-[130px]">
          <div
            className={twMerge(
              "wrapper justify-items-center",
              "lg:max-w-[700px]",
            )}
          >
            <Image
              src="/img/not-found.svg"
              alt="404 img"
              width={900}
              height={900}
              className="h-auto w-full"
            />

            <div className="grid justify-items-center gap-4 text-center">
              <h1 className="text-[36px] font-black capitalize leading-[110%] -tracking-[1px] text-black sm:text-[52px]">
                Ooppss! Halaman Tidak Ditemukan
              </h1>

              <p className="font-medium leading-[180%] text-gray">
                Maaf, halaman yang Anda cari tidak ditemukan atau mungkin telah
                dipindahkan. Periksa kembali alamat URL yang Anda masukkan. Jika
                Anda merasa ini adalah kesalahan, silakan hubungi tim kami untuk
                bantuan lebih lanjut.
              </p>

              <Button
                color="primary"
                startContent={<ArrowLeft weight="bold" size={18} />}
                onPress={() => router.back()}
                className="mt-10 w-max px-16 font-bold"
              >
                Kembali
              </Button>
            </div>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
