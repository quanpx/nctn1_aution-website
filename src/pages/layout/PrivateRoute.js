import { Navigate, Outlet} from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const PrivateRoute = ({children}) => {

    // Add your own authentication on the below line.
    const {isAuth} = useAuth()
  
     // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuth ? <>{children}</> : <Navigate to="/login" />;;
  }

export default PrivateRoute;