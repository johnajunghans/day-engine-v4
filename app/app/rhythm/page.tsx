import { ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";
import LabelledPanel from "../(components)/labelled-panel";
import Rituals from "./(components)/(rituals)/rituals";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Ritual } from "@/lib/types/rhythm-types";

export default async function Rhythm() {

    // Get User 
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user) {
        redirect('/') // redirect home if user is not authenticated
    }

    // Get rituals based on user id
    const { data: rituals, error: ritualsError }: PostgrestResponse<Ritual> = await supabase
        .from('Rituals')
        .select('*')
        .eq('user_id', userData.user.id)
    if (ritualsError) {
        console.log(ritualsError)
        throw Error(ritualsError.message)
    }


    return (
        <ResizablePanelGroup direction="horizontal" className="flex-grow min-h-[calc(100vh-32px)] border border-de_orange_light_muted rounded-xl">
            <Rituals rituals={rituals} />
            <ResizableHandle />
            <LabelledPanel title="WHEEL" minW="100vh">

            </LabelledPanel>
        </ResizablePanelGroup>
    )
}