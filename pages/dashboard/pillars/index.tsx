import EmptyData from "@/components/EmptyData";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ModalConfirmDelete from "@/components/modal/ModalConfirmDelete";
import SearchInput from "@/components/SearchInput";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { SuccessResponse } from "@/types/global";
import { Pillar } from "@/types/pillar";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { getUrl } from "@/utils/string";
import {
  Button,
  Pagination,
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
import { ParsedUrlQuery } from "querystring";
import { Key, useCallback, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export type PillarResponse = {
  pillars: Pillar[];
  page: number;
  total_pillars: number;
  total_pages: number;
};

export default function DashboardPillarsPage({
  query,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, mutate, error } = useSWR<
    SuccessResponse<PillarResponse>
  >({
    endpoint: getUrl(query, "/pillars"),
    method: "GET",
    role: "admin",
    token,
  });

  const columnsPillar = [
    { name: "ID Pilar", uid: "pillar_id" },
    { name: "Nama Pilar", uid: "name" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellPillar = useCallback((pillar: Pillar, columnKey: Key) => {
    const cellValue = pillar[columnKey as keyof Pillar];

    switch (columnKey) {
      case "pillar_id":
        return (
          <div className="w-max font-medium text-black">{pillar.pillar_id}</div>
        );
      case "name":
        return (
          <div className="w-max font-medium text-black">{pillar.name}</div>
        );
      case "created_at":
        return (
          <div className="w-max font-medium text-black">
            {formatDate(pillar.created_at)}
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
                  router.push(
                    `/dashboard/pillars/${encodeURIComponent(pillar.pillar_id)}/edit`,
                  )
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
                    onPress={() => handleDeletePillar(pillar.pillar_id)}
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

  async function handleDeletePillar(pillar_id: string) {
    try {
      await fetcher({
        endpoint: `/pillars/${pillar_id}`,
        method: "DELETE",
        token,
      });

      mutate();
      toast.success("Pilar berhasil dihapus");
    } catch (error: any) {
      console.error(error);

      toast.success("Gagal menghapus pilar");
    }
  }

  const filteredPillar = data?.data.pillars.filter((name) =>
    [name.name, name.pillar_id].some((value) =>
      value.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Pilar" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Pilar 📄"
            text="Lihat dan kelola semua pilar di sini"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <SearchInput
                  placeholder="Cari Pillar..."
                  onChange={(e) => setSearch(e.target.value)}
                  onClear={() => setSearch("")}
                />

                <Button
                  color="primary"
                  startContent={<Plus weight="bold" size={18} />}
                  onPress={() => router.push("/dashboard/pillars/create")}
                  className="font-bold"
                >
                  Tambah Pillar
                </Button>
              </div>

              <div className="overflow-x-scroll scrollbar-hide">
                <Table
                  isStriped
                  aria-label="pillar table"
                  color="primary"
                  selectionMode="none"
                  classNames={customStyleTable}
                  className="scrollbar-hide"
                >
                  <TableHeader columns={columnsPillar}>
                    {(column) => (
                      <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                  </TableHeader>

                  <TableBody
                    items={filteredPillar || []}
                    emptyContent={<EmptyData text="Pilar tidak ditemukan!" />}
                  >
                    {(pillar: Pillar) => (
                      <TableRow key={pillar.pillar_id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCellPillar(pillar, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {data?.data.pillars.length ? (
                <Pagination
                  isCompact
                  showControls
                  color="primary"
                  page={data?.data.page as number}
                  total={data?.data.total_pages as number}
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
}> = async ({ req, query }) => {
  return {
    props: {
      query: query as ParsedUrlQuery,
      token: req.headers["access_token"] as string,
    },
  };
};
