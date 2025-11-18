"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormData {
  // Personal Info
  applicantName: string
  email: string
  phone: string
  alternateEmail: string
  address: string
  city: string
  state: string
  country: string
  zipCode: string

  // Academic Info
  department: string
  faculty: string
  university: string
  level: string
  semester: string
  cgpa: string
  expectedGraduation: string

  // Research Interests
  researchInterests: Array<{ area: string; description: string }>

  // Skills
  skills: Array<{ category: string; name: string; proficiency: string }>

  // Education
  education: Array<{
    degree: string
    field: string
    institution: string
    startYear: string
    endYear: string
    grade: string
  }>

  // Publications
  publications: Array<{
    title: string
    authors: string
    venue: string
    year: string
    publicationType: string
    url: string
  }>

  // Projects
  projects: Array<{
    title: string
    role: string
    organization: string
    startDate: string
    endDate: string
    description: string
    technologies: string
    url: string
  }>

  // Social Media
  linkedin: string
  github: string
  googleScholar: string
  researchGate: string
  website: string

  // Resume
  resumeLink: string

  // Statement of Purpose
  statementOfPurpose: string

  // Availability
  startDate: string
  hoursPerWeek: string
  duration: string

  // References
  references: Array<{
    name: string
    designation: string
    organization: string
    email: string
    phone: string
    relationship: string
  }>
}

const createInitialFormState = (): FormData => ({
  applicantName: "",
  email: "",
  phone: "",
  alternateEmail: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  department: "",
  faculty: "",
  university: "",
  level: "",
  semester: "",
  cgpa: "",
  expectedGraduation: "",
  researchInterests: [{ area: "", description: "" }],
  skills: [{ category: "", name: "", proficiency: "" }],
  education: [],
  publications: [],
  projects: [],
  linkedin: "",
  github: "",
  googleScholar: "",
  researchGate: "",
  website: "",
  resumeLink: "",
  statementOfPurpose: "",
  startDate: "",
  hoursPerWeek: "",
  duration: "",
  references: [{
    name: "",
    designation: "",
    organization: "",
    email: "",
    phone: "",
    relationship: "",
  }],
})

