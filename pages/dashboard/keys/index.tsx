import EmptyData from "@/components/EmptyData";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ModalConfirmDelete from "@/components/modal/ModalConfirmDelete";
import SearchInput from "@/components/SearchInput";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { SuccessResponse } from "@/types/global";
import { AccessKey } from "@/types/key";
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
import { Plus, Trash } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Key, useCallback, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

type InputState = {
  value: string;
  access_key: string;
};

export default function DashboardKeysPage({
  token,
  by,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const { data, isLoading, mutate, error } = useSWR<
    SuccessResponse<AccessKey[]>
  >({
    endpoint: "/keys",
    method: "GET",
    role: "admin",
    token,
  });
  const [search, setSearch] = useState<string>("");
  const [input, setInput] = useState<InputState>({
    value: "",
    access_key: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const columnsAccessKey = [
    { name: "ID Akses", uid: "access_key_id" },
    { name: "Nama Akses", uid: "value" },
    { name: "Dibuat Oleh", uid: "created_by" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellAccessKey = useCallback(
    (access: AccessKey, columnKey: Key) => {
      const cellValue = access[columnKey as keyof AccessKey];

      switch (columnKey) {
        case "access_key_id":
          return (
            <div className="w-max font-medium text-black">
              {access.access_key_id}
            </div>
          );
        case "value":
          return (
            <div className="w-max font-medium text-black">{access.value}</div>
          );
        case "created_by":
          return (
            <div className="w-max font-medium text-black">
              {access.created_by}
            </div>
          );
        case "created_at":
          return (
            <div className="w-max font-medium text-black">
              {formatDate(access.created_at)}
            </div>
          );
        case "action":
          return (
            <ModalConfirmDelete
              trigger={
                <Button
                  isIconOnly
                  isDisabled={access.access_key_id === "JPSKEY8117"}
                  variant="light"
                  size="sm"
                  color="danger"
                >
                  <Trash weight="bold" size={18} className="text-danger" />
                </Button>
              }
              footer={() => (
                <Button
                  color="danger"
                  className="px-6 font-bold"
                  onPress={() => handleDeleteAccessKey(access.access_key_id)}
                >
                  Ya, Hapus
                </Button>
              )}
            />
          );

        default:
          return cellValue;
      }
    },
    [],
  );

  async function handleAddAccessKey() {
    setLoading(true);

    try {
      const payload = {
        ...input,
        by,
      };

      await fetcher({
        endpoint: "/keys",
        method: "POST",
        data: payload,
        token,
      });

      setInput({
        value: "",
        access_key: "",
      });
      onClose();

      mutate();
      toast.success("Kunci akses berhasil dibuat");
    } catch (error: any) {
      console.error(error);

      setLoading(false);
      toast.error("Gagal menambah kunci akses");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAccessKey(access_key_id: string) {
    try {
      await fetcher({
        endpoint: `/keys/${access_key_id}/${process.env.NEXT_PUBLIC_ACCESS_KEY}`,
        method: "DELETE",
        token,
      });

      mutate();
      toast.success("Kunci akses berhasil dihapus");
    } catch (error: any) {
      console.error(error);

      toast.error("Gagal menghapus kunci akses");
    }
  }

  const filteredAccess = data?.data.filter((access) =>
    [access.value, access.access_key_id].some((value) =>
      value.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Kunci" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Akses 🔑"
            text="Lihat dan kelola semua akses di sini"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <SearchInput
                  placeholder="Cari Nama Akses..."
                  onChange={(e) => setSearch(e.target.value)}
                  onClear={() => setSearch("")}
                />

                <Button
                  color="primary"
                  startContent={<Plus weight="bold" size={18} />}
                  onPress={onOpen}
                  className="font-bold"
                >
                  Tambah Akses
                </Button>

                <Modal
                  isDismissable={false}
                  hideCloseButton={true}
                  placement="center"
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  onClose={() => {
                    onClose();
                    setInput({
                      value: "",
                      access_key: "",
                    });
                  }}
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="font-extrabold text-black">
                          Tambah Akses
                        </ModalHeader>

                        <ModalBody>
                          <div className="grid items-center gap-4">
                            <Input
                              isRequired
                              type="text"
                              variant="flat"
                              label="Nama Akses"
                              labelPlacement="outside"
                              placeholder="Contoh: JPSXXXXX"
                              name="value"
                              onChange={(e) =>
                                setInput({ ...input, value: e.target.value })
                              }
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
                              onChange={(e) =>
                                setInput({
                                  ...input,
                                  access_key: e.target.value,
                                })
                              }
                              classNames={{
                                ...customStyleInput,
                                inputWrapper: "bg-white",
                              }}
                            />
                          </div>
                        </ModalBody>

                        <ModalFooter>
                          <div className="inline-flex items-center gap-2">
                            <Button
                              color="danger"
                              variant="light"
                              onPress={() => {
                                onClose();
                                setInput({
                                  value: "",
                                  access_key: "",
                                });
                              }}
                              className="px-6 font-bold"
                            >
                              Tutup
                            </Button>

                            <Button
                              isLoading={loading}
                              isDisabled={
                                loading ||
                                !Object.values(input).every(
                                  (item) => item.trim() !== "",
                                )
                              }
                              color="primary"
                              className="px-6 font-bold"
                              onPress={handleAddAccessKey}
                            >
                              Tambah Akses
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
                  aria-label="access table"
                  color="primary"
                  selectionMode="none"
                  classNames={customStyleTable}
                  className="scrollbar-hide"
                >
                  <TableHeader columns={columnsAccessKey}>
                    {(column) => (
                      <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                  </TableHeader>

                  <TableBody
                    items={filteredAccess ?? []}
                    emptyContent={<EmptyData text="Akses tidak ditemukan!" />}
                  >
                    {(access: AccessKey) => (
                      <TableRow key={access.access_key_id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCellAccessKey(access, columnKey)}
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
