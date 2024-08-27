import type { Metadata } from "next";

import * as React from "react";
import {CssBaseline, Box, Container} from "@mui/material"
import Copyright from "../ui/utility/Copyright";


export const metadata: Metadata = {
  title: "Auth Page",
  description: "TU wallstreet authentication page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {children}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}
