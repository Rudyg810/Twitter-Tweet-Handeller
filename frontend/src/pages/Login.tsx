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
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/auth";
import { jwtDecode } from "jwt-decode";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function Login() {
  const { setUserId } = useAuthContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post(`${config.port}/api/auth/login`, data);
      if (response.status === 200) {
        toast({ title: "Login Success" }); // Display success toast
        const decoded_data = await jwtDecode(response.data.token) as any;
        setUserId(decoded_data.id);
        localStorage.setItem('auth',response?.data?.token)
        navigate("/");

      } else {
        toast({ title: "Login Failed" }); // Display failure toast
      }
    } catch (error) {
      console.error("Error:", error);
      toast({ title: "Login Failed" }); // Display failure toast
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
                  Not Registered <Link className="text-blue-800 font-semibold underline" to={"/register"}>register</Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className=" font- px-10" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
