import React from 'react'
import {TestHook} from '../utils/testing/testHook'
import {useSocket} from './useSocket';
import { mount } from 'enzyme';


let socketHook: SocketIOClient.Socket | null;

describe("Socket Hook", () => {
  beforeEach(() => {
    mount(
      <TestHook callback={() => {
        socketHook = useSocket()
      }} />
    )
  })

it("Should return a socket that can disconnect", () => {
    expect(socketHook).toHaveProperty('disconnect')
  })

})