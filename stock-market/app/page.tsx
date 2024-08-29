"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY } from "./lib/constansts";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    setIsLoggedIn(!!token);
    setIsChecked(true); // Indicate that the check has been completed
  }, []);

  if (!isChecked) {
    return null; // Or a loading indicator
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <h3>User is logged in</h3>
          <button
            onClick={() => {
              Cookies.remove(AUTH_TOKEN_KEY);
              setIsLoggedIn(false); // Update state after logout
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
