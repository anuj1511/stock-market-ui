'use client'

import * as React from "react";
import SignUp from "@/app/ui/auth/SignUp";
import { signupCreds } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import { fetchData } from "@/app/tools/api";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY } from "@/app/lib/constansts";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from 'notistack';

export default function SignUpPage() {

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if(Cookies.get(AUTH_TOKEN_KEY)) {
      enqueueSnackbar("Session retrived, redirecting to Home page", {variant: 'info'})
      router.push('/');
    }
  }, [])

  const signupUsingCredentials = async (creds: signupCreds) => {
    try {
      setIsLoading(true);
      const response = await fetchData('/signup/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: creds,
      });
      console.log('Login Response:', response);
      enqueueSnackbar("Signed-in successfully, please login to continue", {variant: 'success'})
      router.push('/auth/signin');
    } catch (error) {
      console.error('Error logging in:', error);
      enqueueSnackbar('An unknown error occurred', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  if(isLoading) {
    return <CircularProgress />
  }

  return (
    <>
      <SignUp signupUsingCredentials={signupUsingCredentials} />
    </>
  );
}
