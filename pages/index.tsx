import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@heroui/react";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <section className="relative h-[750px] w-full">
        {/* === overlay navbar === */}
        <div className="absolute left-0 top-0 z-10 h-24 w-full bg-gradient-to-b from-black to-transparent" />

        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gradient-to-tr from-green/50 to-orange/50 px-6">
          <div className="grid max-w-[950px] justify-items-center text-center">
            <h1 className="mb-2 text-[64px] font-black uppercase leading-[100%] text-white xl:text-[70px]">
              jakarta pasti sehat
            </h1>
            <p className="font-medium leading-[180%] text-white">
              Komunitas kesehatan untuk warga Jakarta yang berkomitmen
              memperkuat kesadaran akan pentingnya gaya hidup sehat, sekaligus
              menjadi wadah kolaborasi untuk menciptakan lingkungan yang lebih
              sehat, aktif, dan penuh semangat.
            </p>

            <Button
              color="primary"
              endContent={<ArrowRight weight="bold" size={18} />}
              className="mt-6 w-max px-8 font-bold"
            >
              Baca Selengkapnya
            </Button>
          </div>
        </div>

        <Image
          src="/img/landing-img.png"
          alt="landing img"
          width={1440}
          height={750}
          className="absolute left-0 top-0 h-full w-full object-cover object-right"
        />
      </section>

      <Layout title="Komunitas Kesehatan Yang Berkomitmen Untuk Memperkuat Kesadaran Gaya Hidup Sehat Masyarakat">
        <section className="h-screen bg-red-200">content 1</section>

        <section className="h-screen bg-lime-200">content 2</section>

        <section className="h-screen bg-zinc-200">content 3</section>
      </Layout>

      <footer className="h-[625px] w-full bg-orange">footer</footer>
    </>
  );
}
