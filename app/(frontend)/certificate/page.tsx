"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default function CertificatePage() {
  const [certificateData, setCertificateData] = useState({
    studentName: "John Doe",
    courseName: "Advanced Machine Learning",
    completionDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    certificateNumber: "CPLAB-2024-001",
  })

  const certificateRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCertificateData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const downloadPDF = async () => {
    if (!certificateRef.current) return

    try {
      const certificateDiv = certificateRef.current

      // Temporarily remove any problematic classes
      const originalClassName = certificateDiv.className
      certificateDiv.className = ""

      const canvas = await html2canvas(certificateDiv, {
        scale: 2,
        backgroundColor: "#f9f8f5",
        logging: false,
        allowTaint: true,
        useCORS: true,
      })

      // Restore original class
      certificateDiv.className = originalClassName

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      })

      const imgData = canvas.toDataURL("image/png")
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210)
      pdf.save(`certificate-${certificateData.studentName}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Certificate Generator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create and download professional certificates for laboratory students with elegant design and premium
              styling
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div
                className="rounded-xl p-8 space-y-6 shadow-sm"
                style={{
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                }}
              >
                <h2 className="text-2xl font-serif font-semibold" style={{ color: "#0f172a" }}>
                  Certificate Details
                </h2>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#3f3f46" }}>
                    Student Name
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={certificateData.studentName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      color: "#0f172a",
                    }}
                    placeholder="Enter student name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#3f3f46" }}>
                    Course Name
                  </label>
                  <input
                    type="text"
                    name="courseName"
                    value={certificateData.courseName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      color: "#0f172a",
                    }}
                    placeholder="Enter course name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#3f3f46" }}>
                    Completion Date
                  </label>
                  <input
                    type="text"
                    name="completionDate"
                    value={certificateData.completionDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      color: "#0f172a",
                    }}
                    placeholder="Enter completion date"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#3f3f46" }}>
                    Certificate Number
                  </label>
                  <input
                    type="text"
                    name="certificateNumber"
                    value={certificateData.certificateNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      color: "#0f172a",
                    }}
                    placeholder="Enter certificate number"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadPDF}
                  className="w-full px-6 py-3 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                  style={{
                    background: "#2563eb",
                  }}
                >
                  Download as PDF
                </motion.button>
              </div>
            </motion.div>

            {/* Certificate Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 flex items-center justify-center overflow-x-auto"
            >
              <div className="w-full flex justify-center">
                <div
                  ref={certificateRef}
                  style={{
                    background: "#f9f8f5",
                    width: "clamp(320px, 100%, 1050px)",
                    aspectRatio: "1.41",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                    padding: "48px",
                    borderRadius: "8px",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    color: "#0f172a",
                  }}
                >
                  {/* Outermost Gold Border */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "16px",
                      border: "2px solid #d4af37",
                      borderRadius: "6px",
                      pointerEvents: "none",
                    }}
                  ></div>

                  {/* Inner Navy Border */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "22px",
                      border: "1px solid #1e3a5f",
                      borderRadius: "4px",
                      pointerEvents: "none",
                    }}
                  ></div>

                  {/* Accent Navy Border */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "28px",
                      border: "2px solid #1e3a5f",
                      borderRadius: "4px",
                      pointerEvents: "none",
                    }}
                  ></div>

                  {/* Top Left Corner */}
                  <div
                    style={{
                      position: "absolute",
                      top: "28px",
                      left: "28px",
                      width: "50px",
                      height: "50px",
                      border: "2px solid #d4af37",
                      borderRight: "none",
                      borderBottom: "none",
                      borderRadius: "4px 0 0 0",
                    }}
                  ></div>

                  {/* Top Right Corner */}
                  <div
                    style={{
                      position: "absolute",
                      top: "28px",
                      right: "28px",
                      width: "50px",
                      height: "50px",
                      border: "2px solid #d4af37",
                      borderLeft: "none",
                      borderBottom: "none",
                      borderRadius: "0 4px 0 0",
                    }}
                  ></div>

                  {/* Bottom Left Corner */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "28px",
                      left: "28px",
                      width: "50px",
                      height: "50px",
                      border: "2px solid #d4af37",
                      borderRight: "none",
                      borderTop: "none",
                      borderRadius: "0 0 0 4px",
                    }}
                  ></div>

                  {/* Bottom Right Corner */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "28px",
                      right: "28px",
                      width: "50px",
                      height: "50px",
                      border: "2px solid #d4af37",
                      borderLeft: "none",
                      borderTop: "none",
                      borderRadius: "0 0 4px 0",
                    }}
                  ></div>

                  <div
                    style={{
                      position: "relative",
                      zIndex: 10,
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      width: "100%",
                      gap: "clamp(16px, 2vw, 24px)",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    {/* Logo */}
                    <img
                      src="/cpl-logo.png"
                      alt="CPLAB Logo"
                      style={{
                        width: "clamp(60px, 8vw, 80px)",
                        height: "auto",
                      }}
                    />

                    {/* Title with Serif Font */}
                    <div>
                      <h1
                        style={{
                          fontSize: "clamp(32px, 5vw, 48px)",
                          fontWeight: "bold",
                          color: "#1e3a5f",
                          margin: "0",
                          fontFamily: "Georgia, serif",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Certificate of Completion
                      </h1>
                      <p
                        style={{
                          fontSize: "clamp(14px, 2vw, 18px)",
                          color: "#d4af37",
                          margin: "8px 0 0 0",
                          fontFamily: "Georgia, serif",
                          fontWeight: "500",
                        }}
                      >
                        Cyber Physical Laboratory
                      </p>
                    </div>

                    {/* Horizontal Decorative Line */}
                    <div
                      style={{
                        width: "clamp(200px, 60%, 300px)",
                        height: "1px",
                        background: "linear-gradient(to right, transparent, #d4af37, transparent)",
                        margin: "clamp(8px, 1vw, 12px) 0",
                      }}
                    ></div>

                    {/* Introductory Text */}
                    <p
                      style={{
                        fontSize: "clamp(13px, 1.5vw, 16px)",
                        color: "#475569",
                        maxWidth: "800px",
                        margin: "0",
                        fontStyle: "italic",
                      }}
                    >
                      This is to certify that
                    </p>

                    {/* Student Name */}
                    <div
                      style={{
                        borderBottom: "2px solid #d4af37",
                        paddingBottom: "clamp(6px, 1vw, 12px)",
                        minWidth: "clamp(280px, 75%, 450px)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "clamp(28px, 4vw, 36px)",
                          fontWeight: "bold",
                          color: "#1e3a5f",
                          margin: "0",
                          fontFamily: "Georgia, serif",
                          letterSpacing: "0.3px",
                        }}
                      >
                        {certificateData.studentName}
                      </p>
                    </div>

                    {/* Achievement Text */}
                    <p
                      style={{
                        fontSize: "clamp(13px, 1.5vw, 16px)",
                        color: "#475569",
                        maxWidth: "800px",
                        margin: "0",
                        fontStyle: "italic",
                      }}
                    >
                      has successfully completed the course
                    </p>

                    {/* Course Name */}
                    <div
                      style={{
                        borderBottom: "2px solid #d4af37",
                        paddingBottom: "clamp(6px, 1vw, 12px)",
                        minWidth: "clamp(300px, 80%, 500px)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "clamp(22px, 3vw, 28px)",
                          fontWeight: "600",
                          color: "#1e3a5f",
                          margin: "0",
                          fontFamily: "Georgia, serif",
                          letterSpacing: "0.2px",
                        }}
                      >
                        {certificateData.courseName}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
                        marginTop: "clamp(24px, 4vw, 40px)",
                        gap: "clamp(16px, 3vw, 32px)",
                        paddingBottom: "clamp(16px, 2vw, 24px)",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <p
                          style={{
                            fontSize: "clamp(11px, 1.2vw, 12px)",
                            color: "#64748b",
                            margin: "0 0 clamp(12px, 2vw, 20px) 0",
                            fontWeight: "600",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                          }}
                        >
                          Date
                        </p>
                        <p
                          style={{
                            fontSize: "clamp(12px, 1.5vw, 14px)",
                            fontWeight: "500",
                            color: "#1e3a5f",
                            margin: "0",
                            fontFamily: "Georgia, serif",
                          }}
                        >
                          {certificateData.completionDate}
                        </p>
                      </div>
                      <div
                        style={{
                          width: "1px",
                          background: "#d4af37",
                          opacity: "0.3",
                        }}
                      ></div>
                      <div style={{ textAlign: "center" }}>
                        <p
                          style={{
                            fontSize: "clamp(11px, 1.2vw, 12px)",
                            color: "#64748b",
                            margin: "0 0 clamp(12px, 2vw, 20px) 0",
                            fontWeight: "600",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                          }}
                        >
                          Certificate No.
                        </p>
                        <p
                          style={{
                            fontSize: "clamp(12px, 1.5vw, 14px)",
                            fontWeight: "500",
                            color: "#1e3a5f",
                            margin: "0",
                            fontFamily: "Georgia, serif",
                          }}
                        >
                          {certificateData.certificateNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
