import MockedSocket from 'socket.io-mock';

const socket = new MockedSocket();
const client = socket.socketClient

const mocks = {
    connectMocks: {
        disconnect: jest.fn(() => {}).mockName("Disconnect Mock"),
        emit: jest.fn((event, payload) => client.emit(event, payload)).mockName("Emit Mock"),
        on: jest.fn((event, cb) => client.on(event, cb)).mockName("peter")
    },
}

export default {
    connect: jest.fn().mockReturnValue(mocks.connectMocks),
    mocks: mocks,
    socket
}