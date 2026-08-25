"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Link2, Wifi, Cpu } from "lucide-react";

const areas = [
  {
    icon: Code2,
    title: "Application Development",
    description: "Building robust, scalable full-stack applications with modern frameworks and cloud-native architectures for real-world deployment.",
    color: "from-oxford-600 to-oxford-800",
    glow: "hover:shadow-oxford-500/20",
    span: "",
  },
  {
    icon: Brain,
    title: "Machine Learning & AI",
    description: "From federated learning to computer vision — developing AI systems that operate efficiently on resource-constrained edge devices.",
    color: "from-amber-400 to-amber-600",
    glow: "hover:shadow-amber-500/20",
    span: "",
  },
  {
    icon: Link2,
    title: "Blockchain Technology",
    description: "Designing decentralized protocols, smart contracts, and zero-knowledge proof systems for transparent and trustless applications.",
    color: "from-oxford-600 to-oxford-800",
    glow: "hover:shadow-oxford-500/20",
    span: "",
  },
  {
    icon: Wifi,
    title: "Internet of Things",
    description: "Connecting the physical and digital worlds through intelligent sensor networks, edge computing, and real-time data processing pipelines.",
    color: "from-amber-400 to-amber-600",
    glow: "hover:shadow-amber-500/20",
    span: "",
  },
  {
    icon: Cpu,
    title: "Cyber-Physical Systems",
    description: "Integrating computation, networking, and physical processes to create safety-critical embedded systems for industry and healthcare.",
    color: "from-oxford-600 to-oxford-800",
    glow: "hover:shadow-oxford-500/20",
    span: "sm:col-span-2 lg:col-span-2",
  },
];

export default function ResearchAreas() {
  return (
    <section id="research" className="section-pad bg-white">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-oxford-600 uppercase tracking-widest font-bold mb-4">Our Focus</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Research <span className="text-oxford-800">Areas</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Interdisciplinary research spanning the full spectrum of cyber-physical systems
            and emerging digital technologies.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={area.span}
              >
                <div
                  className={`group academic-card h-full p-8 cursor-default transition-all duration-300 ${area.glow}`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{area.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
