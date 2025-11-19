"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const links = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const isAdmin =
    user?.id && user.id === process.env.NEXT_PUBLIC_ADMIN_CLERK_USER_ID;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const renderNavLink = (href, label, variant = "desktop") => {
    const isActive = pathname === href;
    const baseClasses =
      variant === "mobile"
        ? "block rounded-full border px-4 py-2 text-base font-semibold"
        : "relative text-sm font-semibold";
    const stateClasses = isActive
      ? variant === "mobile"
        ? "border-brandCrimson/30 bg-rose-50 text-brandCrimson"
        : "text-brandCrimson"
      : variant === "mobile"
        ? "border-transparent text-slate-600 hover:bg-rose-50"
        : "text-slate-500 hover:text-slate-900";

    return (
      <Link
        key={`${variant}-${href}`}
        href={href}
        onClick={variant === "mobile" ? () => setIsMenuOpen(false) : undefined}
        className={`${baseClasses} ${stateClasses}`}
      >
        {label}
        {isActive && variant === "desktop" && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute inset-x-0 -bottom-2 h-0.5 bg-brandPink"
          />
        )}
      </Link>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rose-100/70 bg-white/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ell-gradient text-xl font-semibold text-white shadow-neon">
            ED
          </span>
          <div className="leading-tight">
            <p className="text-xl font-semibold tracking-wide">EllDesigns</p>
            <p className="text-xs uppercase tracking-[0.3em] text-brandCrimson/70">
              Zimbabwe
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-slate-600 md:flex">
          {links.map((link) => renderNavLink(link.href, link.label))}
        </nav>

        <div className="flex items-center gap-2 text-sm">
          <Link
            href="https://wa.me/+263713696512"
            className="hidden items-center gap-2 rounded-full border border-rose-100 px-4 py-2 text-slate-700 transition hover:border-brandPink/60 hover:text-brandCrimson lg:flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="text-lg" />
            WhatsApp
          </Link>
          <SignedOut>
            <Link
              href="/sign-in"
              className="rounded-full bg-brandCrimson px-4 py-2 text-sm font-semibold text-white shadow-neon transition hover:bg-brandPink"
            >
              Sign In
            </Link>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className="hidden rounded-full border border-rose-100 px-4 py-2 font-semibold text-slate-700 transition hover:border-brandPink/60 hover:text-brandCrimson md:block"
                >
                  Dashboard
                </Link>
              )}
              <UserButton
                appearance={{ elements: { userButtonAvatarBox: "h-9 w-9" } }}
                afterSignOutUrl="/"
              />
            </div>
          </SignedIn>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 text-slate-700 transition hover:border-brandPink/60 md:hidden"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
            >
              {isMenuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-rose-100/70 bg-white/95 px-4 pb-6 pt-4 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-3 text-sm">
              {links.map((link) =>
                renderNavLink(link.href, link.label, "mobile")
              )}
            </div>
            <div className="mt-6 flex flex-col gap-3 text-sm">
              <Link
                href="https://wa.me/+263713696512"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-rose-100 px-4 py-2 text-slate-700 transition hover:border-brandPink/60 hover:text-brandCrimson"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaWhatsapp className="text-lg" /> WhatsApp
              </Link>
              {isAdmin && (
                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="rounded-full border border-rose-100 px-4 py-2 text-center font-semibold text-slate-700 transition hover:border-brandPink/60 hover:text-brandCrimson"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </SignedIn>
              )}
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="rounded-full bg-brandCrimson px-4 py-2 text-center font-semibold text-white shadow-neon transition hover:bg-brandPink"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
