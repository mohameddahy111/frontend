import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import { Home } from "../pages";

const Router  = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<Home/>
      }
    ]
  }
])
export default Router