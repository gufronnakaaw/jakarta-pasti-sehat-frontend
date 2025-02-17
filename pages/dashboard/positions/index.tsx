import EmptyData from "@/components/EmptyData";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ModalConfirmDelete from "@/components/modal/ModalConfirmDelete";
import {
  ModalAddPosition,
  ModalEditPosition,
} from "@/components/modal/ModalPosition";
import SearchInput from "@/components/SearchInput";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { SuccessResponse } from "@/types/global";
import { Position } from "@/types/position";
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
import { IconContext, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { Key, useCallback, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function DashboardPotisionsPage() {
  const router = useRouter();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";
  const by = "Super Admin";
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, mutate } = useSWR<SuccessResponse<Position[]>>({
    endpoint: "/positions",
    method: "GET",
    role: "admin",
    token: token,
  });

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
                <ModalEditPosition
                  {...{
                    by,
                    mutate,
                    token,
                    position_id: position.position_id,
                    position_name: position.name,
                  }}
                />

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

  async function handleDelete(position_id: string) {
    try {
      await fetcher({
        endpoint: `/positions/${position_id}`,
        method: "DELETE",
        token: token,
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

          <div className="grid gap-4">
            <div className="flex items-center justify-between gap-4">
              <SearchInput
                placeholder="Cari Jabatan..."
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch("")}
              />

              <ModalAddPosition {...{ by, token, mutate }} />
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
        </section>
      </DashboardContainer>
    </DashboardLayout>
  );
}
