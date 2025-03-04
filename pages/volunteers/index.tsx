import CardVolunteer from "@/components/card/CardVolunteer";
import EmptyData from "@/components/Empty";
import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SearchInput from "@/components/SearchInput";
import SelectFilterData from "@/components/select/SelectFilterData";
import Layout from "@/components/wrapper/Layout";
import { useSearch } from "@/hooks/useSearch";
import { SuccessResponse } from "@/types/global";
import { Volunteer } from "@/types/volunteer";
import { fetcher } from "@/utils/fetcher";
import { getUrl } from "@/utils/string";
import { Pagination } from "@heroui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";

type VolunteerResponse = {
  vols: Volunteer[];
  page: number;
  total_vols: number;
  total_pages: number;
};

export default function VolunteersPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const { searchValue, search, setSearch } = useSearch(800);

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

      <Layout title="Volunteer">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <div className="mb-8 grid justify-items-center gap-4 text-center">
              <h1 className="title text-center">
                Jadi Relawan di Jakarta Pasti Sehat ✨
              </h1>
              <p className="max-w-[800px] font-medium leading-[180%] text-gray">
                Sebagai relawan, kamu akan terlibat dalam berbagai kegiatan
                seru, mulai dari edukasi kesehatan, kampanye hidup sehat, hingga
                aksi sosial untuk membantu masyarakat yang membutuhkan.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SearchInput
                  placeholder="Cari Posisi..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  onClear={() => setSearch("")}
                />

                <SelectFilterData />
              </div>

              {error ? (
                <ErrorPage error={error} />
              ) : data?.vols.length ? (
                <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-8">
                  {data?.vols.map((vol) => {
                    return <CardVolunteer key={vol.volunteer_id} {...vol} />;
                  })}
                </div>
              ) : (
                <EmptyData text="Maaf, kami belum buka pendaftaran volunteer untuk saat ini" />
              )}

              {data?.vols.length ? (
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
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: VolunteerResponse;
  error?: any;
}> = async ({ query }) => {
  try {
    const response: SuccessResponse<VolunteerResponse> = await fetcher({
      endpoint: getUrl(query as ParsedUrlQuery, "/volunteers"),
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
