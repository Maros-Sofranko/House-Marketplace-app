import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
    const {loggedIn, checkingStatus} = useAuthStatus();

    if (checkingStatus) {
        return <Spinner />
    }

    // Outlet vykresli child element, ktory je v App.js tam ako volam PrivateRoute
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute;
