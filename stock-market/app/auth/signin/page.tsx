'use client'

import * as React from "react";
import SignIn from "../../ui/auth/SignIn";
import OAuthParent from "../../ui/auth/OAuthParent";
import { useSearchParams } from "next/navigation";
import { fetchData } from "@/app/tools/api";
import Cookies from "js-cookie";

import {loginCreds} from "@/app/lib/types"


export default function SignInPage() {

  const searchParams = useSearchParams();


  React.useEffect(() => {
    const codeParam = searchParams.get("code");
    if(codeParam && Cookies.get('authToken') === null)
      loginWithGitHub(codeParam)
  }, [])


  const loginWithGitHub = async (githubCode: string) => {
    try {
      const response = await fetchData('/login/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          github_code: githubCode,
        },
      });
      console.log('Login Response:', response);
      Cookies.set('authToken', response.data.token, { expires: 7, secure: true, sameSite: 'Strict' });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };


  const loginUsingCredentials = async (creds: loginCreds) => {
    try {
      const response = await fetchData('/login/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: creds,
      });
      console.log('Login Response:', response);
      Cookies.set('authToken', response.data.token, { expires: 7, secure: true, sameSite: 'Strict' });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }


  return (
    <>
        <SignIn 
          loginUsingCredentials={loginUsingCredentials}
         />
        <OAuthParent />
    </>
  );
}
