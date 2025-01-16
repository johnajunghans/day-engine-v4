"use client";
 
import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Period, Time, display12HourValue, setTimeByType } from "./time-picker-utils";
 
export interface PeriodSelectorProps {
    period: Period;
    setPeriod: (m: Period) => void;
    time: Time | undefined;
    setTime: (time: Time | undefined) => void;
    onRightFocus?: () => void;
    onLeftFocus?: () => void;
    id: string;
    name: string;
}
 
export const TimePeriodSelect = React.forwardRef<HTMLButtonElement, PeriodSelectorProps>(({ id, name, period, setPeriod, time, setTime, onLeftFocus, onRightFocus }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "ArrowRight") onRightFocus?.();
        if (e.key === "ArrowLeft") onLeftFocus?.();
    };
 
    const handleValueChange = (value: Period) => {
        setPeriod(value);
 
        /**
         * trigger an update whenever the user switches between AM and PM;
         * otherwise user must manually change the hour each time
         */
        if (time) {;
            const hours = display12HourValue(Number(time.slice(0,2)));
            setTime(setTimeByType(time, hours, "12hours", period === "AM" ? "PM" : "AM"));
        }
    };
 
    return (
        <div className="flex h-12 items-center">
            <Select value={period} onValueChange={(value: Period) => handleValueChange(value)}>
                <SelectTrigger id={id} name={name} ref={ref} className="w-14 px-1 h-12 text-white_muted focus:text-foreground focus-visible:text-foreground border-none font-[family-name:var(--font-jb-mono)] text-xl" onKeyDown={handleKeyDown}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
});
 
TimePeriodSelect.displayName = "TimePeriodSelect";