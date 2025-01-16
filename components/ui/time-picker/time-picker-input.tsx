import { Input } from "@/components/ui/input";
 
import { cn } from "@/lib/utils";
import React from "react";
import {
  Period,
  Time,
  TimePickerType,
  getArrowByType,
  getTimeByType,
  setTimeByType,
} from "./time-picker-utils";
 
export interface TimePickerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerType;
  time: Time | undefined
  setTime: (time: Time | undefined) => void;
  period?: Period;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}
 
const TimePickerInput = React.forwardRef<
  HTMLInputElement,
  TimePickerInputProps
>(
  (
    {
      className,
      type = "tel",
      value,
      id,
      name,
      time = "00:00",
      setTime,
      onChange,
      onKeyDown,
      picker,
      period,
      onLeftFocus,
      onRightFocus,
      ...props
    },
    ref
  ) => {
    const [flag, setFlag] = React.useState<boolean>(false);
    const [prevIntKey, setPrevIntKey] = React.useState<string>("0");
 
    /**
     * allow the user to enter the second digit within 2 seconds
     * otherwise start again with entering first digit
     */
    React.useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => {
          setFlag(false);
        }, 2000);
 
        return () => clearTimeout(timer);
      }
    }, [flag]);
 
    const calculatedValue = React.useMemo(() => {
      return getTimeByType(time, picker);
    }, [time, picker]);
 
    const calculateNewValue = (key: string) => {
      /*
       * If picker is '12hours' and the first digit is 0, then the second digit is automatically set to 1.
       * The second entered digit will break the condition and the value will be set to 10-12.
       */
      if (picker === "12hours") {
        if (flag && calculatedValue.slice(1, 2) === "1" && prevIntKey === "0")
          return "0" + key;
      }
 
      return !flag ? "0" + key : calculatedValue.slice(1, 2) + key;
    };
 
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab") return;
      e.preventDefault();
      if (e.key === "ArrowRight") onRightFocus?.();
      if (e.key === "ArrowLeft") onLeftFocus?.();
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        const step = e.key === "ArrowUp" ? 1 : -1;
        const newValue = getArrowByType(calculatedValue, step, picker);
        if (flag) setFlag(false);
        setTime(setTimeByType(time, newValue, picker, period));
      }
      if (e.key >= "0" && e.key <= "9") {
        if (picker === "12hours") setPrevIntKey(e.key);
 
        const newValue = calculateNewValue(e.key);
        if (flag) onRightFocus?.();
        setFlag((prev) => !prev);
        setTime(setTimeByType(time, newValue, picker, period));
      }
    };
 
    return (
      <Input
        ref={ref}
        id={id || picker}
        name={name || picker}
        className={cn(
          "w-12 text-center p-0 border-none font-[family-name:var(--font-jb-mono)] text-white_muted focus:text-foreground focus-visible:text-foreground text-2xl tabular-nums caret-transparent [&::-webkit-inner-spin-button]:appearance-none",
          className
        )}
        value={value || calculatedValue}
        onChange={(e) => {
          e.preventDefault();
          onChange?.(e);
        }}
        type={type}
        inputMode="decimal"
        onKeyDown={(e) => {
          onKeyDown?.(e);
          handleKeyDown(e);
        }}
        {...props}
      />
    );
  }
);
 
TimePickerInput.displayName = "TimePickerInput";
 
export { TimePickerInput };