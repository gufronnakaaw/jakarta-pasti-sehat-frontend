import { AppContext } from "@/context/AppContext";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export default function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  useEffect(() => {
    onCloseModal();
  }, [router, onCloseModal]);

  return (
    <AppContext.Provider
      value={{
        isOpenModal,
        onOpenModal,
        onCloseModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
