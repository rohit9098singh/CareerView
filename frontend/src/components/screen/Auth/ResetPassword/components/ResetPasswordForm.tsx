"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ResetPasswordFormSchema } from "./validation/ResetPasswordFormSchema";
import { resetPassword } from "@/components/services/auth.service";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type ResetPasswordInput = z.infer<typeof ResetPasswordFormSchema>;

const ResetPasswordForm = ({ token }: { token: string }) => {
  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: ResetPasswordInput) => {
    setLoading(true);
    try {
      await resetPassword(token, data);
      setResetPasswordSuccess(true);
      toast.success("Password reset successful");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
      console.error("Error resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const resetForm = () => {
    setResetPasswordSuccess(false);
    form.reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-md">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-2">
            Reset Your Password
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Enter your new password below
          </p>
          {/* Show success or form */}
          {resetPasswordSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-green-100 border border-green-300 text-green-700 px-6 py-4 rounded-xl shadow-md text-lg font-medium flex items-center justify-center space-x-2 flex-col"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <span>Password has been reset! You can now log in.</span>
              <Button
                onClick={handleLoginClick}
                className="mt-6 px-6 py-2 bg-green-500/20 text-green-500 font-semibold rounded-full shadow-md hover:bg-green-600/20 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Go to Login
              </Button>
              {/* Optional: Button to reset the form for another password reset */}
              <Button
                onClick={resetForm}
                className="mt-2 px-6 py-2 bg-gray-500/20 text-gray-500 font-semibold rounded-full"
              >
                Reset Again
              </Button>
            </motion.div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* New Password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="New password"
                            className="pr-10"
                          />
                          <div
                            className="absolute right-2 top-2.5 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className="pr-10"
                          />
                          <div
                            className="absolute right-2 top-2.5 cursor-pointer text-gray-500"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full font-bold bg-violet-500 hover:bg-violet-600"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
