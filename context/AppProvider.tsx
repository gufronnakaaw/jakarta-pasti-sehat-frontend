import { AppContext } from "@/context/AppContext";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export default function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const {
    isOpen: isOpenModalDonation,
    onOpen: onOpenModalDonation,
    onClose: onCloseModalDonation,
  } = useDisclosure();

  useEffect(() => {
    onCloseModalDonation();
  }, [router, onCloseModalDonation]);

  return (
    <AppContext.Provider
      value={{
        isOpenModalDonation,
        onOpenModalDonation,
        onCloseModalDonation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
