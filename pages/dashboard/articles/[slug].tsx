import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { AdminArticle } from "@/types/article";
import { Pillar, PillarDetails } from "@/types/pillar";
import getCroppedImg from "@/utils/cropImage";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { onCropComplete } from "@/utils/onCropComplete";
import { getPillarId, getSubPillarId } from "@/utils/pillar";
import { Button, Input, Select, SelectItem, Switch } from "@heroui/react";
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

export default function EditArticlePage({
  article,
  pillars,
  error,
  token,
  by,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [file, setFile] = useState<string | ArrayBuffer | null>(
    article?.image_url as string,
  );
  const [filename, setFilename] = useState("");
  const [type, setType] = useState("");
  const [input, setInput] = useState({
    title: article?.title,
    description: article?.description,
    content: article?.content,
  });
  const [status, setStatus] = useState(article?.is_active as boolean);

  const [pillar, setPillar] = useState(getPillarId(article?.pillar));
  const [subpillar, setSubpillar] = useState(
    getSubPillarId(article?.subpillar),
  );

  const subPillars = pillars?.find((item) => item.pillar_id === pillar);
  const [changePillar, setChangePillar] = useState(
    article?.pillar == "Lainnya" ? false : true,
  );

  const [zoomImage, setZoomImage] = useState<number>(1);
  const [cropImage, setCropImage] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleUpdateArticle() {
    setLoading(true);

    try {
      const formData = new FormData();

      if (filename) {
        const croppedImage = await getCroppedImg(file, croppedAreaPixels);

        const response = await fetch(croppedImage as string);
        const blob = await response.blob();

        const fileConvert = new File([blob], `${filename}`, {
          type,
        });

        formData.append("articles", fileConvert);
      }

      if (article?.pillar == "Lainnya" && changePillar) {
        formData.append("pillar_id", pillar as string);
        formData.append("sub_pillar_id", subpillar as string);
      }

      if (article?.pillar != "Lainnya" && changePillar) {
        formData.append("pillar_id", pillar as string);
        formData.append("sub_pillar_id", subpillar as string);
      }

      formData.append("article_id", article?.article_id as string);
      formData.append("title", input?.title as string);
      formData.append("description", input?.description as string);
      formData.append("content", input?.content as string);
      formData.append("is_active", `${status}`);

      formData.append("by", by);

      await fetcher({
        endpoint: "/articles",
        method: "PATCH",
        file: true,
        token,
        data: formData,
      });

      window.location.reload();
      toast.success("Artikel berhasil diubah");
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengubah data artikel");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout title="Edit Artikel">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Edit Artikel 🤝"
            text="Edit dan kelola artikel terbaru"
            className="border-b-2 border-dashed border-gray/20 pb-8"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid w-full gap-8">
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
                    className="mb-4"
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
                        selectedKeys={[pillar as string]}
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
                          selectedKeys={[subpillar as string]}
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
                      value={input.content as string}
                      onChange={(text: string) => {
                        setInput({ ...input, content: text });
                      }}
                      token={token}
                    />
                  </div>

                  <Switch
                    color="primary"
                    isSelected={status}
                    onValueChange={(e) => setStatus(e)}
                    classNames={{
                      label: "text-black font-medium text-sm",
                    }}
                    className="mb-4"
                  >
                    Aktifkan Artikel
                  </Switch>
                </div>
              </div>

              <Button
                isLoading={loading}
                isDisabled={
                  loading ||
                  !file ||
                  !Object.values(input).every(
                    (value) => value?.trim() !== "",
                  ) ||
                  changePillar
                    ? !pillar || !subpillar
                    : false
                }
                color="primary"
                startContent={
                  loading ? null : <FloppyDisk weight="bold" size={18} />
                }
                className="w-max justify-self-end font-bold"
                onPress={handleUpdateArticle}
              >
                Simpan Artikel
              </Button>
            </div>
          )}
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  article?: AdminArticle;
  pillars?: PillarDetails[];
  error?: any;
  token: string;
  by: string;
}> = async ({ params, req }) => {
  const token = req.headers["access_token"] as string;
  const by = req.headers["fullname"] as string;

  try {
    const [article, pillar] = await Promise.all([
      fetcher({
        endpoint: `/articles/${params?.slug}`,
        method: "GET",
        token,
        role: "admin",
      }),
      fetcher({
        endpoint: "/pillars",
        method: "GET",
      }),
    ]);

    return {
      props: {
        article: article.data as AdminArticle,
        pillars: pillar.data as PillarDetails[],
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
