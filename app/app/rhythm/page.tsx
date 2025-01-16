import { ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";
import Rituals from "./(components)/(rituals)/rituals";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PostgrestResponse } from "@supabase/supabase-js";
import { MappableInstances, Ritual, RitualInstance } from "@/lib/types/rhythm-types";
import WheelMain from "./(components)/(wheel)/wheel-main";
import { RitualsProvider } from "@/context/rituals-provider";
import { RitualInstancesProvider } from "@/context/ritual-instances-provider";

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
            .select(`
                *,
                Rituals(name, color)
            `)
            .in('ritual_id', ritualIds)
        
        if (!data || error) {
            console.log(error)
            return
        }

        instances = data
    }

    // Create mappable instances object if there are ritual instances
    // ASSUMING THAT NAME AND COLOR PROPERTY ARE JOINED TO RITUAL INSTANCES FROM RITUALS
    const mappableInstances: MappableInstances = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
        Daily: []
    }
    if (instances.length > 0) {
        instances.forEach(instance => {
            instance.days.forEach(day => {
                mappableInstances[day].push(instance)
            })
            if (instance.days.length === 7) {
                mappableInstances["Daily"].push(instance)
            }
        })
    }


    return (
        <ResizablePanelGroup direction="horizontal" className="flex-grow h-screen border-l border-de_orange_light_muted">
            <RitualsProvider initialValue={rituals}>
                <RitualInstancesProvider initialValue={mappableInstances}>
                    <Rituals />
                    <ResizableHandle className="h-screen bg-de_orange_light_muted" />
                    <WheelMain />
                </RitualInstancesProvider>
            </RitualsProvider>
        </ResizablePanelGroup>
    )
}