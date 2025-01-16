import { Color } from "@/app/app/rhythm/(components)/(rituals)/color-selector"

const weekArray: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday" | "Daily"

type Ritual = {
    id: number,
    created_at: string,
    last_updated_on: string,
    user_id: string,
    name: string,
    description?: string,
    color: string
}

type RitualInstance = {
    id: number,
    user_id: string,
    ritual_id: number,
    created_at: string,
    days: DayOfWeek[],
    Rituals: { name: string, color: Color }
    start_time: string,
    end_time: string
}

// type MappableInstance = {
//     name: string,
//     description?: string,
//     color: string,
//     start_time: string,
//     end_time: string
// }

type MappableInstances = {
    Monday: RitualInstance[],
    Tuesday: RitualInstance[],
    Wednesday: RitualInstance[],
    Thursday: RitualInstance[],
    Friday: RitualInstance[],
    Saturday: RitualInstance[],
    Sunday: RitualInstance[],
    Daily: RitualInstance[]
}

// const mappableInstances: MappableInstancesObject = {
//     Monday: [],
//     Tuesday: [],
//     Wednesday: [],
//     Thursday: [],
//     Friday: [],
//     Saturday: [],
//     Sunday: []
// }

export {
    type DayOfWeek,
    type Ritual,
    type RitualInstance,
    type MappableInstances,
    weekArray
}