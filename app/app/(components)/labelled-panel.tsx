import { ResizablePanel } from "@/components/ui/resizable";
import { ReactNode, Ref } from "react";
import { PanelOnResize } from "react-resizable-panels";

interface LabelledPanelProps {
    children: ReactNode, 
    title: string, 
    popover?: ReactNode, 
    ref?: Ref<HTMLDivElement>,
    size?: number,
    minSize?: number,
    maxSize?: number,
    onResize?: PanelOnResize,
    centerContents?: boolean
    hideHeader?: boolean
}

export default function LabelledPanel ({ children, title, popover, ref, size, minSize, maxSize, onResize, centerContents, hideHeader }: LabelledPanelProps) {

    return (
        <ResizablePanel defaultSize={size} minSize={minSize} maxSize={maxSize} onResize={onResize}>
            <div className="w-full h-full flex flex-col">
                <div className={`flex h-11 pr-2 gap-1 items-center border-b border-de_orange_light_muted ${hideHeader ? "absolute z-10 pl-1" : ""}`}>
                    {!hideHeader && <div className={`h-full px-4 border-r border-de_orange_light_muted flex justify-center items-center bg-background`}>
                        <span className="text-de_orange text-sm tracking-widest">{title}</span>
                    </div>}
                    { popover && popover }
                </div>
                <div id="panel-ref" ref={ref} className={`${centerContents ? "flex items-center justify-center" : ""} flex-grow ${!hideHeader ? "max-h-[calc(100vh-37px)]" : ""} overflow-y-auto overflow-x-hidden`}>
                    { children }
                </div>
            </div>
        </ResizablePanel>
    )
}