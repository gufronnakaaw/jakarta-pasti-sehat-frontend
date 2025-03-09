import ButtonDashbaord from "@/components/button/ButtonDashboard";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { SuccessResponse } from "@/types/global";
import { formatDayWithoutTime } from "@/utils/formatDate";
import {
  CalendarStar,
  HandHeart,
  Handshake,
  IconContext,
  Newspaper,
  Users,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

type Dashboard = {
  total_articles: number;
  total_events: number;
  total_volunteers: number;
  total_partners: number;
  total_volappls: number;
  total_crrappls: number;
};

export default function DashboardPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading, error } = useSWR<SuccessResponse<Dashboard>>({
    endpoint: "/dashboard",
    method: "GET",
    token,
  });
  const [time, setTime] = useState(new Date());
  const [client, setClient] = useState<boolean>(false);
  const formatTime = (num: number) => String(num).padStart(2, "0");

  useEffect(() => {
    setClient(true);

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!client) {
    return;
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Dashboard" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <div className="flex items-end justify-between gap-4">
            <TitleText
              title="Selamat Datang 👋"
              text={
                <>
                  Berikut rangkuman web{" "}
                  <Link
                    href="https://jakartapastisehat.com"
                    target="_blank"
                    className="font-bold text-orange hover:underline"
                  >
                    jakartapastisehat.com
                  </Link>
                </>
              }
            />

            <span className="text-sm font-bold text-black">
              ⏰ {formatDayWithoutTime(new Date())}{" "}
              {`${formatTime(time.getHours())}:${formatTime(time.getMinutes())}`}
            </span>
          </div>

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid gap-6 rounded-xl border-[2px] border-gray/15 bg-white px-16 py-8">
              <h4 className="font-bold text-black">
                Data Web Jakarta Pasti Sehat 💊
              </h4>

              <IconContext.Provider
                value={{
                  weight: "fill",
                  size: 64,
                  className: "text-orange",
                }}
              >
                <div className="grid grid-cols-2 divide-x-2 divide-gray/20">
                  <div className="grid divide-y-2 divide-gray/20 pr-12">
                    <div className="grid pb-8">
                      <div className="inline-flex items-center gap-4">
                        <Newspaper />

                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray">
                            Total Artikel
                          </p>
                          <h6 className="text-[32px] font-extrabold text-black">
                            {data?.data.total_articles}
                          </h6>
                        </div>

                        <ButtonDashbaord path="/articles" />
                      </div>
                    </div>

                    <div className="grid py-8">
                      <div className="inline-flex items-center gap-4">
                        <HandHeart />

                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray">
                            Total Volunteer
                          </p>
                          <h6 className="text-[32px] font-extrabold text-black">
                            {data?.data.total_volunteers}
                          </h6>
                        </div>

                        <ButtonDashbaord path="/volunteers" />
                      </div>
                    </div>

                    <div className="grid pt-8">
                      <div className="inline-flex items-center gap-4">
                        <Users />

                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray">
                            Total Pelamar Volunteer
                          </p>
                          <h6 className="text-[32px] font-extrabold text-black">
                            {data?.data.total_volappls}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid divide-y-2 divide-gray/20 pl-12">
                    <div className="grid pb-8">
                      <div className="inline-flex items-center gap-4">
                        <CalendarStar />

                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray">
                            Total Event
                          </p>
                          <h6 className="text-[32px] font-extrabold text-black">
                            {data?.data.total_events}
                          </h6>
                        </div>

                        <ButtonDashbaord path="/events" />
                      </div>
                    </div>

                    <div className="grid py-8">
                      <div className="inline-flex items-center gap-4">
                        <Handshake />

                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray">
                            Total Mitra
                          </p>
                          <h6 className="text-[32px] font-extrabold text-black">
                            {data?.data.total_partners}
                          </h6>
                        </div>

                        <ButtonDashbaord path="/partners" />
                      </div>
                    </div>

                    <div className="grid pt-8">
                      <div className="inline-flex items-center gap-4">
                        <Users />

                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray">
                            Total Pelamar Karir
                          </p>
                          <h6 className="text-[32px] font-extrabold text-black">
                            {data?.data.total_crrappls}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </IconContext.Provider>
            </div>
          )}
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token: string;
}> = async ({ req }) => {
  const token = req.headers["access_token"] as string;

  return {
    props: {
      token,
    },
  };
};
