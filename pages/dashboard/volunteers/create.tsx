import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { Pillar, PillarDetails } from "@/types/pillar";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { Button, Input, Select, SelectItem, Switch } from "@heroui/react";
import { FloppyDisk } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const CKEditor = dynamic(() => import("@/components/editor/CKEditor"), {
  ssr: false,
});

export default function CreateVolunteerPage({
  error,
  pillars,
  token,
  by,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [input, setInput] = useState({
    title: "",
    requirements: "",
    responsibilities: "",
  });
  const [pillar, setPillar] = useState("");
  const [subpillar, setSubpillar] = useState("");
  const subPillars = pillars?.find((item) => item.pillar_id === pillar);

  const [changePillar, setChangePillar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleCreateVolunteer() {
    setIsLoading(true);

    try {
      const payload = {
        ...input,
        ...(changePillar && { pillar_id: pillar, sub_pillar_id: subpillar }),
        by,
      };

      await fetcher({
        endpoint: "/volunteers",
        method: "POST",
        data: payload,
        token,
      });

      router.back();
      toast.success("Volunteer berhasil dibuat");
    } catch (error: any) {
      console.error(error);

      setIsLoading(false);
      toast.error("Gagal menambahkan volunteer");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout title="Buat Volunteer">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Buat Volunteer 🧡"
            text="Buat dan kelola data volunteer dengan mudah"
            className="border-b-2 border-dashed border-gray/20 pb-8"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid max-w-[700px] gap-8">
              <div className="grid gap-4">
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
                      selectedKeys={[pillar]}
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
                        selectedKeys={[subpillar]}
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

                <Input
                  isRequired
                  type="text"
                  variant="flat"
                  label="Nama Volunteer"
                  labelPlacement="outside"
                  placeholder="Contoh: Volunteer Batch 1"
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
                  !Object.values(input).every((item) => item.trim() !== "") ||
                  changePillar
                    ? !pillar || !subpillar
                    : false
                }
                color="primary"
                startContent={
                  isLoading ? null : <FloppyDisk weight="bold" size={18} />
                }
                onPress={handleCreateVolunteer}
                className="w-max justify-self-end font-bold"
              >
                Simpan Volunteer
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
  error?: any;
  token?: string;
  by?: string;
}> = async ({ req }) => {
  const token = req.headers["access_token"] as string;
  const by = req.headers["fullname"] as string;

  try {
    const response = await fetcher({
      endpoint: "/pillars",
      method: "GET",
    });

    return {
      props: {
        pillars: response.data as PillarDetails[],
        token,
        by,
      },
    };
  } catch (error: any) {
    return {
      props: {
        error,
        token,
        by,
      },
    };
  }
};
