import React from "react";
import { shallow, mount } from "enzyme";
import socketIOClient from "socket.io-client";
import { render, RenderResult } from "@testing-library/react";

import Messages from "./Messages";
import { act } from "react-dom/test-utils";
import * as consts from "../../../consts"
import * as UseSocket from '../../../services/useSocket'


describe("Messages Container", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Connects on start", () => {
    const spy = jest.spyOn(UseSocket, "useSocket");
    mount(<Messages />);
    expect(spy).toHaveBeenCalled()
  });

  it("Called with the correct string", () => {
    mount(<Messages />);
    expect(socketIOClient.connect).toBeCalledWith(consts.CONNECTION_STRING);
  });

  it("Disconnects on unmount", async () => {
    const wrapper = mount(<Messages />);
    await act(async () => {
      wrapper.unmount();
    });
    expect(socketIOClient.mocks.connectMocks.disconnect).toBeCalled();
  });

  it("Doesn't load anything if doesn't receive messages", () => {
    const wrapper = mount(<Messages />);
    expect(wrapper.find("Message")).toHaveLength(0);
  });

  it("Renders bulk messages on recieve", async () => {
    const { getByText } = render(<Messages />);
    await act(async () => {
      socketIOClient.socket.emit(consts.ALL_MESSEGES, [
        { message: "something", username: "peter" },
        { message: "some2hing", username: "john" },
      ]);
    });
    expect(getByText("something")).toBeInTheDocument();
    expect(getByText("peter:")).toBeInTheDocument();
    expect(getByText("some2hing")).toBeInTheDocument();
    expect(getByText("john:")).toBeInTheDocument();
  });

  it("Removes old messeges on bulk", async () => {
    const { getByText, queryAllByText } = render(<Messages />);
    await act(async () => {
      socketIOClient.socket.emit(consts.ALL_MESSEGES, [
        { message: "something", username: "peter" },
        { message: "some2hing", username: "john" },
      ]);
      socketIOClient.socket.emit(consts.ALL_MESSEGES, [
        { message: "asjfsdhn", username: "kan" },
        { message: "xcbv", username: "non" },
      ]);
    });
    expect(queryAllByText("something")).toHaveLength(0);
    expect(queryAllByText("peter:")).toHaveLength(0);
    expect(queryAllByText("some2hing")).toHaveLength(0)
    expect(queryAllByText("john:")).toHaveLength(0)
    
    expect(getByText("asjfsdhn")).toBeInTheDocument();
    expect(getByText("kan:")).toBeInTheDocument();
    expect(getByText("xcbv")).toBeInTheDocument();
    expect(getByText("non:")).toBeInTheDocument();
  });

  it("Render message on receive", async () => {
    const { getByText } = render(<Messages />);
    await act(async () => {
      socketIOClient.socket.emit(consts.RESEND_MESSAGE, { message: "Super interesting message that somonone needs to read.", username: "john1290" });
    });
    expect(getByText("Super interesting message that somonone needs to read.")).toBeInTheDocument();
    expect(getByText("john1290:")).toBeInTheDocument();
  })
});
