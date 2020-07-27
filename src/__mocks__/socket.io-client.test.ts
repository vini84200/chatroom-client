import socketIOClient from "socket.io-client";

afterEach(() => {
    jest.clearAllMocks()
})

it("Connects", () => {
    expect(socketIOClient.connect("kaf")).toBe(socketIOClient.mocks.connectMocks)

})

describe("Socekt Connected", () => {
    let socket:SocketIOClient.Socket;

    beforeEach(()=>{
        socket = socketIOClient.connect("SDnkjsfb")
    })

    it("Has desconnection", () => {
        socket.disconnect()
        expect(socketIOClient.mocks.connectMocks.disconnect).toBeCalled()
    })

    it("must emit messages and test capture them", done => {
        socketIOClient.socket.on("sss", (data) => {
            expect(data).toEqual("aosbfh")
            done()
        })

        socket.emit("sss", "aosbfh" )
    })

    it("must emit messages and test capture them", done => {
        socket.on("sss", (data) => {
            expect(data).toEqual("aosbfh")
            done()
        })

        socketIOClient.socket.emit("sss", "aosbfh" )
    })
})