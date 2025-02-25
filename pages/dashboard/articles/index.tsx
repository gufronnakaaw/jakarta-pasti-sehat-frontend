import EmptyData from "@/components/EmptyData";
import ErrorPage from "@/components/ErrorPage";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ModalConfirmDelete from "@/components/modal/ModalConfirmDelete";
import SearchInput from "@/components/SearchInput";
import TitleText from "@/components/TitleText";
import DashboardContainer from "@/components/wrapper/DashboardContainer";
import DashboardLayout from "@/components/wrapper/DashboardLayout";
import { useSearch } from "@/hooks/useSearch";
import { Article } from "@/types/article";
import { SuccessResponse } from "@/types/global";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { getUrl } from "@/utils/string";
import {
  Button,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  CheckCircle,
  IconContext,
  Link,
  PencilLine,
  Plus,
  Trash,
  XCircle,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

type ArticleResponse = {
  articles: Article[];
  page: number;
  total_articles: number;
  total_pages: number;
};

export default function DashboardArticlesPage({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { searchValue, setSearch } = useSearch(800);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IkpQU1NBMSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzM5MzM3ODgxLCJleHAiOjE3NDcxMTM4ODF9.gKAua-5M9NCQS4YTgz0t6ZgMQ_FyeGSwSaKSWO-hhpw";

  const { data, isLoading, mutate, error } = useSWR<
    SuccessResponse<ArticleResponse>
  >({
    endpoint: getUrl(query, "/articles", "admin"),
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

  const columnsArticle = [
    { name: "Gambar", uid: "image" },
    { name: "Pilar", uid: "pillar" },
    { name: "Judul Artikel", uid: "title" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Status", uid: "status" },
    { name: "Aksi", uid: "action" },
  ];

  const renderCellArticle = useCallback(
    (article: Article, columnKey: React.Key) => {
      const cellValue = article[columnKey as keyof Article];

      switch (columnKey) {
        case "image":
          return (
            <Image
              priority
              src={article.image_url}
              alt={`image ${article.title}`}
              width={500}
              height={500}
              className="aspect-square size-16 cursor-pointer rounded-lg object-cover object-center"
              onClick={() => window.open(article.image_url, "_blank")}
            />
          );
        case "pillar":
          return (
            <div className="w-max font-medium text-black">
              {article.pillar} - {article.subpillar}
            </div>
          );
        case "title":
          return (
            <div className="w-full max-w-[300px] font-medium text-black">
              {article.title}
            </div>
          );
        case "created_at":
          return (
            <div className="w-max font-medium text-black">
              {formatDate(article.created_at)}
            </div>
          );
        case "status":
          return (
            <div className="w-max font-medium text-black">
              <Chip
                variant="flat"
                size="sm"
                color={article.is_active ? "success" : "danger"}
                startContent={
                  article.is_active ? (
                    <CheckCircle weight="fill" size={16} />
                  ) : (
                    <XCircle weight="fill" size={16} />
                  )
                }
                classNames={{
                  base: "px-2 gap-1",
                  content: "font-bold capitalize",
                }}
              >
                {article.is_active ? "Aktif" : "Tidak Aktif"}
              </Chip>
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
                      `${window.origin}/articles/${article.slug}`,
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
                      onPress={() => handleDeleteArticle(article.article_id)}
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

  async function handleDeleteArticle(article_id: string) {
    try {
      await fetcher({
        endpoint: `/articles/${article_id}`,
        method: "DELETE",
        token,
      });

      mutate();
      toast.success("Berhasil menghapus artikel");
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat menghapus artikel");
    }
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <DashboardLayout title="Artikel" className="scrollbar-hide">
      <DashboardContainer>
        <section className="base-dashboard">
          <TitleText
            title="Daftar Artikel 📰"
            text="Lihat dan kelola semua artikel di sini"
          />

          {error ? (
            <ErrorPage error={error} />
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <SearchInput
                  placeholder="Cari Judul Artikel..."
                  defaultValue={query.q as string}
                  onChange={(e) => setSearch(e.target.value)}
                  onClear={() => setSearch("")}
                />

                <Button
                  color="primary"
                  startContent={<Plus weight="bold" size={18} />}
                  className="font-bold"
                  onPress={() => router.push("/dashboard/articles/create")}
                >
                  Tambah Artikel
                </Button>
              </div>

              <div className="overflow-x-scroll scrollbar-hide">
                <Table
                  isStriped
                  aria-label="article table"
                  color="primary"
                  selectionMode="none"
                  classNames={customStyleTable}
                  className="scrollbar-hide"
                >
                  <TableHeader columns={columnsArticle}>
                    {(column) => (
                      <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                  </TableHeader>

                  <TableBody
                    items={data?.data.articles}
                    emptyContent={<EmptyData text="Article tidak ditemukan!" />}
                  >
                    {(article: Article) => (
                      <TableRow key={article.article_id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCellArticle(article, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {data?.data.articles.length ? (
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
