import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profiles/Profile";
import Header from "./components/Header/Header";
import Leftbar from "./components/Leftbar/Leftbar";
import Rightbar from "./components/Rightbar/Rightbar";
import {  QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import Addpet from "./Pages/AddPet/AddPet";
import Friends from "./Pages/Friends/Friends";
import Chat from "./Pages/Chat/Chat";
import OnlineFriend from "./components/Rightbar/OnlineFriends/OnlineFriend";
import ProfileVeterinarian from "./Pages/ProfileVeterinarian/ProfileVeterinarian";
import { useSelector } from "react-redux";
import BecomeMember from "./components/Vererinarian/BecomeMember/BecomeMember";
function App() {
    const queryClient = new QueryClient()
    const { currentUser } = useSelector((state) => state.user);
    const [role, setRole] = useState(null);
    const Layout = (children) => {
        const location = useLocation();
            const currentPath = location.pathname;
            const isFriendPath = /^\/friends\/[^/]+$/.test(currentPath);

            console.log(currentUser);
        return (
            <QueryClientProvider client={queryClient}>
                <Header />
                <div className="grid grid-cols-11 gap-5 pt-[70px] bg-[#f6f3f3] w-[1240px] mx-auto">
                   {
                    currentPath !== '/chat' ?
                     <>
                         <div className="col-span-2">
                            <Leftbar />
                            </div>
                        <div className={`${currentPath === '/' || isFriendPath ? 'col-span-6': 'col-span-9'}`}>
                            <Outlet />
                        </div>
                        <div className={`${currentPath === '/' || isFriendPath ? 'col-span-3': 'hidden'}`}>
                            <Rightbar />
                        </div>
                     </> :
                        <div className='col-span-11'>
                            <Outlet />  
                        </div>
                        
                   }
                </div>
                <OnlineFriend/>
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
            element:<ProtectRoute>
                         <Layout/>
                    </ProtectRoute>,
            children:[
                {
                    path:"/",
                    element:<Home/>
                },
                {   
                    path:"/profile/:id",
                    element: currentUser.role === 2 ? <ProfileVeterinarian/>:<><Profile/></>
                },
                {
                    path:"/:id/addpet",
                    element: <Addpet/>
                },
                {
                    path:"/friends/:id",
                    element: <Friends/>
                },
                {
                    path: "/chat",
                    element:<Chat/>
                },
                {
                    path: "/become-member",
                    element: <BecomeMember/>
                }
            ]
        },
        {
            path: "/login",
            element: <Login role = {role} setRole = {setRole}/>,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
