import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { CareerDashboardDetails } from "@/types/career";
import { Pillar, PillarDetails } from "@/types/pillar";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { getPillarId, getSubPillarId } from "@/utils/pillar";
import { Button, Input, Select, SelectItem, Switch } from "@heroui/react";
import { FloppyDisk } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import toast from "react-hot-toast";

const CKEditor = dynamic(() => import("@/components/editor/CKEditor"), {
  ssr: false,
});

type InputState = {
  title: string;
  location: string;
  type: string;
  requirements: string;
  responsibilities: string;
};

export default function EditCareerPage({
  error,
  pillars,
  career,
  token,
  by,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [input, setInput] = useState<InputState>({
    title: career?.title as string,
    location: career?.location as string,
    type: career?.type as string,
    requirements: career?.requirements as string,
    responsibilities: career?.responsibilities as string,
  });
  const [pillar, setPillar] = useState(getPillarId(career?.pillar));
  const [subpillar, setSubpillar] = useState(getSubPillarId(career?.subpillar));
  const subPillars = pillars?.find((item) => item.pillar_id === pillar);

  const [changePillar, setChangePillar] = useState<boolean>(
    career?.pillar == "Lainnya" ? false : true,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleEditCareer() {
    setIsLoading(true);

    try {
      const payload = {
        career_id: career?.career_id,
        ...input,
        ...(changePillar && { pillar_id: pillar, sub_pillar_id: subpillar }),
        by,
      };

      await fetcher({
        endpoint: "/careers",
        method: "PATCH",
        data: payload,
        token,
      });

      window.location.reload();
      toast.success("Karir berhasil diubah");
    } catch (error: any) {
      console.error(error);

      setIsLoading(false);
      toast.error("Gagal mengubah data karir");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout title="Edit Karir">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Edit Karir 🧳"
            text="Edit dan kelola data karir dengan mudah"
            className="border-b-2 border-dashed border-gray/20 pb-8"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid max-w-[700px] gap-8">
              <div className="grid gap-4">
                <Input
                  isRequired
                  type="text"
                  variant="flat"
                  label="Nama Karir"
                  labelPlacement="outside"
                  placeholder="Contoh: Web Developer"
                  name="title"
                  value={input.title}
                  onChange={(e) =>
                    setInput({ ...input, title: e.target.value })
                  }
                  classNames={{
                    ...customStyleInput,
                    inputWrapper: "bg-white",
                  }}
                />

                <Switch
                  color="primary"
                  isSelected={changePillar}
                  onValueChange={(e) => {
                    setChangePillar(e);
                    setPillar("");
                    setSubpillar("");
                  }}
                  classNames={{
                    label: "text-black font-medium text-sm",
                  }}
                >
                  Aktifkan Pilar
                </Switch>

                {changePillar ? (
                  <>
                    <Select
                      isRequired
                      aria-label="select pillar"
                      variant="flat"
                      label="Pilih Pilar"
                      labelPlacement="outside"
                      placeholder="Contoh: Pilar 1"
                      name="pillar"
                      items={pillars}
                      selectedKeys={[pillar as string]}
                      onChange={(e) => setPillar(e.target.value)}
                      classNames={{
                        trigger: "bg-white",
                        value: "font-semibold text-gray",
                      }}
                    >
                      {(pillar: Pillar) => (
                        <SelectItem key={pillar.pillar_id}>
                          {pillar.name}
                        </SelectItem>
                      )}
                    </Select>

                    {pillar ? (
                      <Select
                        isRequired
                        aria-label="select subpillar"
                        variant="flat"
                        label="Pilih Subpilar"
                        labelPlacement="outside"
                        placeholder="Contoh: Hepatitis"
                        name="subpillar"
                        items={subPillars?.subpillars}
                        selectedKeys={[subpillar as string]}
                        onChange={(e) => setSubpillar(e.target.value)}
                        classNames={{
                          trigger: "bg-white",
                          value: "font-semibold text-gray",
                        }}
                      >
                        {(subpillar: {
                          name: string;
                          sub_pillar_id: string;
                        }) => (
                          <SelectItem key={subpillar.sub_pillar_id}>
                            {subpillar.name}
                          </SelectItem>
                        )}
                      </Select>
                    ) : null}
                  </>
                ) : null}

                <div className="grid grid-cols-2 items-center gap-4">
                  <Select
                    isRequired
                    aria-label="select location"
                    variant="flat"
                    label="Lokasi"
                    labelPlacement="outside"
                    placeholder="Contoh: Onsite"
                    name="location"
                    selectedKeys={[input.location]}
                    onChange={(e) =>
                      setInput({ ...input, location: e.target.value })
                    }
                    classNames={{
                      trigger: "bg-white",
                      value: "font-semibold text-gray",
                    }}
                  >
                    <SelectItem key="onsite">Onsite</SelectItem>
                    <SelectItem key="remote">Remote</SelectItem>
                    <SelectItem key="hybrid">Hybrid</SelectItem>
                  </Select>

                  <Select
                    isRequired
                    aria-label="select type"
                    variant="flat"
                    label="Tipe"
                    labelPlacement="outside"
                    placeholder="Contoh: Full-time"
                    name="type"
                    selectedKeys={[input.type]}
                    onChange={(e) =>
                      setInput({ ...input, type: e.target.value })
                    }
                    classNames={{
                      trigger: "bg-white",
                      value: "font-semibold text-gray",
                    }}
                  >
                    <SelectItem key="fulltime">Full-time</SelectItem>
                    <SelectItem key="parttime">Part-time</SelectItem>
                    <SelectItem key="freelance">Freelance</SelectItem>
                    <SelectItem key="contract">Contract</SelectItem>
                    <SelectItem key="internship">Internship</SelectItem>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <p className="text-sm text-black">
                    Persyaratan<strong className="text-danger">*</strong>
                  </p>

                  <CKEditor
                    value={input.requirements}
                    onChange={(text) => {
                      setInput({ ...input, requirements: text });
                    }}
                    token={token as string}
                  />
                </div>

                <div className="grid gap-2">
                  <p className="text-sm text-black">
                    Tanggung Jawab<strong className="text-danger">*</strong>
                  </p>

                  <CKEditor
                    value={input.responsibilities}
                    onChange={(text) => {
                      setInput({ ...input, responsibilities: text });
                    }}
                    token={token as string}
                  />
                </div>
              </div>

              <Button
                isLoading={isLoading}
                isDisabled={
                  isLoading ||
                  !Object.values(input).every((item) => item.trim() !== "")
                }
                color="primary"
                startContent={
                  isLoading ? null : <FloppyDisk weight="bold" size={18} />
                }
                onPress={handleEditCareer}
                className="w-max justify-self-end font-bold"
              >
                Simpan Karir
              </Button>
            </div>
          )}
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  pillars?: PillarDetails[];
  career?: CareerDashboardDetails;
  error?: any;
  token?: string;
  by?: string;
}> = async ({ params, req }) => {
  const token = req.headers["access_token"] as string;

  try {
    const [responsePillars, responseCareer] = await Promise.all([
      fetcher({
        endpoint: "/pillars",
        method: "GET",
      }),

      fetcher({
        endpoint: `/careers/${params?.id}`,
        method: "GET",
        role: "admin",
        token,
      }),
    ]);

    return {
      props: {
        pillars: responsePillars.data as PillarDetails[],
        career: responseCareer.data as CareerDashboardDetails,
        token: req.headers["access_token"] as string,
        by: req.headers["fullname"] as string,
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
