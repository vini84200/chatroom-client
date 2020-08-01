import React, { createContext, useState, useContext } from "react";

export interface User {
    username: String,
    setUsername: Function
}

const userContext = createContext<User>({username: "anonimo"})

export function ProvideUser({children}){
    const user = useProvideUser()
    return <userContext.Provider value={user}>{children}</userContext.Provider>
}

export const useUser = () : User => {
    return useContext(userContext)
}

function useProvideUser() {
    const [user, setUser] = useState({username: "anonimo"})

    const setUsername = (newUsername) => {
        setUser({...user, username: newUsername})
        return user
    }

    return {
        username: user.username,
        setUsername
    }
}