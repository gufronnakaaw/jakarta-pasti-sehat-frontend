import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global";
import { Team } from "@/types/team";
import { fetcher } from "@/utils/fetcher";
import {
  GraduationCap,
  IconContext,
  InstagramLogo,
  LinkedinLogo,
  TiktokLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";

function getIcon(name: "TIKTOK" | "YOUTUBE" | "INSTAGRAM" | "LINKEDIN") {
  if (name === "LINKEDIN") return <LinkedinLogo />;
  if (name === "INSTAGRAM") return <InstagramLogo />;
  if (name === "YOUTUBE") return <YoutubeLogo />;
  if (name === "TIKTOK") return <TiktokLogo />;
}

export default function DetailTeamPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Navbar />

      <Layout title={data?.fullname}>
        <ButtonBack />

        <section className="base pt-[80px]">
          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid w-full max-w-[600px] items-start gap-16 lg:max-w-none lg:grid-cols-[55%_1fr] lg:gap-24">
              <div className="mt-16 grid gap-32 md:mt-32 md:gap-64">
                <div className="grid gap-4">
                  <h1 className="text-[38px] font-black leading-[110%] -tracking-[2px] text-black md:text-[48px]">
                    {data?.fullname}
                  </h1>
                  <p className="text-xl font-medium -tracking-[1px] text-orange">
                    {data?.position.name}
                  </p>
                </div>

                <div className="grid gap-4">
                  <h1 className="text-[28px] font-black leading-[110%] -tracking-[2px] text-black md:text-[32px]">
                    Deskripsi Singkat
                  </h1>

                  <div
                    className="preventive-list preventive-table list-outside font-medium leading-[180%] text-gray"
                    dangerouslySetInnerHTML={{
                      __html: data?.description as string,
                    }}
                  />
                </div>
              </div>

              <div className="grid gap-12">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={data?.image_url as string}
                    alt={`image ${data?.fullname}`}
                    width={800}
                    height={800}
                    className="aspect-square size-full scale-105 object-cover object-center"
                  />
                  <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-green/30 to-orange/30" />
                </div>

                <IconContext.Provider
                  value={{
                    weight: "bold",
                    size: 20,
                  }}
                >
                  {data?.educations.length ? (
                    <div className="grid gap-4">
                      <h1 className="text-[28px] font-extrabold -tracking-[1px] text-black md:text-[32px]">
                        Riwayat Pendidikan
                      </h1>

                      <div className="grid gap-2">
                        {data?.educations.map((education) => (
                          <div
                            key={education.education_id}
                            className="inline-flex items-center gap-2 text-orange"
                          >
                            <GraduationCap />
                            <p className="font-medium capitalize">
                              {education.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {data?.social_links.length ? (
                    <div className="grid gap-4">
                      <h1 className="text-[28px] font-extrabold -tracking-[1px] text-black md:text-[32px]">
                        Sosial Media
                      </h1>

                      <div className="grid gap-2">
                        {data?.social_links.map((social) => (
                          <div
                            key={social.socmed_id}
                            className="inline-flex items-center gap-2 text-orange"
                          >
                            {getIcon(social.name)}
                            <a
                              href={social.url}
                              target="_blank"
                              className="font-medium capitalize"
                            >
                              {social.name.toLowerCase()}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </IconContext.Provider>
              </div>
            </div>
          )}
        </section>
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: Team;
  error?: any;
}> = async ({ params }) => {
  try {
    const response: SuccessResponse<Team> = await fetcher({
      endpoint: `/teams/${params?.teamId as string}`,
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
