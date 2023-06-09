

import React, { useEffect, useRef, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Leftbar from "./components/Leftbar/Leftbar";
import Rightbar from "./components/Rightbar/Rightbar";
import OnlineFriend from "./components/Rightbar/OnlineFriends/OnlineFriend";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profiles/Profile";
import Addpet from "./Pages/AddPet/AddPet";
import Friends from "./Pages/Friends/Friends";
import Chat from "./Pages/Chat/Chat";
import BecomeMember from "./components/Vererinarian/BecomeMember/BecomeMember";
import { io } from 'socket.io-client';
import { addList } from '~/redux/chatSlices';
import Group from "./Pages/Group/Group";
import PostInfo from "./Pages/Post/PostInfo";
import FilterPostcategory from "./Pages/FilterPostCategory/FilterPostcategory";
import ProfilePet from "./components/Profile/ProfilePet";

function App() {
  const queryClient = new QueryClient();
  const { currentUser } = useSelector((state) => state.user);
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();

  const socket = useRef(null);

useEffect(() => {
  socket.current = io("http://localhost:4000");
  socket.current.on("connect_error", (error) => {
    console.log(error);
  });

  return () => {
    socket.current.disconnect();
  };
}, []);

useEffect(() => {
  socket.current.emit("addUser", currentUser.idUser);

  socket.current.on("getUsers", (users) => {
    dispatch(addList(users))
  });
}, [currentUser]);


  const Layout = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const isFriendPath = /^\/friends\/[^/]+$/.test(currentPath);
    const ispostPath = /^\/post\/[^/]+$/.test(currentPath);
    const isCategoryPath = /^\/find-by-category\/[^/]+$/.test(currentPath);
    const userId = useLocation().pathname.split("/")[2];

    

    return (
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="thin-scroll grid grid-cols-10 gap-5 pt-[70px] bg-[#f6f3f3] w-[1320px] mx-auto">
          {currentPath !== "/chat" ? (
            <>
              <div className="col-span-2">
                <Leftbar />
              </div>
              <div
                className={`${
                  currentPath === "/" || isFriendPath || ispostPath || isCategoryPath ? "col-span-5" : "col-span-8"
                }`}
              >
                <Outlet />
              </div>
              <div
                className={`${
                  currentPath === "/" || isFriendPath || ispostPath || isCategoryPath ? "col-span-3" : "hidden"
                }`}
              >
                <Rightbar />
              </div>
            </>
          ) : (
            <div className="col-span-11">
              <Outlet />
            </div>
          )}
        </div>
        <OnlineFriend />
      </QueryClientProvider>
    );
  };

  const ProtectRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRoute>
          <Layout />
        </ProtectRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile/>
        },
        {
            path: "/find-by-category/:id",
            element: <FilterPostcategory/>
        },
        {
          path: "/:id/addpet",
          element: <Addpet />,
        },
        {
          path: "/pet/:id",
          element: <ProfilePet />,
        },
        {
            path: "/post/:id",
            element: <PostInfo />,
          },
        {
          path: "/friends/:id",
          element: <Friends />,
        },
        {
          path: "/group",
          element: <Group />,
        },
        {
          path: "/chat",
          element: <Chat socket = {socket}/>,
        },
        {
          path: "/become-member",
          element: <BecomeMember />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login role={role} setRole={setRole} />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;