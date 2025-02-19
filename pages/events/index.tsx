import CardEvent from "@/components/card/CardEvent";
import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SelectFilterData from "@/components/select/SelectFilterData";
import Layout from "@/components/wrapper/Layout";
import { Event } from "@/types/event";
import { SuccessResponse } from "@/types/global";
import { fetcher } from "@/utils/fetcher";
import { getUrl } from "@/utils/string";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";

type EventResponse = {
  events: Event[];
  page: number;
  total_events: number;
  total_pages: number;
};

export default function EventsPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Navbar />

      <Layout title="Event">
        <section className="base pt-[160px] xl:pt-[180px]">
          <div className="wrapper">
            <div className="mb-8 grid justify-items-center gap-4 text-center">
              <h1 className="title text-center">Event 🎉</h1>
              <p className="max-w-[900px] font-medium leading-[180%] text-gray">
                Jelajahi beragam event seru yang menginspirasi gaya hidup sehat
                dan mendukung kesehatan masyarakat Jakarta. Jangan lewatkan
                keseruannya!
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-[24px] font-black leading-[110%] -tracking-[1px] text-black lg:text-[28px]">
                  Daftar Event
                </h2>

                <SelectFilterData />
              </div>

              {error ? (
                <ErrorPage error={error} />
              ) : (
                <div className="grid gap-4 lg:grid-cols-3 lg:items-start xl:grid-cols-4 xl:gap-x-8">
                  {data?.events.map((event) => {
                    return <CardEvent key={event.event_id} {...event} />;
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: EventResponse;
  error?: any;
}> = async ({ query }) => {
  try {
    const response: SuccessResponse<EventResponse> = await fetcher({
      endpoint: getUrl(query as ParsedUrlQuery, "/events"),
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
