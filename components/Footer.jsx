import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.instagram.com", label: "Instagram", icon: FaInstagram },
  { href: "https://www.facebook.com", label: "Facebook", icon: FaFacebookF },
  {
    href: "https://wa.me/+263713696512",
    label: "WhatsApp",
    icon: FaWhatsapp,
  },
];

const quickLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-rose-100 bg-white/90">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-brandCrimson">
              EllDesigns
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Crafted in Zimbabwe, inspired by the continent. We tailor premium
              uniforms, suits, and African couture with precision and passion.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
              Navigate
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
              {quickLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="transition hover:text-brandCrimson"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
              Connect
            </p>
            <div className="mt-4 flex items-center gap-4">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-100 text-slate-600 transition hover:border-brandPink/60 hover:text-brandCrimson"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} EllDesigns. Handcrafted with flair in
          Zimbabwe.
        </p>
      </div>
    </footer>
  );
}
