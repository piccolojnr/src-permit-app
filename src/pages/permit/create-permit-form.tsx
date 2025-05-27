"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { AlertCircle, CalendarIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "@/components/hooks/use-toast"
import { useAuth } from "@/components/lib/auth/auth.context"
import { cn } from "@/components/lib/utils"
import { Alert, AlertDescription } from "@/components/shadcn/ui/alert"
import { Button } from "@/components/shadcn/ui/button"
import { Calendar } from "@/components/shadcn/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/ui/form"
import { Input } from "@/components/shadcn/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/ui/popover"

// Form validation schema
const formSchema = z.object({
    studentId: z.string().min(1, "Student ID is required").regex(/^\d+$/, "Student ID must contain only numbers"),
    amountPaid: z
        .string()
        .min(1, "Amount is required")
        .refine(val => {
            const num = Number.parseFloat(val)
            return !isNaN(num) && num > 0
        }, "Amount must be greater than $0"),
    expiryDate: z
        .date({
            required_error: "Expiry date is required"
        })
        .refine(date => {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            return date >= today
        }, "Expiry date cannot be in the past")
})

type FormValues = z.infer<typeof formSchema>

interface CreatePermitFormProps {
    setIsDialogOpen: (isOpen: boolean) => void
    onSuccess: () => void
    studentId?: string
}

// Mock user context - replace with your actual auth context

// Get tomorrow's date as default
const getTomorrowDate = (): Date => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
}

export default function CreatePermitForm({ setIsDialogOpen, onSuccess, studentId }: CreatePermitFormProps) {
    const { user } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentId: studentId || "",
            amountPaid: "",
            expiryDate: getTomorrowDate()
        }
    })

    const onSubmit = async (values: FormValues) => {
        if (!user?.id) {
            toast({
                title: "Authentication Error",
                description: "You must be logged in to create a permit",
                variant: "destructive"
            })
            return
        }

        setIsSubmitting(true)

        try {
            // Simulate API call - replace with your actual API
            const createPermitData = {
                studentId: values.studentId,
                amountPaid: Number.parseFloat(values.amountPaid),
                expiryDate: values.expiryDate,
                issuedById: user.id
            }

            // Mock API call
            const response = await window.api.permit.create(createPermitData)

            // Simulate random success/failure for demo

            if (response.success) {
                toast({
                    title: "Success",
                    description: "Permit created successfully"
                })

                form.reset({
                    studentId: "",
                    amountPaid: "",
                    expiryDate: getTomorrowDate()
                })

                setIsDialogOpen(false)
                onSuccess()
            } else {
                throw new Error("Failed to create permit")
            }
        } catch (error) {
            console.error("Error creating permit:", error)

            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to create permit. Please try again.",
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const hasErrors = Object.keys(form.formState.errors).length > 0

    return (
        <div className="space-y-6">
            {hasErrors && (
                <Alert variant="destructive">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>Please correct the errors below before submitting.</AlertDescription>
                </Alert>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        {/* Student ID Field */}
                        <FormField
                            control={form.control}
                            name="studentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Student ID *</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter student ID" disabled={!!studentId || isSubmitting} {...field} />
                                    </FormControl>
                                    <FormDescription>{studentId ? "Student ID is pre-filled" : "Enter the student's unique ID number"}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Amount Paid Field */}
                        <FormField
                            control={form.control}
                            name="amountPaid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount Paid ($) *</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" min="0.01" placeholder="0.00" disabled={isSubmitting} {...field} />
                                    </FormControl>
                                    <FormDescription>Enter the amount paid for the permit</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Expiry Date Field */}
                        <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Expiry Date *</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                                    disabled={isSubmitting}
                                                >
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                    <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={date => {
                                                    const today = new Date()
                                                    today.setHours(0, 0, 0, 0)
                                                    return date < today
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>Select when the permit will expire</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-end pt-4 space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Permit"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
