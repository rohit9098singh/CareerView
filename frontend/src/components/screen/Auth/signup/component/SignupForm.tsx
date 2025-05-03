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
import {registerUser} from "../../../../services/auth.service"
import {z} from "zod"
import Link from "next/link"
import toast from "react-hot-toast"

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
    console.log("the signup date is here ",data)
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-md">
        <CardHeader>
          <CardTitle className="font-bold text-black text-3xl text-center">Create your account</CardTitle>
          <CardDescription className="text-gray-500 text-sm text-center">
            Join JobVista to find your dream job
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        {form.watch("role") === "admin" ? (
                          <Shield className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                        ) : (
                          <User className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                        )}
                        <Input placeholder="John Doe" className="pl-8" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="your-email@example.com" className="pl-8" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                        <Input type={showPassword ? "text" : "password"} placeholder="********" className="pl-8" {...field} />
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-2.5 cursor-pointer"
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

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                        <Input type="password" placeholder="********" className="pl-8" {...field} />
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
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex gap-4"
                      >
                        {roles.map((role) => (
                          <FormItem key={role.value} className="flex items-center space-x-2 px-8 py-2 bg-purple-500 hover:bg-purple-600 rounded-md">
                            <FormControl>
                              <RadioGroupItem value={role.value} />
                            </FormControl>
                            <FormLabel className="font-normal">{role.label}</FormLabel>
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
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      I agree to the <span className="text-blue-600 underline">terms of service</span> and{" "}
                      <span className="text-blue-600 underline">privacy policy</span>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              {/* Login Link */}
              <p className="text-center text-sm mt-2">
                Already have an account?{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  <Link href={"/login"}>Sign in</Link>
                </span>
              </p>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignupForm
