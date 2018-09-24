import 'react-native';
import React from 'react';
import Login from '../src/containers/authentication/Login/Login';
import store from '../src/redux/store';
import { Provider } from 'react-redux';
import { findById } from '../src/services/commonFunctions';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme'

it('Tourial Screen renders correctly', () => {
  const login = renderer.create(<Login />).toJSON();
  expect(login).toMatchSnapshot();
});

it('it should render a welcome text', () => {
  const login = renderer.create(<Login />).toJSON();
  expect(findById(login, 'welcomeText')).toBeDefined();
});

it('it should render a signin text', () => {
  const login = renderer.create(<Login />).toJSON();
  expect(findById(login, 'signinText')).toBeDefined();
});

it('it should render a button component', () => {
  const login = renderer.create(<Login />).toJSON();
  expect(findById(login, 'buttonComponent')).toBeDefined();
});

it('it should render a signup button', () => {
  const login = renderer.create(<Login />).toJSON();
  expect(findById(login, 'signupButton')).toBeDefined();
});

it('navigateToSignup should navigate to Signup Screen', () => {
  const navigateToSignupMock = jest.fn();
  const login = renderer
    .create(<Login navigate={navigateToSignupMock} />)
    .getInstance();

  login.navigateToSignup();

  expect(navigateToSignupMock).toBeCalled();
});

it('navigateToMain should navigate to Customer Screen', () => {
  const navigateToMainMock = jest.fn();
  const login = renderer
    .create(<Login navigate={navigateToMainMock} />)
    .getInstance();

  login.navigateToMain();

  // console.log('Login: ', login);
  
  expect(navigateToMainMock).toBeCalled();
});

it('Check State for email onChange Prop of LoginTextinput', () => {
  const wrapper = Enzyme.shallow(<Login />);
  wrapper.find('LoginTextInput').at(0).props().onChange('some_Email');
  expect(wrapper.instance().state.email).toEqual('some_Email');
});

it('Check State for password onChange Prop of LoginTextinput', () => {
  const wrapper = Enzyme.shallow(<Login />);
  wrapper.find('LoginTextInput').at(1).props().onChange('some_password');
  expect(wrapper.instance().state.password).toEqual('some_password');
});

// it('should change the password value', () => {
//   let loginComponent = renderer.create(<Login/>).getInstance()
  
//   loginComponent.handlePasswordChange('some_password')

//   expect(loginComponent.state.password).toEqual('some_password')        
// })
