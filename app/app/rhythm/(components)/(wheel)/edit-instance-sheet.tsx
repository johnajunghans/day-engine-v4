import EditSheetWrapper from "@/components/ui/custom/edit-sheet-wrapper";
import { formSchema, getRitualById, InstanceForm } from "./instance-form";
import { DayOfWeek, RitualInstance } from "@/lib/types/rhythm-types";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRitualInstances } from "@/context/ritual-instances-provider";
import { useRituals } from "@/context/rituals-provider";
import { areStringArraysSameOrderInd } from "@/lib/functions/helper-functions";
import DeleteInstanceDialog from "./delete-instance-dialog";
import { toast } from "sonner";
import { domain } from "@/lib/variables";

interface EditInstanceSheetProps {
    instance: RitualInstance
    children: ReactNode
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

function compareInstanceArrays(oldArr: DayOfWeek[], newArr: DayOfWeek[], haveDaysChanged: boolean): { daysToUpdate: DayOfWeek[], daysToRemove: DayOfWeek[], daysToAdd: DayOfWeek[] } | undefined {
    if (!haveDaysChanged) {
        return { daysToUpdate: newArr, daysToRemove: [], daysToAdd: [] }
    }
    const daysToUpdate: DayOfWeek[] = []
    const daysToRemove: DayOfWeek[] = []
    const daysToAdd: DayOfWeek[] = []

    oldArr.forEach(day => {
        if (!newArr.includes(day)) {
            daysToRemove.push(day)
        } else {
            daysToUpdate.push(day)
        }
    })
    newArr.forEach(day => {
        if (!oldArr.includes(day)) {
            daysToAdd.push(day)
        }
    })

    return { daysToUpdate, daysToRemove, daysToAdd }
}

export default function EditInstanceSheet({ instance, children, isOpen, setIsOpen }: EditInstanceSheetProps) {

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ritual: instance.ritual_id.toString(),
            startTime: instance.start_time,
            endTime: instance.end_time,
            days: instance.days
        }
    })

    const { dispatch } = useRitualInstances()
    const { state: rituals } = useRituals()

    useEffect(() => {
        if (!isOpen) {
            form.reset({
                ritual: instance.ritual_id.toString(),
                startTime: instance.start_time,
                endTime: instance.end_time,
                days: instance.days
            })
        }
    }, [isOpen, form, instance])

    async function handleEditInstance(formValues: z.infer<typeof formSchema>) {
        const haveDaysChanged = !areStringArraysSameOrderInd(formValues.days, instance.days)

        if (
            formValues.ritual === instance.ritual_id.toString() &&
            formValues.startTime === instance.start_time &&
            formValues.endTime === instance.end_time &&
            !haveDaysChanged
        ) return setIsOpen(false)

        setIsLoading(true);

        const ritual = getRitualById(formValues.ritual, rituals)
        if (!ritual) throw Error("Ritual not found when attempting to edit a Ritual Instance!")

        const updatedInstance = {
            id: instance.id,
            ritual_id: Number(formValues.ritual),
            start_time: formValues.startTime,
            end_time: formValues.endTime,
            days: formValues.days
        }

        const res = await fetch(`${domain}/api/ritual_instances`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedInstance)
        })

        if (res.ok) {
            const { data: updatedInstanceRes } = await res.json()
            const completedUpdatedInstanceRes = { 
                ...updatedInstanceRes,
                days: formValues.days, 
                Rituals: { name: ritual.name, color: ritual.color }
            }
            const daysInfo = compareInstanceArrays(instance.days, formValues.days as DayOfWeek[], haveDaysChanged)
            dispatch({ type: "UPDATE", payload: { instance: completedUpdatedInstanceRes, daysInfo: daysInfo } })
            toast.success("Ritual Instance Updated")
            return setIsOpen(false)
        } else {
            const { error } = await res.json()
            console.log(error)
            toast.error("Error updating Ritual Instance", {
                description: error.message
            })
        }
    }

    return (
        <EditSheetWrapper
            title="Edit Ritual Instance"
            description={`Edit Ritual Instance: ${instance.Rituals.name}`}
            align="right"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            triggerAsChild
            form={
                <InstanceForm 
                    form={form}
                    handleSubmit={handleEditInstance as SubmitHandler<FieldValues>}
                    isLoading={isLoading}
                    setIsOpen={setIsOpen}
                    buttonName="Update"
                    deleteInstanceTrigger={<DeleteInstanceDialog instance={instance} />}
                />
            }
        >
            { children }
        </EditSheetWrapper>
    )
}