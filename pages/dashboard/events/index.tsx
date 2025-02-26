import EmptyData from "@/components/EmptyData";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ModalConfirmDelete from "@/components/modal/ModalConfirmDelete";
import SearchInput from "@/components/SearchInput";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { useSearch } from "@/hooks/useSearch";
import { EventDashboard } from "@/types/event";
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
  IconContext,
  Link,
  PencilLine,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

type EventResponse = {
  events: EventDashboard[];
  page: number;
  total_events: number;
  total_pages: number;
};

export default function DashboardEventsPage({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";
  const { searchValue, setSearch } = useSearch(800);
  const { data, isLoading, mutate, error } = useSWR<
    SuccessResponse<EventResponse>
  >({
    endpoint: getUrl(query, "/events", "admin"),
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

  const columnsEvent = [
    { name: "Gambar", uid: "image" },
    { name: "Pilar", uid: "pillar" },
    { name: "Judul Event", uid: "title" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "status", uid: "status" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellEvent = useCallback(
    (event: EventDashboard, columnKey: React.Key) => {
      const cellValue = event[columnKey as keyof EventDashboard];

      switch (columnKey) {
        case "image":
          return (
            <Image
              priority
              src={event.image_url}
              alt={`image ${event.title}`}
              width={500}
              height={500}
              className="aspect-square size-16 cursor-pointer rounded-lg object-cover object-center"
              onClick={() => window.open(event.image_url, "_blank")}
            />
          );
        case "pillar":
          return (
            <div className="w-max font-medium text-black">
              {event.pillar} - {event.subpillar}
            </div>
          );
        case "title":
          return (
            <div className="w-full max-w-[300px] font-medium text-black">
              {event.title}
            </div>
          );
        case "created_at":
          return (
            <div className="w-max font-medium text-black">
              {formatDate(event.created_at)}
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
                    window.open(
                      `${window.origin}/events/${event.slug}`,
                      "_blank",
                    )
                  }
                >
                  <Link />
                </Button>

                <Button isIconOnly variant="light" size="sm">
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
                      onPress={() => handleDeleteEvent(event.event_id)}
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

  async function handleDeleteEvent(event_id: string) {
    try {
      await fetcher({
        endpoint: `/events/${event_id}`,
        method: "DELETE",
        token,
      });

      mutate();
      toast.success("Event berhasil dihapus");
    } catch (error: any) {
      console.error(error);

      toast.error("Gagal menghapus event");
    }
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Event" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Event 📅"
            text="Lihat dan kelola semua event di sini"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <SearchInput
                  placeholder="Cari Judul Event..."
                  defaultValue={query.q as string}
                  onChange={(e) => setSearch(e.target.value)}
                  onClear={() => setSearch("")}
                />

                <Button
                  color="primary"
                  startContent={<Plus weight="bold" size={18} />}
                  className="font-bold"
                  onPress={() => router.push("/dashboard/events/create")}
                >
                  Tambah Event
                </Button>
              </div>

              <div className="overflow-x-scroll scrollbar-hide">
                <Table
                  isStriped
                  aria-label="event table"
                  color="primary"
                  selectionMode="none"
                  classNames={customStyleTable}
                  className="scrollbar-hide"
                >
                  <TableHeader columns={columnsEvent}>
                    {(column) => (
                      <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                  </TableHeader>

                  <TableBody
                    items={data?.data.events}
                    emptyContent={<EmptyData text="Event tidak ditemukan!" />}
                  >
                    {(event: EventDashboard) => (
                      <TableRow key={event.event_id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCellEvent(event, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {data?.data.events.length ? (
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
}> = async ({ query }) => {
  return {
    props: {
      query,
    },
  };
};
