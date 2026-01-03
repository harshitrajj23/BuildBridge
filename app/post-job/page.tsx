"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PageTransition } from "@/components/common/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockSkills } from "@/mocks/data"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  budget: z.number().min(100, "Budget must be at least $100"),
  duration: z.enum(["1-2 weeks", "1-4 weeks", "1-3 months", "3+ months"]),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  deadline: z.string(),
})

type FormData = z.infer<typeof formSchema>

export default function PostJobPage() {
  const [step, setStep] = useState(1)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  })

  const budget = watch("budget")
  const duration = watch("duration")

  const handleSkillToggle = (skillName: string) => {
    setSelectedSkills((prev) => (prev.includes(skillName) ? prev.filter((s) => s !== skillName) : [...prev, skillName]))
    setValue(
      "skills",
      selectedSkills.includes(skillName)
        ? selectedSkills.filter((s) => s !== skillName)
        : [...selectedSkills, skillName],
    )
  }

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data)
    setSubmitted(true)
    setTimeout(() => setStep(1), 2000)
  }

  const steps = [
    { number: 1, title: "Job Details" },
    { number: 2, title: "Requirements" },
    { number: 3, title: "Timeline & Budget" },
    { number: 4, title: "Review" },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background to-background/95 py-8 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Steps Indicator */}
          <motion.div className="mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between">
              {steps.map((s, idx) => (
                <motion.div
                  key={s.number}
                  className="flex items-center flex-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step > s.number
                        ? "bg-primary text-primary-foreground"
                        : step === s.number
                          ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${step > s.number ? "bg-primary" : "bg-muted"}`}
                    />
                  )}
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {steps.map((s) => (
                <p key={s.number} className="text-xs text-center text-muted-foreground">
                  {s.title}
                </p>
              ))}
            </div>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {/* Step 1: Job Details */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Tell us about your job</CardTitle>
                      <CardDescription>Provide a clear title and description for your project</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Senior React Developer Needed"
                          {...register("title")}
                          className="mt-2"
                        />
                        {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your project in detail..."
                          className="mt-2 min-h-32"
                          {...register("description")}
                        />
                        {errors.description && (
                          <p className="text-xs text-destructive mt-1">{errors.description.message}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Requirements */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Required Skills</CardTitle>
                      <CardDescription>Select the skills needed for this job</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {mockSkills.map((skill) => (
                          <motion.button
                            key={skill.id}
                            type="button"
                            onClick={() => handleSkillToggle(skill.name)}
                            className={`px-3 py-2 rounded-full text-sm transition-all ${
                              selectedSkills.includes(skill.name)
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {skill.name}
                          </motion.button>
                        ))}
                      </div>
                      {errors.skills && <p className="text-xs text-destructive mt-3">{errors.skills.message}</p>}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Timeline & Budget */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Timeline & Budget</CardTitle>
                      <CardDescription>Set your project timeline and budget</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="duration">Project Duration</Label>
                        <Select {...register("duration")}>
                          <SelectTrigger id="duration" className="mt-2">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                            <SelectItem value="1-4 weeks">1-4 weeks</SelectItem>
                            <SelectItem value="1-3 months">1-3 months</SelectItem>
                            <SelectItem value="3+ months">3+ months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="budget">Budget (USD)</Label>
                        <div className="relative mt-2">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="budget"
                            type="number"
                            placeholder="5000"
                            className="pl-7"
                            {...register("budget", { valueAsNumber: true })}
                          />
                        </div>
                        {errors.budget && <p className="text-xs text-destructive mt-1">{errors.budget.message}</p>}
                      </div>

                      <div>
                        <Label htmlFor="deadline">Application Deadline</Label>
                        <Input id="deadline" type="date" className="mt-2" {...register("deadline")} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Your Job Post</CardTitle>
                      <CardDescription>Make sure everything looks correct</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4 p-4 bg-muted rounded-lg">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase">Title</p>
                          <p className="text-lg font-semibold">{watch("title")}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase">Description</p>
                          <p className="text-sm">{watch("description")}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Budget</p>
                            <p className="text-sm font-bold text-primary">${watch("budget")}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Duration</p>
                            <p className="text-sm">{watch("duration")}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Skills</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedSkills.map((s) => (
                                <Badge key={s} variant="secondary" className="text-xs">
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Success State */}
              {submitted && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="text-center py-12">
                    <CardContent className="space-y-4">
                      <div className="flex justify-center">
                        <motion.div
                          className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          <Check className="w-8 h-8 text-green-600" />
                        </motion.div>
                      </div>
                      <h2 className="text-2xl font-bold">Job Posted Successfully!</h2>
                      <p className="text-muted-foreground">Your job is now live and visible to freelancers.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {!submitted && (
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="space-x-3">
                  {step === 4 ? (
                    <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                      <Check className="w-4 h-4 mr-2" />
                      Post Job
                    </Button>
                  ) : (
                    <Button type="button" onClick={() => setStep(step + 1)}>
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </PageTransition>
  )
}
