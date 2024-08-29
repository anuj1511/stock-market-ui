'use client'

import * as React from "react";
import SignIn from "../../ui/auth/SignIn";
import OAuthParent from "../../ui/auth/OAuthParent";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchData } from "@/app/tools/api";
import Cookies from "js-cookie";
import {loginCreds} from "@/app/lib/types"
import { AUTH_TOKEN_KEY } from "@/app/lib/constansts";
import { CircularProgress } from "@mui/material";


export default function SignInPage() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false)


  React.useEffect(() => {
    if(Cookies.get(AUTH_TOKEN_KEY)) {
      router.push('/');
      return;
    }

    const codeParam = searchParams.get("code");
    
    if(codeParam) {
      loginWithGitHub(codeParam)
    }

    // Clean up URL after handling codeParam
    const url = new URL(window.location.href);
    url.searchParams.delete('code');
    window.history.replaceState({}, '', url.toString());
  }, [searchParams])


  const loginWithGitHub = async (githubCode: string) => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };


  const loginUsingCredentials = async (creds: loginCreds) => {
    try {
      setIsLoading(true);
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
      // removing the code param
      router.push('/auth/singnin');
    } finally {
      setIsLoading(false);
    }
  }

  if(isLoading) {
    return <CircularProgress />
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
