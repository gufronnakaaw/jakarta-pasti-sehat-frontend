import CardPrinciples from "@/components/card/CardPrinciples";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@heroui/react";
import { ArrowRight, Quotes } from "@phosphor-icons/react";
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
            <h1 className="mb-2 text-[64px] font-black uppercase leading-[100%] -tracking-[2px] text-white xl:text-[70px]">
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
        <section className="grid justify-items-center py-[150px]">
          <div className="grid max-w-[600px] gap-6 lg:max-w-none lg:grid-cols-2 lg:items-center xl:gap-12">
            <Image
              src="/img/about-img.png"
              alt="about img"
              width={900}
              height={900}
              className="h-auto w-full"
            />

            <div className="grid">
              <h1 className="mb-4 text-[36px] font-black capitalize leading-[100%] -tracking-[2px] text-black sm:text-[42px] xl:text-[52px]">
                <Quotes
                  weight="fill"
                  size={28}
                  className="-mt-10 inline-flex rotate-180 text-orange"
                />{" "}
                Sekilas tentang kami
              </h1>
              <p className="font-medium leading-[180%] text-gray">
                Kami percaya bahwa kesehatan adalah hak mendasar setiap
                individu. Dengan memberikan dukungan yang tulus, serta
                menghadirkan program-program kesehatan yang inovatif dan
                inklusif, kami yakin bahwa bersama-sama kita dapat menciptakan
                Jakarta yang lebih sehat, lebih kuat, dan lebih peduli terhadap
                kesejahteraan seluruh warganya.
              </p>

              <Button
                color="primary"
                endContent={<ArrowRight weight="bold" size={18} />}
                className="mt-10 w-max px-8 font-bold"
              >
                Detail Tentang Kami
              </Button>
            </div>
          </div>
        </section>

        <section className="grid pb-[150px]">
          <div className="mx-auto grid max-w-[600px] gap-8 lg:mx-0 lg:max-w-none lg:items-center">
            <h1 className="text-center text-[36px] font-black capitalize leading-[100%] -tracking-[2px] text-black sm:text-[42px]">
              Prinsip kami untuk jakarta pasti sehat
            </h1>

            <CardPrinciples />
          </div>
        </section>

        <section className="h-screen bg-zinc-200">content 3</section>
      </Layout>

      <footer className="h-[625px] w-full bg-orange">footer</footer>
    </>
  );
}
