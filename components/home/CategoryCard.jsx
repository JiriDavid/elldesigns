"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CategoryCard({ category }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative flex h-[420px] overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-lg"
    >
      <div className="absolute inset-0">
        <Image
          src={category.media}
          alt={category.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f151d]/80 via-[#1f151d]/25 to-transparent" />
      </div>
      <div className="relative z-10 mt-auto w-full p-4 sm:p-6">
        <div className="rounded-2xl bg-white/90 p-4 text-[#1f151d] shadow-lg backdrop-blur md:bg-transparent md:p-0 md:text-white md:shadow-none">
          <p className="text-xs uppercase tracking-[0.4em] text-brandSoftPink">
            {category.slug}
          </p>
          <h3 className="mt-2 text-2xl font-semibold">{category.name}</h3>
          <p className="mt-3 text-sm text-slate-600 md:text-white/80">
            {category.description}
          </p>
          <Link
            href={`/collections?highlight=${category.slug}`}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brandCrimson px-4 py-2 text-sm font-semibold text-white shadow-neon transition hover:bg-brandPink sm:w-auto"
          >
            View Looks
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
