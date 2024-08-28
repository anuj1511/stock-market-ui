'use client'

import * as React from "react";
import SignIn from "../../ui/auth/SignIn";
import OAuthParent from "../../ui/auth/OAuthParent";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchData } from "@/app/tools/api";
import Cookies from "js-cookie";
import {loginCreds} from "@/app/lib/types"
import { AUTH_TOKEN_KEY } from "@/app/lib/constansts";


export default function SignInPage() {

  const searchParams = useSearchParams();
  const router = useRouter();


  React.useEffect(() => {
    console.log("called")
    if(Cookies.get(AUTH_TOKEN_KEY)) {
      router.push('/');
      return;
    }

    const codeParam = searchParams.get("code");
    console.log(codeParam)
    console.log(Cookies.get(AUTH_TOKEN_KEY))
    if(codeParam && Cookies.get(AUTH_TOKEN_KEY) === undefined) {
      loginWithGitHub(codeParam)
    }

  }, [searchParams])


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
      Cookies.set(AUTH_TOKEN_KEY, response.data.token, { expires: 7, secure: true, sameSite: 'Strict' });
      router.push('/');
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
      Cookies.set(AUTH_TOKEN_KEY, response.data.token, { expires: 7, secure: true, sameSite: 'Strict' });
      router.push('/');
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
