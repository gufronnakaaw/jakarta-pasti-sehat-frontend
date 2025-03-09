import EmptyData from "@/components/EmptyData";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ModalConfirmDelete from "@/components/modal/ModalConfirmDelete";
import SearchInput from "@/components/SearchInput";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { SuccessResponse } from "@/types/global";
import { Position } from "@/types/position";
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
import { Key, useCallback, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function DashboardPotisionsPage({
  token,
  by,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { data, isLoading, mutate, error } = useSWR<
    SuccessResponse<Position[]>
  >({
    endpoint: "/positions",
    method: "GET",
    role: "admin",
    token,
  });
  const [search, setSearch] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [positionId, setPositionId] = useState<string>("");
  const [typeModal, setTypeModal] = useState<"create" | "edit">("create");
  const [loading, setLoading] = useState<boolean>(false);

  const columnsPosition = [
    { name: "ID Jabatan", uid: "position_id" },
    { name: "Nama Jabatan", uid: "name" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellPosition = useCallback(
    (position: Position, columnKey: Key) => {
      const cellValue = position[columnKey as keyof Position];

      switch (columnKey) {
        case "position_id":
          return (
            <div className="w-max font-medium text-black">
              {position.position_id}
            </div>
          );
        case "name":
          return (
            <div className="w-max font-medium text-black">{position.name}</div>
          );
        case "created_at":
          return (
            <div className="w-max font-medium text-black">
              {formatDate(position.created_at)}
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

                    setName(position.name);
                    setPositionId(position.position_id);
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
                      onPress={() => handleDelete(position.position_id)}
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

  async function handleAddPosition() {
    setLoading(true);

    try {
      await fetcher({
        endpoint: "/positions",
        method: "POST",
        data: { name, by },
        token,
      });

      mutate();
      toast.success("Jabatan berhasil ditambahkan");

      setName("");
      onClose();
    } catch (error: any) {
      console.error(error);

      setLoading(false);
      toast.error("Gagal menambahkan jabatan");
    } finally {
      setLoading(false);
    }
  }

  async function handleEditPosition() {
    setLoading(true);

    try {
      await fetcher({
        endpoint: "/positions",
        method: "PATCH",
        data: { position_id: positionId, name, by },
        token,
      });

      mutate();
      toast.success("Jabatan berhasil diubah");

      setName("");
      setPositionId("");
      onClose();
    } catch (error: any) {
      console.error(error);

      setLoading(false);
      toast.error("Gagal mengubah data jabatan");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(position_id: string) {
    try {
      await fetcher({
        endpoint: `/positions/${position_id}`,
        method: "DELETE",
        token,
      });

      mutate();
      toast.success("Jabatan berhasil dihapus");
    } catch (error: any) {
      console.error(error);

      toast.error("Gagal menghapus jabatan");
    }
  }

  const filteredPosition = data?.data.filter((position) =>
    [position.name, position.position_id].some((value) =>
      value.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Posisi" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Jabatan 📄"
            text="Lihat dan kelola semua jabatan di sini"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <SearchInput
                  placeholder="Cari Jabatan..."
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
                  Tambah Jabatan
                </Button>

                <Modal
                  isDismissable={false}
                  hideCloseButton={true}
                  placement="center"
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  onClose={() => {
                    onClose();
                    setName("");
                    setPositionId("");
                  }}
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="font-extrabold text-black">
                          {typeModal == "create" ? "Tambah" : "Edit"} Jabatan
                        </ModalHeader>

                        <ModalBody>
                          <Input
                            isRequired
                            type="text"
                            variant="flat"
                            label="Nama Jabatan"
                            labelPlacement="outside"
                            placeholder="Contoh: Marketing"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            classNames={{
                              ...customStyleInput,
                              inputWrapper: "bg-white",
                            }}
                            className="flex-1"
                          />
                        </ModalBody>

                        <ModalFooter>
                          <div className="inline-flex items-center gap-2">
                            <Button
                              color="danger"
                              variant="light"
                              onPress={() => {
                                onClose();
                                setName("");
                                setPositionId("");
                              }}
                              className="px-6 font-bold"
                            >
                              Tutup
                            </Button>

                            <Button
                              isLoading={loading}
                              isDisabled={loading || !name}
                              color="primary"
                              onPress={() => {
                                if (typeModal == "create") {
                                  handleAddPosition();
                                } else {
                                  handleEditPosition();
                                }
                              }}
                              className="px-6 font-bold"
                            >
                              Simpan
                            </Button>
                          </div>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>

              <div className="overflow-x-scroll scrollbar-hide">
                <Table
                  isStriped
                  aria-label="positions table"
                  color="primary"
                  selectionMode="none"
                  classNames={customStyleTable}
                  className="scrollbar-hide"
                >
                  <TableHeader columns={columnsPosition}>
                    {(column) => (
                      <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                  </TableHeader>

                  <TableBody
                    items={filteredPosition ?? []}
                    emptyContent={<EmptyData text="Jabatan tidak ditemukan!" />}
                  >
                    {(position: Position) => (
                      <TableRow key={position.position_id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCellPosition(position, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  token: string;
  by: string;
}> = async ({ req }) => {
  const token = req.headers["access_token"] as string;
  const by = req.headers["fullname"] as string;

  return {
    props: {
      token,
      by,
    },
  };
};
