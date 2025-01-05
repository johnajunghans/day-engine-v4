import * as React from "react"

import { cn } from "@/lib/utils"
// import { cva, type VariantProps } from "class-variance-authority"

// const inputVariants = cva(
//   "flex h-10 w-full rounded-md border px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-white_muted focus-visible:outline-none focus-visible:border-de_orange_light disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//   {
//     variants: {
//       variant: {
//         default: "bg-transparent border-de_orange_light/50 text-white" 
//       },
//       size: {
//         default: "h-10 text-sm",
//         large: "h-12 text-md"
//       }
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default" 
//     }
//   }
// )

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {

    return (
      <input
        type={type}
        className={cn(
          "flex h-12 text-base w-full bg-transparent border-de_orange_light/50 text-white rounded-md border px-3 py-2 autofill:bg-transparent autofill:text-inherit autofill:font-[family-name:var(--font-jb-mono)] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-white_muted focus-visible:outline-none focus-visible:border-de_orange_light disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
