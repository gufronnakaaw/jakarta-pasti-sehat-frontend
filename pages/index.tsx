import CardArticle from "@/components/card/CardArticle";
import CardEvent from "@/components/card/CardEvent";
import CardPartner from "@/components/card/CardPartner";
import CardPrinciples from "@/components/card/CardPrinciples";
import CardTeam from "@/components/card/CardTeam";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global";
import { Homepage } from "@/types/homepage";
import { fetcher } from "@/utils/fetcher";
import { Button } from "@heroui/react";
import { ArrowRight, Quotes } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HomePage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

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
              as={Link}
              href="#about"
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
        <section id="about" className="base pt-[150px]">
          <div className="wrapper lg:grid-cols-2 lg:items-center xl:gap-12">
            <Image
              src="/img/about-img.png"
              alt="about img"
              width={900}
              height={900}
              className="h-auto w-full"
            />

            <div className="grid">
              <h1 className="title mb-4 xl:text-[52px]">
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
                onPress={() => router.push("/company/about-us")}
              >
                Detail Tentang Kami
              </Button>
            </div>
          </div>
        </section>

        <section className="base">
          <div className="wrapper lg:items-center">
            <h1 className="title px-8 text-center">
              Prinsip kami untuk jakarta pasti sehat
            </h1>

            <CardPrinciples />
          </div>
        </section>

        <section className="base">
          <div className="wrapper">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="grid gap-2">
                <h1 className="title">Artikel Terbaru</h1>
                <p className="font-medium leading-[180%] text-gray">
                  Temukan berbagai artikel terbaru seputar kesehatan,
                  <br />
                  gaya hidup, dan tips menjaga kesejahteraan.
                </p>
              </div>

              <Button
                variant="light"
                color="primary"
                endContent={<ArrowRight weight="bold" size={18} />}
                onPress={() => router.push("/articles")}
                className="font-bold capitalize"
              >
                Lihat semua artikel
              </Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-3 lg:items-start xl:grid-cols-4 xl:gap-x-8">
              {Array.from({ length: 4 }, (_, index) => (
                <CardArticle key={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="base">
          <div className="wrapper">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="grid gap-2">
                <h1 className="title">Event Kami</h1>
                <p className="font-medium leading-[180%] text-gray">
                  Daftar event menarik yang kami selenggarakan, mulai
                  <br />
                  dari seminar, workshop, hingga kegiatan komunitas.
                </p>
              </div>

              <Button
                variant="light"
                color="primary"
                endContent={<ArrowRight weight="bold" size={18} />}
                onPress={() => router.push("/events")}
                className="font-bold capitalize"
              >
                Lihat semua event
              </Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-3 lg:items-start xl:grid-cols-4 xl:gap-x-8">
              {Array.from({ length: 4 }, (_, index) => (
                <CardEvent key={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="base">
          <div className="wrapper">
            <div className="grid justify-items-center gap-2 text-center">
              <h1 className="title">Tim Terbaik Kami</h1>
              <p className="max-w-[800px] font-medium leading-[180%] text-gray">
                Tim kami terdiri dari individu yang berdedikasi, berkomitmen,
                dan peduli terhadap kesehatan warga Jakarta. Kami bekerja
                bersama membuat perubahan nyata yang positif untuk semua.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3 lg:items-start xl:grid-cols-4 xl:gap-x-8">
              {Array.from({ length: 4 }, (_, index) => (
                <CardTeam key={index} />
              ))}
            </div>

            <Button
              color="primary"
              endContent={<ArrowRight weight="bold" size={18} />}
              onPress={() => router.push("/company/our-teams")}
              className="mt-8 w-max justify-self-center px-8 font-bold capitalize"
            >
              Lihat semua tim
            </Button>
          </div>
        </section>

        <section className="base">
          <div className="wrapper">
            <h1 className="title text-center">Mitra Kami</h1>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(171px,1fr))] gap-8">
              {Array.from({ length: 7 }, (_, index) => (
                <CardPartner key={index} />
              ))}
            </div>

            <Button
              color="primary"
              endContent={<ArrowRight weight="bold" size={18} />}
              onPress={() => router.push("/partners")}
              className="mt-8 w-max justify-self-center px-8 font-bold capitalize"
            >
              Lihat semua mitra
            </Button>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: Homepage;
  error?: any;
}> = async () => {
  try {
    const response: SuccessResponse<Homepage> = await fetcher({
      endpoint: "/homepage",
      method: "GET",
    });

    return {
      props: {
        data: response.data,
      },
    };
  } catch (error: any) {
    console.error(error);

    return {
      props: {
        error,
      },
    };
  }
};
