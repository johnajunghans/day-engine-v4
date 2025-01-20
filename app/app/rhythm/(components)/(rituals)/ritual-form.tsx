import InputLabelWrapper from "@/components/ui/custom/input-label-wrapper";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Color, ColorSelector } from "./color-selector";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { Dispatch, ReactNode, SetStateAction } from "react";

export const formSchema = z.object({
    name: z.string(),
    description: z.string()
})

type FormSchema = z.infer<typeof formSchema>

interface RitualFormsProps {
    form: UseFormReturn<FormSchema>
    handleSubmit: SubmitHandler<FieldValues>
    color: Color
    setColor: Dispatch<SetStateAction<Color>>
    isColorSelectorOpen: boolean
    setIsColorSelectorOpen: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    buttonName: string
    width?: number
    deleteRitualTrigger?: ReactNode
}

export function RitualForm({ 
        form, 
        handleSubmit,
        color, 
        setColor, 
        isColorSelectorOpen, 
        setIsColorSelectorOpen,
        isLoading,
        setIsOpen,
        buttonName,
        width,
        deleteRitualTrigger
    }: RitualFormsProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className={`w-[${width}px] flex flex-col gap-4 mt-1`}>
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <InputLabelWrapper htmlFor="name" label="RITUAL NAME">
                                <Input id="name" autoFocus className="font-[family-name:var(--font-jb-mono)] h-14 text-xl" type="text" required {...field} />
                                <div className="absolute top-3 right-3">
                                    <ColorSelector selectedColor={color} setSelectedColor={setColor} isOpen={isColorSelectorOpen} setIsOpen={setIsColorSelectorOpen} />
                                </div>
                            </InputLabelWrapper>
                        </FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <InputLabelWrapper htmlFor="description" label="DESCRIPTION">
                                <Textarea id="description" className="font-[family-name:var(--font-jb-mono)]" {...field} />
                            </InputLabelWrapper>
                        </FormControl>
                    </FormItem>
                )} />
                <div className="w-full relative">
                    <div className="flex gap-2">
                        <Button type="submit" variant="primary" className={isLoading ? "bg-opacity-50" : "bg-opacity-100"}>{buttonName}</Button>
                        <Button onClick={() => setIsOpen(false)} type="button" variant="text">Cancel</Button>
                    </div>
                    { deleteRitualTrigger }
                </div>
             </form>
        </Form>
    )
}   