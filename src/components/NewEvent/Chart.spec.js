import React from 'react';
import { shallow } from 'enzyme';
import Chart from './Chart';

describe('<Chart />', () => {
  it('should have a header called \'Chart\'', () => {
    const wrapper = shallow(<Chart />);
    const actual = wrapper.find('h2').text();
    const expected = 'About';

    expect(actual).toEqual(expected);
  });
});
