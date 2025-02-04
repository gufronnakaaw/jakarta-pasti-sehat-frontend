import { Button } from "@heroui/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function ButtonBack() {
  const router = useRouter();

  return (
    <Button
      variant="bordered"
      startContent={<ArrowLeft weight="bold" size={18} />}
      onPress={() => router.back()}
      className="mt-32 w-max px-6 font-bold text-black"
    >
      Kembali
    </Button>
  );
}
