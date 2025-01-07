import { UUID } from "crypto"

// Query all instances from ritual_instances table using uuid 

type DaysOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

type ImportedInstance = {
    id: number,
    user_id: UUID
    created_on: string,
    name: string,
    color: string,
    
    days: DaysOfWeek[],
    start_time: string,
    end_time: string
}

type MappableInstance = {
	name: string,
    description?: string,
    color: string,
    start_time: string,
    end_time: string
}

interface MappableInstancesObject {
	Monday: MappableInstance[],
    Tuesday: MappableInstance[],
    Wednesday: MappableInstance[],
    Thursday: MappableInstance[],
    Friday: MappableInstance[],
    Saturday: MappableInstance[],
    Sunday: MappableInstance[]
}

const mappableInstances: MappableInstancesObject = {
	Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
}

// INSTANCES AS SEPARATE TABLE 

const importedInstances: ImportedInstance[] = []

importedInstances.forEach(instance => {
    const obj = {
        name: instance.name,
        color: instance.color,
        start_time: instance.start_time,
        end_time: instance.end_time
    }
    instance.days.forEach(day => {
        mappableInstances[day].push(obj)
    })
})

// INSTANCES AS A JSON OBJECT WITHIN RITUALS

// type Ritual = {
//     id: number,
//     user_id: UUID,
//     created_on: string,
//     last_updated_on: string,
//     name: string,
//     description?: string,
//     color: string,
//     instances: { day: DaysOfWeek, start_time: string, end_time: string }[]
// }

// const importedRituals: Ritual[] = []

// importedRituals.forEach(ritual => {
//     const obj = {
//         name: ritual.name,
//         color: ritual.color,
//         start_time: ritual.
//     }
// })

// })

