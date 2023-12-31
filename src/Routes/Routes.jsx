import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/SignIn-SignUp/Login";
import Register from "../pages/SignIn-SignUp/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ProductDetail from "../pages/Home/Services/ProductDetail";
import Cart from "../pages/Cart/Cart";
import Error from "../pages/Error/Error";
import Services from "../pages/Home/Services/Services";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import FAQ from "../pages/FAQ/FAQ";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },

      {
        path: '/login',
        element: <Login></Login>
      },

      {
        path: '/room',
        element: <Services></Services>

      },
      {
        path: '/register',
        element: <Register></Register>
      },

      {
        path: '/products/:productId',
        element: <PrivateRoute><ProductDetail></ProductDetail></PrivateRoute>,
        loader: ({ params }) => fetch(`https://y-eight-pi-68.vercel.app/${params.productId}`)
      },

      {
        path: '/cart',
        element: <PrivateRoute><Cart></Cart></PrivateRoute>
      },
      {
        path: '/aboutUs',
        element: <AboutUs></AboutUs>
      },
      {
        path: '/contactUs',
        element: <ContactUs></ContactUs>
      },
      {
        path: '/faq',
        element: <FAQ></FAQ>
      }

    ]
  },
]);

export default router;