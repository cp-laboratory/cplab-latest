"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Search, CheckCircle, XCircle, ShieldCheck, Loader2 } from "lucide-react";
import { fetchDocByField, COLLECTIONS } from "@/lib/firestore";
import type { Certificate } from "@/lib/types";

type VerifyState = "idle" | "loading" | "success" | "error";

export default function CertificatePage() {
  const [certId, setCertId] = useState("");
  const [state, setVerifyState] = useState<VerifyState>("idle");
  const [certData, setCertData] = useState<Certificate | null>(null);

  const handleVerify = async () => {
    const id = certId.trim().toUpperCase();
    if (!id) return;
    setVerifyState("loading");
    const cert = await fetchDocByField<Certificate>(COLLECTIONS.certificates, "certId", id);
    if (cert) {
      setCertData(cert);
      setVerifyState("success");
    } else {
      setCertData(null);
      setVerifyState("error");
    }
  };

  const handleReset = () => {
    setCertId("");
    setVerifyState("idle");
    setCertData(null);
  };

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
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-oxford-50 to-oxford-100 border border-oxford-200 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-oxford-600" />
              </div>
            </div>
            <p className="text-xs text-oxford-600 uppercase tracking-widest font-medium mb-4">
              Authenticity Check
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              Certificate{" "}
              <span className="gradient-text">Verification</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">
              Verify the authenticity of certificates issued by the Cyber Physical
              Laboratory by entering the certificate ID below.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {/* Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="academic-card rounded-2xl p-8 mb-8"
            >
              <label className="block text-sm font-medium text-gray-600 mb-3">
                Certificate ID
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="cert-id-input"
                    type="text"
                    value={certId}
                    onChange={(e) => { setCertId(e.target.value); setVerifyState("idle"); }}
                    onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                    placeholder="e.g., CPLAB-2024-001"
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-white/30 text-sm focus:outline-none focus:border-oxford-400 transition-colors"
                  />
                </div>
                <button
                  id="cert-verify-btn"
                  onClick={handleVerify}
                  disabled={!certId.trim() || state === "loading"}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r bg-oxford-800 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-oxford-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {state === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                  Verify
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                The certificate ID is printed on the certificate document (format: CPLAB-YYYY-###).
              </p>
            </motion.div>

            {/* Result */}
            <AnimatePresence>
              {state === "success" && certData && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="academic-card rounded-2xl p-8 border border-emerald-500/20"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-gray-900">Certificate Verified ✓</h3>
                      <p className="text-sm text-emerald-400">This is an authentic CPLAB certificate.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Certificate ID", value: certId.toUpperCase() },
                      { label: "Issued To", value: certData.name },
                      { label: "Issue Date", value: certData.date },
                      { label: "Achievement", value: certData.achievement },
                      { label: "Issued By", value: "Cyber Physical Laboratory (CPLAB)" },
                      { label: "Status", value: "Valid & Active" },
                    ].map((item) => (
                      <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                        <p className="text-sm text-gray-900 font-medium">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleReset}
                    className="mt-6 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Verify another certificate →
                  </button>
                </motion.div>
              )}

              {state === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="academic-card rounded-2xl p-8 border border-red-500/20"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-gray-900">Certificate Not Found</h3>
                      <p className="text-sm text-red-400">
                        No certificate matches the ID &quot;{certId}&quot;.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Please check that the ID is entered correctly. If you believe this is
                    an error, contact us at{" "}
                    <a href="mailto:help@cplab.org" className="text-oxford-600 hover:underline">
                      help@cplab.org
                    </a>
                    .
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Try again →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
