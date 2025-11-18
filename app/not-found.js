import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="text-xs uppercase tracking-[0.4em] text-brandSoftPink">
        404
      </span>
      <h1 className="text-4xl font-semibold">
        We couldn&apos;t find that look.
      </h1>
      <p className="max-w-lg text-sm text-white/70">
        The page you&apos;re searching for may have been archived or is still
        being crafted in the EllDesigns atelier.
      </p>
      <Link
        href="/"
        className="rounded-full bg-brandCrimson px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-neon transition hover:bg-brandPink"
      >
        Return home
      </Link>
    </div>
  );
}
