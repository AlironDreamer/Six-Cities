import Card from './card';
import {render, screen} from '@testing-library/react';
import {offers} from '../../mocks/offers';
import {createMemoryHistory} from 'history';
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});

describe('Component: Card', () => {


  it ('should be rendered correctly', () => {
    const offer = offers[0];
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card
            offer={offer}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByRole('img', {name: 'Place image'})).toHaveClass('place-card__image');
  });

  it ('onMouseEnter should be called when user has entered in card', async () => {
    const offer = offers[0];
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card
            offer={offer}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.hover(screen.getByRole('article'));
    expect(onMouseEnter).toBeCalledWith(offer.id);
  });

  it ('onMouseLeave should be called when user has left in card', async () => {
    const offer = offers[0];
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card
            offer={offer}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.unhover(screen.getByRole('article'));
    expect(onMouseLeave).toBeCalled();
  });
});
