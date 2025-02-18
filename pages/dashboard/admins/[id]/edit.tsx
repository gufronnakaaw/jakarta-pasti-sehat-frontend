import ButtonBack from "@/components/button/ButtonBack";
import LoadingScreen from "@/components/loading/LoadingScreen";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { Admin } from "@/types/admin";
import { SuccessResponse } from "@/types/global";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FloppyDisk } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

type InputState = {
  fullname: string;
  role: string;
  password: string;
  access_key: string;
};

export default function EditAdminPage({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";
  const { data, isLoading } = useSWR<SuccessResponse<Admin>>({
    endpoint: `/admin/${params.id as string}`,
    method: "GET",
    role: "admin",
    token,
  });
  const [input, setInput] = useState<InputState>({
    fullname: "",
    role: "",
    password: "",
    access_key: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // set data to input component
  useEffect(() => {
    if (!data?.data) return;

    const { fullname, role } = data.data;
    setInput((prev) => ({ ...prev, fullname, role }));
  }, [data]);

  // disabled button "Simpan Admin" if all input empty
  useEffect(() => {
    const isInputValid =
      input.fullname && input.role && input.password && input.access_key;
    setIsButtonDisabled(!isInputValid);
  }, [input]);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setInput((prev) => ({ ...prev, [name]: value }));
  }

  async function handleEditAdmin() {
    setLoading(true);

    try {
      const payload = {
        ...input,
        admin_id: data?.data.admin_id,
      };

      await fetcher({
        endpoint: "/admin",
        method: "PATCH",
        data: payload,
        token,
      });

      router.back();
      toast.success("Admin berhasil diubah");
    } catch (error: any) {
      console.error(error);

      toast.error("Gagal mengubah data admin");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Edit Admin">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Edit Admin 🧑"
            text="Edit dan kelola data admin dengan mudah"
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
                  value={input.fullname}
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
              isLoading={loading}
              isDisabled={isButtonDisabled || loading}
              color="primary"
              startContent={
                isLoading ? null : <FloppyDisk weight="bold" size={18} />
              }
              onPress={handleEditAdmin}
              className="w-max justify-self-end font-bold"
            >
              {loading ? "Tunggu Sebentar..." : "Simpan Admin"}
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
