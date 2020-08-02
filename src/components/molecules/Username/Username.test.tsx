import React from "react";
import Username from "./Username";
import { mount } from "enzyme";
import * as userHooks from "../../../services/useUsername";
import { TestHook } from "../../../utils/testing/testHook";
import { act } from "react-dom/test-utils";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Username field", () => {
  it("uses the useUser", () => {
    const spyedUseUser = jest.spyOn(userHooks, "useUser");
    mount(<Username />);
    expect(spyedUseUser).toHaveBeenCalledTimes(1);
  });

  it("Shows the username", () => {
    const wrapper = mount(
      <userHooks.ProvideUser>
        <Username />
      </userHooks.ProvideUser>
    );

    expect(wrapper.contains("anonimo")).toBeTruthy();
  });

  it("Changes the username after change", () => {
    let user: userHooks.User;
    const wrapper = mount(
      <userHooks.ProvideUser>
          <Username />
          <TestHook
            callback={() => {
              user = userHooks.useUser();
            }}
          />
      </userHooks.ProvideUser>
    );
    act(() => {
      user.setUsername("peter");
    });
    
    wrapper.update()
    expect(wrapper.contains("peter")).toBeTruthy();
  });
});
