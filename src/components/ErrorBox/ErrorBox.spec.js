import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

import ErrorBox from './ErrorBox';

describe('ErrorBox', () => {
  it('basic snapshot', () => {
    const tree = renderer
      .create(<ErrorBox/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct classNames', () => {
    const tree = renderer
      .create(<ErrorBox/>)
      .toJSON();
    expect(tree.props.className).toBe('ErrorBox')
  })
  it('renders children', () => {
    const errobox = shallow(<ErrorBox><h2>Hey</h2></ErrorBox>);
    expect(errobox.children().length).toBe(1)
  })
  it('renders no children', () => {
    const errobox = shallow(<ErrorBox/>);
    expect(errobox.children().length).toBe(0)
  })
})
