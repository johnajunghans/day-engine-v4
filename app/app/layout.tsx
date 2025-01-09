import { ReactNode } from "react";
import Navbar from "./(components)/navbar";

export default function AppLayout({ children }: { children: ReactNode }) {

    return (
        <div className="flex gap-4 p-4 font-[family-name:var(--font-philosopher)]">
            <Navbar />
            { children }
        </div>
    )
}