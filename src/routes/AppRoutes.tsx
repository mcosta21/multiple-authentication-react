import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    )
}