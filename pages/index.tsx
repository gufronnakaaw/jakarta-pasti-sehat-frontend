import CardArticle from "@/components/card/CardArticle";
import CardEvent from "@/components/card/CardEvent";
import CardPartner from "@/components/card/CardPartner";
import CardPrinciples from "@/components/card/CardPrinciples";
import CardTeam from "@/components/card/CardTeam";
import EmptyData from "@/components/Empty";
import ErrorPage from "@/components/ErrorPage";
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
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomePage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <section className="relative h-[calc(100vh-5rem)] w-full">
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
        <section id="about" className="base pt-[200px]">
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

        {error ? (
          <ErrorPage error={error} />
        ) : (
          <>
            <section className="grid justify-items-center pb-[100px] xl:pb-[150px]">
              <div className="wrapper">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="grid gap-2">
                    <h1 className="title">Artikel Terbaru</h1>
                    <p className="max-w-[400px] font-medium leading-[180%] text-gray">
                      Temukan berbagai artikel terbaru seputar kesehatan, gaya
                      hidup, dan tips menjaga kesejahteraan.
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

                {data?.articles.length ? (
                  <div className="grid gap-4 lg:grid-cols-3 lg:items-start xl:grid-cols-4 xl:gap-x-8">
                    {data.articles.map((article) => {
                      return (
                        <CardArticle key={article.article_id} {...article} />
                      );
                    })}
                  </div>
                ) : (
                  <EmptyData text="Oopss! Sepertinya belum ada artikel yang ditulis" />
                )}
              </div>
            </section>

            {data?.banners.length ? (
              <search className="grid justify-items-center pb-[100px] xl:pb-[150px]">
                <div className="wrapper">
                  <div className="teams-container overflow-hidden">
                    <Swiper
                      loop={true}
                      slidesPerView={"auto"}
                      spaceBetween={32}
                      centeredSlides={true}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination, Autoplay]}
                    >
                      {data?.banners.map((banner) => {
                        return (
                          <SwiperSlide
                            key={banner.banner_id}
                            className="w-full max-w-[850px]"
                          >
                            <Link
                              href={banner.link ? banner.link : "#"}
                              target={banner.link ? "_blank" : ""}
                              className="h-auto w-full"
                            >
                              <Image
                                src={banner.image_url}
                                alt={banner.alt as string}
                                width={850}
                                height={350}
                                className="h-full w-full rounded-2xl object-cover object-center"
                              />
                            </Link>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              </search>
            ) : null}

            <section className="base">
              <div className="wrapper">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="grid gap-2">
                    <h1 className="title">Event Kami</h1>
                    <p className="max-w-[450px] font-medium leading-[180%] text-gray">
                      Daftar event menarik yang kami selenggarakan, mulai dari
                      seminar, workshop, hingga kegiatan komunitas.
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

                {data?.events.length ? (
                  <div className="grid gap-4 lg:grid-cols-3 lg:items-start xl:grid-cols-4 xl:gap-x-8">
                    {data.events.map((event) => {
                      return <CardEvent key={event.event_id} {...event} />;
                    })}
                  </div>
                ) : (
                  <EmptyData text="belum ada event yang kami selenggarakan" />
                )}
              </div>
            </section>

            {data?.teams.length ? (
              <section className="base">
                <div className="wrapper">
                  <div className="-mb-4 grid justify-items-center gap-2 text-center">
                    <h1 className="title">Tim Terbaik Kami</h1>
                    <p className="max-w-[800px] font-medium leading-[180%] text-gray">
                      Tim kami terdiri dari individu yang berdedikasi,
                      berkomitmen, dan peduli terhadap kesehatan warga Jakarta.
                      Kami bekerja bersama membuat perubahan nyata yang positif
                      untuk semua.
                    </p>
                  </div>

                  <div className="teams-container overflow-hidden">
                    <Swiper
                      loop={true}
                      slidesPerView={"auto"}
                      spaceBetween={32}
                      centeredSlides={true}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination, Autoplay]}
                    >
                      {data.teams.map((team) => {
                        return (
                          <SwiperSlide
                            key={team.fullname}
                            className="max-w-[340px] pt-4 lg:max-w-[360px]"
                          >
                            <CardTeam {...team} />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>

                  <Button
                    color="primary"
                    endContent={<ArrowRight weight="bold" size={18} />}
                    onPress={() => router.push("/team")}
                    className="mt-8 w-max justify-self-center px-8 font-bold capitalize"
                  >
                    Lihat semua tim
                  </Button>
                </div>
              </section>
            ) : null}

            {data?.partners.length ? (
              <section className="base">
                <div className="wrapper">
                  <h1 className="title text-center">Mitra Kami</h1>

                  <div className="flex flex-wrap items-center justify-center gap-4 xl:gap-8">
                    {data.partners.map((partner) => {
                      return (
                        <CardPartner key={partner.partner_id} {...partner} />
                      );
                    })}
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
            ) : null}
          </>
        )}
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
    return {
      props: {
        error,
      },
    };
  }
};
