import { Button } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import { Plus } from "lucide-react";
import { ReactNode } from "react";

export default function LabelledPanel ({ children, title, popover, button, minW }: { children: ReactNode, title: string, popover?: ReactNode, button?: ReactNode, minW?: string }) {
  
    if (button && popover) throw Error("Button and Popover cannot both be defined with Labelled Panel component!");

    return (
        <ResizablePanel className={`min-w-[${minW}] border border-de_orange_light_muted rounded-xl`}>
            <div className="flex pr-2 gap-1 items-center">
                <div className="py-2 px-4 border-b border-r flex justify-center items-center bg-background rounded-br-lg border-de_orange_light_muted">
                    <span className="text-de_orange text-xs tracking-widest">{title}</span>
                </div>
                { popover && popover }
                { button && button }
            </div>
            { children }
        </ResizablePanel>
    )
}