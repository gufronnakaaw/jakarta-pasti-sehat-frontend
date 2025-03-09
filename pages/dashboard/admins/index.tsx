import EmptyData from "@/components/EmptyData";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ModalConfirmDelete from "@/components/modal/ModalConfirmDelete";
import SearchInput from "@/components/SearchInput";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { Admin } from "@/types/admin";
import { SuccessResponse } from "@/types/global";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { IconContext, PencilLine, Plus, Trash } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function DashboardAminssPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { data, isLoading, mutate, error } = useSWR<SuccessResponse<Admin[]>>({
    endpoint: "/admin",
    method: "GET",
    role: "admin",
    token,
  });
  const [search, setSearch] = useState<string>("");

  const columnsAdmin = [
    { name: "ID Admin", uid: "admin_id" },
    { name: "Nama Admin", uid: "fullname" },
    { name: "Role", uid: "role" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellAdmin = useCallback((admin: Admin, columnKey: React.Key) => {
    const cellValue = admin[columnKey as keyof Admin];

    switch (columnKey) {
      case "admin_id":
        return (
          <div className="w-max font-medium text-black">{admin.admin_id}</div>
        );
      case "fullname":
        return <div className="font-medium text-black">{admin.fullname}</div>;
      case "role":
        return <div className="w-max font-medium text-black">{admin.role}</div>;
      case "created_at":
        return (
          <div className="w-max font-medium text-black">
            {formatDate(admin.created_at)}
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
                onPress={() =>
                  router.push(`/dashboard/admins/${admin.admin_id}/edit`)
                }
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
                    onPress={() => handleDeleteAdmin(admin.admin_id)}
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

  async function handleDeleteAdmin(admin_id: string) {
    try {
      await fetcher({
        endpoint: `/admin/${admin_id}`,
        method: "DELETE",
        token,
      });

      mutate();
      toast.success("Admin berhasil dihapus");
    } catch (error: any) {
      console.error(error);

      toast.error("Gagal menghapus admin");
    }
  }

  const filteredAdmin = data?.data.filter((admin) =>
    [admin.fullname, admin.admin_id].some((value) =>
      value.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Admin" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Admin 🧑"
            text="Lihat dan kelola semua admin di sini"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <SearchInput
                  placeholder="Cari Nama Admin..."
                  onChange={(e) => setSearch(e.target.value)}
                  onClear={() => setSearch("")}
                />

                <Button
                  color="primary"
                  startContent={<Plus weight="bold" size={18} />}
                  onPress={() => router.push("/dashboard/admins/create")}
                  className="font-bold"
                >
                  Tambah Admin
                </Button>
              </div>

              <div className="overflow-x-scroll scrollbar-hide">
                <Table
                  isStriped
                  aria-label="admin table"
                  color="primary"
                  selectionMode="none"
                  classNames={customStyleTable}
                  className="scrollbar-hide"
                >
                  <TableHeader columns={columnsAdmin}>
                    {(column) => (
                      <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                  </TableHeader>

                  <TableBody
                    items={filteredAdmin ?? []}
                    emptyContent={<EmptyData text="Admin tidak ditemukan!" />}
                  >
                    {(admin: Admin) => (
                      <TableRow key={admin.admin_id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCellAdmin(admin, columnKey)}
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
}> = async ({ req }) => {
  const token = req.headers["access_token"] as string;

  return {
    props: {
      token,
    },
  };
};
