import socketIOClient from "socket.io-client";
import * as consts from "../consts"

const socket = socketIOClient.connect(consts.CONNECTION_STRING)
// const socketContext = createContext<SocketIOClient.Socket | null>(socket)

// DEPRECATED pois não necessita de Provider se mantiver valor constante
// export function ProvideSocket ({children}: any) {
//     return <socketContext.Provider value={socket}>{children}</socketContext.Provider>
// }

export function useSocket() {
    // const socket = useContext(socketContext)
    return socket
}