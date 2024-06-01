import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios"; // Import axios for making API requests

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
import { useAuthContext } from "@/context/auth";
import config from "@/context/config";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function Secrets() {
  const { userId } = useAuthContext();
  
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data:any) {
    try {
      console.log(userId,data.username)
      console.log(userId,data.email)
      console.log(userId,data.password)
      await axios.put(`${config.port}/api/auth/user/${userId}`, {
        twitterId: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      });

      toast({
        title: "User information updated successfully",

      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error updating user information",
        description: (
          <pre className="font- mt-2 w-[340px] rounded-md bg-red-950 p-4">
            <code className="font- text-white">{(error as any).message}</code>
          </pre>
        ),
      });
    }
  }

  return (
    <div className="font- flex flex-col items-center space-y-6">
      <h1 className="font- text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-800 bg-clip-text text-transparent">
        Secrets Form
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="font- w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormDescription>
                  We'll never share your email with anyone else.
                </FormDescription>
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
                  Make sure your password is strong.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="font- px-10" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}








