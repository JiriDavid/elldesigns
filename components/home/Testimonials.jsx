"use client";

import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "EllDesigns transformed our school uniforms—students adore them and they still look immaculate after months of wear.",
    author: "Tendai M., Headmistress",
    location: "Harare, Zimbabwe",
  },
  {
    quote:
      "The bespoke blazer I commissioned fits like a dream. The compliments keep coming! EllDesigns is unmatched.",
    author: "Nyasha K., Entrepreneur",
    location: "Bulawayo, Zimbabwe",
  },
  {
    quote:
      "Our corporate suits have never looked so sharp. EllDesigns captured our brand identity flawlessly.",
    author: "Leroy D., Operations Director",
    location: "Victoria Falls, Zimbabwe",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.4em] text-brandSoftPink">
            Patron voices
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-[#1f151d] md:text-4xl">
            Elegance celebrated by our clients
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex h-full flex-col gap-4 rounded-3xl border border-rose-100 bg-white/95 p-8 shadow-lg"
            >
              <FaQuoteLeft className="text-2xl text-brandSoftPink" />
              <p className="text-sm text-slate-600">“{item.quote}”</p>
              <div className="mt-auto text-xs uppercase tracking-[0.3em] text-slate-500">
                <p className="font-semibold text-[#1f151d]">{item.author}</p>
                <p>{item.location}</p>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
