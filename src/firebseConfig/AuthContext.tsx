import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from './fireaseConfig'

const AuthContext = createContext<any>(undefined!)
const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthContextProvider({ children }: PropChildren) {

    const [currentUser, setCurrentUser] = useState<boolean | any>(false)

    const signUp: Function = (email: string, password: string) => {
        return createUserWithEmailAndPassword(
            auth,
            email,
            password

        )
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            return setCurrentUser(user)
        })
        unsubscribe()
    }, [])

    const value = {
        currentUser,
        signUp
    }

    return (
        <AuthContext.Provider value={value} >
            <>{children}</>
        </AuthContext.Provider>
    )
}
type PropChildren = {
    children?: JSX.Element
    | JSX.Element[]
    | React.ReactNode
}

export default AuthContext
export { useAuth }

