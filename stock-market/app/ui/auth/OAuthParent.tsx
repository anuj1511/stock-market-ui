'use client'

import { Box } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import OAuthIcon from "./OAuthIcon";

/*
  Github OAuth:
  Forward the user to the github login screen (we pass in the client ID)
  User is now on the github side and log in (github.com/login)
  When user decided to login... they get forwarded back to localhost:3000
  BUT localhost:3000?code=ASDFASDFASDFASDF
  Use the code to get the access token (code can be only used once)
*/

export default function OAuthParent() {
  const handleLoginWithGithub = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string;
    const REDIRECT_URL  = process.env.NEXT_PUBLIC_REDIRECT_URL as string;
    
    if (!CLIENT_ID) {
      console.error('Error: GitHub Client ID (GITHUB_CLIENT_ID) is not defined.');
      return;
    }
  
    if (!REDIRECT_URL) {
      console.error('Error: Redirect URL (REDIRECT_URL) is not defined.');
      return;
    }
    
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URL
      )}&scope=read:user,user:email`
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <OAuthIcon
        icon={GitHubIcon}
        onClick={handleLoginWithGithub}
        color="black"
      />
      <OAuthIcon
        icon={GoogleIcon}
        color="red"
      />
      <OAuthIcon
        icon={FacebookIcon}
        color="blue"
      />
    </Box>
  );
}
