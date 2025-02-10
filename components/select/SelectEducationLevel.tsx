import { Select, SelectItem } from "@heroui/react";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type SelectEducationLevelProps = {
  value?: Set<never>;
  setValue?: Dispatch<SetStateAction<Set<never>>>;
  className?: string;
};

const dataEduLevel = [
  { key: "tk", label: "TK" },
  { key: "sd", label: "SD" },
  { key: "smp", label: "SMP" },
  { key: "sma", label: "SMA" },
  { key: "smk", label: "SMK" },
  { key: "d1", label: "D1" },
  { key: "d2", label: "D2" },
  { key: "d3", label: "D3" },
  { key: "d4", label: "D4" },
  { key: "s1", label: "S1" },
  { key: "s2", label: "S2" },
  { key: "s3", label: "S3" },
];

export default function SelectEducationLevel({
  value,
  setValue,
  className,
}: SelectEducationLevelProps) {
  return (
    <Select
      isRequired
      aria-label="select edu level data"
      variant="flat"
      placeholder="Pilih Tingkatan"
      label="Tingkatan Pendidikan"
      labelPlacement="outside"
      items={dataEduLevel}
      selectedKeys={value}
      onSelectionChange={setValue as undefined}
      listboxProps={{
        itemClasses: {
          title: "font-semibold text-black",
        },
      }}
      classNames={{
        base: "w-full sm:w-[200px]",
        value: "font-semibold text-black",
      }}
      className={twMerge(`${className}`)}
    >
      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
    </Select>
  );
}
