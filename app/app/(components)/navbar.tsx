'use client'

import Image from "next/image";
import { FunctionComponent } from "react";
import { UserCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSelector from "@/components/common/theme-selector";
import Logout from "@/app/(auth)/logout/logout";

interface NavbarProps {
    
}

interface NavTileProps {
    name: string
}



const NavTile: FunctionComponent<NavTileProps> = ({ name }) => {
    const pathname = usePathname();

    return (
        <Link href={`/app/${name}`}>
            <div className={`flex flex-col justify-center items-center gap-1 w-20 h-20 bg-background border border-de_orange_light rounded-lg ${pathname !== `/app/${name}` ? "opacity-40 hover:opacity-60" : "opacity-100"}`}>
                <Image src={`/${name}.svg`} alt={name} width={40} height={40} />
                <span className="text-de_orange text-sm tracking-widest">{name.toUpperCase()}</span>
            </div>
        </Link>
        
    )
}

 
const Navbar: FunctionComponent<NavbarProps> = () => {

    const footerIconStyles = "stroke-de_orange_light w-8 h-8 p-1 hover:bg-white/5 rounded-sm cursor-pointer"
    const navs = ["rhythm", "vision", "reflect"];

    return (  
        <div className="h-[calc(100vh-36px)] flex flex-col justify-between items-center pb-4 pt-2 px-4 mt-9 border-t border-de_orange_light_muted">
            <div className="flex flex-col gap-4 items-center">
                <Image src="/logo.png" alt="logo" width={125} height={125} className="animate-logo-spin" />
                <div className="flex flex-col gap-3">
                    {navs.map(nav => (
                        <NavTile key={nav} name={nav} />
                    ))}
                </div>
            </div>
            <div className="flex justify-between w-full">
                <ThemeSelector align="start" />
                <UserCircle className={footerIconStyles} />
                <Logout />
            </div>
        </div>
    );
}
 
export default Navbar;