import EmptyData from "@/components/EmptyData";
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
import { Key, useCallback, useState } from "react";
import toast from "react-hot-toast";
import useSWR, { KeyedMutator } from "swr";

export default function DashboardKeysPage() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";
  const by = "Super Admin";
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, mutate } = useSWR<SuccessResponse<AccessKey[]>>({
    endpoint: "/keys",
    method: "GET",
    role: "admin",
    token: token,
  });

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

          <div className="grid gap-4">
            <div className="flex items-center justify-between gap-4">
              <SearchInput
                placeholder="Cari Kunci Akses..."
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch("")}
              />

              <ModalAddAccessKey {...{ by, token, mutate }} />
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
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}

function ModalAddAccessKey({
  by,
  token,
  mutate,
}: {
  by: string;
  token: string;
  mutate: KeyedMutator<any>;
}) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [input, setInput] = useState<{
    name: string;
    access_key: string;
  }>({
    name: "",
    access_key: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleAddAccessKey() {
    setIsLoading(true);

    try {
      const payload = {
        access_key: input.access_key,
        value: input.name,
        by,
      };

      await fetcher({
        endpoint: "/keys",
        method: "POST",
        data: payload,
        token,
      });

      mutate();
      toast.success("Kunci akses berhasil dibuat");
      setInput({
        access_key: "",
        name: "",
      });
    } catch (error: any) {
      console.error(error);

      setIsLoading(false);
      toast.error("Gagal menambah kunci akses");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
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
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-extrabold text-black">
                Tambah Akses
              </ModalHeader>

              <ModalBody>
                <div className="grid items-center gap-2">
                  <Input
                    type="text"
                    variant="flat"
                    labelPlacement="outside"
                    placeholder="Contoh: JPSXXXXX"
                    name="name"
                    onChange={(e) => {
                      setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    classNames={{
                      ...customStyleInput,
                      inputWrapper: "bg-white",
                    }}
                  />

                  <Input
                    type="password"
                    variant="flat"
                    labelPlacement="outside"
                    placeholder="Masukan Kunci Akses"
                    name="access_key"
                    onChange={(e) => {
                      setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                      });
                    }}
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
                    onPress={onClose}
                    className="px-6 font-bold"
                  >
                    Tutup
                  </Button>

                  <Button
                    isLoading={isLoading}
                    isDisabled={
                      !Object.values(input).every(
                        (value) => value.trim() !== "",
                      ) || isLoading
                    }
                    color="primary"
                    className="px-6 font-bold"
                    onPress={() => {
                      handleAddAccessKey();

                      setTimeout(() => {
                        onClose();
                      }, 500);
                    }}
                  >
                    {isLoading ? null : "Tambah Akses"}
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
