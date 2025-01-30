import { Button } from "@heroui/react";
import { ArrowRight } from "@phosphor-icons/react";

export default function HomePage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Button
        color="primary"
        endContent={<ArrowRight weight="bold" size={18} />}
        className="px-8 font-bold"
      >
        Button
      </Button>
    </div>
  );
}
