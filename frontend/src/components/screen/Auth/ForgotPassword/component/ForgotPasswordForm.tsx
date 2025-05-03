"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import forgotPasswordSchema from "./validation/forgotPasswordSchema";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { forgotPassword } from "@/components/services/auth.service";
import toast from "react-hot-toast"; 

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      setLoading(true);
      console.log("Reset password link sent to:", data.email);

      const response = await forgotPassword(data.email);
      setSuccess(true);
      toast.success("Password reset link sent successfully! Please check your inbox.");
    } catch (error) {
      console.error("Failed to send reset link", error);
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToForm = () => {
    setSuccess(false);
    form.reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-md">
        <CardContent>
          {!success ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-2">Forgot your password?</h2>
              <p className="text-center text-sm text-gray-600 mb-6">
                Enter your email and we will send you a link to reset your password
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              type="email"
                              placeholder="your-email@example.com"
                              className="pl-8"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full font-bold bg-violet-500 hover:bg-violet-600"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin mr-2" size={20} />
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">Back to </span>
                <span
                  onClick={() => router.push("/login")}
                  className="text-violet-600 hover:underline cursor-pointer"
                >
                  Sign in
                </span>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-4"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-700">Reset Link Sent Successfully</h3>
              <p className="text-sm text-gray-500">
                We've sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.
              </p>
              <Button
                onClick={handleBackToForm}
                className="w-full cursor-pointer bg-violet-500 hover:bg-violet-600"
              >
                Send Another Link To Your Email
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
