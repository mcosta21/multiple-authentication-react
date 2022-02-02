import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { PrivateRoute } from "./private.routes";

export function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="" element={<Login />} />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    )
}