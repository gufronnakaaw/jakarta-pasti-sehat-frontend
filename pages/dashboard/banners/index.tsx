import EmptyData from "@/components/EmptyData";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ModalConfirmDelete from "@/components/modal/ModalConfirmDelete";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { Banner } from "@/types/banner";
import { SuccessResponse } from "@/types/global";
import getCroppedImg from "@/utils/cropImage";
import { customStyleInput } from "@/utils/customStyleInput";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import {
  IconContext,
  Link,
  PencilLine,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";
import useSWR from "swr";

type BannerResponse = {
  banners: Banner[];
  page: number;
  total_banners: number;
  total_pages: number;
};

export default function DashboardBannersPage() {
  const router = useRouter();
  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [file, setFile] = useState<string | ArrayBuffer | null>();
  const [filename, setFilename] = useState("");
  const [type, setType] = useState("");
  const [input, setInput] = useState({ description: "", link: "" });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  const [typeModal, setTypeModal] = useState<"create" | "edit">("create");
  const [bannerId, setBannerId] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";
  const by = "Super Admin";

  const { data, isLoading, mutate, error } = useSWR<
    SuccessResponse<BannerResponse>
  >({
    endpoint: "/banners",
    method: "GET",
    token: token,
  });

  const columnsBanner = [
    { name: "ID Banner", uid: "banner_id" },
    { name: "Gambar", uid: "image" },
    { name: "Deskripsi", uid: "description" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellBanner = useCallback(
    (banner: Banner, columnKey: React.Key) => {
      const cellValue = banner[columnKey as keyof Banner];

      switch (columnKey) {
        case "banner_id":
          return (
            <div className="w-max font-medium text-black">
              {banner.banner_id}
            </div>
          );
        case "image":
          return (
            <Image
              priority
              src={banner.image_url}
              alt={banner.alt}
              width={800}
              height={500}
              className="aspect-square h-16 w-24 cursor-pointer rounded-lg object-cover object-center"
              onClick={() => window.open(banner.image_url, "_blank")}
            />
          );
        case "description":
          return (
            <div className="w-max font-medium text-black">
              {banner.description}
            </div>
          );
        case "created_at":
          return (
            <div className="w-max font-medium text-black">
              {formatDate(banner.created_at)}
            </div>
          );
        case "action":
          return (
            <IconContext.Provider
              value={{
                weight: "bold",
                size: 18,
                className: "text-gray",
              }}
            >
              <div className="inline-flex w-max items-center gap-1">
                {banner.link ? (
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => window.open(banner.link, "_blank")}
                  >
                    <Link />
                  </Button>
                ) : null}

                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={() => {
                    onOpen();
                    setTypeModal("edit");

                    setInput({
                      description: banner.description,
                      link: banner.link,
                    });

                    setFile(banner.image_url);
                    setBannerId(banner.banner_id);
                  }}
                >
                  <PencilLine />
                </Button>

                <ModalConfirmDelete
                  trigger={
                    <Button isIconOnly variant="light" size="sm" color="danger">
                      <Trash className="text-danger" />
                    </Button>
                  }
                  footer={() => (
                    <Button
                      color="danger"
                      className="px-6 font-bold"
                      onPress={() => handleDeleteBanner(banner.banner_id)}
                    >
                      Ya, Hapus
                    </Button>
                  )}
                />
              </div>
            </IconContext.Provider>
          );

        default:
          return cellValue;
      }
    },
    [],
  );

  async function handleSaveBanner() {
    setLoading(true);

    try {
      const formData = new FormData();
      const croppedImage = await getCroppedImg(file, croppedAreaPixels);

      const response = await fetch(croppedImage as string);
      const blob = await response.blob();

      const fileConvert = new File([blob], `${filename}`, {
        type,
      });

      formData.append("banner", fileConvert);
      formData.append("alt", input.description);
      formData.append("description", input.description);
      formData.append("link", input.link);
      formData.append("by", by);

      await fetcher({
        endpoint: "/banners",
        method: "POST",
        file: true,
        token,
        data: formData,
      });

      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setFile(null);
      setFilename("");
      setType("");
      setInput({ description: "", link: "" });
      setCroppedAreaPixels(null);

      mutate();

      toast.success("Berhasil menyimpan banner");
      onClose();
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat menyimpan banner");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteBanner(banner_id: string) {
    try {
      await fetcher({
        endpoint: `/banners/${banner_id}`,
        method: "DELETE",
        token,
      });

      toast.success("Berhasil menghapus banner");
      mutate();
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat menghapus banner");
    }
  }

  async function handleEditBanner() {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("banner_id", bannerId);
      formData.append("alt", input.description);
      formData.append("description", input.description);
      formData.append("link", input.link);
      formData.append("by", by);

      if (filename) {
        const croppedImage = await getCroppedImg(file, croppedAreaPixels);

        const response = await fetch(croppedImage as string);
        const blob = await response.blob();

        const fileConvert = new File([blob], `${filename}`, {
          type,
        });

        formData.append("banner", fileConvert);
      }

      await fetcher({
        endpoint: "/banners",
        method: "PATCH",
        file: true,
        token,
        data: formData,
      });

      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setFile(null);
      setFilename("");
      setType("");
      setInput({ description: "", link: "" });
      setCroppedAreaPixels(null);
      setBannerId("");

      mutate();
      toast.success("Berhasil mengedit banner");

      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat mengedit banner");
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Banner" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Banner 🖼️"
            text="Lihat dan kelola semua banner di sini"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid gap-4">
              <Button
                color="primary"
                startContent={<Plus weight="bold" size={18} />}
                onPress={() => {
                  onOpen();
                  setTypeModal("create");
                }}
                className="justify-self-end font-bold"
              >
                Tambah Banner
              </Button>

              <Modal
                placement="center"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="3xl"
                onClose={() => {
                  setCrop({ x: 0, y: 0 });
                  setZoom(1);
                  setFile(null);
                  setFilename("");
                  setType("");
                  setInput({ description: "", link: "" });
                  setCroppedAreaPixels(null);
                  setBannerId("");
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="font-extrabold text-black">
                        {typeModal == "create" ? "Tambah" : "Edit"} Banner
                      </ModalHeader>

                      <ModalBody>
                        <div className="grid max-w-[250px] gap-4">
                          <div className="inline-flex gap-2">
                            <div className="aspect-video h-[200px] w-full rounded-[20px] border-[2px] border-dashed border-foreground-200 p-2">
                              <div className="relative flex h-full items-center justify-center overflow-hidden rounded-xl bg-foreground-200">
                                <Cropper
                                  image={file as string}
                                  crop={crop}
                                  zoom={zoom}
                                  aspect={16 / 9}
                                  onCropChange={setCrop}
                                  onCropComplete={(
                                    croppedArea: any,
                                    croppedAreaPixels: any,
                                  ) => {
                                    setCroppedAreaPixels(croppedAreaPixels);
                                  }}
                                  onZoomChange={setZoom}
                                />
                              </div>
                            </div>
                          </div>
                          <p className="mt-1.5 text-[12px] font-medium italic text-foreground-600">
                            * Preview banner
                          </p>

                          <div className="grid gap-4">
                            <div className="grid gap-1.5">
                              <span className="inline-flex text-sm after:ml-[2px] after:text-danger after:content-['*']">
                                Cari Gambar
                              </span>
                              <input
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                className="rounded-xl bg-foreground-200 px-2 py-2 text-small text-foreground-600 file:mr-4 file:rounded-md file:border-0 file:bg-foreground-100 file:px-2 file:py-[2px] file:text-sm file:font-medium file:text-emerald-600 hover:file:bg-foreground-200"
                                onChange={(e) => {
                                  if (!e.target.files) {
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

                                  if (
                                    !validTypes.includes(e.target.files[0].type)
                                  ) {
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

                                    toast.error(
                                      "Terjadi kesalahan saat meload gambar",
                                    );

                                    console.log(error);
                                  };
                                }}
                              />
                            </div>

                            <Input
                              value={input.description}
                              type="text"
                              variant="flat"
                              labelPlacement="outside"
                              placeholder="Contoh: Banner Kegiatan"
                              label="Deskripsi"
                              classNames={customStyleInput}
                              onChange={(e) =>
                                setInput({
                                  ...input,
                                  description: e.target.value,
                                })
                              }
                            />

                            <Input
                              value={input.link}
                              type="text"
                              variant="flat"
                              labelPlacement="outside"
                              placeholder="Contoh: https://jakartapastisehat.com"
                              label="Link (optional)"
                              classNames={customStyleInput}
                              onChange={(e) =>
                                setInput({ ...input, link: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </ModalBody>

                      <ModalFooter>
                        <div className="inline-flex items-center gap-2">
                          <Button
                            color="danger"
                            variant="light"
                            onPress={() => {
                              setCrop({ x: 0, y: 0 });
                              setZoom(1);
                              setFile(null);
                              setFilename("");
                              setType("");
                              setInput({ description: "", link: "" });
                              setCroppedAreaPixels(null);
                              setBannerId("");
                              onClose();
                            }}
                            className="px-6 font-bold"
                          >
                            Tutup
                          </Button>

                          <Button
                            color="primary"
                            className="px-6 font-bold"
                            onPress={() => {
                              if (typeModal == "create") {
                                handleSaveBanner();
                              } else {
                                handleEditBanner();
                              }
                            }}
                            isLoading={loading}
                            isDisabled={
                              typeModal == "create"
                                ? !file || !input.description || loading
                                : undefined
                            }
                          >
                            Simpan
                          </Button>
                        </div>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>

              <div className="overflow-x-scroll scrollbar-hide">
                <Table
                  isStriped
                  aria-label="banner table"
                  color="primary"
                  selectionMode="none"
                  classNames={customStyleTable}
                  className="scrollbar-hide"
                >
                  <TableHeader columns={columnsBanner}>
                    {(column) => (
                      <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                  </TableHeader>

                  <TableBody
                    items={data?.data.banners}
                    emptyContent={<EmptyData text="Banner tidak ditemukan!" />}
                  >
                    {(banner: Banner) => (
                      <TableRow key={banner.banner_id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCellBanner(banner, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {data?.data.banners.length ? (
                <Pagination
                  isCompact
                  showControls
                  color="primary"
                  page={data.data.page as number}
                  total={data.data.total_pages as number}
                  onChange={(e) => {
                    router.push({
                      query: {
                        ...router.query,
                        page: e,
                      },
                    });
                  }}
                  className="justify-self-center"
                />
              ) : null}
            </div>
          )}
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
