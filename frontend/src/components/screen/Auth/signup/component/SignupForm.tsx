"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { User, Mail, Lock, EyeOff, Eye, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import signupFormSchema from "./validation/signupFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerUser } from "../../../../services/auth.service"
import { z } from "zod"
import Link from "next/link"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

type SignupInput = z.infer<typeof signupFormSchema>

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
      role: "user",
    },
  })

  const onSubmit = async (data: SignupInput) => {
    console.log("the signup date is here ", data)
    try {
      setLoading(true)


      const response = await registerUser(data)

      if (response) {
        toast.success("Registration successful! Redirecting to login...");
        router.push("/login")
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false)
    }
  }

  const roles = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ]

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
          <CardHeader className="pt-8 text-center">
            <CardTitle className="font-black text-foreground text-3xl tracking-tight italic">
              Create your account
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base font-medium mt-2">
              Join CareerView to find your dream job
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-foreground/80">Full Name</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          {form.watch("role") === "admin" ? (
                            <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          ) : (
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          )}
                          <Input placeholder="John Doe" className="pl-10 h-11 border-secondary focus:border-primary/30" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-foreground/80">Email</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input placeholder="your-email@example.com" className="pl-10 h-11 border-secondary focus:border-primary/30" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-foreground/80">Password</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10 h-11 border-secondary focus:border-primary/30" {...field} />
                          <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 cursor-pointer text-muted-foreground hover:text-primary transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
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
                          <Input type="password" placeholder="••••••••" className="pl-10 h-11 border-secondary focus:border-primary/30" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role (Radio Group) */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-bold text-foreground/80">Register as</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex gap-4"
                        >
                          {roles.map((role) => (
                            <FormItem key={role.value} className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl border-2 transition-all cursor-pointer ${field.value === role.value
                              ? "bg-primary/5 border-primary text-primary shadow-sm"
                              : "bg-background border-secondary text-muted-foreground hover:border-primary/20"
                              }`}>
                              <FormControl>
                                <RadioGroupItem value={role.value} className="sr-only" />
                              </FormControl>
                              <FormLabel className="font-bold cursor-pointer">{role.label}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Terms and Conditions */}
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-3 space-y-0 pt-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                      </FormControl>
                      <FormLabel className="text-sm font-medium leading-tight">
                        I agree to the <span className="text-primary hover:underline cursor-pointer font-bold">Terms of Service</span> and{" "}
                        <span className="text-primary hover:underline cursor-pointer font-bold">Privacy Policy</span>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full h-11 text-base font-bold shadow-lg" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>

                <p className="text-center text-sm font-medium pt-2">
                  Already have an account?{" "}
                  <Link href={"/login"} className="text-primary font-bold hover:underline">
                    Sign in
                  </Link>
                </p>

              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default SignupForm
