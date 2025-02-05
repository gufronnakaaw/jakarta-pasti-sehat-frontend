import { customStyleInput } from "@/utils/customStyleInput";
import { Input, InputProps } from "@heroui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchInput(props: InputProps) {
  return (
    <Input
      isClearable
      type="text"
      variant="flat"
      labelPlacement="outside"
      startContent={
        <MagnifyingGlass weight="bold" size={18} className="text-gray" />
      }
      classNames={customStyleInput}
      className="max-w-[500px]"
      {...props}
    />
  );
}
