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
import { Button, Input, Select, SelectItem, Switch } from "@heroui/react";
import {
  Download,
  FloppyDisk,
  Trash,
  WarningCircle,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";

export default function CreateDocumentationPage({
  pillars,
  error,
  token,
  by,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [file, setFile] = useState<string | ArrayBuffer | null>();
  const [filename, setFilename] = useState("");
  const [type, setType] = useState("");
  const [input, setInput] = useState({
    title: "",
  });
  const [pillar, setPillar] = useState("");
  const [subpillar, setSubpillar] = useState("");
  const subPillars = pillars?.find((item) => item.pillar_id === pillar);
  const [changePillar, setChangePillar] = useState(false);

  const [zoomImage, setZoomImage] = useState<number>(1);
  const [cropImage, setCropImage] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

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

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }

  function handleDelete(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  }

  async function handleSaveDocs() {
    setLoading(true);

    try {
      const formData = new FormData();
      const croppedImage = await getCroppedImg(file, croppedAreaPixels);

      const response = await fetch(croppedImage as string);
      const blob = await response.blob();

      const fileConvert = new File([blob], `${filename}`, {
        type,
      });

      if (changePillar) {
        formData.append("pillar_id", pillar);
        formData.append("sub_pillar_id", subpillar);
      }

      formData.append("thumbnail", fileConvert);
      formData.append("title", input.title);
      formData.append("by", by);

      files.forEach((file) => {
        formData.append("doc_images", file);
      });

      await fetcher({
        endpoint: "/docs",
        method: "POST",
        file: true,
        token,
        data: formData,
      });

      router.back();
      toast.success("Dokumentasi berhasil dibuat");
    } catch (error) {
      console.log(error);
      toast.error("Gagal menambahkan dokumentasi");
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
                    label="Judul Dokumentasi"
                    labelPlacement="outside"
                    placeholder="Contoh: Dokumentasi Kegiatan Jakarta Pasti Sehat"
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
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                <div className="inline-flex max-w-[400px] items-start gap-2">
                  <WarningCircle
                    weight="duotone"
                    size={24}
                    className="text-danger"
                  />

                  <p className="text-[12px] font-medium italic text-gray">
                    Harap masukan foto secara bertahap! Pastikan juga ukuran
                    foto sudah dikompres agar ukurannya lebih kecil.
                  </p>
                </div>

                <div
                  className="h-[350px] w-full rounded-xl border-2 border-dashed border-gray/20 p-1"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFilesDrop}
                >
                  <label
                    htmlFor="fileInput"
                    className="flex h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-gray/20"
                  >
                    <p className="text-sm font-semibold text-gray">
                      Drag & drop file di sini
                    </p>
                    <Download
                      weight="duotone"
                      size={72}
                      className="py-2 text-gray"
                    />
                    <input
                      multiple
                      type="file"
                      id="fileInput"
                      accept="image/jpg, image/jpeg, image/png"
                      onChange={handleFilesSelect}
                      className="hidden"
                    />
                    <p className="text-sm font-semibold text-gray">
                      Atau klik untuk pilih file
                    </p>
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
                        src={src}
                        alt="preview"
                        className="h-48 w-full rounded-2xl object-cover object-center shadow-sm"
                      />

                      <Button
                        isIconOnly
                        color="danger"
                        onPress={() => handleDelete(index)}
                        className="absolute right-4 top-4 z-20"
                      >
                        <Trash weight="bold" size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                isLoading={loading}
                isDisabled={
                  loading ||
                  !file ||
                  !files.length ||
                  !Object.values(input).every((value) => value.trim() !== "") ||
                  changePillar
                    ? !pillar || !subpillar
                    : false
                }
                color="primary"
                startContent={
                  loading ? null : <FloppyDisk weight="bold" size={18} />
                }
                className="w-max justify-self-end font-bold"
                onPress={handleSaveDocs}
              >
                Simpan Dokumentasi
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
  token: string;
  by: string;
}> = async ({ req }) => {
  try {
    const response = await fetcher({
      endpoint: "/pillars",
      method: "GET",
    });

    return {
      props: {
        pillars: response.data as PillarDetails[],
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
