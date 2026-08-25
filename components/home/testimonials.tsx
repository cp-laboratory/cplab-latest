"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: "1",
    quote:
      "CPLAB transformed my research trajectory. The federated learning project I worked on here became the foundation of my PhD thesis at NUS. The mentorship from Prof. Mia is unparalleled.",
    name: "Mahmudul Hasan",
    role: "Software Engineer @ Google | CPLAB Alumni",
    year: "2023",
  },
  {
    id: "2",
    quote:
      "Working on the AgriTrace blockchain project taught me more about distributed systems in 6 months than 2 years of coursework. The hands-on culture at CPLAB is what sets it apart.",
    name: "Rabeya Sultana",
    role: "Data Scientist @ Microsoft | CPLAB Alumni",
    year: "2023",
  },
  {
    id: "3",
    quote:
      "The weekly lab meetings and collaborative environment gave me the confidence to publish at ICML. I went from zero research background to an accepted international paper in 18 months.",
    name: "Md. Rashed Kabir",
    role: "PhD Researcher | CPLAB",
    year: "2024",
  },
  {
    id: "4",
    quote:
      "Dr. Haque's guidance on our blockchain identity project shaped my understanding of zero-knowledge cryptography. I'm now pursuing a PhD at ETH Zürich because of the foundations built here.",
    name: "Tanzim Hossain",
    role: "MSc Researcher | CPLAB",
    year: "2024",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-pad overflow-hidden bg-gray-50">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-oxford-600 uppercase tracking-widest font-bold mb-4">
            What Members Say
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            From Our{" "}
            <span className="text-oxford-800">Community</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="academic-card p-8 h-full flex flex-col bg-white">
                <Quote className="w-8 h-8 text-oxford-200 mb-6" />
                <p className="text-gray-700 text-base leading-relaxed italic flex-1 mb-8">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-oxford-50 border border-oxford-100 flex items-center justify-center text-lg font-bold text-oxford-800 shadow-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs font-medium">{t.role}</p>
                  </div>
                  <span className="ml-auto text-xs font-bold text-oxford-600 bg-oxford-50 px-3 py-1 rounded">
                    {t.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
