import CardArticle from "@/components/card/CardArticle";
import CTAMain from "@/components/cta/CTAMain";
import EmptyData from "@/components/Empty";
import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SearchInput from "@/components/SearchInput";
import SelectFilterData from "@/components/select/SelectFilterData";
import Layout from "@/components/wrapper/Layout";
import { Article } from "@/types/article";
import { SuccessResponse } from "@/types/global";
import { fetcher } from "@/utils/fetcher";
import { getUrl } from "@/utils/string";
import { Pagination } from "@heroui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type ArticleResponse = {
  articles: Article[];
  page: number;
  total_articles: number;
  total_pages: number;
};

export default function ArticlesPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 800);

  useEffect(() => {
    if (searchValue) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          filter: searchValue,
        },
      });
    } else {
      router.push({
        pathname: router.pathname,
      });
    }
  }, [searchValue]);

  return (
    <>
      <Navbar />

      <Layout title="Artikel">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <div className="mb-8 grid justify-items-center gap-4 text-center">
              <h1 className="title text-center">Artikel 📰</h1>
              <p className="max-w-[600px] font-medium leading-[180%] text-gray">
                Temukan berbagai artikel menarik yang membahas kesehatan dan
                pola hidup sehat untuk mendukung kesehatan masyarakat Jakarta.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SearchInput
                  placeholder="Cari Artikel..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  onClear={() => setSearch("")}
                />

                <SelectFilterData />
              </div>

              {error ? (
                <ErrorPage error={error} />
              ) : data?.articles.length ? (
                <div className="grid gap-4 lg:grid-cols-3 lg:items-start xl:grid-cols-4 xl:gap-x-8">
                  {data?.articles.map((article) => (
                    <CardArticle key={article.article_id} {...article} />
                  ))}
                </div>
              ) : (
                <EmptyData text="Oopss! Sepertinya belum ada artikel yang ditulis" />
              )}

              {data?.articles.length ? (
                <Pagination
                  isCompact
                  showControls
                  color="primary"
                  page={data.page as number}
                  total={data.total_pages as number}
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
          </div>
        </section>

        <section className="base">
          <CTAMain
            title={
              <>
                Dapatkan artikel terkini dari{" "}
                <br className="hidden lg:inline" />
                kami seputar kesehatan!
              </>
            }
          />
        </section>
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: ArticleResponse;
  error?: any;
}> = async ({ query }) => {
  try {
    const response: SuccessResponse<ArticleResponse> = await fetcher({
      endpoint: getUrl(query as ParsedUrlQuery, "/articles"),
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
