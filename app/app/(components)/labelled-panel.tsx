import { ResizablePanel } from "@/components/ui/resizable";
import { ReactNode, Ref } from "react";
import { PanelOnResize } from "react-resizable-panels";

interface LabelledPanelProps {
    children: ReactNode, 
    title: string, 
    popover?: ReactNode, 
    button?: ReactNode, 
    ref?: Ref<HTMLDivElement>,
    size?: number,
    minSize?: number,
    maxSize?: number,
    onResize?: PanelOnResize,
    centerContents?: boolean
}

export default function LabelledPanel ({ children, title, popover, button, ref, size, minSize, maxSize, onResize, centerContents }: LabelledPanelProps) {
  
    if (button && popover) throw Error("Button and Popover cannot both be defined with Labelled Panel component!");

    return (
        <ResizablePanel defaultSize={size} minSize={minSize} maxSize={maxSize} onResize={onResize}>
            <div className="w-full h-full flex flex-col">
                <div className="flex pr-2 gap-1 items-center border-b border-de_orange_light_muted">
                    <div className="py-2 px-4 border-r border-de_orange_light_muted flex justify-center items-center bg-background">
                        <span className="text-de_orange text-sm tracking-widest">{title}</span>
                    </div>
                    { popover && popover }
                    { button && button }
                </div>
                <div id="panel-ref" ref={ref} className={`${centerContents ? "flex items-center justify-center" : ""} flex-grow`}>
                    { children }
                </div>
            </div>
        </ResizablePanel>
    )
}