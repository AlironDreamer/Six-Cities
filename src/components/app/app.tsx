import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus, spinnerOverride} from '../../const';
import FavoritesPage from '../../pages/favorites/favorites-page';
import RoomPage from '../../pages/room-page/room-page';
import {RotateLoader} from 'react-spinners';
import {useAppSelector} from '../../hooks/use-app-selector/useAppSelector';
import history from '../../browser-history';
import {getIsDataLoading} from '../../store/api-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import LoginPage from '../../pages/login-page/login-page';

const isCheckedAuth = (authStatus: AuthorizationStatus): boolean =>
  authStatus === AuthorizationStatus.Unknown;

const App = (): JSX.Element => {
  const isDataLoading: boolean = useAppSelector(getIsDataLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  if (isCheckedAuth(authorizationStatus) || isDataLoading) {
    return <RotateLoader cssOverride={spinnerOverride}/>;
  }

  return (
    <HistoryRouter history={history} basename='/Six-Cities'>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <MainPage/>
            }
          />
          <Route
            path="/login"
            element={
              <PrivateRoute authorizationStatus={authorizationStatus} type={AppRoute.Login}>
                <LoginPage />
              </PrivateRoute>
            }
          >
          </Route>
          <Route
            path="/favorites"
            element={
              <PrivateRoute authorizationStatus={authorizationStatus} type={AppRoute.Favorites}>
                <FavoritesPage/>
              </PrivateRoute>
            }
          >
          </Route>
          <Route path="/offer">
            <Route path=":id" element={<RoomPage />}></Route>
          </Route>
          <Route path="/not-found" element={<NotFound />}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  );
};

export default App;
