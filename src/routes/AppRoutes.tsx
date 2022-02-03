import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../hooks/useAuth";
import { useLoader } from "../hooks/useLoader";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import BodyRouter from "./BodyRouter";
import { PrivateRoute } from "./private.routes";

export function AppRoutes(){
    const { isLoading } = useLoader();
    return (
        <BodyRouter>
            {isLoading && <Loading />}
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
        </BodyRouter>
    )
}