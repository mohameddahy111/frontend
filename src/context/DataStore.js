import { useMediaQuery } from "@mui/material";
import { createContext, useContext, useState } from "react";

const DataStore = createContext();
export const DataStoreProvider = ({ children }) => {
  const mobileDrive = useMediaQuery("(max-width:600px )");
  const [mode, setMode] = useState(
    localStorage.mode ? JSON.parse(localStorage.mode) : "light"
  );
  return (
    <DataStore.Provider value={{ mobileDrive, mode ,setMode }}>
      {children}
    </DataStore.Provider>
  );
};
export const Store = () => {
  return useContext(DataStore);
};
