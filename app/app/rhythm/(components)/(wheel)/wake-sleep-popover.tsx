import { PopoverWrapper } from "@/components/ui/custom/popover-wrapper";
import { SunMoon } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export default function WakeSleepPopover() {

    const [isOpen, setIsOpen] = useState(false)

    const form = z.object({
        
    })

    return (
        <PopoverWrapper
            icon={<SunMoon size={24} />}
            popoverControl={{ isOpen, setIsOpen }}
            title="Set Wake and Sleep Times"
            sideOffset={16}
            alignOffset={-16}
        >

        </PopoverWrapper>
    )
}