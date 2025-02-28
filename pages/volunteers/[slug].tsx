import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/loading/LoadingScreen";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global";
import { VolunteerDetail } from "@/types/volunteer";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { formatDateWithoutTime } from "@/utils/formatDate";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import {
  CalendarMinus,
  CheckCircle,
  IconContext,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export default function VolunteerDetails({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [level, setLevel] = useState<React.Key | null>("");
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    institution: "",
    study_program: "",
    reason: "",
  });
  const [cv, setCv] = useState<File | null>(null);
  const [follow, setFollow] = useState<File | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) return <LoadingScreen />;

  async function handleVolunteerApplicant() {
    try {
      const formData = new FormData();

      Object.entries(input).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("level", `${level}`.toUpperCase());
      formData.append("cv", cv as Blob);
      formData.append("follow", follow as Blob);
      formData.append("volunteer_id", data?.volunteer_id as string);

      await fetcher({
        endpoint: "/volunteers/applicants",
        method: "POST",
        file: true,
        data: formData,
      });

      setLevel("");
      setInput({
        fullname: "",
        email: "",
        institution: "",
        study_program: "",
        reason: "",
      });
      setCv(null);
      setFollow(null);

      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } pointer-events-auto flex w-full max-w-md rounded-lg bg-primary shadow-lg ring-1 ring-primary ring-opacity-5`}
          >
            <div className="w-0 flex-1 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <CheckCircle weight="bold" size={25} className="text-white" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-sans text-sm font-bold text-white">
                    Form Anda telah berhasil dikirim
                  </p>
                  <p className="mt-1 font-sans text-sm text-white">
                    Jika terpilih, tim kami akan segera menghubungi Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
        {
          duration: 4000,
        },
      );
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat mengirim form");
    }
  }

  return (
    <>
      <Navbar />

      <Layout title={data?.title}>
        <ButtonBack />

        {error ? (
          <ErrorPage error={error} />
        ) : (
          <section className="base pt-[80px]">
            <div className={twMerge("wrapper", "lg:max-w-[900px] lg:gap-16")}>
              <div className="grid gap-4">
                <div className="inline-flex items-center gap-2 text-orange">
                  <p className="font-medium">{data?.pillar}</p>
                  <div className="size-1.5 rounded-full bg-orange" />
                  <p className="line-clamp-1 font-medium">{data?.subpillar}</p>
                </div>

                <h1 className="title">{data?.title}</h1>

                <div className="inline-flex items-center gap-2 text-gray">
                  <CalendarMinus weight="bold" size={18} />
                  <p className="font-medium">
                    Diupload:{" "}
                    {formatDateWithoutTime(data?.created_at as string)}
                  </p>
                </div>
              </div>

              <div className="grid gap-8">
                <div className="grid gap-2">
                  <h1 className="text-[28px] font-extrabold -tracking-[1px] text-black">
                    Requirements:
                  </h1>

                  <p
                    className="font-medium text-gray"
                    dangerouslySetInnerHTML={{
                      __html: data?.requirements as string,
                    }}
                  />
                </div>

                {data?.responsibilities ? (
                  <div className="grid gap-2">
                    <h1 className="text-[28px] font-extrabold -tracking-[1px] text-black">
                      Responsibilities:
                    </h1>

                    <p
                      className="font-medium text-gray"
                      dangerouslySetInnerHTML={{
                        __html: data.responsibilities,
                      }}
                    />
                  </div>
                ) : null}
              </div>

              <div className="grid gap-4">
                <h1 className="text-[28px] font-extrabold -tracking-[1px] text-black">
                  Personal Detail:
                </h1>

                <IconContext.Provider
                  value={{
                    weight: "bold",
                    size: 18,
                    className: "text-gray",
                  }}
                >
                  <div className="grid gap-4">
                    <Input
                      isRequired
                      type="text"
                      variant="flat"
                      label="Nama Lengkap"
                      labelPlacement="outside"
                      placeholder="Contoh: Jhon Doe"
                      classNames={customStyleInput}
                      onChange={(e) =>
                        setInput({ ...input, fullname: e.target.value })
                      }
                    />

                    <Input
                      isRequired
                      type="text"
                      variant="flat"
                      label="Email"
                      labelPlacement="outside"
                      placeholder="Contoh: jhon.doe@gmail.com"
                      classNames={customStyleInput}
                      onChange={(e) =>
                        setInput({ ...input, email: e.target.value })
                      }
                    />

                    <Input
                      isRequired
                      type="text"
                      variant="flat"
                      label="Asal Instansi/Universitas"
                      labelPlacement="outside"
                      placeholder="Contoh: Universitas Pancasila"
                      classNames={customStyleInput}
                      onChange={(e) =>
                        setInput({ ...input, institution: e.target.value })
                      }
                    />

                    <div className="flex flex-wrap items-center gap-4 md:grid md:grid-cols-[max-content_1fr]">
                      <Autocomplete
                        isRequired
                        aria-label="select edu level data"
                        variant="flat"
                        placeholder="Pilih Tingkatan"
                        label="Tingkatan Pendidikan"
                        labelPlacement="outside"
                        defaultItems={[
                          { key: "sma", label: "SMA" },
                          { key: "smk", label: "SMK" },
                          { key: "d1", label: "D1" },
                          { key: "d2", label: "D2" },
                          { key: "d3", label: "D3" },
                          { key: "d4", label: "D4" },
                          { key: "s1", label: "S1" },
                          { key: "s2", label: "S2" },
                          { key: "s3", label: "S3" },
                        ]}
                        selectedKey={level as string}
                        onSelectionChange={setLevel}
                        classNames={{
                          base: "w-full sm:w-[250px]",
                        }}
                      >
                        {(item) => (
                          <AutocompleteItem key={item.key}>
                            {item.label}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>

                      <Input
                        isRequired
                        type="text"
                        variant="flat"
                        label="Program Studi"
                        labelPlacement="outside"
                        placeholder="Contoh: Farmasi"
                        classNames={customStyleInput}
                        onChange={(e) =>
                          setInput({ ...input, study_program: e.target.value })
                        }
                      />
                    </div>

                    <Textarea
                      isRequired
                      type="text"
                      variant="flat"
                      label="Alasan Mengikuti Volunteer"
                      labelPlacement="outside"
                      placeholder="Tuliskan Alasan Kamu"
                      maxRows={5}
                      classNames={customStyleInput}
                      onChange={(e) =>
                        setInput({ ...input, reason: e.target.value })
                      }
                    />

                    <div className="mt-4 grid gap-4">
                      <div>
                        <h2 className="mb-1 text-[20px] font-bold text-black">
                          Dokumen (CV / Resume)
                        </h2>
                        <p className="max-w-[550px] text-sm font-medium leading-[180%] text-gray">
                          Harap unggah dokumen pendukung Anda dalam bahasa
                          Indonesia / bahasa Inggris agar kami dapat mengenal
                          Anda lebih baik. Format:{" "}
                          <span className="font-bold text-orange">pdf</span>.
                          Ukuran Maksimal:{" "}
                          <span className="font-bold text-orange">5 MB</span>
                        </p>
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        variant="flat"
                        labelPlacement="outside"
                        placeholder="CV / Resume"
                        classNames={{
                          input:
                            "block w-full flex-1 text-sm text-gray file:mr-4 file:py-1 file:px-3 file:border-0 file:rounded-lg file:bg-orange file:text-sm file:font-sans file:font-semibold file:text-white hover:file:bg-orange/80",
                        }}
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0];

                          if (!selectedFile) {
                            setCv(null);
                            return;
                          }

                          if (selectedFile.type !== "application/pdf") {
                            toast.error("Ekstensi file harus pdf");
                            setCv(null);
                            return;
                          }

                          if (selectedFile.size > 5 * 1024 * 1024) {
                            toast.error("Ukuran file maksimal 5 MB");
                            setCv(null);
                            return;
                          }

                          setCv(selectedFile);
                        }}
                      />
                    </div>

                    <div className="mt-4 grid gap-4">
                      <div>
                        <h2 className="mb-1 text-[20px] font-bold text-black">
                          Bukti Follow Medsos
                        </h2>
                        <p className="max-w-[560px] text-sm font-medium leading-[180%] text-gray">
                          Bukti follow dan bagikan postingan Open Recruitment
                          Volunteer Jakarta Pasti Sehat di story Instagram{" "}
                          <Link
                            href="https://instagram.com/pastisehat.jkt"
                            target="_blank"
                            className="font-bold text-orange hover:underline"
                          >
                            @pastisehat.jkt
                          </Link>
                          . Format:{" "}
                          <span className="font-bold text-orange">
                            png/jpg/jpeg
                          </span>
                          . Ukuran Maksimal:{" "}
                          <span className="font-bold text-orange">2 MB</span>
                        </p>
                      </div>

                      <Input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        variant="flat"
                        labelPlacement="outside"
                        placeholder="Bukti Follow Medsos"
                        classNames={{
                          input:
                            "block w-full flex-1 text-sm text-gray file:mr-4 file:py-1 file:px-3 file:border-0 file:rounded-lg file:bg-orange file:text-sm file:font-sans file:font-semibold file:text-white hover:file:bg-orange/80",
                        }}
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0];

                          if (!selectedFile) {
                            setFollow(null);
                            return;
                          }

                          const validTypes = [
                            "image/png",
                            "image/jpg",
                            "image/jpeg",
                          ];

                          if (!validTypes.includes(selectedFile.type)) {
                            toast.error(
                              "Ekstensi file harus png, jpg, atau jpeg",
                            );
                            setFollow(null);
                            return;
                          }

                          if (selectedFile.size > 2 * 1024 * 1024) {
                            toast.error("Ukuran file maksimal 2 MB");
                            setFollow(null);
                            return;
                          }

                          setFollow(selectedFile);
                        }}
                      />
                    </div>
                  </div>
                </IconContext.Provider>

                <Button
                  color="primary"
                  endContent={<PaperPlaneTilt weight="bold" size={18} />}
                  className="mt-12 w-max px-8 font-bold"
                  onPress={handleVolunteerApplicant}
                  isDisabled={
                    !Object.values(input).every(
                      (value) => value.trim() !== "",
                    ) ||
                    !level ||
                    !cv ||
                    !follow
                  }
                >
                  Kirim Lamaran
                </Button>
              </div>
            </div>
          </section>
        )}
      </Layout>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data?: VolunteerDetail;
  error?: any;
}> = async ({ params }) => {
  try {
    const response: SuccessResponse<VolunteerDetail> = await fetcher({
      endpoint: `/volunteers/${params?.slug}`,
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
