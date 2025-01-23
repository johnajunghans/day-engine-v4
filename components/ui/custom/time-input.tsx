import { Input } from "../input";

// interface LabelledTimeInputProps {
//     label: string
//     children: ReactNode
//     htmlFor: string
// }

// interface StartEndTimeInputProps {
//     time: string,
//     setTime: (time: string | undefined) => void
//     hourLabel: string
//     minLabel: string
//     periodLabel: string,
// }

interface StartEndTimeInputProps {
    time: string,
    setTime: (time: string) => void
    label: string,
} 

// interface TimeInputProps {
//     id: string;
//     name: string;
//     type: "hours" | "minutes";
//     ref: Ref<HTMLInputElement>;
//     time: string;
//     setTime: (time: string) => void;
//     onRightFocus?: () => void;
//     onLeftFocus: () => void; 
// }

// function LabelledTimeInput({ label, children, htmlFor }: LabelledTimeInputProps) {
//     return (
//         <div className="flex flex-col items-center [&_label]:focus-within:text-de_orange">
//             { children }
//             <Label htmlFor={htmlFor} className="text-xs text-de_orange_light -translate-y-2">{label}</Label>
//         </div>
//     )
// }

// function TimeInput({ id, name, ref, type, time, setTime }: TimeInputProps) {

//     return (
//         <Input
//             id={id}
//             name={name}
//             ref={ref}
//             value={time}
//             onChange={e => setTime(e.target.value)}
//             type="tel"
//             inputMode="decimal"
//             className="border-none text-white_muted focus-visible:text-white"
//         />
//     )
// }

export default function StartEndTimeInput({ time, setTime, label }: StartEndTimeInputProps) {
    return (
        <Input 
            id={label}
            name={label}
            type="time"
            value={time}
            placeholder="00:00"
            onChange={e => setTime(e.target.value)}
            className="border-none tracking-widest focus-visible:text-white text-3xl font-[family-name:var(--font-jb-mono)]"
        />
    )
}

// export default function StartEndTimeInput({ time, setTime, hourLabel, minLabel, periodLabel }: StartEndTimeInputProps) {
//     const [period, setPeriod] = useState<"AM" | "PM">("PM");

//     const minuteRef = useRef<HTMLInputElement>(null);
//     const hourRef = useRef<HTMLInputElement>(null);
//     const periodRef = useRef<HTMLButtonElement>(null);

//     return (
//         <div className="flex gap-4 items-center [&_svg]:focus-within:stroke-de_orange [&_span.colon]:focus-within:text-de_orange">
//             <div className="flex gap-2 items-start">
//                 <LabelledTimeInput label="Hours" htmlFor={hourLabel}>
//                     <TimePickerInput
//                         id={hourLabel}
//                         name={hourLabel} 
//                         time={time}
//                         setTime={setTime} 
//                         picker="12hours" 
//                         ref={hourRef} 
//                         period={period} 
//                         onRightFocus={() => minuteRef.current?.focus()} 
//                     />
//                 </LabelledTimeInput>
//                 <span className="colon font-[family-name:var(--font-jb-mono)] text-de_orange_light text-2xl leading-[48px]">:</span>
//                 <LabelledTimeInput label="Minutes" htmlFor={minLabel}>
//                     <TimePickerInput
//                         id={minLabel}
//                         name={minLabel}
//                         time={time}
//                         setTime={setTime} 
//                         picker="minutes" 
//                         ref={minuteRef} 
//                         onLeftFocus={() => hourRef.current?.focus()} 
//                         onRightFocus={() => periodRef.current?.focus()} 
//                     />
//                 </LabelledTimeInput>
//             </div>
//             <LabelledTimeInput label="Period" htmlFor={periodLabel}>
//                 <TimePeriodSelect 
//                     id={periodLabel}
//                     name={periodLabel}
//                     time={time}
//                     setTime={setTime} 
//                     period={period} 
//                     setPeriod={setPeriod} 
//                     ref={periodRef} 
//                     onLeftFocus={() => minuteRef.current?.focus()} 
//                 />
//             </LabelledTimeInput>
//         </div>
//     )
// }