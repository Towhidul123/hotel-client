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

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error></Error>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        },

        {
          path:'/login',
          element:<Login></Login>
        },
        
        {
          path:'/room',
          element: <Services></Services>

        },
        {
          path:'/register',
          element:<Register></Register>
        },

        {
          path: '/products/:productId',
          element: <PrivateRoute><ProductDetail></ProductDetail></PrivateRoute>,
          loader: ({ params }) => fetch(`http://localhost:5000/${params.productId}`)
        },

        {
          path:'/cart',
          element: <PrivateRoute><Cart></Cart></PrivateRoute>
        }

      ]
    },
  ]);

  export default router;