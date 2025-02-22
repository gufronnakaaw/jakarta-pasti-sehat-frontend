import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import { InputImage } from "@/components/InputImage";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { Partner } from "@/types/partner";
import getCroppedImg from "@/utils/cropImage";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { onCropComplete } from "@/utils/onCropComplete";
import { Button, Input, Switch } from "@heroui/react";
import { FloppyDisk } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";

export default function EditPartnerPage({
  partner,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [altImage, setAltImage] = useState<string>(partner?.alt as string);
  const [fileImage, setFileImage] = useState<string | ArrayBuffer | null>();
  const [changeImage, setChangeImage] = useState<boolean>(false);

  const [zoomImage, setZoomImage] = useState<number>(1);
  const [cropImage, setCropImage] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleEditPartner() {
    setLoading(true);

    try {
      const formData = new FormData();
      const by = "Super Admin";

      formData.append("partner_id", partner?.partner_id as string);
      formData.append("alt", altImage);
      formData.append("by", by);

      if (changeImage) {
        const croppedImage = await getCroppedImg(fileImage, croppedAreaPixels);
        const response = await fetch(croppedImage as string);
        const blob = await response.blob();
        const fileConvert = new File([blob], "partner-img.jpg", {
          type: "image/jpg",
        });

        formData.append("partner", fileConvert);
      }

      await fetcher({
        endpoint: "/partners",
        method: "PATCH",
        data: formData,
        file: true,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw",
      });

      router.back();
      toast.success("Mitra berhasil dibuat");
    } catch (error: any) {
      console.error(error);

      setLoading(false);
      toast.error("Gagal menambahkan mitra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout title="Edit Mitra">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Edit Mitra 🤝"
            text="Edit dan kelola data mitra dengan mudah"
            className="border-b-2 border-dashed border-gray/20 pb-8"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid max-w-[900px] gap-8">
              <div className="grid grid-cols-[300px_1fr] items-start gap-8">
                <div className="grid gap-1">
                  {!changeImage ? (
                    <Image
                      priority
                      src={partner?.image_url as string}
                      alt="partner img"
                      width={200}
                      height={200}
                      className="aspect-square size-[300px] rounded-xl border-2 border-dashed border-gray/20 p-1"
                    />
                  ) : (
                    <div className="aspect-video size-[300px] rounded-xl border-2 border-dashed border-gray/20 p-1">
                      <div className="relative flex h-full items-center justify-center overflow-hidden rounded-xl bg-gray/20">
                        <Cropper
                          image={fileImage as string}
                          crop={cropImage}
                          zoom={zoomImage}
                          aspect={1 / 1}
                          onCropChange={setCropImage}
                          onCropComplete={onCropComplete({
                            setCroppedAreaPixels,
                          })}
                          onZoomChange={setZoomImage}
                        />
                      </div>
                    </div>
                  )}

                  <p className="text-center text-sm font-medium leading-[170%] text-gray">
                    <strong className="mr-1 text-danger">*</strong>ratio gambar
                    1:1
                  </p>
                </div>

                <div className="grid gap-4">
                  <Switch
                    color="primary"
                    isSelected={changeImage}
                    onValueChange={setChangeImage}
                    classNames={{
                      label: "text-black font-medium text-sm",
                    }}
                    className="mb-4"
                  >
                    Aktifkan Untuk Ubah Logo
                  </Switch>

                  {changeImage ? <InputImage {...{ setFileImage }} /> : null}

                  <Input
                    isRequired
                    type="text"
                    variant="flat"
                    label="Nama Mitra"
                    labelPlacement="outside"
                    placeholder="Contoh: RS. Harapan Indonesia"
                    name="alt"
                    value={altImage}
                    onChange={(e) => setAltImage(e.target.value)}
                    classNames={{
                      ...customStyleInput,
                      inputWrapper: "bg-white",
                    }}
                  />
                </div>
              </div>

              <Button
                isLoading={loading}
                isDisabled={loading}
                color="primary"
                startContent={
                  loading ? null : <FloppyDisk weight="bold" size={18} />
                }
                onPress={handleEditPartner}
                className="w-max justify-self-end font-bold"
              >
                Simpan Mitra
              </Button>
            </div>
          )}
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  partner?: Partner;
  error?: any;
}> = async ({ params }) => {
  try {
    const response = await fetcher({
      endpoint: `/partners/${params?.id}`,
      method: "GET",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw",
    });

    return {
      props: {
        partner: response.data as Partner,
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
