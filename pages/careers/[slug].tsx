import ButtonBack from "@/components/button/ButtonBack";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import Layout from "@/components/wrapper/Layout";
import careerData from "@/data/careers.json";
import { customStyleInput } from "@/utils/customStyleInput";
import { Button, Input, Textarea } from "@heroui/react";
import {
  Clock,
  IconContext,
  MapPin,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

export default function CareerDetailsPage() {
  return (
    <>
      <Navbar />

      <Layout title="SEO Marketing Manager">
        <ButtonBack />

        <section className="base pt-[80px]">
          <div className={twMerge("wrapper", "lg:max-w-[900px] lg:gap-16")}>
            <div className="grid gap-4">
              <h1 className="title">{careerData.position}</h1>

              <div className="inline-flex items-center gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-orange text-orange [padding:4px_12px]">
                  <MapPin weight="fill" size={18} />
                  <p className="text-[12px] font-bold md:text-base">Onsite</p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border-2 border-orange text-orange [padding:4px_12px]">
                  <Clock weight="fill" size={18} />
                  <p className="text-[12px] font-bold md:text-base">Fulltime</p>
                </div>
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
                    type="number"
                    variant="flat"
                    label="Nomor HP/WA"
                    labelPlacement="outside"
                    placeholder="Contoh: 08XXXXXXXXX"
                    classNames={customStyleInput}
                  />

                  <Textarea
                    isRequired
                    type="text"
                    variant="flat"
                    label="Alamat Lengkap"
                    labelPlacement="outside"
                    placeholder="Contoh: Jl. Singgah Sementara"
                    maxRows={5}
                    classNames={customStyleInput}
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
                      placeholder="Contoh: www.instagram.com/jhon.doe"
                      classNames={customStyleInput}
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
                    />
                  </div>

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
