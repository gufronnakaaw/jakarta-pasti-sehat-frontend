import { Button, ButtonProps } from "@heroui/react";
import { useRouter } from "next/router";

type ButtonDashbaordProps = ButtonProps & {
  path: string;
};

export default function ButtonDashbaord({
  path,
  ...props
}: ButtonDashbaordProps) {
  const router = useRouter();

  return (
    <Button
      variant="light"
      color="primary"
      size="sm"
      onPress={() => router.push(`/dashboard${path}`)}
      className="w-max font-bold text-orange"
      {...props}
    >
      Lihat Detail
    </Button>
  );
}
