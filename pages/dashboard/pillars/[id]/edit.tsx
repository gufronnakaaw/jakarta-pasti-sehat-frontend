import ButtonBack from "@/components/button/ButtonBack";
import LoadingScreen from "@/components/loading/LoadingScreen";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { SuccessResponse } from "@/types/global";
import { PillarDetails } from "@/types/pillar";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { Button, Input } from "@heroui/react";
import { FloppyDisk, Plus, Trash } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

type SubPillar = {
  sub_pillar_id: string;
  name: string;
};

export default function EditPillarPage({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";
  const [name, setName] = useState<string>("");
  const [subpillars, setSubpillars] = useState<SubPillar[]>([
    { sub_pillar_id: "", name: "" },
  ]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const { data, isLoading, mutate } = useSWR<SuccessResponse<PillarDetails>>({
    endpoint: `/pillars/${params?.id as string}`,
    method: "GET",
    token: token,
    role: "admin",
  });

  // set data to input component
  useEffect(() => {
    if (!data?.data) return;

    const { name, subpillars } = data.data;

    setName(name);
    setSubpillars(subpillars);
  }, [data?.data]);

  // disabled button "Simpan Pilar" if all input empty
  useEffect(() => {
    setIsButtonDisabled(
      !name.trim() || subpillars.some((subpillar) => !subpillar.name.trim()),
    );
  }, [name, subpillars]);

  function addSubPillar() {
    setSubpillars((prev) => [
      ...prev,
      {
        sub_pillar_id: crypto.randomUUID(),
        name: "",
      },
    ]);
  }

  function updateSubPillar(index: number, key: keyof SubPillar, value: any) {
    setSubpillars((prev) =>
      prev.map((subpillar, i) =>
        i === index ? { ...subpillar, [key]: value } : subpillar,
      ),
    );
  }

  function removeSubPillarLocal(index: number) {
    setSubpillars(subpillars.filter((_, i) => i !== index));
  }

  async function removeSubPillarServer(sub_pillar_id: string) {
    try {
      await fetcher({
        endpoint: `/pillars/subpillar/${sub_pillar_id}`,
        method: "DELETE",
        token: token,
      });

      mutate();
      toast.success("Subpilar berhasil dihapus");
    } catch (error: any) {
      console.error(error);

      toast.error("Gagal menghapus data subpilar");
    }
  }

  async function handleEditPillar() {
    setLoading(true);

    try {
      const formattedSubPillar = subpillars.map((subpillar) => ({
        sub_pillar_id: subpillar.sub_pillar_id || crypto.randomUUID(),
        name: subpillar.name,
      }));

      const payload = {
        pillar_id: data?.data.pillar_id,
        name: name,
        by: "Super Admin",
        subpillars: formattedSubPillar,
      };

      await fetcher({
        endpoint: "/pillars",
        method: "PATCH",
        data: payload,
        token: token,
      });

      mutate();
      toast.success("Pilar berhasil diubah");
    } catch (error: any) {
      console.error(error);

      setLoading(false);
      toast.error("Gagal mengubah data pilar");
    } finally {
      setLoading(false);
    }
  }

  function handleRemoveSubPillar(index: number) {
    const subpillar = subpillars[index];

    if (subpillar.sub_pillar_id?.startsWith("JPSSPLR")) {
      removeSubPillarServer(subpillar.sub_pillar_id);
    } else {
      removeSubPillarLocal(index);
    }
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Edit Pilar">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Edit Pilar 📄"
            text="Edit dan kelola data pilar dengan mudah"
            className="border-b-2 border-dashed border-gray/20 pb-8"
          />

          <div className="grid max-w-[700px] gap-8">
            <Input
              isRequired
              type="text"
              variant="flat"
              label="Nama Pilar"
              labelPlacement="outside"
              placeholder="Contoh: Pilar 1"
              name="title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              classNames={{ ...customStyleInput, inputWrapper: "bg-white" }}
            />

            <div className="grid gap-4">
              <h2 className="text-lg font-extrabold text-black">
                Daftar Subpilar
              </h2>

              {subpillars.length > 0 && (
                <div className="grid gap-2">
                  {subpillars.map((subpillar, index) => (
                    <div
                      key={subpillar.sub_pillar_id || index}
                      className="flex items-end gap-4"
                    >
                      <Input
                        isRequired
                        type="text"
                        variant="flat"
                        labelPlacement="outside"
                        placeholder="Contoh: Penyakit Tidak Menular"
                        value={subpillar.name}
                        onChange={(e) =>
                          updateSubPillar(index, "name", e.target.value)
                        }
                        classNames={{
                          ...customStyleInput,
                          inputWrapper: "bg-white",
                        }}
                        className="flex-1"
                      />

                      <Button
                        isIconOnly
                        variant="light"
                        color="danger"
                        onPress={() => handleRemoveSubPillar(index)}
                      >
                        <Trash
                          weight="bold"
                          size={18}
                          className="text-danger"
                        />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                variant="light"
                startContent={<Plus weight="bold" size={18} />}
                onPress={addSubPillar}
                className="font-bold"
              >
                Tambah Subpilar
              </Button>
            </div>

            <Button
              isLoading={isLoading}
              isDisabled={isButtonDisabled || isLoading}
              color="primary"
              startContent={
                loading ? null : <FloppyDisk weight="bold" size={18} />
              }
              onPress={handleEditPillar}
              className="w-max justify-self-end font-bold"
            >
              {loading ? "Tunggu Sebentar..." : "Simpan Pilar"}
            </Button>
          </div>
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  params: ParsedUrlQuery;
}> = async ({ params }) => {
  return {
    props: {
      params: params as ParsedUrlQuery,
    },
  };
};
