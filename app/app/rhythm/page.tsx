import { ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";
import Rituals from "./(components)/(rituals)/rituals";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Ritual, RitualInstance } from "@/lib/types/rhythm-types";
import WheelMain from "./(components)/(wheel)/wheel-main";

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

    // Get Ritual Instances if there are rituals
    let instances: RitualInstance[] = []
    if (rituals.length > 0) {
        const ritualIds = rituals.map(ritual => ritual.id);
        const { data, error }: PostgrestResponse<RitualInstance> = await supabase
            .from('Ritual_Instances')
            .select('*')
            .in('ritual_id', ritualIds)
        
        if (!data || error) {
            console.log(error)
            return
        }

        instances = data
    }

    


    return (
        <ResizablePanelGroup direction="horizontal" className="flex-grow h-screen border-l border-de_orange_light_muted">
            <Rituals rituals={rituals} />
            <ResizableHandle className="h-screen bg-de_orange_light_muted" />
            <WheelMain ritualInstances={instances} />
        </ResizablePanelGroup>
    )
}