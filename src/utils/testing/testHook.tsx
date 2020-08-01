import React from 'react';
import { mount } from 'enzyme';

export const TestHook = ({ callback }) => {
  callback();
  return null;
};

export default (callback: Function, Provider: undefined| React.FunctionComponent) => {
  if (Provider) {
    mount(
    <Provider>
    <TestHook callback={callback} />
    </Provider>);
    return
  }
  mount(<TestHook callback={callback} />);
};