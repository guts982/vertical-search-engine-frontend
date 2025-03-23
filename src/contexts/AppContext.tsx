import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  searchOpen: boolean;
  setSearchOpen: (s: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [searchOpen, setSearchOpen] = useState(false);


  return (
    <AppContext.Provider value={{ searchOpen, setSearchOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};
