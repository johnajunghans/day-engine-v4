'use client'

import ThemeSelector from "@/components/common/theme-selector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent } from "react";
import LoginPopover from "./login-popover";

interface NavbarProps {
    
}

const Navbar: FunctionComponent<NavbarProps> = () => {

    const pathname = usePathname();

    const links = [
        { name: "Philosophy", href: "/philosophy" },
        { name: "Blog", href: "/blog" }
    ]

    return (
        <div className="flex gap-2 fixed m-2 w-[calc(100vw-16px)]">
            <div className="w-full h-12 flex justify-between items-center rounded-md bg-white/10 border border-white/15 backdrop-blur-sm">
                <nav className="flex gap-2 items-center">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.png" alt="logo" width={48} height={48} className="animate-logo-spin" />
                        <span className={`${pathname === "/" ? "text-de_orange" : "text-white_muted hover:text-white/80" }`}>Day Engine</span>
                    </Link>
                    <Separator orientation="vertical" className="h-8" />
                    {links.map(link => (
                        <Link key={link.name} href={link.href} className={`${pathname.startsWith(link.href) ? "text-de_orange" : "text-white_muted hover:text-white/80" }`}>{link.name}</Link>
                    ))}
                </nav>
                <div className="flex items-center">
                    <ThemeSelector />
                    <LoginPopover />
                </div>
                
            </div>
            <Button variant="primary" className="h-12 p-2">Try for Free</Button>
        </div> 
        
    );
}
 
export default Navbar;