import { ReactNode } from "react";
import Navbar from "./(components)/navbar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserResponse } from "@supabase/supabase-js";

export default async function AppLayout({ children }: { children: ReactNode }) {

    // Protect /app/* route
    const supabase = await createClient()
    const { data: user, error }: UserResponse = await supabase.auth.getUser()
    if (!user || error) {
        console.log(error)
        redirect('/');
    }

    return (
        <div className="flex font-[family-name:var(--font-philosopher)]">
            <Navbar />
            { children }
        </div>
    )
}