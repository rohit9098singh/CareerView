"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, CheckCircle, Loader2, ArrowLeft } from "lucide-react";
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

      await forgotPassword(data.email);
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
            {!success ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-foreground tracking-tight italic mb-3">Forgot password?</h2>
                  <p className="text-muted-foreground text-base font-medium">
                    Enter your email and we&apos;ll send you a link to reset your password.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-foreground/80">Email Address</FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                              <Input
                                {...field}
                                type="email"
                                placeholder="name@company.com"
                                className="pl-10 h-11 border-secondary focus:border-primary/30"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full h-11 text-base font-bold shadow-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-4 w-4" />
                          Sending...
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="mt-8 text-center">
                  <div
                    onClick={() => router.push("/login")}
                    className="inline-flex items-center gap-2 text-primary font-bold hover:underline cursor-pointer transition-all"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Sign in</span>
                  </div>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-foreground tracking-tight italic mb-4">Reset Link Sent</h3>
                <p className="text-muted-foreground text-base font-medium mb-8 leading-relaxed">
                  We&apos;ve sent a password reset link to your email. Please check your inbox and follow the instructions.
                </p>
                <Button
                  onClick={handleBackToForm}
                  variant="outline"
                  className="w-full h-11 font-bold border-secondary hover:bg-secondary/20"
                >
                  Send Another Link
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordForm;
