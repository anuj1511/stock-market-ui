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
const CLIENT_ID = "Ov23liMBpnOcVTJcRQXb";
const REDIRECT_URL = "http://localhost:3000";

export default function OAuthParent() {
  const handleLoginWithGithub = () => {
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
