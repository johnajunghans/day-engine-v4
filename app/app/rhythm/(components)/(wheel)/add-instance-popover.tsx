import { AddPopoverWrapper, PopoverControl } from "@/components/ui/custom/add-popover-wrapper";
import InputLabelWrapper from "@/components/ui/custom/input-label-wrapper";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRituals } from "@/context/rituals-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ritual: "Hello",
            startTime: "",
            endTime: "",
            days: []
        }
    })

    const { state: rituals } = useRituals()

    return (
        <AddPopoverWrapper title="Create New Ritual Instance" popoverControl={popoverControl}>
            <Form {...form}>
                <form>
                    <FormField control={form.control} name="ritual" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <InputLabelWrapper label="SELECT RITUAL">
                                    <Select required  onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-[360px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            <SelectLabel>Rituals</SelectLabel>
                                                {rituals.map(ritual => (
                                                    <SelectItem key={ritual.id} value={`${ritual.id}`}>{ritual.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </InputLabelWrapper>
                            </FormControl>
                        </FormItem>
                    )}>
                    </FormField>
                </form>
            </Form>
        </AddPopoverWrapper>
    )
}