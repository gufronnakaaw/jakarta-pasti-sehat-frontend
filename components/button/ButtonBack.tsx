import { Button, ButtonProps } from "@heroui/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

type ButtonBackProps = ButtonProps & {
  className?: string;
};

export default function ButtonBack({ className, ...props }: ButtonBackProps) {
  const router = useRouter();

  return (
    <Button
      variant="bordered"
      startContent={<ArrowLeft weight="bold" size={18} />}
      onPress={() => router.back()}
      className={twMerge(
        "mt-32 w-max px-6 font-bold text-black",
        `${className}`,
      )}
      {...props}
    >
      Kembali
    </Button>
  );
}
