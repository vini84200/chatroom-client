import React from "react";
import { shallow, ShallowWrapper, mount } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import socketIOClient from "socket.io-client";
import MockedSocket from "socket.io-mock";

import * as consts from '../../../consts'
import BottomBar from "./BottomBar";
import * as UseSocket from '../../../services/useSocket'


describe("Username", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Username is shown in the bottom", () => {
    let app = render(<BottomBar username="peter" />);
    expect(app.getByText("Username: peter")).toBeInTheDocument();
    app = render(<BottomBar username="john1223" />);
    expect(app.getByText("Username: john1223")).toBeInTheDocument();
  });
});
describe("Send Message Field", () => {
  let socketMock: any;

  afterEach(() => {
    jest.clearAllMocks();

  });

  test("Has send button", () => {
    const wrapper = shallow(<BottomBar username="anonimous" />);

    expect(wrapper.find("button").text()).toBe("Enviar");
  });

  test("Has message bar", () => {
    const wrapper = shallow(<BottomBar username="anonimous" />);

    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("Call useSocket", () => {
    const spy = jest.spyOn(UseSocket, "useSocket");
    const wrapper = shallow(<BottomBar username="anonimous" />);
    // console.log(socketIOClient)
    expect(spy).toHaveBeenCalled()
  });

  it("Disconects from socket when it finishes", () => {
    const wrapperMount = mount(<BottomBar username="anonimous" />);
    expect(socketIOClient.mocks.connectMocks.disconnect).toHaveBeenCalledTimes(0);
    act(() => {
      wrapperMount.unmount();
    });
    expect(socketIOClient.mocks.connectMocks.disconnect).toBeCalled();
  });

  it("Sends a Message when the button is pressed", async () => {
    const react = render(<BottomBar username="anonimous" />);

    expect(socketIOClient.mocks.connectMocks.emit).toHaveBeenCalledTimes(0);

    await act(async () => {
      fireEvent.change(react.getByRole("textbox"), {
        target: {
          value: "Peter Hollands sings well",
        },
      });
      fireEvent.click(react.getByRole("button"));
    });

    expect(socketIOClient.mocks.connectMocks.emit).toBeCalledWith(consts.SEND_MESSEGE, {
      username: "anonimous",
      message: "Peter Hollands sings well",
    });
  });

  it("Doesn't send empty messages", async () => {
    const react = render(<BottomBar username="anonimous" />);

    await act(async () => {
      fireEvent.click(react.getByRole("button"));
    });

    expect(socketIOClient.mocks.connectMocks.emit).toHaveBeenCalledTimes(0);
  });

  it("Empties message field after submitting", async () => {
    const react = render(<BottomBar username="anonimous" />);

    expect(socketIOClient.mocks.connectMocks.emit).toHaveBeenCalledTimes(0);

    await act(async () => {
      fireEvent.change(react.getByRole("textbox"), {
        target: {
          value: "Peter Hollands sings well",
        },
      });
      fireEvent.click(react.getByRole("button"));
    });

    expect(react.getByRole("textbox")).toHaveAttribute('value', '')
  })
});
