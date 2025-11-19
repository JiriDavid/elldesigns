"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const spotlightItems = [
  {
    id: "atelier",
    title: "Atelier Precision",
    description:
      "Our atelier combines artisanal craftsmanship with cutting-edge tailoring technology, creating garments that fit like a second skin.",
    media:
      "https://res.cloudinary.com/drahvivoj/image/upload/v1763470521/atelier_precision_i9pxqz.png",
  },
  {
    id: "textiles",
    title: "Curated Textiles",
    description:
      "We collaborate with African textile artisans to source bold prints, breathable fabrics, and sustainable materials.",
    media:
      "https://res.cloudinary.com/drahvivoj/image/upload/v1763470521/curated_mvbw87.png",
  },
  {
    id: "experience",
    title: "Experience Rooms",
    description:
      "EllDesigns experience rooms let clients visualize complete looks, from concept sketches to final fittings.",
    media:
      "https://res.cloudinary.com/drahvivoj/image/upload/v1763470521/rooms-experience_huuqms.png",
  },
];

export default function SpotlightCarousel() {
  const [active, setActive] = useState(spotlightItems[0]);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid gap-8 rounded-3xl border border-rose-100 bg-white p-6 shadow-xl shadow-rose-100/40 sm:p-8 lg:grid-cols-[1fr,1.1fr]">
        <div className="space-y-6 text-center lg:text-left">
          <span className="text-xs uppercase tracking-[0.4em] text-brandCrimson font-bold">
            Spotlight
          </span>
          <h2 className="text-3xl font-semibold text-[#1f151d] md:text-4xl">
            Inside the EllDesigns universe
          </h2>
          <p className="text-sm text-slate-600">
            Journey through the spaces, textiles, and signature processes that
            shape every EllDesigns masterpiece.
          </p>
          <div className="mt-6 flex flex-col gap-4">
            {spotlightItems.map((item) => {
              const isActive = item.id === active.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item)}
                  className={`rounded-3xl border px-5 py-4 text-left transition ${
                    isActive
                      ? "border-brandCrimson/40 bg-rose-50"
                      : "border-rose-100 bg-white hover:border-brandPink/60"
                  }`}
                >
                  <p className="text-base font-semibold text-[#1f151d]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
  <div className="relative h-64 overflow-hidden rounded-3xl border border-rose-100 sm:h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={active.media}
                alt={active.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
