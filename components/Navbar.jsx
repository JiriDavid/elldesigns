"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rose-100/70 bg-white/85 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
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

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative transition-colors ${
                  isActive
                    ? "text-brandCrimson"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-0 -bottom-2 h-0.5 bg-brandPink"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <Link
            href="https://wa.me/+263713696512"
            className="hidden items-center gap-2 rounded-full border border-rose-100 px-4 py-2 text-slate-700 transition hover:border-brandPink/60 hover:text-brandCrimson md:flex"
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
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className="hidden rounded-full border border-rose-100 px-4 py-2 font-semibold text-slate-700 transition hover:border-brandPink/60 hover:text-brandCrimson lg:block"
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
        </div>
      </div>
    </header>
  );
}
