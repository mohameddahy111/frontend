import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import { Home, Shop, Login, Registere, Cart } from "../pages";
import LayoutDash from "../dashboard/layout/LayoutDash";
import { AddPorductes, Porductes, ProdecteDetails, Users } from "../dashboard/pages";
import Prodecter from "../components/Prodecter";
import UserDetails from "../dashboard/pages/UserDetails";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registere />,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
    ],
  },
  {
    path: "/dashboard",

    element: (
      <Prodecter>
        <LayoutDash />
      </Prodecter>
    ),
    children: [
      {
        path: "/dashboard/porductes",
        element: <Porductes />,
      },
      {
        path: "/dashboard/add_porducte",
        element: <AddPorductes />,
      },
      {
        path: "/dashboard/users",
        element: <Users />,
      },
      {
        path: "/dashboard/users/:id",
        element: <UserDetails />,
      },
      {
        path: "/dashboard/product/:id",
        element: <ProdecteDetails />,
      },

    ],
  },
]);
export default Router;
