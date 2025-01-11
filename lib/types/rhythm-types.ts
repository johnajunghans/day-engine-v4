type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

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
    created_at: string,
    name: string,
    color: string,
    
    days: DayOfWeek[],
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

// interface MappableInstancesObject {
//     Monday: MappableInstance[],
//     Tuesday: MappableInstance[],
//     Wednesday: MappableInstance[],
//     Thursday: MappableInstance[],
//     Friday: MappableInstance[],
//     Saturday: MappableInstance[],
//     Sunday: MappableInstance[]
// }

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
    type Ritual
}