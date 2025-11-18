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
      className="group relative overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-lg"
    >
      <div className="relative h-72 w-full">
        <Image
          src={category.media}
          alt={category.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f151d]/70 via-[#1f151d]/20 to-transparent" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <p className="text-xs uppercase tracking-[0.4em] text-brandSoftPink">
          {category.slug}
        </p>
        <h3 className="mt-2 text-2xl font-semibold">{category.name}</h3>
        <p className="mt-3 text-sm text-white/70">{category.description}</p>
        <Link
          href={`/collections?highlight=${category.slug}`}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brandCrimson transition hover:bg-brandSoftPink/30"
        >
          View Looks
        </Link>
      </div>
    </motion.div>
  );
}
