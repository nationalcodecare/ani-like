import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom'; // All project components are in global Router
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; // for provider store
import history from '../history';

export const mockStore = configureStore([thunk]);

function customRender(ui, { store = mockStore({}), ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
export * from '@testing-library/jest-dom';
export * from '@testing-library/jest-dom/extend-expect';

// override render method
export { customRender as render };
