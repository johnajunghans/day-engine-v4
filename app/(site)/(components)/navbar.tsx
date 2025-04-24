'use client'

import ThemeSelector from "@/components/common/theme-selector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent } from "react";
import LoginPopover from "./login-popover";
import { Session } from "@supabase/supabase-js";
import { User } from "lucide-react";

interface NavbarProps {
    session: Session | null
}

const Navbar: FunctionComponent<NavbarProps> = ({ session }) => {

    const pathname = usePathname();

    // const links = [
    //     { name: "Philosophy", href: "/philosophy" },
    //     { name: "Blog", href: "/blog" }
    // ]


    return (
        <div className="flex gap-2 fixed m-2 w-[calc(100vw-16px)] z-10">
            <div className="w-full h-12 flex justify-between items-center rounded-md border border-white/5 backdrop-blur-sm px-2 shadow-md">
                <nav className="flex gap-2 items-center">
                    <Link href="/" className="flex items-center">
                        {/* <Image priority src="/logo.png" alt="logo" width={48} height={48} className="animate-logo-spin" /> */}
                        <h3 className={`text-2xl h-12 leading-[48px] ${pathname === "/" ? "text-de_orange" : "text-white_muted hover:text-white/80" }`}>Day Engine</h3>
                    </Link>
                    {/* <Separator orientation="vertical" className="h-8" /> */}
                    {/* {links.map(link => (
                        <Link key={link.name} href={link.href} aria-disabled className={`${pathname.startsWith(link.href) ? "text-de_orange" : "text-white_muted hover:text-white/80" } pointer-events-none`}>{link.name}</Link>
                    ))} */}
                </nav>
                <div className="flex items-center">
                    <div className="flex gap-2 items-center">
                        <ThemeSelector align="end" />
                        <Separator orientation="vertical" className="h-8" />
                        {session 
                            ? <Button variant="text" className="pl-1"><span>Account</span><User size={16} /></Button> 
                            : <LoginPopover />
                        }
                    </div>
                </div>
            </div>
                {session && <Link href={session ? '/app' : '/'} className={`${session ? "pointer-events-auto" : "pointer-events-none"}`}>
                    <Button variant="primary" className="h-12 p-2 text-white/90 bg-de_orange/50 border border-de_orange/75 hover:bg-de_orange/55 hover:border-de_orange/90">{session ? "Go to App" : "Try for Free"}</Button>
                </Link>}
        </div> 
        
    );
}
 
export default Navbar;