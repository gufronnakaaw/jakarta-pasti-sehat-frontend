import EmptyData from "@/components/EmptyData";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ModalConfirmDelete from "@/components/modal/ModalConfirmDelete";
import SearchInput from "@/components/SearchInput";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { SuccessResponse } from "@/types/global";
import { Partner } from "@/types/partner";
import getCroppedImg from "@/utils/cropImage";
import { customStyleInput } from "@/utils/customStyleInput";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { getUrl } from "@/utils/string";
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
import { IconContext, PencilLine, Plus, Trash } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Key, useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";
import useSWR from "swr";

export type PartnerResponse = {
  partners: Partner[];
  page: number;
  total_partners: number;
  total_pages: number;
};

export default function DashboardTeamsPage({
  query,
  token,
  by,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { data, isLoading, mutate, error } = useSWR<
    SuccessResponse<PartnerResponse>
  >({
    endpoint: getUrl(query, "/partners", "admin"),
    method: "GET",
    role: "admin",
    token: token,
  });
  const [search, setSearch] = useState<string>("");

  const [altImage, setAltImage] = useState<string>("");
  const [partnerId, setPartnerId] = useState<string>("");
  const [typeModal, setTypeModal] = useState<"create" | "edit">("create");
  const [loading, setLoading] = useState<boolean>(false);

  const [file, setFile] = useState<string | ArrayBuffer | null>();
  const [filename, setFilename] = useState("");
  const [type, setType] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const columnsPartner = [
    { name: "Logo", uid: "image_url" },
    { name: "Nama Mitra", uid: "alt" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellPartner = useCallback((partner: Partner, columnKey: Key) => {
    const cellValue = partner[columnKey as keyof Partner];

    switch (columnKey) {
      case "image_url":
        return (
          <Image
            src={partner.image_url}
            alt={partner.alt}
            width={150}
            height={150}
            className="aspect-square size-16 cursor-pointer rounded-lg object-cover object-center"
            onClick={() => window.open(partner.image_url, "_blank")}
          />
        );
      case "alt":
        return (
          <div className="w-max font-medium capitalize text-black">
            {partner.alt}
          </div>
        );
      case "created_at":
        return (
          <div className="w-max font-medium text-black">
            {formatDate(partner.created_at)}
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
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => {
                  onOpen();
                  setTypeModal("edit");

                  setFile(partner.image_url);
                  setAltImage(partner.alt);
                  setPartnerId(partner.partner_id);
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
                    onPress={() => handleDeletePartner(partner.partner_id)}
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
  }, []);

  async function handleCreatePartner() {
    setLoading(true);

    try {
      const formData = new FormData();
      const croppedImage = await getCroppedImg(file, croppedAreaPixels);

      const response = await fetch(croppedImage as string);
      const blob = await response.blob();

      const fileConvert = new File([blob], `${filename}`, {
        type,
      });

      formData.append("alt", altImage);
      formData.append("partner", fileConvert);
      formData.append("by", by);

      await fetcher({
        endpoint: "/partners",
        method: "POST",
        data: formData,
        file: true,
        token,
      });

      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setFile(null);
      setFilename("");
      setType("");
      setAltImage("");
      setCroppedAreaPixels(null);

      mutate();

      toast.success("Mitra berhasil dibuat");
      onClose();
    } catch (error: any) {
      console.error(error);

      setLoading(false);
      toast.error("Gagal menambahkan mitra");
    } finally {
      setLoading(false);
    }
  }

  async function handleEditPartner() {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("partner_id", partnerId);
      formData.append("alt", altImage);
      formData.append("by", by);

      if (filename) {
        const croppedImage = await getCroppedImg(file, croppedAreaPixels);

        const response = await fetch(croppedImage as string);
        const blob = await response.blob();

        const fileConvert = new File([blob], `${filename}`, {
          type,
        });

        formData.append("partner", fileConvert);
      }

      await fetcher({
        endpoint: "/partners",
        method: "PATCH",
        data: formData,
        file: true,
        token,
      });

      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setFile(null);
      setFilename("");
      setType("");
      setCroppedAreaPixels(null);
      setAltImage("");
      setPartnerId("");

      mutate();

      toast.success("Mitra berhasil dibuat");
      onClose();
    } catch (error: any) {
      console.error(error);

      setLoading(false);
      toast.error("Gagal menambahkan mitra");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePartner(partner_id: string) {
    try {
      await fetcher({
        endpoint: `/partners/${partner_id}`,
        method: "DELETE",
        token,
      });

      mutate();
      toast.success("Mitra berhasil dihapus");
    } catch (error: any) {
      console.error(error);

      toast.error("Gagal menghapus mitra");
    }
  }

  const filteredPartner = data?.data.partners.filter((partner) =>
    [partner.alt, partner.partner_id].some((value) =>
      value.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Mitra" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Mitra 🤝"
            text="Lihat dan kelola semua mitra di sini"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <SearchInput
                  placeholder="Cari Nama Mitra..."
                  onChange={(e) => setSearch(e.target.value)}
                  onClear={() => setSearch("")}
                />

                <Button
                  color="primary"
                  startContent={<Plus weight="bold" size={18} />}
                  onPress={() => {
                    onOpen();
                    setTypeModal("create");
                  }}
                  className="font-bold"
                >
                  Tambah Mitra
                </Button>
              </div>

              <Modal
                isDismissable={false}
                placement="center"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="md"
                onClose={() => {
                  setCrop({ x: 0, y: 0 });
                  setZoom(1);
                  setFile(null);
                  setFilename("");
                  setType("");
                  setCroppedAreaPixels(null);
                  setAltImage("");
                  setPartnerId("");
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="font-extrabold text-black">
                        {typeModal == "create" ? "Tambah" : "Edit"} Mitra
                      </ModalHeader>

                      <ModalBody>
                        <div className="grid gap-4">
                          <div className="grid justify-items-center gap-1">
                            <div className="aspect-square size-[300px] rounded-xl border-2 border-dashed border-gray/20 p-1">
                              <div className="relative flex h-full items-center justify-center overflow-hidden rounded-xl bg-gray/20">
                                <Cropper
                                  image={file as string}
                                  crop={crop}
                                  zoom={zoom}
                                  aspect={1 / 1}
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

                            <p className="text-sm font-medium leading-[170%] text-gray">
                              * Preview banner
                            </p>
                          </div>

                          <div className="grid gap-4">
                            <Input
                              isRequired
                              type="file"
                              accept=".jpg, .jpeg, .png"
                              variant="flat"
                              label="Cari Gambar"
                              labelPlacement="outside"
                              classNames={{
                                input:
                                  "block w-full flex-1 text-sm text-gray file:mr-4 file:py-1 file:px-3 file:border-0 file:rounded-lg file:bg-orange file:text-sm file:font-sans file:font-semibold file:text-white hover:file:bg-orange/80",
                              }}
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
                              classNames={customStyleInput}
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
                              setCroppedAreaPixels(null);
                              setAltImage("");
                              setPartnerId("");
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
                                handleCreatePartner();
                              } else {
                                handleEditPartner();
                              }
                            }}
                            isLoading={loading}
                            isDisabled={
                              typeModal == "create"
                                ? !file || !altImage || loading
                                : undefined
                            }
                          >
                            Simpan Mitra
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
                  aria-label="partners table"
                  color="primary"
                  selectionMode="none"
                  classNames={customStyleTable}
                  className="scrollbar-hide"
                >
                  <TableHeader columns={columnsPartner}>
                    {(column) => (
                      <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                  </TableHeader>

                  <TableBody
                    items={filteredPartner ?? []}
                    emptyContent={<EmptyData text="Mitra tidak ditemukan!" />}
                  >
                    {(partner: Partner) => (
                      <TableRow key={partner.partner_id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCellPartner(partner, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {data?.data.partners.length ? (
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

export const getServerSideProps: GetServerSideProps<{
  query: ParsedUrlQuery;
  token: string;
  by: string;
}> = async ({ req, query }) => {
  return {
    props: {
      token: req.headers["access_token"] as string,
      by: req.headers["fullname"] as string,
      query,
    },
  };
};
