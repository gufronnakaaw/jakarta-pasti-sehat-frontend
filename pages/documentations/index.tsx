import CardDocumentation from "@/components/card/CardDocumentation";
import EmptyData from "@/components/Empty";
import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SelectFilterData from "@/components/select/SelectFilterData";
import Layout from "@/components/wrapper/Layout";
import { Documentation } from "@/types/documentation";
import { SuccessResponse } from "@/types/global";
import { fetcher } from "@/utils/fetcher";
import { getUrl } from "@/utils/string";
import { Pagination } from "@heroui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

type DocumentationResponse = {
  docs: Documentation[];
  page: number;
  total_docs: number;
  total_pages: number;
};

export default function DocumentationsPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <Layout title="Dokumentasi">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <div className="mb-8 grid justify-items-center gap-4 text-center">
              <h1 className="title text-center">Dokumentasi 📷</h1>
              <p className="max-w-[900px] font-medium leading-[180%] text-gray">
                Kami membagikan dokumentasi lengkap dari beberapa kegiatan yang
                telah kami lakukan. Temukan informasi mengenai acara, inisiatif,
                dan program yang bertujuan untuk meningkatkan kesehatan
                masyarakat Jakarta.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-[24px] font-black leading-[110%] -tracking-[1px] text-black lg:text-[28px]">
                  Daftar Gambar
                </h2>

                <SelectFilterData {...{ with_other: false }} />
              </div>

              <div className="grid gap-4 lg:grid-cols-3 lg:items-start xl:grid-cols-4 xl:gap-x-8">
                {error ? (
                  <ErrorPage {...error} />
                ) : data?.docs.length ? (
                  data?.docs.map((doc) => {
                    return <CardDocumentation key={doc.doc_id} {...doc} />;
                  })
                ) : (
                  <EmptyData text="Belum ada dokumentasi yang kami unggah" />
                )}
              </div>
            </div>

            {data?.docs.length ? (
              <Pagination
                isCompact
                showControls
                color="primary"
                page={data?.page as number}
                total={data?.total_pages as number}
                onChange={(e) => {
                  router.push({
                    query: {
                      ...router.query,
                      page: e,
                    },
                  });
                }}
                className="mt-4 justify-self-center"
              />
            ) : null}
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: DocumentationResponse;
  error?: any;
}> = async ({ query }) => {
  try {
    const response: SuccessResponse<DocumentationResponse> = await fetcher({
      endpoint: getUrl(query as ParsedUrlQuery, "/docs"),
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
