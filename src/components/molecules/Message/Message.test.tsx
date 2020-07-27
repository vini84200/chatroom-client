import React from 'react'
import { shallow, mount } from 'enzyme';
import Message from './Message'

describe("Message", () => {
    const username = "peter"
    const message = "Very short and important message that must be rendered."
    it("must contain the username", () =>{
        const wrapper = shallow(<Message username={username} message={message} />)
        expect(wrapper.html()).toContain(username)
    })
    it("must contain the message", () =>{
        const wrapper = shallow(<Message username={username} message={message} />)
        expect(wrapper.html()).toContain(message)
    })
})