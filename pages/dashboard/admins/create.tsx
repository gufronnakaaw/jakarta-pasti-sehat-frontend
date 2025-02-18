import ButtonBack from "@/components/button/ButtonBack";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FloppyDisk } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

type InputState = {
  fullname: string;
  role: string;
  password: string;
  access_key: string;
};

export default function CreateAdminPage() {
  const router = useRouter();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";
  const [input, setInput] = useState<InputState>({
    fullname: "",
    role: "",
    password: "",
    access_key: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setInput((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCreateAdmin() {
    setIsLoading(true);

    try {
      const payload = {
        fullname: input.fullname,
        role: input.role,
        password: input.password,
        access_key: input.access_key,
      };

      await fetcher({
        endpoint: "/admin",
        method: "POST",
        data: payload,
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
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  isRequired
                  type="text"
                  variant="flat"
                  label="Nama Lengkap"
                  labelPlacement="outside"
                  placeholder="Masukan Nama Lengkap"
                  name="fullname"
                  onChange={(e) => handleInputChange(e)}
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
                  onChange={(e) => handleInputChange(e)}
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
                onChange={(e) => handleInputChange(e)}
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
                onChange={(e) => handleInputChange(e)}
                classNames={{
                  ...customStyleInput,
                  inputWrapper: "bg-white",
                }}
              />
            </div>

            <Button
              isLoading={isLoading}
              isDisabled={
                !Object.values(input).every((value) => value.trim() !== "") ||
                isLoading
              }
              color="primary"
              startContent={
                isLoading ? null : <FloppyDisk weight="bold" size={18} />
              }
              onPress={handleCreateAdmin}
              className="w-max justify-self-end font-bold"
            >
              {isLoading ? "Tunggu Sebentar..." : "Simpan Admin"}
            </Button>
          </div>
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
