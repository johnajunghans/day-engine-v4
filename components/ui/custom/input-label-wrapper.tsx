import { FunctionComponent, ReactNode } from "react";
import { FormLabel } from "../form";

interface InputLabelWrapperProps {
    label: string
    children: ReactNode
    htmlFor: string
    alignment?: "start" | "middle" | "end"
}
 
const InputLabelWrapper: FunctionComponent<InputLabelWrapperProps> = ({ label, children, htmlFor, alignment="start" }) => {
    return (  
        <div className="relative [&_label]:focus-within:opacity-100">
            <div className={`absolute ${alignment === "start" ? "left-[20px]" : alignment === "middle" ? "left-[40%]" : alignment === "end" ? "right-[20px]" : ""} top-[-12px] px-1 bg-background rounded-sm`}>
                <FormLabel htmlFor={htmlFor} className="text-xs text-de_orange opacity-50">{label}</FormLabel>
            </div>
            { children }
        </div>
    );
}
 
export default InputLabelWrapper;