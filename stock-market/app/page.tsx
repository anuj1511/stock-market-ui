"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});
  const [userEmailData, setUserEmailData] = useState({});
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true); // Indicate that the component has mounted on the client
  }, []);

  useEffect(() => {
    if (isClient) {
      const codeParam = searchParams.get("code");

      if (codeParam && localStorage.getItem("githubAccessToken") === null) {
        const getAccessToken = async () => {
          try {
            const response = await fetch("http://localhost:8000/polls/oauth/access-token/?code=" + codeParam, {
              method: "GET",
            });
            const data = await response.json();
            if (data.access_token) {
              localStorage.setItem("githubAccessToken", data.access_token);
              setRerender((prev) => !prev); // Toggle rerender state
            }
          } catch (error) {
            console.error("Error fetching access token:", error);
          }
        };
        getAccessToken();
      }
    }
  }, [isClient, searchParams, rerender]);

  const getUserData = async () => {
    if (isClient) {
      try {
        const token = localStorage.getItem("githubAccessToken");
        if (token) {
          const response = await fetch("http://localhost:8000/polls/github/user/", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const getUserEmailData = async () => {
    if (isClient) {
      try {
        const token = localStorage.getItem("githubAccessToken");
        if (token) {
          const response = await fetch("http://localhost:8000/polls/github/user/emails/", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const data = await response.json();
          setUserEmailData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  return (
    <>
      {isClient && localStorage.getItem("githubAccessToken") ? (
        <>
          <h3>User is logged in</h3>
          <button
            onClick={() => {
              localStorage.removeItem("githubAccessToken");
              setRerender((prev) => !prev); // Toggle rerender state
            }}
          >
            Logout
          </button>
          <h3>Get User Data from Github API</h3>
          <button onClick={() => getUserData()}>Get Data</button>
          {Object.keys(userData).length !== 0 ? (
            <>
              <h4>Hey there {JSON.stringify(userData)}</h4>
            </>
          ) : (
            <>
              <h4>NO user data</h4>
            </>
          )}
          <h3>Get User Email from Github API</h3>
          <button onClick={() => getUserEmailData()}>Get Email Data</button>
          {Object.keys(userEmailData).length !== 0 ? (
            <>
              <h4>Hey your email is:  {JSON.stringify(userEmailData)}</h4>
            </>
          ) : (
            <>
              <h4>NO user email data</h4>
            </>
          )}

        </>
      ) : (
        <>
          <h3>User is NOT logged in</h3>
        </>
      )}
    </>
  );
}
