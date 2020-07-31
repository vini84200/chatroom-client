import React from 'react'
import testHook, {TestHook} from '../utils/testing/testHook'
import {ProvideSocket, useSocket} from './useSocket';
import * as consts from '../consts'
import { mount } from 'enzyme';
import socketIOClient from "socket.io-client";


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