import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/loading/LoadingScreen";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { Documentation } from "@/types/documentation";
import { SuccessResponse } from "@/types/global";
import { fetcher } from "@/utils/fetcher";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { Clock } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function DocumentationDetailsPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [mounted, setMounted] = useState(false);

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

        {error ? (
          <ErrorPage error={error} />
        ) : (
          <>
            <section className="base pt-[80px]">
              <div className={twMerge("wrapper", "lg:max-w-[900px]")}>
                <div className="grid gap-6">
                  <div className="inline-flex items-center gap-2 text-orange">
                    <p className="font-medium">{data?.pillar}</p>
                    <div className="size-1.5 rounded-full bg-orange" />
                    <p className="line-clamp-1 font-medium">
                      {data?.subpillar}
                    </p>
                  </div>

                  <h1 className="title">{data?.title}</h1>

                  <div className="mt-2 inline-flex items-center gap-1 text-gray">
                    <Clock weight="bold" size={18} />
                    <p className="font-medium">
                      Diupload pada:{" "}
                      {formatDateWithoutTime(data?.created_at as string)}
                    </p>
                  </div>
                </div>

                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={data?.thumbnail_url as string}
                    alt="thumbnail article"
                    width={800}
                    height={800}
                    className="aspect-square size-full object-cover object-center"
                  />

                  <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-green/30 to-orange/30" />
                </div>

                <div className="flex items-center justify-center pt-4">
                  <div className="h-[3px] w-[64px] border-t-3 border-orange" />
                  <div className="size-3 rounded-full border-3 border-orange" />
                  <div className="h-[3px] w-[64px] border-t-3 border-orange" />
                </div>
              </div>
            </section>

            <section className="base">
              <div className="w-full max-w-[600px] columns-[200px] lg:max-w-none xl:columns-[300px]">
                {data?.doc_images.map((item, index) => (
                  <div
                    key={index}
                    className="relative mb-4 overflow-hidden rounded-2xl"
                  >
                    <Image
                      priority
                      src={item.image_url}
                      alt={item.doc_image_id}
                      width={500}
                      height={500}
                      className="h-auto w-full"
                    />

                    {/* === overlay === */}
                    <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-green/30 to-orange/30" />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: Documentation;
  error?: any;
}> = async ({ params }) => {
  try {
    const response: SuccessResponse<Documentation> = await fetcher({
      endpoint: `/docs/${params?.slug}`,
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
