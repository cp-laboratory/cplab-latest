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
      "Dr. Iqbal's guidance on our blockchain identity project shaped my understanding of zero-knowledge cryptography. I'm now pursuing a PhD at ETH Zürich because of the foundations built here.",
    name: "Tanzim Hossain",
    role: "MSc Researcher | CPLAB",
    year: "2024",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-pad overflow-hidden">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-blue-400 uppercase tracking-widest font-medium mb-4">
            What Members Say
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4">
            From Our{" "}
            <span className="gradient-text">Community</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="glass-hover rounded-2xl p-7 h-full flex flex-col">
                <Quote className="w-8 h-8 text-blue-500/30 mb-4" />
                <p className="text-white/60 text-base leading-relaxed italic flex-1 mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center text-base font-medium text-blue-400">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role}</p>
                  </div>
                  <span className="ml-auto text-xs text-white/20 bg-white/5 px-2.5 py-1 rounded-full">
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