export default function RecruitmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const formRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<FormData>(createInitialFormState())

  const totalSteps = 6

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleArrayChange = (
    field: keyof FormData,
    index: number,
    key: string,
    value: string
  ) => {
    setFormData((prev) => {
      const array = prev[field] as any[]
      const newArray = [...array]
      newArray[index] = { ...newArray[index], [key]: value }
      return { ...prev, [field]: newArray }
    })
  }

  const addArrayItem = (field: keyof FormData, template: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as any[]), template],
    }))
  }

  const removeArrayItem = (field: keyof FormData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    console.log('handleSubmit called, currentStep:', currentStep, 'isSubmitting:', isSubmitting)
    
    // Prevent multiple simultaneous submissions
    if (isSubmitting) {
      console.log('Already submitting, bailing out')
      return
    }
    // Bail out if we somehow receive a submit event before the final step.
    if (currentStep !== totalSteps) {
      console.log('Not on final step, bailing out. CurrentStep:', currentStep, 'totalSteps:', totalSteps)
      return
    }

    // Basic field validations before attempting submission.
    if (!formData.applicantName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitMessage("Please complete your personal information (name, email, phone) before submitting.")
      return
    }

    if (!formData.university.trim() || !formData.department.trim() || !formData.level.trim()) {
      setSubmitMessage("Please complete the academic information section before submitting.")
      return
    }

    const filteredResearchInterests = formData.researchInterests
      .filter((item) => item.area.trim() || item.description.trim())
      .map((item) => ({
        area: item.area.trim(),
        description: item.description.trim(),
      }))

    if (filteredResearchInterests.length === 0) {
      setSubmitMessage("Please provide at least one research interest.")
      return
    }

    if (!formData.statementOfPurpose.trim()) {
      setSubmitMessage("Tell us about your motivation in the statement of purpose section.")
      return
    }

    if (!formData.resumeLink.trim()) {
      setSubmitMessage("Please provide a link to your resume or CV before submitting.")
      return
    }

    const parseNumber = (value: string) => {
      const parsed = Number(value)
      return Number.isNaN(parsed) ? undefined : parsed
    }

    const formatEducation = formData.education
      .filter((item) => item.degree.trim() || item.field.trim() || item.institution.trim())
      .map((item) => ({
        degree: item.degree.trim(),
        field: item.field.trim(),
        institution: item.institution.trim(),
        startYear: item.startYear ? parseNumber(item.startYear) : undefined,
        endYear: item.endYear ? parseNumber(item.endYear) : undefined,
        grade: item.grade.trim(),
      }))

    const formatSkills = formData.skills
      .filter((item) => item.name.trim())
      .map((item) => ({
        category: item.category || "other",
        name: item.name.trim(),
        proficiency: item.proficiency || undefined,
      }))

    const formatPublications = formData.publications
      .filter((item) => item.title.trim())
      .map((item) => ({
        title: item.title.trim(),
        authors: item.authors.trim(),
        venue: item.venue.trim(),
        year: item.year ? parseNumber(item.year) : undefined,
        publicationType: item.publicationType || undefined,
        url: item.url.trim(),
      }))

    const formatProjects = formData.projects
      .filter((item) => item.title.trim())
      .map((item) => ({
        title: item.title.trim(),
        role: item.role.trim(),
        organization: item.organization.trim(),
        startDate: item.startDate || undefined,
        endDate: item.endDate || undefined,
        description: item.description.trim(),
        technologies: item.technologies.trim(),
        url: item.url.trim(),
      }))

    const formatReferences = formData.references
      .filter((item) => item.name.trim() || item.email.trim())
      .map((item) => ({
        name: item.name.trim(),
        designation: item.designation.trim(),
        organization: item.organization.trim(),
        email: item.email.trim(),
        phone: item.phone.trim(),
        relationship: item.relationship.trim(),
      }))

    const payloadBody = {
      personalInfo: {
        applicantName: formData.applicantName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        alternateEmail: formData.alternateEmail.trim() || undefined,
        address: formData.address.trim() || undefined,
        city: formData.city.trim() || undefined,
        state: formData.state.trim() || undefined,
        country: formData.country.trim() || undefined,
        zipCode: formData.zipCode.trim() || undefined,
      },
      academicInfo: {
        department: formData.department,
        faculty: formData.faculty.trim() || undefined,
        university: formData.university.trim(),
        level: formData.level,
        semester: formData.semester ? parseNumber(formData.semester) : undefined,
        cgpa: formData.cgpa ? Number(formData.cgpa) : undefined,
        expectedGraduation: formData.expectedGraduation || undefined,
      },
      researchInterests: filteredResearchInterests,
      skills: formatSkills,
      education: formatEducation,
      publications: formatPublications,
      projects: formatProjects,
      socialMedia: {
        linkedin: formData.linkedin.trim() || undefined,
        github: formData.github.trim() || undefined,
        googleScholar: formData.googleScholar.trim() || undefined,
        researchGate: formData.researchGate.trim() || undefined,
        website: formData.website.trim() || undefined,
      },
      resume: {
        resumeLink: formData.resumeLink.trim(),
      },
      statementOfPurpose: formData.statementOfPurpose.trim(),
      availability: {
        startDate: formData.startDate || undefined,
        hoursPerWeek: formData.hoursPerWeek ? parseNumber(formData.hoursPerWeek) : undefined,
        duration: formData.duration || undefined,
      },
      references: formatReferences,
    }

    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch('/api/recruitment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadBody),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || 'Failed to submit the application. Please try again.')
      }

      setSubmitMessage("Application submitted successfully! We'll review your application and get back to you soon.")
      setFormData(createInitialFormState())
      setCurrentStep(1)
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch (error) {
      console.error('Recruitment submission error:', error)
      setSubmitMessage(error instanceof Error ? error.message : 'Failed to submit the application. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    console.log('nextStep called, currentStep:', currentStep, 'totalSteps:', totalSteps)
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleFormKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter' && (event.target as HTMLElement).tagName !== 'TEXTAREA') {
      event.preventDefault()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Join Our Research Team
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're always looking for passionate researchers and students. Fill out the application
              form below to join our laboratory.
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex w-full items-center mb-2">
              {[1, 2, 3, 4, 5, 6].map((step, index) => (
                <>
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        currentStep >= step
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step}
                    </div>
                  </div>
                  {step < 6 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition-colors ${
                        currentStep > step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </>
              ))}
            </div>
            <div className="flex w-full justify-between text-xs text-muted-foreground mt-2">
              <span>Personal</span>
              <span>Academic</span>
              <span>Research</span>
              <span>Experience</span>
              <span>Links</span>
              <span>Final</span>
            </div>
          </div>

          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${
                submitMessage.includes("success")
                  ? "bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400"
                  : "bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
              }`}
            >
              {submitMessage}
            </motion.div>
          )}

          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-lg"
          >
            <form onKeyDown={handleFormKeyDown}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="applicantName">Full Name *</Label>
                      <Input
                        id="applicantName"
                        name="applicantName"
                        value={formData.applicantName}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="alternateEmail">Alternate Email</Label>
                      <Input
                        id="alternateEmail"
                        name="alternateEmail"
                        type="email"
                        value={formData.alternateEmail}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="zipCode">Zip/Postal Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Academic Information</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="university">University/Institution *</Label>
                      <Input
                        id="university"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="department">Department *</Label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select Department</option>
                        <option value="cse">Computer Science & Engineering</option>
                        <option value="eee">Electrical & Electronics Engineering</option>
                        <option value="me">Mechanical Engineering</option>
                        <option value="ce">Civil Engineering</option>
                        <option value="ece">Electronics & Communication Engineering</option>
                        <option value="it">Information Technology</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="faculty">Faculty/College</Label>
                      <Input
                        id="faculty"
                        name="faculty"
                        value={formData.faculty}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="level">Academic Level *</Label>
                      <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select Level</option>
                        <option value="undergraduate">Undergraduate (Bachelor)</option>
                        <option value="graduate">Graduate (Master)</option>
                        <option value="phd">PhD</option>
                        <option value="postdoc">Postdoctoral</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="semester">Current Semester/Year</Label>
                      <Input
                        id="semester"
                        name="semester"
                        type="number"
                        value={formData.semester}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cgpa">CGPA/GPA</Label>
                      <Input
                        id="cgpa"
                        name="cgpa"
                        type="number"
                        step="0.01"
                        value={formData.cgpa}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="expectedGraduation">Expected Graduation</Label>
                      <Input
                        id="expectedGraduation"
                        name="expectedGraduation"
                        type="date"
                        value={formData.expectedGraduation}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Research Interests & Skills */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Research Interests & Skills
                  </h2>

                  {/* Research Interests */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label>Research Interests *</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          addArrayItem("researchInterests", { area: "", description: "" })
                        }
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Interest
                      </Button>
                    </div>
                    {formData.researchInterests.map((interest, index) => (
                      <div key={index} className="mb-4 p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <Label>Interest {index + 1}</Label>
                          {formData.researchInterests.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayItem("researchInterests", index)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                        <Input
                          placeholder="Area (e.g., Machine Learning, IoT)"
                          value={interest.area}
                          onChange={(e) =>
                            handleArrayChange("researchInterests", index, "area", e.target.value)
                          }
                          required
                          className="mb-2"
                        />
                        <textarea
                          placeholder="Brief description of your interest"
                          value={interest.description}
                          onChange={(e) =>
                            handleArrayChange(
                              "researchInterests",
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows={2}
                          className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label>Skills</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          addArrayItem("skills", { category: "", name: "", proficiency: "" })
                        }
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Skill
                      </Button>
                    </div>
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="mb-4 p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <Label>Skill {index + 1}</Label>
                          {formData.skills.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayItem("skills", index)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                        <div className="grid md:grid-cols-3 gap-2">
                          <select
                            value={skill.category}
                            onChange={(e) =>
                              handleArrayChange("skills", index, "category", e.target.value)
                            }
                            className="px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Category</option>
                            <option value="programming">Programming</option>
                            <option value="frameworks">Frameworks</option>
                            <option value="tools">Tools</option>
                            <option value="research">Research</option>
                            <option value="soft_skills">Soft Skills</option>
                          </select>
                          <Input
                            placeholder="Skill name"
                            value={skill.name}
                            onChange={(e) =>
                              handleArrayChange("skills", index, "name", e.target.value)
                            }
                          />
                          <select
                            value={skill.proficiency}
                            onChange={(e) =>
                              handleArrayChange("skills", index, "proficiency", e.target.value)
                            }
                            className="px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Proficiency</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Statement of Purpose */}
                  <div>
                    <Label htmlFor="statementOfPurpose">Statement of Purpose *</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Why do you want to join this lab? What are your research goals?
                    </p>
                    <textarea
                      id="statementOfPurpose"
                      name="statementOfPurpose"
                      value={formData.statementOfPurpose}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Experience (Education, Publications, Projects) */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Experience & Achievements
                  </h2>

                  {/* Publications */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label>Publications (if any)</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          addArrayItem("publications", {
                            title: "",
                            authors: "",
                            venue: "",
                            year: "",
                            publicationType: "",
                            url: "",
                          })
                        }
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Publication
                      </Button>
                    </div>
                    {formData.publications.map((pub, index) => (
                      <div key={index} className="mb-4 p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <Label>Publication {index + 1}</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem("publications", index)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            placeholder="Title"
                            value={pub.title}
                            onChange={(e) =>
                              handleArrayChange("publications", index, "title", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Authors (comma-separated)"
                            value={pub.authors}
                            onChange={(e) =>
                              handleArrayChange("publications", index, "authors", e.target.value)
                            }
                          />
                          <div className="grid md:grid-cols-2 gap-2">
                            <Input
                              placeholder="Venue/Journal"
                              value={pub.venue}
                              onChange={(e) =>
                                handleArrayChange("publications", index, "venue", e.target.value)
                              }
                            />
                            <Input
                              placeholder="Year"
                              type="number"
                              value={pub.year}
                              onChange={(e) =>
                                handleArrayChange("publications", index, "year", e.target.value)
                              }
                            />
                          </div>
                          <Input
                            placeholder="URL/DOI"
                            value={pub.url}
                            onChange={(e) =>
                              handleArrayChange("publications", index, "url", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Projects */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label>Projects/Experience</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          addArrayItem("projects", {
                            title: "",
                            role: "",
                            organization: "",
                            startDate: "",
                            endDate: "",
                            description: "",
                            technologies: "",
                            url: "",
                          })
                        }
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Project
                      </Button>
                    </div>
                    {formData.projects.map((project, index) => (
                      <div key={index} className="mb-4 p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <Label>Project {index + 1}</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem("projects", index)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            placeholder="Project Title"
                            value={project.title}
                            onChange={(e) =>
                              handleArrayChange("projects", index, "title", e.target.value)
                            }
                          />
                          <div className="grid md:grid-cols-2 gap-2">
                            <Input
                              placeholder="Your Role"
                              value={project.role}
                              onChange={(e) =>
                                handleArrayChange("projects", index, "role", e.target.value)
                              }
                            />
                            <Input
                              placeholder="Organization"
                              value={project.organization}
                              onChange={(e) =>
                                handleArrayChange(
                                  "projects",
                                  index,
                                  "organization",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <textarea
                            placeholder="Description"
                            value={project.description}
                            onChange={(e) =>
                              handleArrayChange("projects", index, "description", e.target.value)
                            }
                            rows={3}
                            className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                          <Input
                            placeholder="Technologies used (comma-separated)"
                            value={project.technologies}
                            onChange={(e) =>
                              handleArrayChange("projects", index, "technologies", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Project URL/GitHub"
                            value={project.url}
                            onChange={(e) =>
                              handleArrayChange("projects", index, "url", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Links & Resume */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Professional Links & Resume
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="github">GitHub Profile</Label>
                      <Input
                        id="github"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder="https://github.com/yourusername"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="googleScholar">Google Scholar</Label>
                      <Input
                        id="googleScholar"
                        name="googleScholar"
                        value={formData.googleScholar}
                        onChange={handleChange}
                        placeholder="https://scholar.google.com/..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="researchGate">ResearchGate</Label>
                      <Input
                        id="researchGate"
                        name="researchGate"
                        value={formData.researchGate}
                        onChange={handleChange}
                        placeholder="https://researchgate.net/..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Personal Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="resumeLink">Resume/CV Link *</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Provide a link to your resume (Google Drive, Dropbox, personal website, etc.)
                    </p>
                    <Input
                      id="resumeLink"
                      name="resumeLink"
                      value={formData.resumeLink}
                      onChange={handleChange}
                      required
                      placeholder="https://drive.google.com/..."
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {/* Step 6: Availability & References */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Availability & References
                  </h2>

                  {/* Availability */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="startDate">Available Start Date</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="hoursPerWeek">Hours Per Week</Label>
                      <Input
                        id="hoursPerWeek"
                        name="hoursPerWeek"
                        type="number"
                        value={formData.hoursPerWeek}
                        onChange={handleChange}
                        placeholder="e.g., 20"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="duration">Expected Duration</Label>
                      <select
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select duration</option>
                        <option value="3-6">3-6 months</option>
                        <option value="6-12">6-12 months</option>
                        <option value="1-2">1-2 years</option>
                        <option value="2+">2+ years</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  {/* References */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label>Academic/Professional References</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          addArrayItem("references", {
                            name: "",
                            designation: "",
                            organization: "",
                            email: "",
                            phone: "",
                            relationship: "",
                          })
                        }
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Reference
                      </Button>
                    </div>
                    {formData.references.map((ref, index) => (
                      <div key={index} className="mb-4 p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <Label>Reference {index + 1}</Label>
                          {formData.references.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayItem("references", index)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-2">
                          <Input
                            placeholder="Name"
                            value={ref.name}
                            onChange={(e) =>
                              handleArrayChange("references", index, "name", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Designation"
                            value={ref.designation}
                            onChange={(e) =>
                              handleArrayChange("references", index, "designation", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Organization"
                            value={ref.organization}
                            onChange={(e) =>
                              handleArrayChange("references", index, "organization", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Email"
                            type="email"
                            value={ref.email}
                            onChange={(e) =>
                              handleArrayChange("references", index, "email", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Phone"
                            value={ref.phone}
                            onChange={(e) =>
                              handleArrayChange("references", index, "phone", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Relationship (e.g., thesis advisor)"
                            value={ref.relationship}
                            onChange={(e) =>
                              handleArrayChange("references", index, "relationship", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 p-6 bg-muted/50 rounded-2xl border border-border"
          >
            <h3 className="text-xl font-semibold text-foreground mb-3">What to Expect</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>We review all applications within 2-3 weeks</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Shortlisted candidates will be contacted for an interview</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Interview process includes technical discussion and project presentation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Selected candidates will receive detailed onboarding information</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
