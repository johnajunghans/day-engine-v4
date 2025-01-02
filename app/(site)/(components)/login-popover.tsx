import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Lock } from "lucide-react";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input";

interface LoginPopoverProps {
    
}

const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@$!%*?&)" }),
  });
 
const LoginPopover: FunctionComponent<LoginPopoverProps> = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });


    return (  
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="text">
                    <span>Login</span>
                    <Lock />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Form {...form}>
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                    <Button variant="primary">Login</Button>
                </Form>
            </PopoverContent>
        </Popover>
    );
}
 
export default LoginPopover;