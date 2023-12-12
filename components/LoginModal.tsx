import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useStytch } from "@stytch/nextjs";

const isValidCode = (code: string) => {
  if (!code) return false;
  // exactly 6 number digits
  const regex = /^\d{6}$/;
  return regex.test(code);
}

const LoginModal: React.FC<{onSuccess: any}> = ({onSuccess}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [methodId, setMethodId] = useState('');
  const [code, setCode] = useState('')

  // get stytch client
  const stytchClient = useStytch();


  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    if (isValidCode(code) && methodId && stytchClient) {
      const auth = async () => {
        const res = await stytchClient.otps.authenticate(code, methodId, {
          session_duration_minutes: 60
        })
        onSuccess(res.user)
        closeModal()
      }
      auth()
    }
  }, [code, methodId, stytchClient, onSuccess])
  
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Login
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Login
                  </Dialog.Title>
                  {
                        isValidCode(code) ? (
                          <div className="w-full mx-auto py-2">
                            Loading...
                          </div>
                        ) : methodId ? (
                          <form className="space-y-4 mx-4 my-6 flex flex-col">
                            <div className="mt-2">
                            <input
                              className="py-2 text-black text-base focus:ring-0 focus-visible:ring-0"
                              placeholder="000000"
                              onChange={(e)  => {
                                setCode(e.target.value)
                              }}
                              value={code}
                            />
                            </div>
                          </form>
                        ) : <form>
                          <div className="mt-2">
                            <input 
                              value={email}
                              onChange={(e) => {
                                e.preventDefault()
                                setEmail(e.target.value)
                              }}
                              placeholder='Enter your email'
                              type='email'
                            />
                          </div>
                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={async (e) => {
                                console.log('onsubmit!!')
                                const res = await stytchClient.otps.email.loginOrCreate(email, {
                                  expiration_minutes: 5
                                });
                                setMethodId(res.method_id)
                              }}
                            >
                              Continue
                            </button>
                          </div>
                        </form>
                      }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}


export default LoginModal