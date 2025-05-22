import {AppRoute, AuthorizationStatus} from '../../const';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  type: AppRoute;
  children: JSX.Element;
}

const PrivateRoute = (props: PrivateRouteProps): JSX.Element => {
  const { authorizationStatus, type, children } = props;

  if (type === AppRoute.Favorites) {
    return authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>;
  } else {
    return authorizationStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Root}/>
      : children;
  }
};

export default PrivateRoute;
