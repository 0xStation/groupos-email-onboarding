'use client'

import { createStytchHeadlessClient } from "@stytch/nextjs/headless";
import { StytchProvider } from '@stytch/nextjs';


const stytch = createStytchHeadlessClient(
    process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN as string
  )

const Providers: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <StytchProvider stytch={stytch}>
            {children}
        </StytchProvider>
    )
}

export default Providers