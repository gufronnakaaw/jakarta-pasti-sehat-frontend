import { SuccessResponse } from "@/types/global";
import { Select, SelectItem, SelectSection } from "@heroui/react";
import { Sliders } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import useSWR from "swr";

type PillarsResponse = {
  name: string;
  slug: string;
  subpillars?: { name: string; slug: string }[];
};

export default function SelectFilterData() {
  const router = useRouter();
  const { data, isLoading, error } = useSWR<SuccessResponse<PillarsResponse[]>>(
    {
      endpoint: "/pillars",
      method: "GET",
    },
    {
      dedupingInterval: 600000,
      revalidateOnFocus: false,
    },
  );

  if (error) {
    console.log(error);
    return;
  }

  if (isLoading) return;

  const items: PillarsResponse[] = [
    { name: "Terbaru", slug: "desc" },
    { name: "Terlama", slug: "asc" },
    { name: "Lainnya", slug: "other" },
  ];

  for (const element of data?.data ? data.data : []) {
    items.push(element);
  }

  return (
    <Select
      aria-label="filter data"
      variant="flat"
      placeholder="Filter"
      labelPlacement="outside"
      startContent={<Sliders weight="bold" size={18} className="text-black" />}
      listboxProps={{
        itemClasses: {
          title: "font-semibold text-black",
        },
      }}
      classNames={{
        base: "w-[250px]",
        value: "font-semibold text-black",
      }}
      selectedKeys={[router.query.filter as string]}
      onChange={(e) => {
        const newQuery = { ...router.query };
        if (e.target.value) {
          newQuery.filter = e.target.value;
        } else {
          delete newQuery.filter;
        }

        router.push({
          pathname: router.pathname,
          query: newQuery,
        });
      }}
    >
      {items.map((item, index) => {
        return index == 0 || index == 1 || index == 2 ? (
          <SelectItem key={item.slug}>{item.name}</SelectItem>
        ) : (
          <SelectSection showDivider title={item.name}>
            {item.subpillars
              ? item.subpillars.map((subpillar) => {
                  return (
                    <SelectItem key={subpillar.slug}>
                      {subpillar.name}
                    </SelectItem>
                  );
                })
              : null}
          </SelectSection>
        );
      })}
    </Select>
  );
}
