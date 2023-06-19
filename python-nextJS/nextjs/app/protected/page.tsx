/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useSession, signIn } from "next-auth/react"
import { useEffect } from "react";

interface AppProps {
    Component: React.ComponentType
    pageProps: {
        session: any
    }
}

export default function AuthenticatedPage() {
      const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied. Click <a href="/">here to login.</a></p>
  }

    return (
        <h1>Protected Page</h1>
    )
}