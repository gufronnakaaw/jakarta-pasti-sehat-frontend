import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { Article } from "@/types/article";
import { SuccessResponse } from "@/types/global";
import { fetcher } from "@/utils/fetcher";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { CalendarMinus, Clock, User } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function ArticleDetailsPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Navbar />

      <Layout title={data?.title}>
        <ButtonBack />

        {error ? (
          <ErrorPage error={error} />
        ) : (
          <section className="base pt-[80px]">
            <div className={twMerge("wrapper", "lg:max-w-[900px]")}>
              <div className="grid gap-6">
                <div className="inline-flex items-center gap-2 text-orange">
                  <p className="font-medium">{data?.pillar}</p>
                  <div className="size-1.5 rounded-full bg-orange" />
                  <p className="line-clamp-1 font-medium">{data?.subpillar}</p>
                </div>

                <div className="grid gap-2">
                  <h1 className="title">{data?.title}</h1>
                  <p className="font-medium leading-[180%] text-gray">
                    {data?.description}
                  </p>
                </div>

                <div className="mt-2 inline-flex items-center gap-6 text-gray">
                  <div className="inline-flex items-center gap-1">
                    <CalendarMinus weight="bold" size={18} />
                    <p className="font-medium">
                      {formatDateWithoutTime(data?.created_at as string)}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1">
                    <Clock weight="bold" size={18} />
                    <p className="font-medium">{data?.reading_time}</p>
                  </div>

                  <div className="inline-flex items-center gap-1">
                    <User weight="bold" size={18} />
                    <p className="font-medium">{data?.created_by}</p>
                  </div>
                </div>
              </div>

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

              <div className="flex items-center justify-center py-4">
                <div className="h-[3px] w-[64px] border-t-3 border-orange" />
                <div className="size-3 rounded-full border-3 border-orange" />
                <div className="h-[3px] w-[64px] border-t-3 border-orange" />
              </div>

              <p
                className="font-medium leading-[180%] text-gray"
                dangerouslySetInnerHTML={{ __html: data?.content as string }}
              />
            </div>
          </section>
        )}
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: Article;
  error?: any;
}> = async ({ params }) => {
  try {
    const response: SuccessResponse<Article> = await fetcher({
      endpoint: `/articles/${params?.slug}`,
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
