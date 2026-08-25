"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { CheckCircle, ChevronRight, ChevronLeft, User, GraduationCap, FlaskConical, FileText, Loader2 } from "lucide-react";
import { createDoc, COLLECTIONS } from "@/lib/firestore";

const steps = [
  { id: 0, icon: User, label: "Personal Info" },
  { id: 1, icon: GraduationCap, label: "Academic Background" },
  { id: 2, icon: FlaskConical, label: "Research Interests" },
  { id: 3, icon: FileText, label: "Statement" },
];

export default function RecruitmentPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", university: "",
    degree: "", cgpa: "", batch: "",
    researchTrack: "", interests: "", experience: "",
    sop: "", proposalTitle: "", proposalDesc: "",
  });

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await createDoc(COLLECTIONS.recruitment, {
        ...form,
        status: "pending",
        submittedAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong submitting your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-white/30 text-sm focus:outline-none focus:border-oxford-400 transition-colors";
  const labelClass = "block text-sm font-medium text-gray-600 mb-2";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container-xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-xs text-oxford-600 uppercase tracking-widest font-medium mb-4">Join Us</p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              Apply to <span className="gradient-text">CPLAB</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">
              We&apos;re recruiting passionate researchers for BSc thesis, MSc, and PhD positions.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="academic-card rounded-3xl p-12 text-center"
              >
                <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Application Submitted!</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Thank you <strong className="text-gray-900">{form.name}</strong>! We&apos;ve received your application
                  for the <strong className="text-gray-900">{form.researchTrack}</strong> track.
                  You&apos;ll hear from us within 2 weeks.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-10">
                  {steps.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.id} className="flex items-center flex-1">
                        <div className="flex flex-col items-center gap-2 flex-1">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                              step === i
                                ? "bg-gradient-to-br bg-oxford-800 text-white shadow-lg shadow-jade-500/30 scale-110"
                                : step > i
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-gray-50 text-gray-400 border border-gray-200"
                            }`}
                          >
                            {step > i ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                          </div>
                          <span className={`text-xs font-medium text-center leading-tight hidden sm:block ${step === i ? "text-gray-900" : "text-gray-400"}`}>
                            {s.label}
                          </span>
                        </div>
                        {i < steps.length - 1 && (
                          <div className={`flex-1 h-px mx-2 transition-all ${step > i ? "bg-emerald-500/30" : "bg-gray-100"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Form Card */}
                <div className="academic-card rounded-3xl p-8">
                  <AnimatePresence mode="wait">
                    {step === 0 && (
                      <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Personal Information</h2>
                        <div className="space-y-5">
                          <div><label className={labelClass}>Full Name</label><input id="rec-name" type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" className={inputClass} /></div>
                          <div><label className={labelClass}>Email Address</label><input id="rec-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" className={inputClass} /></div>
                          <div><label className={labelClass}>Phone Number</label><input id="rec-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+880 XXXX-XXXXXX" className={inputClass} /></div>
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Academic Background</h2>
                        <div className="space-y-5">
                          <div><label className={labelClass}>University / Institution</label><input id="rec-university" type="text" value={form.university} onChange={(e) => update("university", e.target.value)} placeholder="Your university name" className={inputClass} /></div>
                          <div><label className={labelClass}>Degree Program</label>
                            <select id="rec-degree" value={form.degree} onChange={(e) => update("degree", e.target.value)} className={inputClass + " cursor-pointer"}>
                              <option value="">Select degree</option>
                              <option>BSc (Thesis Position)</option>
                              <option>MSc / MPhil</option>
                              <option>PhD</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-5">
                            <div><label className={labelClass}>CGPA</label><input id="rec-cgpa" type="text" value={form.cgpa} onChange={(e) => update("cgpa", e.target.value)} placeholder="e.g., 3.75 / 4.00" className={inputClass} /></div>
                            <div><label className={labelClass}>Batch/Year</label><input id="rec-batch" type="text" value={form.batch} onChange={(e) => update("batch", e.target.value)} placeholder="e.g., 2021" className={inputClass} /></div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Research Interests</h2>
                        <div className="space-y-5">
                          <div>
                            <label className={labelClass}>Research Track</label>
                            <select id="rec-track" value={form.researchTrack} onChange={(e) => update("researchTrack", e.target.value)} className={inputClass + " cursor-pointer"}>
                              <option value="">Select a track</option>
                              <option>Machine Learning & AI</option>
                              <option>Blockchain & Distributed Systems</option>
                              <option>IoT & Embedded Systems</option>
                              <option>Application Development</option>
                              <option>Cyber-Physical Systems</option>
                            </select>
                          </div>
                          <div><label className={labelClass}>Specific Interests</label><textarea id="rec-interests" value={form.interests} onChange={(e) => update("interests", e.target.value)} rows={3} placeholder="Describe your specific research interests within your chosen track..." className={inputClass + " resize-none"} /></div>
                          <div><label className={labelClass}>Prior Research / Project Experience</label><textarea id="rec-experience" value={form.experience} onChange={(e) => update("experience", e.target.value)} rows={3} placeholder="Any prior research, projects, publications, or open-source contributions..." className={inputClass + " resize-none"} /></div>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Research Proposal & SOP</h2>
                        <div className="space-y-5">
                          <div><label className={labelClass}>Proposed Research Title</label><input id="rec-proposal-title" type="text" value={form.proposalTitle} onChange={(e) => update("proposalTitle", e.target.value)} placeholder="A tentative title for your research" className={inputClass} /></div>
                          <div><label className={labelClass}>Brief Research Proposal</label><textarea id="rec-proposal-desc" value={form.proposalDesc} onChange={(e) => update("proposalDesc", e.target.value)} rows={3} placeholder="What problem do you want to solve and how?" className={inputClass + " resize-none"} /></div>
                          <div><label className={labelClass}>Statement of Purpose</label><textarea id="rec-sop" value={form.sop} onChange={(e) => update("sop", e.target.value)} rows={5} placeholder="Why do you want to join CPLAB? What are your long-term goals? What will you contribute?" className={inputClass + " resize-none"} /></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                    <button
                      id="rec-prev"
                      onClick={() => setStep(Math.max(0, step - 1))}
                      disabled={step === 0}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl academic-card border border-gray-200 text-gray-600 text-sm hover:text-gray-900 hover:border-gray-300 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>

                    {step < steps.length - 1 ? (
                      <button
                        id="rec-next"
                        onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r bg-oxford-800 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-oxford-100"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        id="rec-submit"
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-jade-600 text-gray-900 text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                      >
                        Submit Application
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                  {error && <p className="text-sm text-red-400 mt-4 text-center">{error}</p>}
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                  Applications reviewed on a rolling basis. Strong candidates will be contacted for an interview.
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
