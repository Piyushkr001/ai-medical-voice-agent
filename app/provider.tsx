"use client";

import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { UserDetailContext } from "@/context/UserDetailContext";


export type UserDetail = {
  name : string;
  email : string;
  credits: number;
}

function Provider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();

  const [UserDetail , setUserDetail] = useState<any>()

  const createNewUser = useCallback(async () => {
    if (!user) return;

    const userData = {
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      name: user.fullName,
    };

    try {
      const result = await axios.post("/api/users", userData);
      console.log("✅ User created:", result.data);
      setUserDetail( result.data )
    } catch (error: any) {
      console.error(
        "❌ Failed to create user:",
        error.response?.data || error.message
      );
    }
  }, [user]);

  useEffect(() => {
    if (isLoaded && user) {
      createNewUser();
    }
  }, [isLoaded, user, createNewUser]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <UserDetailContext.Provider value={{UserDetail , setUserDetail}}>
      {children}
      </UserDetailContext.Provider>
    </ThemeProvider>
  );
}

export default Provider;
