import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import InputLabelWrapper from "@/components/ui/custom/input-label-wrapper";
import StartEndTimeInput from "@/components/ui/custom/time-input";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { Ritual, weekArray } from "@/lib/types/rhythm-types";
import { useRituals } from "@/context/rituals-provider";

export const formSchema = z.object({
    ritual: z.string({ message: "Invalid Ritual Id"}),
    startTime: z.string(),
    endTime: z.string(),
    days: z.array(z.string())
})

type FormSchema = z.infer<typeof formSchema>

interface InstanceFormsProps {
    form: UseFormReturn<FormSchema>
    handleSubmit: SubmitHandler<FieldValues>
    isLoading: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    buttonName: string
    width?: number
}

export function getRitualById(id: number | string, rituals: Ritual[]) {
    const ritual = rituals.find(ritual => ritual.id === Number(id))
    if(!ritual) console.log("Ritual not found by given id!")
    return ritual
}

export function InstanceForm({ form, handleSubmit, isLoading, setIsOpen, buttonName }: InstanceFormsProps) {

    const { state: rituals } = useRituals()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">

                {/* Ritual Select */}
                <FormField control={form.control} name="ritual" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <InputLabelWrapper htmlFor="select-ritual" label="SELECT RITUAL INSTANCE">
                                <Select name="select-ritual" required onValueChange={field.onChange} value={field.value.toString()}>
                                    <SelectTrigger id="select-ritual" name="select-ritual" autoFocus className="w-full font-[family-name:var(--font-jb-mono)] text-2xl h-16">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {rituals.map(ritual => (
                                                <SelectItem key={ritual.id} className="font-[family-name:var(--font-jb-mono)]" value={ritual.id.toString()}>{ritual.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </InputLabelWrapper>
                        </FormControl>
                        <FormMessage />
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
                    <Button type="submit" variant="primary">{buttonName}</Button>
                    <Button onClick={() => {setIsOpen(false); form.reset()}} type="button" variant="text">Cancel</Button>
                </div>
            </form>
        </Form>
    )
}