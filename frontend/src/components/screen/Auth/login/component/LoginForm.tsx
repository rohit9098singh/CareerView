"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import loginSchema from "./validation/LoginSchema"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { loginUser } from "@/components/services/auth.service"
import toast from "react-hot-toast"
import { useAuth } from "@/context/AuthContext"

type LoginInput = z.infer<typeof loginSchema>

const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const { login: loginContext } = useAuth()

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: LoginInput) => {
        try {
            setLoading(true);
            const response = await loginUser(data);
            const { token, role, name, email } = response.data;

            if (role === "user" || role === "admin") {
                // Update AuthContext state
                loginContext(token, { name, email, role });

                // Show success message
                toast.success(`${role === 'user' ? 'User' : 'Admin'} logged in successfully!`);

                // Small delay to ensure state is updated, then navigate
                setTimeout(() => {
                    // Use window.location for full page reload to ensure all components see updated auth state
                    window.location.href = role === 'user' ? "/student/Home" : "/admin/Home";
                }, 100);
            } else {
                toast.error("Invalid role");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-secondary/50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="shadow-lg border-primary/5">
                    <CardContent className="pt-6">
                        <h2 className="text-3xl font-extrabold text-center tracking-tight text-foreground mb-2">Welcome back</h2>
                        <p className="text-center text-sm text-muted-foreground mb-8">
                            Enter your credentials to access your account
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

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        {...field}
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        className="pl-8 pr-8"
                                                    />
                                                    <div
                                                        className="absolute right-2 top-2.5 cursor-pointer"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-gray-400" />
                                                        )}
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div
                                    onClick={() => router.push("/forgotPassword")}
                                    className="text-sm text-right text-primary hover:text-primary/80 font-medium transition-colors cursor-pointer">
                                    Forgot your password?
                                </div>

                                <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={loading}>
                                    {loading ? "Signing in..." : "Sign in"}
                                </Button>
                            </form>
                        </Form>

                        <div className="mt-8 text-center">
                            <p className="text-xs text-muted-foreground mt-2">
                                Click a button to quickly log in with preset credentials
                            </p>
                            <p className="mt-6 text-sm text-muted-foreground">
                                Don&apos;t have an account?{" "}
                                <button
                                    disabled={loading}
                                    onClick={() => router.push("/signup")}
                                    className="text-primary hover:text-primary/80 font-bold transition-colors cursor-pointer disabled:opacity-50">
                                    {loading ? "Signing in..." : "Sign up"}
                                </button>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default LoginForm
