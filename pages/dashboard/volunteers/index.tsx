import EmptyData from "@/components/EmptyData";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ModalConfirmDelete from "@/components/modal/ModalConfirmDelete";
import SearchInput from "@/components/SearchInput";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { useSearch } from "@/hooks/useSearch";
import { SuccessResponse } from "@/types/global";
import { VolunteerDashboard } from "@/types/volunteer";
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
import {
  Eye,
  IconContext,
  PencilLine,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Key, ReactNode, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export type VolunteerResponse = {
  vols: VolunteerDashboard[];
  page: number;
  total_vols: number;
  total_pages: number;
};

export default function DashboardVolunteersPage({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";
  const { searchValue, setSearch } = useSearch(800);
  const { data, isLoading, mutate, error } = useSWR<
    SuccessResponse<VolunteerResponse>
  >({
    endpoint: getUrl(query, "/volunteers", "admin"),
    method: "GET",
    role: "admin",
    token: token,
  });

  console.log(data?.data);

  useEffect(() => {
    if (searchValue) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          q: searchValue,
        },
      });
    } else {
      router.push({
        pathname: router.pathname,
      });
    }
  }, [searchValue]);

  const columnsVolunteer = [
    { name: "ID Volunteer", uid: "volunteer_id" },
    { name: "Pilar", uid: "pillar" },
    { name: "Judul Volunteer", uid: "title" },
    { name: "Total Pelamar", uid: "total_volappls" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellVolunteer = useCallback(
    (vols: VolunteerDashboard, columnKey: Key) => {
      const cellValue = vols[columnKey as keyof VolunteerDashboard];

      switch (columnKey) {
        case "volunteer_id":
          return (
            <div className="w-max font-medium text-black">
              {vols.volunteer_id}
            </div>
          );
        case "pillar":
          return (
            <div className="w-max font-medium text-black">
              {vols.pillar ? vols.pillar.name : "Lainnya"} -{" "}
              {vols.subpillar ? vols.subpillar.name : "Lainnya"}
            </div>
          );
        case "title":
          return (
            <div className="w-full max-w-[300px] font-medium text-black">
              {vols.title}
            </div>
          );
        case "total_volappls":
          return (
            <div className="w-max font-extrabold text-orange">
              {vols.total_volappls}
            </div>
          );
        case "created_at":
          return (
            <div className="w-max font-medium text-black">
              {formatDate(vols.created_at)}
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
                      `/dashboard/volunteers/${encodeURIComponent(vols.volunteer_id)}`,
                    )
                  }
                >
                  <Eye />
                </Button>

                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={() =>
                    router.push(
                      `/dashboard/volunteers/${encodeURIComponent(vols.volunteer_id)}/edit`,
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
                      onPress={() => handleDeleteVolunteer(vols.volunteer_id)}
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

  async function handleDeleteVolunteer(volunteer_id: string) {
    try {
      await fetcher({
        endpoint: `/volunteers/${volunteer_id}`,
        method: "DELETE",
        token,
      });

      mutate();
      toast.success("Volunteer berhasil dihapus");
    } catch (error: any) {
      console.error(error);

      toast.error("Gagal menghapus volunteer");
    }
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Volunteer" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Volunteer 🧡"
            text="Lihat dan kelola semua volunteer di sini"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <SearchInput
                  placeholder="Cari Judul Volunteer..."
                  defaultValue={query.q as string}
                  onChange={(e) => setSearch(e.target.value)}
                  onClear={() => setSearch("")}
                />

                <Button
                  color="primary"
                  startContent={<Plus weight="bold" size={18} />}
                  onPress={() => router.push(`/dashboard/volunteers/create`)}
                  className="font-bold"
                >
                  Tambah Volunteer
                </Button>
              </div>

              <div className="overflow-x-scroll scrollbar-hide">
                <Table
                  isStriped
                  aria-label="volunteer table"
                  color="primary"
                  selectionMode="none"
                  classNames={customStyleTable}
                  className="scrollbar-hide"
                >
                  <TableHeader columns={columnsVolunteer}>
                    {(column) => (
                      <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                  </TableHeader>

                  <TableBody
                    items={data?.data.vols}
                    emptyContent={<EmptyData text="Pilar tidak ditemukan!" />}
                  >
                    {(vols: VolunteerDashboard) => (
                      <TableRow key={vols.volunteer_id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCellVolunteer(vols, columnKey) as ReactNode}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {data?.data.vols.length ? (
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
}> = async ({ query }) => {
  return {
    props: {
      query,
    },
  };
};
