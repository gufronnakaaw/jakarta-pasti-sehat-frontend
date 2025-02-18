import CardDocumentation from "@/components/card/CardDocumentation";
import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SelectFilterData from "@/components/select/SelectFilterData";
import Layout from "@/components/wrapper/Layout";
import { Documentation } from "@/types/documentation";
import { SuccessResponse } from "@/types/global";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import useSWR from "swr";

function getUrl(query: ParsedUrlQuery) {
  if (query.filter) {
    return `/docs?filter=${query.filter}&page=${query.page ? query.page : 1}`;
  }

  return `/docs?page=${query.page ? query.page : 1}`;
}

type DocumentationResponse = {
  docs: Documentation[];
  page: number;
  total_docs: number;
  total_pages: number;
};

export default function DocumentationsPage({
  data,
  error,
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: docs } = useSWR<SuccessResponse<DocumentationResponse>>(
    {
      endpoint: getUrl(query as ParsedUrlQuery),
      method: "GET",
    },
    {
      fallbackData: data,
      revalidateOnMount: false,
      revalidateOnFocus: false,
    },
  );

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

                <SelectFilterData />
              </div>

              <div className="grid gap-4 lg:grid-cols-3 lg:items-start xl:grid-cols-4 xl:gap-x-8">
                {error ? (
                  <ErrorPage {...error} />
                ) : (
                  docs?.data.docs.map((doc) => {
                    return <CardDocumentation key={doc.doc_id} {...doc} />;
                  })
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: SuccessResponse<DocumentationResponse>;
  error?: any;
  query?: ParsedUrlQuery;
}> = async ({ query }) => {
  try {
    const response: SuccessResponse<DocumentationResponse> = await fetcher({
      endpoint: getUrl(query),
      method: "GET",
    });

    return {
      props: {
        data: response,
        query,
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
