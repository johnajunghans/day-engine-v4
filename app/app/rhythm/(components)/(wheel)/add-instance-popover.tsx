import { AddPopoverWrapper, PopoverControl } from "@/components/ui/custom/add-popover-wrapper";
import InputLabelWrapper from "@/components/ui/custom/input-label-wrapper";
import StartEndTimeInput from "@/components/ui/custom/time-input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRituals } from "@/context/rituals-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RitualInstance, weekArray } from "@/lib/types/rhythm-types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRitualInstances } from "@/context/ritual-instances-provider";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

interface AddInstancePopoverProps {
    popoverControl: PopoverControl
}

const formSchema = z.object({
    ritual: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    days: z.array(z.string())
})

export default function AddInstancePopover({ popoverControl }: AddInstancePopoverProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ritual: "",
            startTime: "00:00",
            endTime: "00:00",
            days: []
        }
    })

    const { state: rituals } = useRituals()
    const { dispatch } = useRitualInstances()

    async function handleAddInstance(formValues: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const ritualInfo = JSON.parse(formValues.ritual)

        const instance = {
            ritual_id: ritualInfo.id,
            start_time: formValues.startTime,
            end_time: formValues.endTime,
            days: formValues.days
        }

        const res = await fetch('http://localhost:3000/api/ritual_instances', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(instance)
        })

        if(res.ok) {
            const { data: newInstance }: {data: RitualInstance} = await res.json()
            const completeInstance = {...newInstance, Rituals: { name: ritualInfo.name, color: ritualInfo.color }}
            dispatch({ type: "INSERT", payload: completeInstance })
            toast({
                title: `New Instance of ${ritualInfo.name}`,
                description: `From ${newInstance.start_time} to ${newInstance.end_time}`
            })
            popoverControl.setIsOpen(false)
        } else {
            const { error }: { error: { message: string, code: string }} = await res.json();
            console.log(error)
            toast({
                title: "Error creating new Ritual Instance",
                description: error.message 
            })
        }

    }

    return (
        <>
        <AddPopoverWrapper title="Create New Ritual Instance" popoverControl={popoverControl}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddInstance)} className="flex flex-col gap-4">

                    {/* Ritual Select */}
                    <FormField control={form.control} name="ritual" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <InputLabelWrapper htmlFor="select-ritual" label="SELECT RITUAL">
                                    <Select required onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="select-ritual" name="select-ritual" autoFocus className="w-full font-[family-name:var(--font-jb-mono)] text-2xl h-16">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {rituals.map(ritual => (
                                                    <SelectItem key={ritual.id} className="font-[family-name:var(--font-jb-mono)]" value={JSON.stringify({id: ritual.id, name: ritual.name, color: ritual.color})}>{ritual.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </InputLabelWrapper>
                            </FormControl>
                        </FormItem>
                    )}>
                    </FormField>

                    {/* Start and End Time Inputs */}
                    <div className="flex relative gap-2 items-center border border-de_orange_light/50 focus-within:border-de_orange_light [&_span.time-label]:focus-within:text-de_orange [&_svg]:focus-within:stroke-de_orange rounded-md p-2">
                        <span className="time-label absolute -top-2 left-16 bg-background px-1 text-xs text-de_orange_light">START TIME</span>
                        <span className="time-label absolute -top-2 right-16 bg-background px-1 text-xs text-de_orange_light">END TIME</span>
                        <FormField control={form.control} name="startTime" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <StartEndTimeInput 
                                        time={field.value} 
                                        setTime={field.onChange}
                                        label="start-input"
                                    />
                                </FormControl>
                            </FormItem>
                        )}>
                        </FormField>
                        <MoveRight size={36} strokeWidth={1.5} className="stroke-de_orange_light" />
                        <FormField control={form.control} name="endTime" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <StartEndTimeInput 
                                        time={field.value} 
                                        setTime={field.onChange}
                                        label="end-input"
                                    />
                                </FormControl>
                            </FormItem>
                        )}>
                        </FormField>
                    </div>

                    {/* Active Days Input */}
                    <FormField control={form.control} name="days" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <div className="flex flex-col gap-2 relative items-center border border-de_orange_light/50 focus-within:border-de_orange_light [&_span.label]:focus-within:text-de_orange rounded-md p-2">
                                <span id="active-days-toggle" className="label absolute -top-2 left-[calc(50%-40px)] bg-background px-1 text-xs text-de_orange_light">ACTIVE DAYS</span>
                                <ToggleGroup aria-labelledby="active-days-toggle" className="justify-evenly w-full mt-2" type="multiple" value={field.value} onValueChange={field.onChange}>
                                    {weekArray.map(day => (
                                        <ToggleGroupItem key={day} value={day} aria-label={`Toggle-${day}`}>{day.slice(0,3)}</ToggleGroupItem>
                                    ))} 
                                </ToggleGroup>
                                <div className="flex gap-4 w-full justify-evenly">
                                    <Button variant="text" className="w-24" onClick={e => {
                                        e.preventDefault();
                                        field.onChange(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
                                    }}>Weekdays</Button>
                                    <Button variant="text" className="w-24" onClick={e => {
                                        e.preventDefault();
                                        field.onChange(["Saturday", "Sunday"]);
                                    }}>Weekends</Button>
                                    <Button variant="text" className="w-24" onClick={e => {
                                        e.preventDefault();
                                        field.onChange(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
                                    }}>Daily</Button>
                                </div>
                            </div>
                            </FormControl>
                        </FormItem>
                    )}>
                    </FormField>
                    <div className="flex gap-2">
                        <Button type="submit" variant="primary">Create</Button>
                        <Button onClick={() => popoverControl.setIsOpen(false)} type="button" variant="text">Cancel</Button>
                    </div>
                </form>
            </Form>
        </AddPopoverWrapper>
        <Toaster />
        </>
    )
}