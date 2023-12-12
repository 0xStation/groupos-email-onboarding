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
        <div>
          <div className='text-white'>
            Account address: {accountAddress}
          </div>
          <button 
            className='text-black bg-white rounded-2xl px-4 py-2'
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
