import * as React from "react";
import SignIn from "../../ui/auth/SignIn";
import OAuthParent from "../../ui/auth/OAuthParent";

export default function SignInPage() {
  return (
    <>
        <SignIn />
        <OAuthParent />
    </>
  );
}
