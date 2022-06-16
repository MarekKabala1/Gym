import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from './fireaseConfig'

const AuthContext = createContext<any>(undefined!)
const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: PropChildren) {

    const [currentUser, setCurrentUser] = useState<any>(false)

    const signUp: Function = (email: string, password: string) => {
        return createUserWithEmailAndPassword(
            auth,
            email,
            password

        )
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => setCurrentUser(user))
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

