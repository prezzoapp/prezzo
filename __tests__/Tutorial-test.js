import 'react-native';
import React from 'react';
import Tutorial from '../src/containers/authentication/Tutorial/Tutorial';
import store from '../src/redux/store';
import { findById } from '../src/services/commonFunctions';
import renderer from 'react-test-renderer';

it('Tourial Screen renders correctly', () => {
  const tutorial = renderer.create(<Tutorial />).toJSON();
  expect(tutorial).toMatchSnapshot();
});

it('it should render a swiper', () => {
  const tutorial = renderer.create(<Tutorial />).toJSON();
  expect(findById(tutorial, 'swiper')).toBeDefined();
});

it('it should render a facebookButton', () => {
  const tutorial = renderer.create(<Tutorial />).toJSON();
  expect(findById(tutorial, 'facebookButton')).toBeDefined();
});

it('it should render a signup button', () => {
  const tutorial = renderer.create(<Tutorial />).toJSON();
  expect(findById(tutorial, 'buttonComponent')).toBeDefined();
});

it('it should render a login button', () => {
  const tutorial = renderer.create(<Tutorial />).toJSON();
  expect(findById(tutorial, 'loginButton')).toBeDefined();
});

it('it should render a tutorialScreen', () => {
  const tutorial = renderer.create(<Tutorial />).toJSON();
  expect(findById(tutorial, 'tutorialScreen')).toBeDefined();
});

// it(' navigateToLogin should navigate to Login Screen', () => {
//   const navigate = jest.fn();
//   const tutorialComponent = shallow(
//
//       <Tutorial store={store} navigation={navigate} />
//
//   );;
//   console.log("check: ", tutorialComponent.);

//   const loginButton = tutorialComponent.find('loginButton');
//   loginButton.props().onPress();

//   const spy = jest.spyOn(navigate, 'navigation');
//   expect(tutorialComponent.spyOn(navigate, 'navigation')).toBeCalledWith('loginButton');
// });

it('navigateToLogin should navigate to Login Screen', () => {
  const navigateToLoginMock = jest.fn();
  const tutorialComponent = renderer
    .create(<Tutorial navigate={navigateToLoginMock} />)
    .getInstance();

  tutorialComponent.navigateToLogin();

  expect(navigateToLoginMock).toBeCalled();
});

it('navigateToSignupMergeFacebook should navigate to SignupMergeFacebook', () => {
  const navigateToSignupMergeFacebookMock = jest.fn();
  const tutorialComponent = renderer
    .create(<Tutorial navigate={navigateToSignupMergeFacebookMock} />)
    .getInstance();

  tutorialComponent.navigateToSignupMergeFacebook();

  expect(navigateToSignupMergeFacebookMock).toBeCalled();
});

it('navigateToHome should navigate to Home Screen', () => {
  const navigateToHomeMock = jest.fn();
  const tutorialComponent = renderer
    .create(<Tutorial navigate={navigateToHomeMock} />)
    .getInstance();

  tutorialComponent.navigateToHome();

  expect(navigateToHomeMock).toBeCalled();
});

it('navigateToSignup should navigate to SignupName Screen', () => {
  const navigateToSignupMock = jest.fn();
  const tutorialComponent = renderer
    .create(<Tutorial navigate={navigateToSignupMock} />)
    .getInstance();

  tutorialComponent.navigateToHome();

  expect(navigateToSignupMock).toBeCalled();
});

it('navigateToEnableNotifications should navigate to SignupName Screen', () => {
  const navigateToEnableNotificationsMock = jest.fn();
  const tutorialComponent = renderer
    .create(<Tutorial navigate={navigateToEnableNotificationsMock} />)
    .getInstance();

  tutorialComponent.navigateToHome();

  expect(navigateToEnableNotificationsMock).toBeCalled();
});

// it('On FacebookLogin should call loginWithFacebook function', () => {
//   const loginWithFacebookMock = jest.fn();
//   const tutorialComponent = renderer
//     .create(<Tutorial loginWithFacebook={loginWithFacebookMock} />)
//     .getInstance();

//   tutorialComponent.onFacebookLogin();

//   expect(loginWithFacebookMock).toBeCalled();
// });
