import { useMediaQuery } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { useSnackbar } from "notistack";

const DataStore = createContext();
export const DataStoreProvider = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const mobileDrive = useMediaQuery("(max-width:1000px )");
  const [mode, setMode] = useState(
    localStorage.mode ? JSON.parse(localStorage.mode) : "light"
  );
  const [cartItems, setCartItems] = useState(
    localStorage.cartItems ? JSON.parse(localStorage.cartItems) : []
  );
  const [userInfo, setUserInfo] = useState(localStorage.userInfo? JSON.parse(localStorage.userInfo):null);


  // Add to cart functionality
  const addToCart = (item, quantity) => {
    closeSnackbar()
    if (quantity< 1) {
     return enqueueSnackbar(`quantity must by 1 or more`)
    }
    const list = [...cartItems];
    const isExist = cartItems.find((x) => x._id === item._id);
    if (isExist) {
      isExist.quantity = quantity ? quantity : isExist.quantity + 1;
      enqueueSnackbar(`${isExist.title} is Update`, { variant: "success" });
    } else {
      const newItem = { ...item, quantity: quantity ? quantity : 1 };
      list.push(newItem);
      enqueueSnackbar(`${item.title} is Add `, { variant: "success" });
    }
    setCartItems(list);
    localStorage.setItem("cartItems", JSON.stringify(list));
  };
    // End   Add to cart functionality


  return (
    <DataStore.Provider
      value={{
        mobileDrive,
        mode,
        setMode,
        cartItems,
        setCartItems,
        addToCart,
        userInfo, setUserInfo
      }}
    >
      {children}
    </DataStore.Provider>
  );
};
export const Store = () => {
  return useContext(DataStore);
};
