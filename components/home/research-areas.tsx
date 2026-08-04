"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Link2, Wifi, Cpu, Layers } from "lucide-react";

const areas = [
  {
    icon: Code2,
    title: "Application Development",
    description: "Building robust, scalable full-stack applications with modern frameworks and cloud-native architectures for real-world deployment.",
    color: "from-jade-400 to-jade-600",
    glow: "group-hover:shadow-jade-500/20",
    span: "",
  },
  {
    icon: Brain,
    title: "Machine Learning & AI",
    description: "From federated learning to computer vision — developing AI systems that operate efficiently on resource-constrained edge devices.",
    color: "from-orange-400 to-orange-600",
    glow: "group-hover:shadow-orange-500/20",
    span: "",
  },
  {
    icon: Link2,
    title: "Blockchain Technology",
    description: "Designing decentralized protocols, smart contracts, and zero-knowledge proof systems for transparent and trustless applications.",
    color: "from-emerald-400 to-emerald-600",
    glow: "group-hover:shadow-emerald-500/20",
    span: "",
  },
  {
    icon: Wifi,
    title: "Internet of Things",
    description: "Connecting the physical and digital worlds through intelligent sensor networks, edge computing, and real-time data processing pipelines.",
    color: "from-amber-400 to-amber-600",
    glow: "group-hover:shadow-amber-500/20",
    span: "",
  },
  {
    icon: Cpu,
    title: "Cyber-Physical Systems",
    description: "Integrating computation, networking, and physical processes to create safety-critical embedded systems for industry and healthcare.",
    color: "from-rose-400 to-rose-600",
    glow: "group-hover:shadow-rose-500/20",
    span: "sm:col-span-2 lg:col-span-2",
  },
];

export default function ResearchAreas() {
  return (
    <section id="research" className="section-pad">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-jade-400 uppercase tracking-widest font-medium mb-4">Our Focus</p>
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4">
            Research <span className="gradient-text">Areas</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Interdisciplinary research spanning the full spectrum of cyber-physical systems
            and emerging digital technologies.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  className={`group glass-hover h-full rounded-2xl p-7 cursor-default transition-all duration-300 hover:shadow-xl ${area.glow}`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">{area.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{area.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
