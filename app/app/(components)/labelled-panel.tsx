import { Button } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import { Plus } from "lucide-react";
import { ReactNode } from "react";

export default function LabelledPanel ({ children, title, btnFunction, minW }: { children: ReactNode, title: string, btnFunction?: () => void, minW?: string }) {
    return (
        <ResizablePanel className={`relative min-w-[${minW}]`}>
            <div className="flex gap-1 absolute items-center">
                <div className="py-2 px-4 border-b border-r flex justify-center items-center bg-background rounded-br-lg border-de_orange_light_muted">
                    <span className="text-de_orange text-xs tracking-widest">{title}</span>
                </div>
                {btnFunction && <Button variant="icon" size="icon" onClick={btnFunction}><Plus strokeWidth={2} className="stroke-de_orange !w-[18px] !h-[18px]" /></Button>}
            </div>
            { children }
        </ResizablePanel>
    )
}