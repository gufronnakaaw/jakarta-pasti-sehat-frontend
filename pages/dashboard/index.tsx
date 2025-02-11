import ButtonDashbaord from "@/components/button/ButtonDashboard";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { formatDayWithoutTime } from "@/utils/formatDate";
import {
  CalendarStar,
  HandHeart,
  IconContext,
  Newspaper,
  Users,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
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

  return (
    <DashboardLayout title="Dashboard" className="scrollbar-hide">
      <DashboardContainer>
        <section className="grid gap-8">
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
                          Total Arikel
                        </p>
                        <h6 className="text-[32px] font-extrabold text-black">
                          0
                        </h6>
                      </div>

                      <ButtonDashbaord path="/articles" />
                    </div>
                  </div>

                  <div className="grid pt-8">
                    <div className="inline-flex items-center gap-4">
                      <CalendarStar />

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray">
                          Total Event
                        </p>
                        <h6 className="text-[32px] font-extrabold text-black">
                          0
                        </h6>
                      </div>

                      <ButtonDashbaord path="/events" />
                    </div>
                  </div>
                </div>

                <div className="grid divide-y-2 divide-gray/20 pl-12">
                  <div className="grid pb-8">
                    <div className="inline-flex items-center gap-4">
                      <HandHeart />

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray">
                          Total Volunteer
                        </p>
                        <h6 className="text-[32px] font-extrabold text-black">
                          0
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
                          Total Pelamar
                        </p>
                        <h6 className="text-[32px] font-extrabold text-black">
                          0
                        </h6>
                      </div>

                      <ButtonDashbaord path="/careers" />
                    </div>
                  </div>
                </div>
              </div>
            </IconContext.Provider>
          </div>
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
