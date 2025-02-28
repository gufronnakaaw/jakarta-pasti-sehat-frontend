import { createContext } from "react";

type AppContextType = {
  isOpenModal: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
