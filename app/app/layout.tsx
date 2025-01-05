import { ReactNode } from "react";
import Navbar from "./(components)/navbar";

export default function AppLayout({ children }: { children: ReactNode }) {

    return (
        <div className="flex gap-2 p-2 font-[family-name:var(--font-philosopher)]">
            <Navbar />
            { children }
        </div>
    )
}