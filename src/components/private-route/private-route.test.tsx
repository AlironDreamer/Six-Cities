import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import PrivateRoute from './private-route';
import {State} from '../../types/state';

const mockStore = configureMockStore<State>();
const history = createMemoryHistory();

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history.push(AppRoute.Favorites);
  });

  it ('should render component for the public route, when a user is not authorized', () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>Public Route</h1>}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute
                  authorizationStatus={store.getState()[NameSpace.USER]?.authorizationStatus || AuthorizationStatus.NoAuth}
                  type={AppRoute.Favorites}
                >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for the private route, when a user is authorized', () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>Public Route</h1>}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute
                  authorizationStatus={store.getState()[NameSpace.USER]?.authorizationStatus || AuthorizationStatus.NoAuth}
                  type={AppRoute.Favorites}
                >
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
