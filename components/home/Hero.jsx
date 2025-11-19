"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

export default function Hero() {
  const playerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const attemptPlay = () => {
      const videoEl = videoRef.current;
      if (!videoEl) return;

      const playPromise = videoEl.play?.();
      if (typeof playPromise?.catch === "function") {
        playPromise.catch(() => {
          videoEl.muted = true;
          videoEl.setAttribute("muted", "");
          setTimeout(attemptPlay, 300);
        });
      }
    };

    attemptPlay();
  }, []);

  return (
    <section className="relative overflow-hidden pt-24 text-[#1f151d] sm:pt-28">
      <div className="absolute inset-0 -z-10">
        <CldVideoPlayer
          src="elldesign-hero-vid"
          width="1920"
          height="1080"
          autoPlay="always"
          loop
          muted
          playsInline
          controls={false}
          preload="auto"
          className="h-full w-full object-cover"
          transformation={{ effect: "grayscale:40" }}
          playerRef={playerRef}
          videoRef={videoRef}
          onDataLoad={() => {
            const videoEl = videoRef.current;
            if (!videoEl) return;
            const playPromise = videoEl.play?.();
            if (typeof playPromise?.catch === "function") {
              playPromise.catch(() => {
                videoEl.muted = true;
                videoEl.setAttribute("muted", "");
              });
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-[#fde9ef]/70 to-[#1b0b11]/55" />
        <div className="absolute inset-0 bg-black mix-blend-screen" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-24 sm:gap-12 sm:px-6 sm:pb-32">
        <motion.span
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-fit self-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.4em] text-brandCrimson md:self-start"
        >
          Crafted in Zimbabwe
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl text-center text-4xl font-semibold leading-tight md:text-left md:text-6xl"
        >
          Crafted with Passion, <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #DC143C, #F7CAC9)",
            }}
          >
            Styled for You
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="max-w-2xl rounded-xl border border-white/10 bg-white/60 px-4 py-3 text-base text-slate-900 backdrop-blur md:text-xl"
        >
          EllDesigns brings a futuristic sensibility to bespoke tailoring. From
          distinctive school uniforms to luxury African couture, each garment is
          a statement of mastery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:justify-start"
        >
          <Link
            href="/collections"
            className="w-full rounded-full bg-brandCrimson px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-neon transition hover:translate-y-[2px] hover:bg-brandPink sm:w-auto"
          >
            Explore Collections
          </Link>
          <Link
            href="/contact"
            className="w-full rounded-full border border-rose-200/80 px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-700 transition hover:border-brandPink/70 hover:text-brandCrimson sm:w-auto"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
