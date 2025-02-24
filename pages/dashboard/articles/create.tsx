import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { Pillar, PillarDetails } from "@/types/pillar";
import getCroppedImg from "@/utils/cropImage";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { onCropComplete } from "@/utils/onCropComplete";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FloppyDisk } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";

const CKEditor = dynamic(() => import("@/components/editor/CKEditor"), {
  ssr: false,
});

export default function CreateArticlePage({
  pillars,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";
  const by = "Super Admin";

  const [file, setFile] = useState<string | ArrayBuffer | null>();
  const [filename, setFilename] = useState("");
  const [type, setType] = useState("");
  const [input, setInput] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [pillar, setPillar] = useState("");
  const [subpillar, setSubpillar] = useState("");
  const subPillars = pillars?.find((item) => item.pillar_id === pillar);

  const [zoomImage, setZoomImage] = useState<number>(1);
  const [cropImage, setCropImage] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSaveArticle() {
    setLoading(true);

    try {
      const formData = new FormData();
      const croppedImage = await getCroppedImg(file, croppedAreaPixels);

      const response = await fetch(croppedImage as string);
      const blob = await response.blob();

      const fileConvert = new File([blob], `${filename}`, {
        type,
      });

      formData.append("articles", fileConvert);
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("content", input.content);
      formData.append("pillar_id", pillar);
      formData.append("sub_pillar_id", subpillar);
      formData.append("by", by);

      await fetcher({
        endpoint: "/articles",
        method: "POST",
        file: true,
        token,
        data: formData,
      });

      router.back();
      toast.success("Berhasil membuat artikel");
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat membuat artikel");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout title="Buat Artikel">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Buat Artikel 🤝"
            text="Buat dan kelola artikel terbaru"
            className="border-b-2 border-dashed border-gray/20 pb-8"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid max-w-[900px] gap-8">
              <div className="grid grid-cols-[300px_1fr] items-start gap-8">
                <div className="grid gap-4">
                  <div className="grid gap-1">
                    <div className="aspect-video size-[300px] rounded-xl border-2 border-dashed border-gray/20 p-1">
                      <div className="relative flex h-full items-center justify-center overflow-hidden rounded-xl bg-gray/20">
                        <Cropper
                          image={file as string}
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

                    <p className="text-center text-sm font-medium leading-[170%] text-gray">
                      <strong className="mr-1 text-danger">*</strong>ratio
                      gambar 1:1
                    </p>
                  </div>

                  <Input
                    isRequired
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    variant="flat"
                    labelPlacement="outside"
                    classNames={{
                      inputWrapper: "bg-white",
                      input:
                        "block w-full flex-1 text-sm text-gray file:mr-4 file:py-1 file:px-3 file:border-0 file:rounded-lg file:bg-orange file:text-sm file:font-sans file:font-semibold file:text-white hover:file:bg-orange/80",
                    }}
                    onChange={(e) => {
                      if (!e.target.files?.length) {
                        setFile(null);
                        setFilename("");
                        setType("");
                        return;
                      }

                      const validTypes = [
                        "image/png",
                        "image/jpg",
                        "image/jpeg",
                      ];

                      if (!validTypes.includes(e.target.files[0].type)) {
                        toast.error("Ekstensi file harus png, jpg, atau jpeg");
                        setFile(null);
                        setFilename("");
                        setType("");
                        return;
                      }

                      setType(e.target.files[0].type);
                      setFilename(e.target.files[0].name);
                      const reader = new FileReader();
                      reader.readAsDataURL(e.target.files[0]);

                      reader.onload = function () {
                        setFile(reader.result);
                      };

                      reader.onerror = function (error) {
                        setFile(null);
                        setFilename("");
                        setType("");

                        toast.error("Terjadi kesalahan saat meload gambar");

                        console.log(error);
                      };
                    }}
                  />
                </div>

                <div className="grid gap-4">
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

                  <Input
                    isRequired
                    type="text"
                    variant="flat"
                    label="Judul"
                    labelPlacement="outside"
                    placeholder="Contoh: Artikel Terbaru Jakarta Pasti Sehat"
                    name="alt"
                    value={input.title}
                    onChange={(e) =>
                      setInput({ ...input, title: e.target.value })
                    }
                    classNames={{
                      ...customStyleInput,
                      inputWrapper: "bg-white",
                    }}
                  />

                  <Input
                    isRequired
                    type="text"
                    variant="flat"
                    label="Deskripsi Singkat"
                    labelPlacement="outside"
                    placeholder="Contoh: Penyakit malaria merupakan"
                    name="alt"
                    value={input.description}
                    onChange={(e) =>
                      setInput({ ...input, description: e.target.value })
                    }
                    classNames={{
                      ...customStyleInput,
                      inputWrapper: "bg-white",
                    }}
                  />

                  <div className="grid gap-2">
                    <p className="font-medium text-black">Konten</p>

                    <CKEditor
                      value={input.content}
                      onChange={(text) => {
                        setInput({ ...input, content: text });
                      }}
                      token={token}
                    />
                  </div>
                </div>
              </div>

              <Button
                isLoading={loading}
                isDisabled={
                  loading ||
                  !file ||
                  !input.title ||
                  !input.description ||
                  !input.content ||
                  !pillar ||
                  !subpillar
                }
                color="primary"
                startContent={
                  loading ? null : <FloppyDisk weight="bold" size={18} />
                }
                className="w-max justify-self-end font-bold"
                onPress={handleSaveArticle}
              >
                Simpan
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
}> = async () => {
  try {
    const response = await fetcher({
      endpoint: "/pillars",
      method: "GET",
    });

    return {
      props: {
        pillars: response.data as PillarDetails[],
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
