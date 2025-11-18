"use client";

import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import { categories } from "@/lib/constants";

export default function FeaturedCategories() {
  return (
    <section id="collections" className="mx-auto max-w-6xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card gradient-border p-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brandSoftPink">
              EllDesigns universe
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Explore the signature categories
            </h2>
          </div>
          <p className="max-w-lg text-sm text-slate-600">
            Every EllDesigns garment is custom-crafted using precision
            tailoring, luxury fabrics, and forward-looking silhouettes that
            honour Zimbabwean artistry.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
