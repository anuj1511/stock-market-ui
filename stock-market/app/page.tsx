"use client";

import React from "react";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY } from "./lib/constansts";

export default function Home() {

  console.log(AUTH_TOKEN_KEY)
  console.log(Cookies.get(AUTH_TOKEN_KEY))

  return (
    <>
      {Cookies.get(AUTH_TOKEN_KEY) ? (
        <>
          <h3>User is logged in</h3>
          <button
            onClick={() => {
              Cookies.remove(AUTH_TOKEN_KEY)
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h3>User is NOT logged in</h3>
        </>
      )}
    </>
  );
}
