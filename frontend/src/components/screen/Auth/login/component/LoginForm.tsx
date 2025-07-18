"use client"
import React, { useState } from "react"
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

type LoginInput = z.infer<typeof loginSchema>

const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

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
            const role = response?.data?.role;

            if (role === "user") {
                toast.success("User logged in successfully !");
                router.push("/student/Home");
            } else if (role === "admin") {
                toast.success("Admin logged in successfully");
                router.push("/admin/Home");
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
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md p-6 shadow-md">
                <CardContent>
                    <h2 className="text-2xl font-bold text-center mb-2">Welcome back</h2>
                    <p className="text-center text-sm text-gray-600 mb-6">
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
                                className="text-sm text-right text-violet-600 hover:underline cursor-pointer">
                                Forgot your password?
                            </div>

                            <Button type="submit" className="w-full bg-violet-500 hover:bg-violet-600" disabled={loading}>
                                {loading ? "Signing in..." : "Sign in"}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 mt-2">
                            Click a button to quickly log in with preset credentials
                        </p>
                        <p className="mt-4 text-sm">
                            Don&apos;t have an account?{" "}
                            <button
                                disabled={loading}
                                onClick={() => router.push("/signup")}
                                className="text-violet-600 hover:underline cursor-pointer">
                                {loading ? "Signing in..." : "Sign up"}
                            </button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm
