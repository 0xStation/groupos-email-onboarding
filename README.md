### Email Onboarding

A template to create onchain accounts and authorize users with email.

This is created with [GroupOS](https://docs.groupos.xyz/introduction/group-os) Cloud Account and [Stytch](https://stytch.com/docs/) Consumer Authentication.

[Try it out!](https://groupos-email-onboarding.vercel.app)

### Getting Started

First, set up environment variables at ```.env```

**Stytch**
- Go to [Stytch](https://stytch.com/dashboard/home) and create a new project. Choose **Consumer Authentication**.

- Go to the [API keys](https://stytch.com/dashboard/api-keys) tab to get ```Project ID```, ```Secret key```, and ```Public token```

**GroupOS**
- Go to [GroupOS](https://groupos.xyz/dashboard?tab=settings&sub_tab=api_keys) and get your ```API key```. GroupOS is currently in beta, [fill in this form](https://6vdcjqzyfj3.typeform.com/to/YPYlVkjP) and we'll get back and onboard you in 24 hours.

Second, [enable Stytch SDK](https://stytch.com/dashboard/sdk-configuration) on test environment.

Note: When you go live, do so on the live environment.

Lastly, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

