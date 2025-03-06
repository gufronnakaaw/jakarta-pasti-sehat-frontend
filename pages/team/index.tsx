import CardTeam from "@/components/card/CardTeam";
import CTAMain from "@/components/cta/CTAMain";
import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global";
import { Team } from "@/types/team";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function TeamPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Navbar />

      <Layout
        title="Tim Kami"
        description="Tim kami terdiri dari individu yang berdedikasi, berkomitmen, dan peduli terhadap kesehatan warga Jakarta."
      >
        {error ? (
          <ErrorPage error={error} />
        ) : (
          <>
            <section className="base pt-[160px] xl:pt-[180px]">
              <div className="wrapper">
                <div className="mb-8 grid justify-items-center gap-4 text-center">
                  <h1 className="title text-center">Tim Terbaik Kami 🧡</h1>
                  <p className="max-w-[800px] font-medium leading-[180%] text-gray">
                    Tim kami terdiri dari individu yang berdedikasi,
                    berkomitmen, dan peduli terhadap kesehatan warga Jakarta.
                    Kami bekerja bersama membuat perubahan nyata yang positif
                    untuk semua.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-3 lg:items-start xl:grid-cols-4 xl:gap-x-8">
                  {data?.map((team) => {
                    return (
                      <CardTeam
                        key={team.team_id}
                        {...{
                          fullname: team.fullname,
                          image_url: team.image_url,
                          position: team.position,
                          team_id: team.team_id,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="base">
              <CTAMain
                title={
                  <>
                    Anda ingin menjadi bagian dari{" "}
                    <br className="hidden lg:inline" />
                    keluarga Jakarta Pasti Sehat?
                  </>
                }
              />
            </section>
          </>
        )}
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: Team[];
  error?: any;
}> = async () => {
  try {
    const response: SuccessResponse<Team[]> = await fetcher({
      endpoint: "/teams",
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
