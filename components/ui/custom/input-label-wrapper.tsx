import { FunctionComponent, ReactNode } from "react";
import { FormLabel } from "../form";

interface InputLabelWrapperProps {
    label: string
    children: ReactNode
}
 
const InputLabelWrapper: FunctionComponent<InputLabelWrapperProps> = ({ label, children }) => {
    return (  
        <div className="relative">
            <div className="absolute left-[20px] top-[-12px] px-1 bg-background">
                <FormLabel className="text-xs text-de_orange">{label}</FormLabel>
            </div>
            { children }
        </div>
    );
}
 
export default InputLabelWrapper;