import React from "react";
import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profiles/Profile";
import Header from "./components/Header/Header";
import Leftbar from "./components/Leftbar/Leftbar";
import Rightbar from "./components/Rightbar/Rightbar";
import {  QueryClient, QueryClientProvider, } from '@tanstack/react-query'
function App() {
    const queryClient = new QueryClient()
    const currentUser = true;
    
    const Layout = (children) => {

        const location = useLocation();
        const currentPath = location.pathname;

        return (
            <QueryClientProvider client={queryClient}>
                <Header />
                <div className="grid grid-cols-11 gap-8 bg-[#f6f3f3]">
                    <div className="col-span-2">
                        <Leftbar />
                    </div>
                    <div className={`${currentPath === '/profile' ? 'col-span-9': ''} col-span-6`}>
                        <Outlet />
                    </div>
                        <div className={`${currentPath === '/profile' ? 'hidden ': ''}col-span-3`}>
                        <Rightbar />
                    </div>
                </div>
            </QueryClientProvider>
        );
    };

    const ProtectRoute = ({children})=>{
        if(!currentUser)
        {
            return <Navigate to = "/login"/>
        }
        return children;
    }

    const router = createBrowserRouter([
        {
            path:"/",
            element:<ProtectRoute><Layout/></ProtectRoute>,
            children:[
                {
                    path:"/",
                    element:<Home/>
                },
                {
                    path:"/profile",
                    element:<Profile/>
                },
            ]
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
