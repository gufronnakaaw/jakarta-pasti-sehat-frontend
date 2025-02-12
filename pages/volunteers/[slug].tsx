import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import SelectEducationLevel from "@/components/select/SelectEducationLevel";
import Layout from "@/components/wrapper/Layout";
import careerData from "@/data/careers.json";
import { customStyleInput } from "@/utils/customStyleInput";
import { Button, Input, Textarea } from "@heroui/react";
import {
  CalendarMinus,
  IconContext,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function VolunteerDetails() {
  return (
    <>
      <Navbar />

      <Layout title="Open Reqruitment Volunteer Batch 2 Jakarta Pasti Sehat">
        <ButtonBack />

        <section className="base pt-[80px]">
          <div className={twMerge("wrapper", "lg:max-w-[900px] lg:gap-16")}>
            <div className="grid gap-4">
              <div className="inline-flex items-center gap-2 text-orange">
                <p className="font-medium">Pilar 1</p>
                <div className="size-1.5 rounded-full bg-orange" />
                <p className="line-clamp-1 font-medium">
                  Penyakit Tidak Menular
                </p>
              </div>

              <h1 className="title">
                Open Reqruitment Volunteer Batch 2 Jakarta Pasti Sehat
              </h1>

              <div className="inline-flex items-center gap-2 text-gray">
                <CalendarMinus weight="bold" size={18} />
                <p className="font-medium">Diupload: Jumat, 7 Februari 2025</p>
              </div>
            </div>

            <div className="grid gap-8">
              <div className="grid gap-2">
                <h1 className="text-[28px] font-extrabold -tracking-[1px] text-black">
                  Requirements:
                </h1>

                <ul className="grid list-outside list-disc gap-1 pl-5 font-medium text-gray">
                  {careerData.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-2">
                <h1 className="text-[28px] font-extrabold -tracking-[1px] text-black">
                  Responsibilities:
                </h1>

                <ul className="grid list-outside list-disc gap-1 pl-5 font-medium text-gray">
                  {careerData.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
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
                  />

                  <Input
                    isRequired
                    type="text"
                    variant="flat"
                    label="Email"
                    labelPlacement="outside"
                    placeholder="Contoh: jhon.doe@gmail.com"
                    classNames={customStyleInput}
                  />

                  <Input
                    isRequired
                    type="text"
                    variant="flat"
                    label="Asal Instansi/Universitas"
                    labelPlacement="outside"
                    placeholder="Contoh: Universitas Pancasila"
                    classNames={customStyleInput}
                  />

                  <div className="flex flex-wrap items-center gap-4 md:grid md:grid-cols-[max-content_1fr]">
                    <SelectEducationLevel className="flex-1" />

                    <Input
                      isRequired
                      type="text"
                      variant="flat"
                      label="Program Studi"
                      labelPlacement="outside"
                      placeholder="Contoh: Farmasi"
                      classNames={customStyleInput}
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
                  />

                  <div className="mt-4 grid gap-4">
                    <div>
                      <h2 className="mb-1 text-[20px] font-bold text-black">
                        Dokumen (CV / Resume)
                      </h2>
                      <p className="max-w-[550px] text-sm font-medium leading-[180%] text-gray">
                        Harap unggah dokumen pendukung Anda dalam bahasa Inggris
                        agar kami dapat mengenal Anda lebih baik. Format:{" "}
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
                    />
                  </div>

                  <div className="mt-4 grid gap-4">
                    <div>
                      <h2 className="mb-1 text-[20px] font-bold text-black">
                        Bukti Follow Sosmed
                      </h2>
                      <p className="max-w-[550px] text-sm font-medium leading-[180%] text-gray">
                        Bukti follow dan bagikan postingan Open Recruitment
                        Volunteer Jakarta Pasti Sehat di story Instagram{" "}
                        <Link
                          href="https://instagram.com/pastisehat.jkt"
                          target="_blank"
                          className="font-bold text-orange hover:underline"
                        >
                          @pastisehat.jkt
                        </Link>
                      </p>
                    </div>

                    <Input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      variant="flat"
                      labelPlacement="outside"
                      placeholder="CV / Resume"
                      classNames={{
                        input:
                          "block w-full flex-1 text-sm text-gray file:mr-4 file:py-1 file:px-3 file:border-0 file:rounded-lg file:bg-orange file:text-sm file:font-sans file:font-semibold file:text-white hover:file:bg-orange/80",
                      }}
                    />
                  </div>
                </div>
              </IconContext.Provider>

              <Button
                color="primary"
                endContent={<PaperPlaneTilt weight="bold" size={18} />}
                className="mt-12 w-max px-8 font-bold"
              >
                Kirim Lamaran
              </Button>
            </div>
          </div>
        </section>
      </Layout>

      <Footer />
    </>
  );
}
