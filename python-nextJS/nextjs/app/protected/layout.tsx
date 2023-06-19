"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const { data, status }: any = useSession();

    useEffect(() => {
        const userGroup = data?.user?.groups;
        console.log("User : ", data?.user)
        if (userGroup) {
            if (userGroup.includes("Admin")) {
                
            }
        }
    }, []);

    return (
                <>
                    {/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} /> */}
                    <main>{children}</main>
                </>
            )
}