"use client";

import NextTopLoader from 'nextjs-toploader';
import { useEffect } from "react";
import { useRouter } from 'nextjs-toploader/app';
import Cookies from 'js-cookie';

export default function ClientLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const router = useRouter();
  
    useEffect(() => {
      const token = Cookies.get("token");
      const username = Cookies.get("username");
  
      const loginCheck = async () => {
        if (!token || !username) {
          router.push("/login");
          return;
        }
  
        try {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password: token }),
          });
          const data = await response.json();

          console.log(data);
  
          if (data?.data?.ticket) {
            Cookies.set("token", data.data.ticket);
            Cookies.set("username", data.data.username);
            router.push("/dashboard");
          } else {
            router.push("/login");
          }
        } catch (error) {
          console.error("Error logging in:", error);
          router.push("/login");
        }
      };
  
      loginCheck();
    }, [router]);
  
    return (
      <>
        <NextTopLoader
          color="var(--primary)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px var(--primary),0 0 5px var(--primary)"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
    <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        {children}
      </>
    );
  }