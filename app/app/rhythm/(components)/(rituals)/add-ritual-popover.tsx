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

type AddRitualPopoverProps = {
    popoverControl: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }
}

const formSchema = z.object({
    name: z.string(),
    description: z.string()
})

export default function AddRitualPopover ({ popoverControl }: AddRitualPopoverProps) {

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    return (
        <Popover open={popoverControl.isOpen} onOpenChange={popoverControl.setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="icon" size="icon">
                    <Plus className="stroke-de_orange !w-[18px] !h-[18px]" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={12} alignOffset={-82}>
                <PopoverHeader title="Create New Ritual" closePopover={popoverControl.setIsOpen} />
                <Form {...form}>
                    <form className="w-[400px] flex flex-col gap-4 mt-1">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputLabelWrapper label="RITUAL NAME">
                                        <Input className="font-[family-name:var(--font-jb-mono)] h-14 text-xl text-center uppercase" type="text" required {...field} />
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