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
function App() {
    const queryClient = new QueryClient()
    const currentUser = true;
    const Layout = (children) => {
    const [user, setUser] = useState(null);
        

    useEffect(() => {
        const getUser = () => {
          fetch("http://localhost:4000/loginMethod/success", {
            method: "GET",
            credentials: "include",
          })
            .then((response) => {
              if (response.status === 200) 
              {
                    console.log(response.data);
                  return response.json();
              }
              throw new Error("authentication has been failed!");
            })
            .then((resObject) => {
                console.log(resObject);
              setUser(resObject.user);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        getUser();
      }, []);

      console.log(user);

        const location = useLocation();
        const currentPath = location.pathname;
        const isFriendPath = /^\/friends\/[^/]+$/.test(currentPath);
        return (
            <QueryClientProvider client={queryClient}>
                <Header />
                <div className="grid grid-cols-11 gap-8 pt-[70px] bg-[#f6f3f3]">
                    <div className="col-span-2">
                        <Leftbar />
                    </div>
                    <div className={`${currentPath === '/' || isFriendPath ? 'col-span-6': 'col-span-9'}`}>
                        <Outlet />
                    </div>
                    <div className={`${currentPath === '/' || isFriendPath ? 'col-span-3': 'hidden'}`}>
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
                    path:"/profile/:id",
                    element:<Profile/>
                },
                {
                    path:"/:id/addpet",
                    element: <Addpet/>
                },
                {
                    path:"/friends/:id",
                    element: <Friends/>
                }
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

// import React from 'react';

// const data = [
//   { id_friend_list: '1', user_followed: 'A', user_follower: 'B' },
//   { id_friend_list: '2', user_followed: 'A', user_follower: 'C' },
//   { id_friend_list: '4', user_followed: 'C', user_follower: 'A' },
//   { id_friend_list: '5', user_followed: 'B', user_follower: 'D' },
//   { id_friend_list: '6', user_followed: 'C', user_follower: 'D' },
//   { id_friend_list: '7', user_followed: 'E', user_follower: 'A' },
//   { id_friend_list: '8', user_followed: 'A', user_follower: 'D' },
//   { id_friend_list: '9', user_followed: 'A', user_follower: 'E' },
//   { id_friend_list: '10', user_followed: 'C', user_follower: 'E' },
//   { id_friend_list: '11', user_followed: 'E', user_follower: 'C' },
//   { id_friend_list: '12', user_followed: 'E', user_follower: 'B' },
//   { id_friend_list: '13', user_followed: 'D', user_follower: 'B' },
//   { id_friend_list: '14', user_followed: 'D', user_follower: 'A' },
//   { id_friend_list: '15', user_followed: 'C', user_follower: 'B' },
//   { id_friend_list: '16', user_followed: 'B', user_follower: 'E' },
// ];
// const App = () => {
//     const followedByA = new Set();
//     const outputSet = new Set();
  
//     for (const item of data) {
//       if (item.user_followed === 'A') {
//         followedByA.add(item.user_follower);
//       }
//     }
  
//     for (const item of data) {
//       if (item.user_follower === 'A' && followedByA.has(item.user_followed)) {
//         outputSet.add(item.user_followed);
//       }
//     }
  
//     const output = Array.from(outputSet);
//     console.log(output);
  
//     return <></>;
//   };

// export default App;