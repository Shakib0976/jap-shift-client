import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Covarage from "../pages/Covarage/Covarage";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRoute from "../Routes/PrivateRoute";
import DeshboardLayout from "../layouts/DeshboardLayout";
import MyParcel from "../pages/Dashboard/MyParcel/MyParcel";





export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [

            {
                index: true,
                Component: Home
            },

            {
                path: '/coverage',
                Component: Covarage,
                loader: () => fetch('./serviceCenter.json')
            },
            {
                path: '/sendParcel',
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
                loader: () => fetch('./serviceCenter.json')
            }
        ]
    },








    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },

            {
                path: 'register',
                Component: Register
            }
        ]
    },




    {
        path: '/dashBoard',
        element: <PrivateRoute><DeshboardLayout></DeshboardLayout></PrivateRoute>,
        children: [
            {
                path: 'myparcel',
                Component: MyParcel
            }
        ]
    }
]);