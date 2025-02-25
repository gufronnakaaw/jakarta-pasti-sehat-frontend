import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { Pillar, PillarDetails } from "@/types/pillar";
import { VolunteerDashboardDetails } from "@/types/volunteer";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FloppyDisk } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const CKEditor = dynamic(() => import("@/components/editor/CKEditor"), {
  ssr: false,
});

export default function EditVolunteerPage({
  error,
  pillars,
  volunteer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";
  const [input, setInput] = useState({
    title: volunteer?.title as string,
    requirements: volunteer?.requirements as string,
    responsibilities: volunteer?.responsibilities as string,
  });
  const [pillar, setPillar] = useState(volunteer?.pillar.pillar_id as string);
  const [subpillar, setSubpillar] = useState(
    volunteer?.subpillar.sub_pillar_id as string,
  );
  const subPillars = pillars?.find((item) => item.pillar_id === pillar);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleEditVolunteer() {
    setIsLoading(true);

    try {
      const payload = {
        volunteer_id: volunteer?.volunteer_id,
        title: input.title,
        requirements: input.requirements,
        responsibilities: input.responsibilities,
        pillar_id: pillar,
        sub_pillar_id: subpillar,
        by: "Super Admin",
      };

      await fetcher({
        endpoint: "/volunteers",
        method: "PATCH",
        data: payload,
        token,
      });

      window.location.reload();
      toast.success("Volunteer berhasil diubah");
    } catch (error: any) {
      console.error(error);

      setIsLoading(false);
      toast.error("Gagal mengubah data volunteer");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout title="Edit Volunteer">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Edit Volunteer 🧡"
            text="Edit dan kelola data volunteer dengan mudah"
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
                    {(subpillar: { name: string; sub_pillar_id: string }) => (
                      <SelectItem key={subpillar.sub_pillar_id}>
                        {subpillar.name}
                      </SelectItem>
                    )}
                  </Select>
                ) : null}

                <div className="grid gap-2">
                  <p className="text-sm text-black">
                    Persyaratan<strong className="text-danger">*</strong>
                  </p>

                  <CKEditor
                    value={input.requirements}
                    onChange={(text) => {
                      setInput({ ...input, requirements: text });
                    }}
                    token={token}
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
                    token={token}
                  />
                </div>
              </div>

              <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                color="primary"
                startContent={
                  isLoading ? null : <FloppyDisk weight="bold" size={18} />
                }
                onPress={handleEditVolunteer}
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
  volunteer?: VolunteerDashboardDetails;
  error?: any;
}> = async ({ params }) => {
  try {
    const [responsePillars, responseVolunteer] = await Promise.all([
      fetcher({
        endpoint: "/pillars",
        method: "GET",
      }),

      fetcher({
        endpoint: `/volunteers/${params?.id}`,
        method: "GET",
        role: "admin",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw",
      }),
    ]);

    return {
      props: {
        pillars: responsePillars.data as PillarDetails[],
        volunteer: responseVolunteer.data as VolunteerDashboardDetails,
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
