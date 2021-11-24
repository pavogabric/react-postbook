import {RouteProps, Route, Redirect} from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoute = (routeProps: ProtectedRouteProps) => {
  if(routeProps.isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: "/" }} />;
  }
};

export default ProtectedRoute;