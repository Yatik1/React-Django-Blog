import { Navigate } from "react-router";
import { useAuth } from "../src/contexts/authcontexts";


const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If authenticated, render the children (the component for the protected route)
    return children;
};

export default ProtectedRoute