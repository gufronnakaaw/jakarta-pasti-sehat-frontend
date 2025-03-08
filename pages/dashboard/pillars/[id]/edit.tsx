import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { PillarDetails } from "@/types/pillar";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { Button, Input } from "@heroui/react";
import { FloppyDisk, Plus, Trash } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import toast from "react-hot-toast";

type SubPillar = {
  sub_pillar_id: string;
  name: string;
};

export default function EditPillarPage({
  error,
  pillars,
  token,
  by,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [name, setName] = useState<string>(pillars?.name as string);
  const [subpillars, setSubpillars] = useState<SubPillar[]>(
    pillars?.subpillars as SubPillar[],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function addSubPillar() {
    setSubpillars((prev) => [
      ...prev,
      {
        sub_pillar_id: "idKey-asdasd",
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

  function removeSubPillar(index: number) {
    setSubpillars(subpillars.filter((_, i) => i !== index));
  }

  function handleRemoveSubPillar(index: number) {
    const subpillar = subpillars[index];

    if (subpillar.sub_pillar_id?.startsWith("JPSSPLR")) {
      handleDeleteSubPillar(subpillar.sub_pillar_id);
    } else {
      removeSubPillar(index);
    }
  }

  async function handleDeleteSubPillar(sub_pillar_id: string) {
    try {
      await fetcher({
        endpoint: `/pillars/subpillar/${sub_pillar_id}`,
        method: "DELETE",
        token,
      });

      window.location.reload();
      toast.success("Subpilar berhasil dihapus");
    } catch (error: any) {
      console.error(error);

      toast.error("Gagal menghapus data subpilar");
    }
  }

  async function handleEditPillar() {
    setIsLoading(true);

    try {
      const formattedSubPillar = subpillars.map((subpillar) => ({
        sub_pillar_id: subpillar.sub_pillar_id || "idKey-asdasd",
        name: subpillar.name,
      }));

      const payload = {
        pillar_id: pillars?.pillar_id,
        name: name,
        subpillars: formattedSubPillar,
        by,
      };

      await fetcher({
        endpoint: "/pillars",
        method: "PATCH",
        data: payload,
        token,
      });

      window.location.reload();
      toast.success("Pilar berhasil diubah");
    } catch (error: any) {
      console.error(error);

      setIsLoading(false);
      toast.error("Gagal mengubah data pilar");
    } finally {
      setIsLoading(false);
    }
  }

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

          {error ? (
            <ErrorPage error={error} />
          ) : (
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
                isDisabled={isLoading || !name || !subpillars}
                color="primary"
                startContent={
                  isLoading ? null : <FloppyDisk weight="bold" size={18} />
                }
                onPress={handleEditPillar}
                className="w-max justify-self-end font-bold"
              >
                Simpan Pilar
              </Button>
            </div>
          )}
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  pillars?: PillarDetails;
  error?: any;
  token?: string;
  by?: string;
}> = async ({ params, req }) => {
  const token = req.headers["access_token"] as string;
  const by = req.headers["fullname"] as string;

  try {
    const response = await fetcher({
      endpoint: `/pillars/${params?.id as string}`,
      method: "GET",
      role: "admin",
      token,
    });

    return {
      props: {
        pillars: response.data as PillarDetails,
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
