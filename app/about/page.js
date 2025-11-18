import Image from "next/image";

export const metadata = {
  title: "About EllDesigns",
  description:
    "Learn about EllDesigns, the Zimbabwean fashion house crafting premium uniforms, bespoke suits, and African couture.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid gap-12 pt-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.4em] text-brandCrimson font-bold">
            Our story
          </span>
          <h1 className="text-4xl font-semibold">
            Tailoring Zimbabwe&apos;s future in couture
          </h1>
          <p className="text-sm text-slate-600">
            EllDesigns was birthed in the heart of Harare by{" "}
            <strong>Ella Chikowore</strong>, a visionary tailor committed to
            elevating African fashion. What began as a boutique atelier has
            grown into a celebrated fashion brand known for precision
            craftsmanship, futuristic silhouettes, and a devotion to community
            empowerment.
          </p>
          <p className="text-sm text-slate-600">
            Our atelier merges cutting-edge technology with traditional
            hand-finishing techniques, ensuring every stitch tells a story of
            excellence. We’re proud to outfit schools, corporates, creatives,
            and dreamers across Zimbabwe and beyond, delivering pieces that
            radiate confidence and cultural pride.
          </p>
          <p className="text-sm text-slate-600">
            Through mentorship programmes, apprenticeship pathways, and
            partnerships with local textile artisans, EllDesigns is committed to
            nurturing the next generation of Zimbabwean fashion innovators.
          </p>
        </div>
        <div className="space-y-6">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-rose-100 shadow-lg">
            <Image
              src="https://res.cloudinary.com/drahvivoj/image/upload/v1721498094/samples/look-up.jpg"
              fill
              alt="Ella Chikowore, Founder of EllDesigns"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 35vw"
              priority
            />
          </div>
          <div className="rounded-3xl border border-rose-100 bg-white/95 p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-brandCrimson">
              Our mission
            </h2>
            <p className="mt-4 text-sm text-slate-600">
              To craft garments that honour African heritage, celebrate
              individuality, and empower communities through sustainable fashion
              innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
