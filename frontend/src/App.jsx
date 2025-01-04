import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import MainLayout from "./MainLayout";
import Home from "./pages/home/Home";
import Category from "./pages/category/Category";
import Search from "./pages/search/Search";
import Shop from "./pages/shop/Shop";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/categories/:categoryName",
          element: <Category />
        },
        {
          path: "/search",
          element: <Search />
        },
        {
          path: "/shop",
          element: <Shop />
        },
        {
          path: "/shop/:id",
          element: <ProductDetails />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);

  return <RouterProvider router={router} />
}
export default App