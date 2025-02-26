import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import { PublicDetailCareer } from "@/types/career";
import { SuccessResponse } from "@/types/global";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { Button, Input, Textarea } from "@heroui/react";
import {
  CheckCircle,
  Clock,
  IconContext,
  MapPin,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export default function CareerDetailsPage({
  data,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
    instagram_url: "",
    portofolio_url: "",
  });

  async function handleSaveCareerApplicant() {
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(input).forEach(([key, value]) => {
        if (key !== "instagram_url" && key != "portofolio_url") {
          formData.append(key, value);
        }

        if (
          (key == "instagram_url" || key == "portofolio_url") &&
          value != ""
        ) {
          formData.append(key, `https://www.instagram.com/${value}`);
        }
      });

      formData.append("cv", file as Blob);
      formData.append("career_id", data?.career_id as string);

      await fetcher({
        endpoint: "/careers/applicants",
        method: "POST",
        file: true,
        data: formData,
      });

      setFile(null);
      setInput({
        fullname: "",
        email: "",
        phone_number: "",
        address: "",
        instagram_url: "",
        portofolio_url: "",
      });

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
      toast.error("Terjadi kesalahan saat mengirim data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <Layout title={error ? "Karir" : data?.title}>
        <ButtonBack />

        {error ? (
          <ErrorPage error={error} />
        ) : (
          <section className="base pt-[80px]">
            <div className={twMerge("wrapper", "lg:max-w-[900px] lg:gap-16")}>
              <div className="grid gap-4">
                <h1 className="title">{data?.title}</h1>

                <div className="inline-flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full border-2 border-orange text-orange [padding:4px_12px]">
                    <MapPin weight="fill" size={18} />
                    <p className="text-[12px] font-bold capitalize md:text-base">
                      {data?.location}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border-2 border-orange text-orange [padding:4px_12px]">
                    <Clock weight="fill" size={18} />
                    <p className="text-[12px] font-bold capitalize md:text-base">
                      {data?.type}
                    </p>
                  </div>
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
                      value={input.fullname}
                    />

                    <Input
                      isRequired
                      type="text"
                      variant="flat"
                      label="Email"
                      labelPlacement="outside"
                      placeholder="Contoh: jhon.doe@mail.com"
                      classNames={customStyleInput}
                      onChange={(e) =>
                        setInput({ ...input, email: e.target.value })
                      }
                      value={input.email}
                    />

                    <Input
                      isRequired
                      type="text"
                      variant="flat"
                      label="Nomor HP/WA"
                      labelPlacement="outside"
                      placeholder="Contoh: 08XXXXXXXXX"
                      classNames={customStyleInput}
                      onChange={(e) =>
                        setInput({ ...input, phone_number: e.target.value })
                      }
                      value={input.phone_number}
                    />

                    <Textarea
                      isRequired
                      type="text"
                      variant="flat"
                      label="Alamat Lengkap"
                      labelPlacement="outside"
                      placeholder="Contoh: Jl. XXX"
                      maxRows={5}
                      classNames={customStyleInput}
                      onChange={(e) =>
                        setInput({ ...input, address: e.target.value })
                      }
                      value={input.address}
                    />

                    <div className="flex flex-wrap items-center gap-4 md:grid md:grid-cols-2">
                      <Input
                        type="text"
                        variant="flat"
                        label={
                          <p className="text-sm font-medium text-black">
                            Instagram{" "}
                            <span className="text-[12px] text-gray">
                              (Opsional)
                            </span>
                          </p>
                        }
                        labelPlacement="outside"
                        placeholder="Contoh: jhon.doe"
                        classNames={customStyleInput}
                        onChange={(e) =>
                          setInput({ ...input, instagram_url: e.target.value })
                        }
                        value={input.instagram_url}
                      />

                      <Input
                        type="text"
                        variant="flat"
                        label={
                          <p className="text-sm font-medium text-black">
                            Portofolio{" "}
                            <span className="text-[12px] text-gray">
                              (Opsional)
                            </span>
                          </p>
                        }
                        labelPlacement="outside"
                        placeholder="Contoh: www.yourlink.com/XXXXXX"
                        classNames={customStyleInput}
                        onChange={(e) =>
                          setInput({ ...input, portofolio_url: e.target.value })
                        }
                        value={input.portofolio_url}
                      />
                    </div>

                    <div className="mt-4 grid gap-4">
                      <div>
                        <h2 className="mb-1 text-[20px] font-bold text-black">
                          Dokumen (CV / Resume)
                        </h2>
                        <p className="max-w-[550px] text-sm font-medium leading-[180%] text-gray">
                          Harap unggah dokumen pendukung Anda dalam bahasa
                          Indonesia / Inggris agar kami dapat mengenal Anda
                          lebih baik. Format:{" "}
                          <span className="font-bold text-orange">.pdf</span>.
                          Ukuran Maksimal:{" "}
                          <span className="font-bold text-orange">5MB</span>
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
                          const file = e.target.files?.[0];

                          if (!file) {
                            setFile(null);
                            return;
                          }

                          if (file.type !== "application/pdf") {
                            toast.error("Ekstensi file harus pdf");
                            setFile(null);
                            return;
                          }

                          if (file.size > 5 * 1024 * 1024) {
                            toast.error("Ukuran file maksimal 5 MB");
                            setFile(null);
                            return;
                          }

                          setFile(file);
                        }}
                      />
                    </div>
                  </div>
                </IconContext.Provider>

                <Button
                  color="primary"
                  endContent={<PaperPlaneTilt weight="bold" size={18} />}
                  className="mt-12 w-max px-8 font-bold"
                  onPress={handleSaveCareerApplicant}
                  isDisabled={
                    !file ||
                    loading ||
                    Object.entries(input).some(
                      ([key, value]) =>
                        key !== "instagram_url" &&
                        key !== "portofolio_url" &&
                        !value.trim(),
                    )
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
  data?: PublicDetailCareer;
  error?: any;
}> = async ({ params }) => {
  try {
    const response: SuccessResponse<PublicDetailCareer> = await fetcher({
      endpoint: `/careers/${params?.slug}`,
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
