"use client";

import { useMsal } from "@azure/msal-react";
import { graphConfig, loginRequest } from "@/service/msal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const WelcomeUser = () => {
    const { instance, accounts, logger } = useMsal();
    const username = accounts[0].username;
    const router = useRouter()

    function RequestProfileData() {
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],

        }).then(async (response) => {
            
            const headers = new Headers();
            const bearer = `Bearer ${response.accessToken}`;
            headers.append("Authorization", bearer);
            const options = {
                method: "GET",
                headers: headers
            };

            await fetch(graphConfig.graphMeEndpoint, options)
                .then(async response => {
                    let userData = await response.json()
                    const role = accounts[0].idTokenClaims?.roles?.includes("instructor") ? "INSTRUCTOR" : "APPRENTICE"

                    const body = {
                        username: userData.mail,
                        firstName: userData.givenName,
                        lastName: userData.surname,
                        email: userData.mail,
                        role: role
                    }
                    await fetch("http://localhost:8083/auth/login/sso", {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(async resp => {
                        const responseJson = await resp.json()
                        localStorage.setItem('JWT_TOKEN', JSON.stringify(responseJson.access_token))
                    }).catch(err => console.log(err))
                })
                .catch(error => console.log(error));
        })
    }

    useEffect(() => {
        RequestProfileData();
        router.replace('/bosch')
    }, []);
    return (
        <>

        </>
    )
}

export default WelcomeUser;