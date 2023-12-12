// returns the accountAddress for a given email

import { getOrCreateAccount } from "@/lib/groupos";
import { NextRequest } from "next/server";

const isValidEmail = (email: string) => {
  // Regular expression for a basic email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Test the email against the regex
  return emailRegex.test(email);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email } = body
        if (!isValidEmail(email)) {
          return Response.json({ error: 'Invalid email'}, { status: 400 })
        }
        const { address } = await getOrCreateAccount({ email });
        return Response.json({
            accountAddress: address,
            email
        })
      } catch (e: any) {
        console.error("Error creating account: ", e.message);
        return Response.json({ error: e.message }, { status: 500 });
      }
  }
  