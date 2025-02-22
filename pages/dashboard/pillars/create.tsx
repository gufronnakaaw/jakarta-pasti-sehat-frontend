import ButtonBack from "@/components/button/ButtonBack";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { Button, Input } from "@heroui/react";
import { FloppyDisk, Plus, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreatePillarPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [subpillars, setSubpillars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function addSubPillar() {
    setSubpillars([...subpillars, ""]);
  }

  function removeSubPillar(index: number) {
    setSubpillars(subpillars.filter((_, i) => i !== index));
  }

  function updateSubPillar(index: number, value: string) {
    setSubpillars(
      subpillars.map((subpillar, i) => (i === index ? value : subpillar)),
    );
  }

  async function handleCreatePillar() {
    setIsLoading(true);

    try {
      const payload = {
        name,
        by: "Super Admin",
        subpillars,
      };

      await fetcher({
        endpoint: "/pillars",
        method: "POST",
        data: payload,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw",
      });

      toast.success("Pilar berhasil dibuat");
      router.back();
    } catch (error: any) {
      console.error(error);

      setIsLoading(false);
      toast.error(error?.message || "Telah terjadi kesalahan");
    }
  }

  return (
    <DashboardLayout title="Buat Pilar">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Buat Pilar 📄"
            text="Buat dan kelola pilar baru dengan mudah"
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
                    <div key={index} className="flex items-end gap-4">
                      <Input
                        isRequired
                        type="text"
                        variant="flat"
                        labelPlacement="outside"
                        placeholder="Contoh: Penyakit Tidak Menular"
                        value={subpillar}
                        onChange={(e) => updateSubPillar(index, e.target.value)}
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
                        onPress={() => removeSubPillar(index)}
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
              isDisabled={isLoading}
              color="primary"
              startContent={
                isLoading ? null : <FloppyDisk weight="bold" size={18} />
              }
              onPress={handleCreatePillar}
              className="w-max justify-self-end font-bold"
            >
              Simpan Pilar
            </Button>
          </div>
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
