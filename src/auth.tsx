
import React, { createContext, useContext, useState } from 'react'
import { redirect } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { getUserByEmail } from './lib/services/users'
import { User } from '~/drizzle/schema'
export interface Auth {
    user: User | null
    isAuthenticated: boolean
    login: (email: string)=>Promise<void>
    logout: ()=> Promise<void>
}

export const AuthContext = createContext<Auth | null>(null);
export const AuthProvider = ({children}: { children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const isAuthenticated: boolean = !!user

const getUser = useServerFn(getUserByEmail)
    const login = async (email: string) => {
        const result = await getUser({email});
        if(user) {
            setUser(user)
            redirect({href: '/'})
        }
        else{
            console.log('user login fail')
            redirect({href: '/login'})
        }
    }
    const logout = async ()=> {
        setUser(null)
        redirect({ href: '/'})
    }

    return (
        <AuthContext value={{user, isAuthenticated, login,logout}}>
            {children}
        </AuthContext>
    )
}

export function useAuth() {
    const auth = useContext(AuthContext)
    if(!auth) {
        throw new Error('auth context must be used inside AuthContext Provider')
    }
    return auth;
}