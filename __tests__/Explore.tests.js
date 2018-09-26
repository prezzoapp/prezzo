import 'react-native';
import React from 'react';
import Explore from '../src/containers/customer/Explore/Explore';
import Enzyme from 'enzyme';
import { findById } from '../src/services/commonFunctions';
import renderer from 'react-test-renderer';

it('Tourial Screen renders correctly', () => {
  const explore = renderer.create(<Explore />).toJSON();
  expect(explore).toMatchSnapshot();
});

it('it should render a linearGradient', () => {
  const explore = renderer.create(<Explore />).toJSON();
  expect(findById(explore, 'linearGradient')).toBeDefined();
});

it('it should render a exploreList', () => {
  const wrapper = Enzyme.shallow(<Explore />);
  expect(wrapper.find('ExploreList').at(0));
});

it('it should render a loadingText', () => {
  const explore = renderer.create(<Explore />).toJSON();
  expect(findById(explore, 'loadingText')).toBeDefined();
});

it('it should render a activityIndicator', () => {
  const explore = renderer.create(<Explore />).toJSON();
  expect(findById(explore, 'activityIndicator')).toBeDefined();
});

it('Check State for Fetching', () => {
  const wrapper = Enzyme.shallow(<Explore />);
  expect(wrapper.instance().state.isFetching).toEqual(true);
});
