"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface DataContextType {
  data: { text: string; number: string };
  setData: Dispatch<SetStateAction<{ text: string; number: string }>>;
}

const DataContext = createContext<DataContextType | null>(null);
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<{ text: string; number: string }>({
    text: "",
    number: "",
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
