"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, FlaskConical, Users, Calendar } from "lucide-react";

const stats = [
  { icon: BookOpen, value: 80, suffix: "+", label: "Publications", color: "from-blue-400 to-blue-600" },
  { icon: FlaskConical, value: 25, suffix: "+", label: "Active Projects", color: "from-violet-400 to-violet-600" },
  { icon: Users, value: 40, suffix: "+", label: "Lab Members", color: "from-amber-400 to-amber-600" },
  { icon: Calendar, value: 8, suffix: " Years", label: "Of Research", color: "from-emerald-400 to-emerald-600" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="relative py-16 border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-transparent to-violet-950/20 pointer-events-none" />
      <div className="container-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg mb-1`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className={`text-4xl font-medium bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-white/40 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
