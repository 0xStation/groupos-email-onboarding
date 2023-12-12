'use client'
import LoginModal from '@/components/LoginModal'
import MyModal from '@/components/LoginModal'
import { useStytch } from '@stytch/nextjs';
import { User } from '@stytch/vanilla-js';
import { useCallback, useEffect, useState } from 'react'

export default function Home() {
  const stytchClient = useStytch();
  const [user, setUser] = useState<User | null>()
  const [accountAddress, setAccountAddress] = useState('')
  const logout = useCallback(() => {
    stytchClient.session.revoke();
    setUser(undefined)
  }, [stytchClient]);

  useEffect(() => {
    const fetchAccount = async (email: string) => {
      const res = await fetch("/api/accounts", {
        method: "POST",
        body: JSON.stringify({
          email
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const resData = await res.json();
      setAccountAddress(resData.accountAddress)
    }
    if (!!user) {
      fetchAccount(user.emails[0].email)
    }
  }, [user])

  useEffect(() => {
    setUser(stytchClient.user.getSync())
  }, [stytchClient])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <div className="gap-y-2 p-6 bg-white rounded-2xl justify-center">
          
          <div className="h-[7.25rem] w-[7.25rem] rounded-full bg-gray-100 my-2"></div>
          <div className="text-black mb-6 max-w-xl text-base">
            {accountAddress}
          </div>
          <button 
            className="text-base rounded-md bg-red-100 px-4 py-2 text-base font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            onClick={(e) => { 
              e.preventDefault()
              logout()
            }}  
          >
            Logout
          </button>
        </div>
        ) : <LoginModal onSuccess={(user: User) => {
          setUser(user)
        }}  />}
    </main>
  )
}
