import { createContext } from "react";

type AppContextType = {
  isOpenModalDonation: boolean;
  onOpenModalDonation: () => void;
  onCloseModalDonation: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
