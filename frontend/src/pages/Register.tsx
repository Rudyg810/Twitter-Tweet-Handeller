import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios"; // Import Axios

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import config from "@/context/config";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function Register() {
    const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post(`${config.port}/api/auth/register`, data);
      if (response.status === 200) {
        toast({ title: "Register Success" }); // Display success toast
        navigate("/login"); // Navigate to login page
      } else {
        toast({ title: "Register Failed" }); // Display failure toast
      }
    } catch (error) {
      console.error("Error:", error);
      toast({ title: "Register Failed" }); // Display failure toast
    }
  }

  return (
    <div className=" font- flex justify-center items-center sm:m-64">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" font- space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormDescription>Please enter your email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormDescription>
                  Please enter a password with at least 6 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className=" font- px-10" type="submit">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
