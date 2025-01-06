import { ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";
import LabelledPanel from "../(components)/labelled-panel";
import Rituals from "./(components)/(rituals)/rituals";

export default function Rhythm() {

    return (
        <ResizablePanelGroup direction="horizontal" className="flex-grow min-h-[calc(100vh-16px)] border border-de_orange_light_muted rounded-lg">
            <Rituals />
            <ResizableHandle />
            <LabelledPanel title="WHEEL" minW="100vh">

            </LabelledPanel>
        </ResizablePanelGroup>
    )
}