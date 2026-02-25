"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react";
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
    <div className="flex justify-center items-center min-h-screen bg-slate-50/50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-primary/10 shadow-xl overflow-hidden">
          <div className="h-2 bg-primary w-full" />
          <CardContent className="pt-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-foreground tracking-tight italic mb-3">Reset Password</h2>
              <p className="text-muted-foreground text-base font-medium">
                Enter your new password below to secure your account.
              </p>
            </div>
            {/* Show success or form */}
            {resetPasswordSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-foreground tracking-tight italic mb-4">Password Reset!</h3>
                <p className="text-muted-foreground text-base font-medium mb-8 leading-relaxed">
                  Your password has been successfully reset. You can now use your new password to log in.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={handleLoginClick}
                    className="w-full h-11 text-base font-bold shadow-lg"
                  >
                    Go to Login
                  </Button>
                  <Button
                    onClick={resetForm}
                    variant="ghost"
                    className="w-full font-bold text-muted-foreground"
                  >
                    Reset Again
                  </Button>
                </div>
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
                        <FormLabel className="font-bold text-foreground/80">New Password</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 pr-10 h-11 border-secondary focus:border-primary/30"
                            />
                            <div
                              className="absolute right-3 top-3.5 cursor-pointer text-muted-foreground hover:text-primary transition-colors"
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
                        <FormLabel className="font-bold text-foreground/80">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 pr-10 h-11 border-secondary focus:border-primary/30"
                            />
                            <div
                              className="absolute right-3 top-3.5 cursor-pointer text-muted-foreground hover:text-primary transition-colors"
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
                    className="w-full h-11 text-base font-bold shadow-lg mt-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        Resetting...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResetPasswordForm;
