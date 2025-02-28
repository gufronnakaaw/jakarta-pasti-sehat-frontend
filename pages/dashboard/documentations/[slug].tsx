import ButtonBack from "@/components/button/ButtonBack";
import ErrorPage from "@/components/ErrorPage";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { DetailDocumentationAdmin } from "@/types/documentation";
import { Pillar, PillarDetails } from "@/types/pillar";
import getCroppedImg from "@/utils/cropImage";
import { customStyleInput } from "@/utils/customStyleInput";
import { fetcher } from "@/utils/fetcher";
import { onCropComplete } from "@/utils/onCropComplete";
import { Button, Input, Select, SelectItem, Switch } from "@heroui/react";
import { FloppyDisk } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";

function getPillarId(
  pillar: string | { pillar_id: string; name: string } | undefined,
) {
  return typeof pillar === "object" ? pillar.pillar_id : null;
}

function getSubPillarId(
  subpillar: string | { sub_pillar_id: string; name: string } | undefined,
) {
  return typeof subpillar === "object" ? subpillar.sub_pillar_id : null;
}

export default function EditDocumentationPage({
  pillars,
  doc,
  error,
  token,
  by,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [file, setFile] = useState<string | ArrayBuffer | null>(
    doc?.thumbnail_url as string,
  );
  const [filename, setFilename] = useState("");
  const [type, setType] = useState("");
  const [input, setInput] = useState({
    title: doc?.title as string,
  });
  const [status, setStatus] = useState(doc?.is_active as boolean);

  const [pillar, setPillar] = useState(getPillarId(doc?.pillar));
  const [subpillar, setSubpillar] = useState(getSubPillarId(doc?.subpillar));

  const subPillars = pillars?.find((item) => item.pillar_id === pillar);
  const [changePillar, setChangePillar] = useState(
    doc?.pillar == "Lainnya" ? false : true,
  );

  const [zoomImage, setZoomImage] = useState<number>(1);
  const [cropImage, setCropImage] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState(
    doc?.doc_images.map((doc_image) => {
      return { ...doc_image, file: null };
    }) as {
      file: File | null;
      doc_image_id: null | string;
      image_url: string;
    }[],
  );

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  function handleFilesDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    handleFilesState(Array.from(e.dataTransfer.files));
  }

  function handleFilesSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    handleFilesState(Array.from(e.target.files));
  }

  function handleFilesState(files: File[]) {
    const filteredFiles = files.filter((file) =>
      allowedTypes.includes(file.type),
    );

    if (filteredFiles.length === 0) return;

    setFiles((prev) => [...prev, ...filteredFiles]);

    const newPreviews = files.map((file) => ({
      doc_image_id: null,
      image_url: URL.createObjectURL(file),
      file,
    }));

    setPreviews((prev) => [...prev, ...newPreviews]);
  }

  async function handleDelete(index: number) {
    const file = previews[index];

    if (file.doc_image_id) {
      if (confirm("Apakah anda yakin menghapus gambar ini dari database")) {
        try {
          await fetcher({
            endpoint: `/docs/images/${file.doc_image_id}`,
            method: "DELETE",
            token,
          });

          toast.success("Berhasil menghapus file");
          window.location.reload();
        } catch (error) {
          console.log(error);
          toast.error("Gagal menghapus file");
        }
      }
    } else {
      URL.revokeObjectURL(file.image_url);

      setPreviews((prev) => {
        return prev.filter((_, i) => i !== index);
      });
    }

    if (files.length) {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    }
  }

  async function handleUpdateDocs() {
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

        formData.append("thumbnail", fileConvert);
      }

      if (doc?.pillar == "Lainnya" && changePillar) {
        formData.append("pillar_id", pillar as string);
        formData.append("sub_pillar_id", subpillar as string);
      }

      if (doc?.pillar != "Lainnya" && changePillar) {
        formData.append("pillar_id", pillar as string);
        formData.append("sub_pillar_id", subpillar as string);
      }

      formData.append("doc_id", doc?.doc_id as string);
      formData.append("title", input.title);
      formData.append("by", by);
      formData.append("is_active", `${status}`);

      const promises = [];

      if (files.length) {
        const newFormData = new FormData();
        newFormData.append("doc_id", doc?.doc_id as string);
        newFormData.append("by", by);

        files.forEach((file) => {
          newFormData.append("doc_images", file);
        });

        promises.push(
          fetcher({
            endpoint: `/docs/images`,
            method: "POST",
            file: true,
            token,
            data: newFormData,
          }),
        );
      }

      await Promise.all([
        fetcher({
          endpoint: "/docs",
          method: "PATCH",
          file: true,
          token,
          data: formData,
        }),
        ...promises,
      ]);

      router.back();
      toast.success("Berhasil mengedit dokumentasi");
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat mengedit dokumentasi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout title="Buat Dokumentasi">
      <DashboardContainer>
        <section className="base-dashboard">
          <ButtonBack className="mt-0" />

          <TitleText
            title="Buat Dokumentasi 🤝"
            text="Buat dan kelola dokumentasi terbaru"
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
                      thumbnail 1:1
                    </p>

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
                          toast.error(
                            "Ekstensi file harus png, jpg, atau jpeg",
                          );
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

                  <Switch
                    color="primary"
                    isSelected={status}
                    onValueChange={(e) => setStatus(e)}
                    classNames={{
                      label: "text-black font-medium text-sm",
                    }}
                    className="mb-4"
                  >
                    Status
                  </Switch>
                </div>
              </div>

              <div
                className="h-[350px] w-full rounded-xl border-2 border-dashed border-gray/20 p-1"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFilesDrop}
              >
                <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-xl bg-gray/20">
                  <p className="text-gray-500">Drag & drop file di sini</p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="fileInput"
                    onChange={handleFilesSelect}
                    accept="image/jpg, image/jpeg, image/png"
                  />
                  <label
                    htmlFor="fileInput"
                    className="mt-2 block cursor-pointer text-gray-500"
                  >
                    Atau klik untuk pilih file
                  </label>
                </div>
              </div>

              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {previews.map((src, index) => (
                    <div key={index} className="relative">
                      <Image
                        width={500}
                        height={500}
                        src={src.image_url}
                        alt="preview"
                        className="h-32 w-full rounded-md object-cover shadow-sm"
                      />

                      <button
                        className="mt-1 w-full rounded-md bg-primary py-1 text-xs font-bold text-white"
                        onClick={() => handleDelete(index)}
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                isLoading={loading}
                isDisabled={
                  loading || changePillar ? !pillar || !subpillar : false
                }
                color="primary"
                startContent={
                  loading ? null : <FloppyDisk weight="bold" size={18} />
                }
                className="w-max justify-self-end font-bold"
                onPress={handleUpdateDocs}
              >
                Update
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
  doc?: DetailDocumentationAdmin;
  error?: any;
  token: string;
  by: string;
}> = async ({ req, params }) => {
  try {
    const [doc, pillar] = await Promise.all([
      fetcher({
        endpoint: `/docs/${params?.slug}`,
        method: "GET",
        token: req.headers["access_token"] as string,
        role: "admin",
      }),
      fetcher({
        endpoint: "/pillars",
        method: "GET",
      }),
    ]);

    return {
      props: {
        doc: doc.data as DetailDocumentationAdmin,
        pillars: pillar.data as PillarDetails[],
        token: req.headers["access_token"] as string,
        by: req.headers["fullname"] as string,
      },
    };
  } catch (error: any) {
    return {
      props: {
        error,
        token: req.headers["access_token"] as string,
        by: req.headers["fullname"] as string,
      },
    };
  }
};
