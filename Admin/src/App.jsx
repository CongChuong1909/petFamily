import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import SidebarY from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Line from "./scenes/line";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./scenes/Login/Login";
import PostManager from "./scenes/Table/PostManager";
import Report from "./scenes/form/Report";
import Veterinarian from "./scenes/veterinarian/veterinarian";
import Notification from "./scenes/notification/notification";

function App() {
    const [theme, colorMode, mode] = useMode();
    console.log(theme, colorMode, mode);
    const [isSidebar, setIsSidebar] = useState(true);
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        <SidebarY isSidebar={isSidebar} />
                        <main className="content">
                            <Topbar setIsSidebar={setIsSidebar} />
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/team" element={<Team />} />
                                <Route path="/formReport" element={<Report />} />
                                <Route path="/veterinarian" element={<Veterinarian/>} />
                                <Route path="/notification" element={<Notification />} />
                                <Route path="/line" element={<Line />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/postsManager" element={<PostManager />} />
                            </Routes>
                        </main>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
