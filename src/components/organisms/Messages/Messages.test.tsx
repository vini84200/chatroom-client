import React from "react";
import { shallow, mount } from "enzyme";
import socketIOClient from "socket.io-client";
import { render, RenderResult } from "@testing-library/react";

import MockedSocket from "socket.io-mock";
import Messages from "./Messages";
import { act } from "react-dom/test-utils";
import * as consts from "../../../consts"

describe("Message Container", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Connects on start", () => {
    mount(<Messages />);
    expect(socketIOClient.connect).toBeCalled();
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

  it("Renders messages on recieve", async () => {
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
});
