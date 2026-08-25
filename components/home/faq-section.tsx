"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How can I join CPLAB as a student researcher?",
    a: "Fill out our online application form on the Recruitment page. We accept BSc thesis students, MSc researchers, and PhD candidates. Selection is based on academic performance, research statement quality, and a brief interview. Applications are reviewed on a rolling basis.",
  },
  {
    q: "What research areas does CPLAB focus on?",
    a: "Our five main research areas are: Application Development, Machine Learning & AI (particularly federated learning and edge AI), Blockchain Technology (smart contracts, DeFi, identity systems), Internet of Things, and Cyber-Physical Systems. We welcome interdisciplinary work across these areas.",
  },
  {
    q: "Does CPLAB offer internships or part-time research positions?",
    a: "Yes, we offer semester-long part-time research positions for undergraduate students who aren't doing their thesis with us. These positions are unpaid but provide co-authorship opportunities on published work and a strong research letter of recommendation.",
  },
  {
    q: "What equipment and resources does the lab provide?",
    a: "Lab members have access to our GPU cluster (8x NVIDIA A100), Raspberry Pi and Arduino development kits, IoT sensor arrays, networking equipment, blockchain testnets, and software licenses. We also have a small budget for cloud computing resources on AWS/GCP.",
  },
  {
    q: "How do I verify a certificate issued by CPLAB?",
    a: "Visit the Certificate Verification page and enter the 12-character certificate ID printed on your document. The system will confirm the certificate's authenticity and display the recipient's name, issue date, and the associated project or achievement.",
  },
  {
    q: "Can I collaborate with CPLAB as an external researcher or industry partner?",
    a: "Absolutely. We actively seek industry collaborations and academic partnerships. Contact us at help@cplab.org with a proposal describing the collaboration scope. Industry partners can sponsor student projects, access lab expertise as consultants, or co-develop research.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad bg-white">
      <div className="container-xl">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-xs text-oxford-600 uppercase tracking-widest font-bold mb-4">
              Questions
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              Frequently Asked{" "}
              <span className="text-oxford-800">Questions</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to know about CPLAB and joining the team.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div
                  className={`bg-white rounded-xl overflow-hidden border transition-all duration-200 ${
                    openIndex === i ? "border-oxford-200 shadow-md" : "border-gray-200"
                  }`}
                >
                  <button
                    id={`faq-${i}`}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span
                      className={`font-bold text-base leading-snug transition-colors ${
                        openIndex === i ? "text-oxford-800" : "text-gray-800"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                        openIndex === i ? "rotate-180 text-oxford-600" : "text-gray-400"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 py-5 bg-white">
                          <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
