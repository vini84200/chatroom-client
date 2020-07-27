import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BottomBar from "./BottomBar";
import { shallow, ShallowWrapper, mount } from "enzyme";
import socketIOClient from "socket.io-client";
import MockedSocket from "socket.io-mock";
import { act } from "react-dom/test-utils";
import * as consts from '../../../consts'
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

    expect(wrapper.find("button").text()).toBe("Send");
  });

  test("Has message bar", () => {
    const wrapper = shallow(<BottomBar username="anonimous" />);

    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("Connect with socket.io when create.", () => {
    const wrapper = shallow(<BottomBar username="anonimous" />);
    // console.log(socketIOClient)
    expect(socketIOClient.connect).toHaveBeenCalledTimes(1);
  });

  it("Connect with socket.io using the correct string when create.", () => {
    const wrapper = shallow(<BottomBar username="anonimous" />);
    // console.log(socketIOClient)
    expect(socketIOClient.connect).toHaveBeenCalledWith(consts.CONNECTION_STRING);
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

    expect(socketIOClient.mocks.connectMocks.emit).toBeCalledWith("sendMessage", {
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
});
