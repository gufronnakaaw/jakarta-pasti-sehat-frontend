import ButtonBack from "@/components/button/ButtonBack";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FloppyDisk } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

type InputState = {
  fullname: string;
  role: string;
  password: string;
  access_key: string;
};

export default function CreateAdminPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [input, setInput] = useState<InputState>({
    fullname: "",
    role: "",
    password: "",
    access_key: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleCreateAdmin() {
    setIsLoading(true);

    try {
      await fetcher({
        endpoint: "/admin",
        method: "POST",
        data: { ...input },
        token,
      });

      router.back();
      toast.success("Admin berhasil dibuat");
    } catch (error: any) {
      console.error(error);

      setIsLoading(false);
      toast.error("Gagal menambah admin");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardLayout title="Buat Admin">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Daftar Admin 🧑"
            text="Buat dan kelola admin baru dengan mudah"
            className="border-b-2 border-dashed border-gray/20 pb-8"
          />

          <div className="grid max-w-[700px] gap-8">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  isRequired
                  type="text"
                  variant="flat"
                  label="Nama Lengkap"
                  labelPlacement="outside"
                  placeholder="Masukan Nama Lengkap"
                  name="fullname"
                  onChange={(e) =>
                    setInput({ ...input, fullname: e.target.value })
                  }
                  classNames={{
                    ...customStyleInput,
                    inputWrapper: "bg-white",
                  }}
                />

                <Select
                  isRequired
                  aria-label="select role"
                  variant="flat"
                  label="Role"
                  labelPlacement="outside"
                  placeholder="Pilih Role"
                  name="role"
                  selectedKeys={[input.role]}
                  onChange={(e) => setInput({ ...input, role: e.target.value })}
                  classNames={{
                    trigger: "bg-white",
                    value: "font-semibold text-gray",
                  }}
                >
                  <SelectItem key="admin">Admin</SelectItem>
                  <SelectItem key="superadmin">Superadmin</SelectItem>
                </Select>
              </div>

              <Input
                isRequired
                type="text"
                variant="flat"
                label="Kata Sandi"
                labelPlacement="outside"
                placeholder="Masukan Kata Sandi"
                name="password"
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                classNames={{
                  ...customStyleInput,
                  inputWrapper: "bg-white",
                }}
              />

              <Input
                isRequired
                type="password"
                variant="flat"
                label="Kunci Akses"
                labelPlacement="outside"
                placeholder="Masukan Kunci Akses"
                name="access_key"
                onChange={(e) =>
                  setInput({ ...input, access_key: e.target.value })
                }
                classNames={{
                  ...customStyleInput,
                  inputWrapper: "bg-white",
                }}
              />
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
              onPress={handleCreateAdmin}
              className="w-max justify-self-end font-bold"
            >
              Simpan Admin
            </Button>
          </div>
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token: string;
}> = async ({ req }) => {
  return {
    props: {
      token: req.headers["access_token"] as string,
    },
  };
};
