import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input";
import InputLabelWrapper from "@/components/ui/custom/input-label-wrapper";
import login from "@/app/(auth)/login/actions";

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
 
const LoginPopover = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    function onCreateAccount() {
        // handle create account click
    }

    function onForgotPassword() {

    }

    return (  
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="text" className="px-2">
                    <span>Login</span>
                    <Lock size={14} />
                </Button>
            </PopoverTrigger>
            <PopoverContent alignOffset={-8}>
                <Form {...form}>
                    <form className="w-[400px] flex flex-col gap-4 mt-1">
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputLabelWrapper htmlFor="email" label="EMAIL">
                                        <Input id="email" className="font-[family-name:var(--font-jb-mono)]" type="email" required {...field} />
                                    </InputLabelWrapper>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputLabelWrapper htmlFor="password" label="PASSWORD">
                                        <Input id="password" className="font-[family-name:var(--font-jb-mono)]" type={showPassword ? "text" : "password"} required {...field} />
                                        <Button className="absolute right-3 h-4 top-4 p-2 focus-visible:ring-de_orange_light" type="button" variant="text" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</Button>
                                    </InputLabelWrapper>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <Button formAction={login} type="submit" variant="primary" onClick={() => setIsLoading(true)} className={isLoading ? "bg-opacity-50" : "bg-opacity-100"}>Login</Button>
                                <Button onClick={onCreateAccount} disabled type="button" variant="secondary">Create an Account</Button>
                            </div>
                            <Button onClick={onForgotPassword} disabled type="button" variant="text">Forgot Password?</Button>
                        </div>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
}
 
export default LoginPopover;