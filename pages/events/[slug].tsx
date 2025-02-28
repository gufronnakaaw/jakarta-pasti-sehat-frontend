import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/loading/LoadingScreen";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { EventDetail } from "@/types/event";
import { SuccessResponse } from "@/types/global";
import { fetcher } from "@/utils/fetcher";
import { formatEventDate, formatEventTime } from "@/utils/formatDate";
import { Button } from "@heroui/react";
import {
  CalendarMinus,
  Clock,
  IconContext,
  InstagramLogo,
  MapPin,
  MapPinArea,
  Money,
  ShareNetwork,
  TwitterLogo,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EventDetailsPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [mounted, setMounted] = useState(false);

  async function handleShareLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link berhasil disalin!");
    } catch (err) {
      console.error("Gagal menyalin link", err);
      toast.error("Oppss, link gagal disalin");
    }
  }

  function handleShareInstagram() {
    const url = encodeURIComponent(window.location.href);

    window.open(
      `https://www.instagram.com/stories/create/?url=${url}`,
      "_blank",
    );
  }

  function handleShareTwitter() {
    const text = encodeURIComponent("Cek event keren ini!");
    const url = encodeURIComponent(window.location.href);

    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
    );
  }

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) return <LoadingScreen />;

  return (
    <>
      <Navbar />

      <Layout title={data?.title}>
        <ButtonBack />

        <section className="base pt-[80px]">
          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid w-full max-w-[600px] items-start gap-6 lg:max-w-none lg:grid-cols-[55%_1fr] lg:gap-12 xl:gap-16">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={data?.image_url as string}
                  alt={`image ${data?.title}`}
                  width={800}
                  height={800}
                  className="aspect-square size-full object-cover object-center"
                />

                <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-green/30 to-orange/30" />
              </div>

              <div className="grid gap-8 lg:sticky lg:right-0 lg:top-[8rem]">
                <div className="grid gap-6 rounded-2xl bg-white p-8 shadow-[4px_2px_18px_rgba(0,0,0,0.1)]">
                  <h1 className="text-[22px] font-black capitalize leading-[120%] -tracking-wide text-black">
                    {data?.title}
                  </h1>

                  <IconContext.Provider
                    value={{
                      weight: "bold",
                      size: 18,
                      className: "text-orange",
                    }}
                  >
                    <div className="grid gap-2 text-sm text-gray">
                      {[
                        [
                          <CalendarMinus />,
                          `${formatEventDate(data?.start as string, data?.end as string)}`,
                        ],
                        [
                          <Clock />,
                          `${formatEventTime(data?.start as string, data?.end as string)}`,
                        ],
                        [<MapPin />, `${data?.location}`],
                      ].map(([icon, label], index) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-1"
                        >
                          {icon}
                          <p className="font-medium capitalize">{label}</p>
                        </div>
                      ))}

                      {data?.map_url ? (
                        <div className="inline-flex items-center gap-1">
                          <MapPinArea />

                          <a
                            href={data.map_url}
                            target="_blank"
                            className="text-sm text-gray hover:text-orange"
                          >
                            Link Maps
                          </a>
                        </div>
                      ) : null}

                      {data?.payment_url ? (
                        <div className="inline-flex items-center gap-1">
                          <Money />

                          <a
                            href={data.payment_url}
                            target="_blank"
                            className="text-sm text-gray hover:text-orange"
                          >
                            Link Pembayaran
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </IconContext.Provider>

                  <div className="mt-6 flex h-[40px] items-center justify-center rounded-xl border-2 border-gray/20 text-sm font-bold">
                    Event {data?.type == "free" ? "Gratis 🎉" : "Berbayar 💵"}
                  </div>
                </div>

                <div className="grid gap-4 rounded-2xl bg-white p-8 shadow-[4px_2px_18px_rgba(0,0,0,0.1)]">
                  <h2 className="text-[20px] font-bold -tracking-[1px] text-black">
                    Bagikan Event
                  </h2>

                  <IconContext.Provider
                    value={{
                      weight: "bold",
                      size: 20,
                      className: "text-black",
                    }}
                  >
                    <div className="inline-flex items-center gap-4">
                      <Button
                        isIconOnly
                        aria-label="Share Link"
                        variant="bordered"
                        radius="full"
                        onPress={handleShareLink}
                      >
                        <ShareNetwork />
                      </Button>

                      <Button
                        isIconOnly
                        aria-label="Share Instagram"
                        variant="bordered"
                        radius="full"
                        onPress={handleShareInstagram}
                      >
                        <InstagramLogo />
                      </Button>

                      <Button
                        isIconOnly
                        aria-label="Share Twitter"
                        variant="bordered"
                        radius="full"
                        onPress={handleShareTwitter}
                      >
                        <TwitterLogo />
                      </Button>
                    </div>
                  </IconContext.Provider>
                </div>
              </div>

              <p
                className="preventive-table preventive-list mt-6 list-outside font-medium leading-[180%] text-gray lg:mt-0"
                dangerouslySetInnerHTML={{ __html: data?.detail as string }}
              />
            </div>
          )}
        </section>
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: EventDetail;
  error?: any;
}> = async ({ params }) => {
  try {
    const response: SuccessResponse<EventDetail> = await fetcher({
      endpoint: `/events/${params?.slug}`,
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
