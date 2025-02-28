import EmptyData from "@/components/EmptyData";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ModalConfirmDelete from "@/components/modal/ModalConfirmDelete";
import SearchInput from "@/components/SearchInput";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { SuccessResponse } from "@/types/global";
import { TeamDashboard } from "@/types/team";
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
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Key, useCallback, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export type TeamResponse = {
  teams: TeamDashboard[];
  page: number;
  total_teams: number;
  total_pages: number;
};

export default function DashboardTeamsPage({
  query,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, mutate, error } = useSWR<
    SuccessResponse<TeamResponse>
  >({
    endpoint: getUrl(query, "/teams"),
    method: "GET",
    role: "admin",
    token,
  });

  const columnsTeam = [
    { name: "Foto Profil", uid: "image_url" },
    { name: "Nama Tim", uid: "fullname" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellTeam = useCallback((team: TeamDashboard, columnKey: Key) => {
    const cellValue = team[columnKey as keyof TeamDashboard];

    switch (columnKey) {
      case "image_url":
        return (
          <Image
            src={team.image_url}
            alt={team.fullname}
            width={150}
            height={150}
            className="aspect-square size-16 rounded-lg object-cover object-center"
          />
        );
      case "fullname":
        return (
          <div className="w-max font-medium text-black">{team.fullname}</div>
        );
      case "created_at":
        return (
          <div className="w-max font-medium text-black">
            {formatDate(team.created_at)}
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
                  router.push(`/dashboard/teams/${team.team_id}/edit`)
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
                    onPress={() => handleDeleteTeam(team.team_id)}
                    className="px-6 font-bold"
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

  async function handleDeleteTeam(team_id: string) {
    try {
      await fetcher({
        endpoint: `/teams/${team_id}`,
        method: "DELETE",
        token,
      });

      mutate();
      toast.success("Tim berhasil dihapus");
    } catch (error: any) {
      console.error(error);

      toast.error("Gagal menghapus tim");
    }
  }

  const filteredTeam = data?.data.teams.filter((team) =>
    [team.fullname, team.team_id].some((value) =>
      value.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Tim" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Tim 👥"
            text="Lihat dan kelola semua tim di sini"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <SearchInput
                  placeholder="Cari Nama Tim..."
                  onChange={(e) => setSearch(e.target.value)}
                  onClear={() => setSearch("")}
                />

                <Button
                  color="primary"
                  startContent={<Plus weight="bold" size={18} />}
                  onPress={() => router.push("/dashboard/teams/create")}
                  className="font-bold"
                >
                  Tambah Tim
                </Button>
              </div>

              <div className="overflow-x-scroll scrollbar-hide">
                <Table
                  isStriped
                  aria-label="teams table"
                  color="primary"
                  selectionMode="none"
                  classNames={customStyleTable}
                  className="scrollbar-hide"
                >
                  <TableHeader columns={columnsTeam}>
                    {(column) => (
                      <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                  </TableHeader>

                  <TableBody
                    items={filteredTeam || []}
                    emptyContent={<EmptyData text="Tim tidak ditemukan!" />}
                  >
                    {(team: TeamDashboard) => (
                      <TableRow key={team.team_id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCellTeam(team, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {data?.data.teams.length ? (
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
  return {
    props: {
      token: req.headers["access_token"] as string,
      query,
    },
  };
};
