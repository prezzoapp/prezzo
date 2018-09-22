import 'react-native';
import React from 'react';
import Login from '../src/containers/authentication/Login';
import store from '../src/redux/store';
import { Provider } from 'react-redux';
import { findById } from '../src/services/commonFunctions';
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

it('it should render a welcome text', () => {
  const login = renderer
    .create(
      <Provider store={store}>
        <Login />
      </Provider>
    )
    .toJSON();
  expect(findById(login, 'welcomeText')).toBeDefined();
});

it('it should render a signin text', () => {
  const login = renderer
    .create(
      <Provider store={store}>
        <Login />
      </Provider>
    )
    .toJSON();
  expect(findById(login, 'signinText')).toBeDefined();
});

it('it should render a button component', () => {
  const login = renderer
    .create(
      <Provider store={store}>
        <Login />
      </Provider>
    )
    .toJSON();
  expect(findById(login, 'buttonComponent')).toBeDefined();
});

it('it should render a signup button', () => {
  const login = renderer
    .create(
      <Provider store={store}>
        <Login />
      </Provider>
    )
    .toJSON();
  expect(findById(login, 'signupButton')).toBeDefined();
});
