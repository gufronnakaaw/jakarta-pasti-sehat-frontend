import CardPartner from "@/components/card/CardPartner";
import CTAMain from "@/components/cta/CTAMain";
import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global";
import { Partner } from "@/types/partner";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function PartnersPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Navbar />

      <Layout title="Mitra Kami">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <h1 className="title mb-4 text-center">Mitra Kami 🤝</h1>

            {error ? (
              <ErrorPage error={error} />
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-4 xl:gap-8">
                {data?.map((partner) => (
                  <CardPartner key={partner.partner_id} {...partner} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="base">
          <CTAMain
            title={
              <>
                Ayo menjadi bagian dari mitra kami!{" "}
                <br className="hidden lg:inline" />
                Bersama membangun Jakarta Pasti Sehat
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
  data?: Partner[];
  error?: any;
}> = async () => {
  try {
    const response: SuccessResponse<Partner[]> = await fetcher({
      endpoint: "/partners",
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
