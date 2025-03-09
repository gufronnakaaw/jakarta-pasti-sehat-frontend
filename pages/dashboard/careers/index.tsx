import EmptyData from "@/components/EmptyData";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ModalConfirmDelete from "@/components/modal/ModalConfirmDelete";
import SearchInput from "@/components/SearchInput";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { useSearch } from "@/hooks/useSearch";
import { CareerDashboard } from "@/types/career";
import { SuccessResponse } from "@/types/global";
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

type CareerResponse = {
  careers: CareerDashboard[];
  page: number;
  total_careers: number;
  total_pages: number;
};

export default function DashboardCareersPage({
  query,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { searchValue, setSearch } = useSearch(800);
  const { data, isLoading, mutate, error } = useSWR<
    SuccessResponse<CareerResponse>
  >({
    endpoint: getUrl(query, "/careers", "admin"),
    method: "GET",
    role: "admin",
    token: token,
  });

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

  const columnsCareer = [
    { name: "ID Karir", uid: "career_id" },
    { name: "Pilar", uid: "pillar" },
    { name: "Judul Karir", uid: "title" },
    { name: "Total Pelamar", uid: "total_carappls" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellCareer = useCallback(
    (career: CareerDashboard, columnKey: Key) => {
      const cellValue = career[columnKey as keyof CareerDashboard];

      switch (columnKey) {
        case "career_id":
          return (
            <div className="w-max font-medium text-black">
              {career.career_id}
            </div>
          );
        case "pillar":
          return (
            <div className="w-max font-medium text-black">
              {career.pillar ? career.pillar.name : "Lainnya"} -{" "}
              {career.subpillar ? career.subpillar.name : "Lainnya"}
            </div>
          );
        case "title":
          return (
            <div className="w-full max-w-[300px] font-medium text-black">
              {career.title}
            </div>
          );
        case "total_carappls":
          return (
            <div className="w-max font-extrabold text-orange">
              {career.total_carappls}
            </div>
          );
        case "created_at":
          return (
            <div className="w-max font-medium text-black">
              {formatDate(career.created_at)}
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
                      `/dashboard/careers/${encodeURIComponent(career.career_id)}`,
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
                      `/dashboard/careers/${encodeURIComponent(career.career_id)}/edit`,
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
                      onPress={() => handleDeleteCareer(career.career_id)}
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

  async function handleDeleteCareer(career_id: string) {
    try {
      await fetcher({
        endpoint: `/careers/${career_id}`,
        method: "DELETE",
        token,
      });

      mutate();
      toast.success("Karir berhasil dihapus");
    } catch (error: any) {
      console.error(error);

      toast.error("Gagal menghapus karir");
    }
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Karir" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Karir 🧳"
            text="Lihat dan kelola semua karir di sini"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <SearchInput
                  placeholder="Cari Judul Karir..."
                  defaultValue={query.q as string}
                  onChange={(e) => setSearch(e.target.value)}
                  onClear={() => setSearch("")}
                />

                <Button
                  color="primary"
                  startContent={<Plus weight="bold" size={18} />}
                  onPress={() => router.push(`/dashboard/careers/create`)}
                  className="font-bold"
                >
                  Tambah Karir
                </Button>
              </div>

              <div className="overflow-x-scroll scrollbar-hide">
                <Table
                  isStriped
                  aria-label="career table"
                  color="primary"
                  selectionMode="none"
                  classNames={customStyleTable}
                  className="scrollbar-hide"
                >
                  <TableHeader columns={columnsCareer}>
                    {(column) => (
                      <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                  </TableHeader>

                  <TableBody
                    items={data?.data.careers}
                    emptyContent={<EmptyData text="Karir tidak ditemukan!" />}
                  >
                    {(career: CareerDashboard) => (
                      <TableRow key={career.career_id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCellCareer(career, columnKey) as ReactNode}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {data?.data.careers.length ? (
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
}> = async ({ query, req }) => {
  const token = req.headers["access_token"] as string;

  return {
    props: {
      query,
      token,
    },
  };
};
