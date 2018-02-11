import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

import LogFilter from './LogFilter';

describe('LogFilter', () => {
  it('basic snapshot', () => {
    const tree = renderer
      .create(<LogFilter/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders input component', () => {
    const logfilter  = shallow(<LogFilter value={''} onChange={()=>''}/>);
    expect(logfilter.find('Input').length).toBe(1)
  })
  it('passes value to Input', () => {
    const logfilter = shallow(<LogFilter value='boo' onChange={()=>''}/>);
    expect(logfilter.find('Input').props()).toHaveProperty('value', 'boo')
  })
  it('onChange is passed to Input', () => {
    const fn = () => ''
    const logfilter = shallow(<LogFilter value='boo' onChange={fn}/>);
    expect(logfilter.find('Input').props()).toHaveProperty('onChange', fn)
  })
})
