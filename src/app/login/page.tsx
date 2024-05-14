"use client";
import logo from '@/../public/icon_logo.svg';
import text from '@/../public/trackhub-text.svg';
import '@/app/globals.css';
import { msalInstance } from '@/service/msal';
import { MsalProvider } from "@azure/msal-react";
import { signIn } from "next-auth/react";
import Image from 'next/image';
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from 'react';

import SignInButtonSSO from '@/components/SignInButtonSSO';
import WelcomeUser from '@/components/WelcomeUser';
import dynamic from 'next/dynamic';
const AuthenticatedTemplate = dynamic(() => import("@azure/msal-react").then(mod => mod.AuthenticatedTemplate), { ssr: false });
const UnauthenticatedTemplate = dynamic(() => import("@azure/msal-react").then(mod => mod.UnauthenticatedTemplate), { ssr: false });

export default function loginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState("");

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/apprentice";

    // useEffect(() => {
    //     const logged = JSON.parse(localStorage.getItem("logged_keycloak"))
    //     if (logged) {
    //         router.push(callbackUrl);
    //     }
    // }, [])

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await signIn("credentials", {
                redirect: false,
                username: username,
                password: password,
                callbackUrl,
            });
            setLoading(false);
            if (!res?.error) {
                setPassword("");
                setUsername("");
                localStorage.setItem("logged_keycloak", JSON.stringify({
                    status: true
                }));
                router.push(callbackUrl);
            } else {
                setError("invalid username or password");
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    return (
        <>
            <main className="flex items-center justify-center w-full h-[100vh] bg-[url('/background-login.svg')] bg-no-repeat bg-cover bg-center">

                <div className="w-2/5 min-h-2/3 pb-6 py-6 bg-black bg-opacity-75 rounded flex flex-col items-center ">
                    <div className='flex gap-2 items-center justify-center mt-3'>
                        <Image src={logo} alt='TrackHub logo' height={90} width={90} />
                        <Image src={text} alt='TrackHub logo text' height={210} width={210} />
                    </div>
                    <form className='w-[60%] pt-16' method='POST' onSubmit={onSubmit}>
                        {error && (
                            <p className="text-center bg-red-500 py-4 mb-6 rounded">{error}</p>
                        )}
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" onChange={e => setUsername(e.target.value)} name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-palette-blue peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:text-palette-blue  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group mt-10">
                            <input type="password" onChange={e => setPassword(e.target.value)} name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-palette-blue peer" placeholder=" " required />
                            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:text-palette-blue  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>

                        <MsalProvider instance={msalInstance}>
                            <div className='flex items-center flex-col mt-14'>
                                {!loading ? (<input type='submit' className='rounded w-[100%] cursor-pointer p-2 bg-palette-pink text-white' value={"Login"} />) : (<input type='submit' className='rounded w-[100%] cursor-pointer p-2 opacity-10 bg-palette-pink text-white' disabled value={"Loading"} />)}

                                <UnauthenticatedTemplate>
                                    <SignInButtonSSO />
                                </UnauthenticatedTemplate>

                                <AuthenticatedTemplate>
                                    <WelcomeUser />
                                </AuthenticatedTemplate>
                            </div>
                        </MsalProvider>
                    </form>
                </div>
            </main>
        </>
    );
}