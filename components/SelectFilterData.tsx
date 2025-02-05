import { Select, SelectItem } from "@heroui/react";
import { Sliders } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

type SelectFilterDataProps = {
  value?: Set<never>;
  setValue?: Dispatch<SetStateAction<Set<never>>>;
};

const data = [
  { key: "newest", text: "Terbaru" },
  { key: "oldest", text: "Terlama" },
  { key: "a-z", text: "A-Z" },
  { key: "z-a", text: "Z-A" },
];

export default function SelectFilterData({
  value,
  setValue,
}: SelectFilterDataProps) {
  return (
    <Select
      aria-label="filter data"
      variant="flat"
      placeholder="Filter"
      labelPlacement="outside"
      items={data}
      selectedKeys={value}
      onSelectionChange={setValue as undefined}
      startContent={<Sliders weight="bold" size={18} className="text-black" />}
      listboxProps={{
        itemClasses: {
          title: "font-semibold text-black",
        },
      }}
      classNames={{
        base: "w-[180px]",
        value: "font-semibold text-black",
      }}
    >
      {(item) => <SelectItem key={item.key}>{item.text}</SelectItem>}
    </Select>
  );
}
