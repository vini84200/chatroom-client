import React from 'react';
import { mount } from 'enzyme';

export const TestHook = ({ callback }) => {
  callback();
  return null;
};

export default (callback: Function) => {
  mount(<TestHook callback={callback} />);
};