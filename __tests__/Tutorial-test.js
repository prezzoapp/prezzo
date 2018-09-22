import 'react-native';
import React from 'react';
import Tutorial from '../src/containers/authentication/Tutorial';
import store from '../src/redux/store';
import { findById } from '../src/services/commonFunctions';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

it('Tourial Screen renders correctly', () => {
  const tutorial = renderer
    .create(
      <Provider store={store}>
        <Tutorial />
      </Provider>
    )
    .toJSON();
  expect(tutorial).toMatchSnapshot();
});

it('it should render a swiper', () => {
  const tutorial = renderer
    .create(
      <Provider store={store}>
        <Tutorial />
      </Provider>
    )
    .toJSON();
  expect(findById(tutorial, 'swiper')).toBeDefined();
});

it('it should render a facebookButton', () => {
  const tutorial = renderer
    .create(
      <Provider store={store}>
        <Tutorial />
      </Provider>
    )
    .toJSON();
  expect(findById(tutorial, 'facebookButton')).toBeDefined();
});

it('it should render a signup button', () => {
  const tutorial = renderer
    .create(
      <Provider store={store}>
        <Tutorial />
      </Provider>
    )
    .toJSON();
  expect(findById(tutorial, 'buttonComponent')).toBeDefined();
});


it('it should render a login button', () => {
  const tutorial = renderer
    .create(
      <Provider store={store}>
        <Tutorial />
      </Provider>
    )
    .toJSON();
  expect(findById(tutorial, 'loginButton')).toBeDefined();
});

it('it should render a tutorialScreen', () => {
  const tutorial = renderer
    .create(
      <Provider store={store}>
        <Tutorial />
      </Provider>
    )
    .toJSON();
  expect(findById(tutorial, 'tutorialScreen')).toBeDefined();
});

// it(' navigateToLogin should navigate to Login Screen', () => {
//   const navigation = jest.fn();
//   const spy = jest.spyOn(navigation, 'navigate');
//   const tutorialComponent = shallow(
//     <Provider store={store}>
//       <Tutorial navigate={navigation} />
//     </Provider>
//   ).getInstance();

//   const loginButton = tutorialComponent.find('loginButton');
//   loginButton.props().onPress();

//   expect(spy).toBeCalledWith('loginButton');
// });
