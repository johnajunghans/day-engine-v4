import { Button } from "@/components/ui/button"
import InputLabelWrapper from "@/components/ui/custom/input-label-wrapper"
import PopoverHeader from "@/components/ui/custom/popover-header"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Color, ColorSelector } from "./color-selector"

type AddRitualPopoverProps = {
    popoverControl: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }
}

const formSchema = z.object({
    name: z.string(),
    description: z.string()
})

export default function AddRitualPopover ({ popoverControl }: AddRitualPopoverProps) {

    const [isLoading, setIsLoading] = useState(false)
    const [color, setColor] = useState<Color>("zinc")
    const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    async function handleAddRitual(formValues: z.infer<typeof formSchema>) {
        const newRitual = {
            name: formValues.name,
            description: formValues.description,
            color
        }

        const res = await fetch('http://localhost:3000/api/rituals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRitual)
        })

        if (res.ok) {
            const ritual = await res.json()
            console.log("Ritual successfully created:", ritual)
            popoverControl.setIsOpen(false)
        } else {
            const error = await res.json()
            console.log("Error creating new Ritual", error)
        }
    }

    return (
        <Popover open={popoverControl.isOpen} onOpenChange={popoverControl.setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="icon" size="icon">
                    <Plus className="stroke-de_orange !w-[18px] !h-[18px]" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={12} alignOffset={-82} className={`${isColorSelectorOpen ? "blur-[1px]" : "blur-0"} duration-75`}>
                <PopoverHeader title="Create New Ritual" closePopover={popoverControl.setIsOpen} />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddRitual)} className="w-[400px] flex flex-col gap-4 mt-1">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputLabelWrapper label="RITUAL NAME">
                                        <Input autoFocus className="font-[family-name:var(--font-jb-mono)] h-14 text-xl uppercase" type="text" required {...field} />
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
                                    <InputLabelWrapper label="DESCRIPTION">
                                        <Textarea className="font-[family-name:var(--font-jb-mono)]" {...field} />
                                    </InputLabelWrapper>
                                </FormControl>
                            </FormItem>
                        )} />
                        <div className="flex gap-2">
                            <Button type="submit" variant="primary" className={isLoading ? "bg-opacity-50" : "bg-opacity-100"}>Create</Button>
                            <Button onClick={() => popoverControl.setIsOpen(false)} type="button" variant="text">Cancel</Button>
                        </div>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    )
}