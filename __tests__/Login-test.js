import 'react-native';
import React from 'react';
import Login from '../src/containers/authentication/Login';
import store from '../src/redux/store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

it('Tourial Screen renders correctly', () => {
  const login = renderer
    .create(
      <Provider store={store}>
        <Login />
      </Provider>
    )
    .toJSON();
  expect(login).toMatchSnapshot();
});
