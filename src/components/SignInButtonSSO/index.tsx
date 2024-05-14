"use client";

import { useMsal } from "@azure/msal-react";

const SignInButtonSSO = () => {
  const { instance } = useMsal();


  async function login() {
    await instance.loginPopup();
  }


  return <button onClick={() => login()} className="rounded w-[80%] cursor-pointer p-2 bg-gray-500 text-white mt-8">Bosch SSO</button>;
}

export default SignInButtonSSO;