"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { STATISTICS } from "@/lib/constants";

function AnimatedCounter({
  value,
  suffix = "",
  format = "standard",
  duration = 1.6,
  className,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  const formatter = useMemo(() => {
    if (format === "compact") {
      return new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1,
      });
    }

    return new Intl.NumberFormat("en", {
      notation: "standard",
      maximumFractionDigits: 0,
    });
  }, [format]);

  const formatNumber = useCallback(
    (latest) => {
      if (format === "compact") {
        return formatter.format(latest);
      }

      return formatter.format(Math.round(latest));
    },
    [formatter, format]
  );

  const [displayValue, setDisplayValue] = useState(() => formatNumber(0));

  useEffect(() => {
    if (!isInView) return undefined;

    const animation = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(formatNumber(latest)),
    });

    return () => animation.stop();
  }, [isInView, value, duration, formatNumber]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${formatNumber(value)}${suffix}`}
    >
      {displayValue}
      {suffix}
    </span>
  );
}

export default function BrandStats() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="grid gap-6 rounded-3xl border border-rose-100 bg-white/95 p-10 shadow-xl shadow-rose-100/40 md:grid-cols-4">
        {STATISTICS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              format={stat.format}
              duration={1.4 + index * 0.2}
              className="block text-3xl font-semibold text-brandCrimson"
            />
            <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
