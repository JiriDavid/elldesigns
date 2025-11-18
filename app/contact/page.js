import ContactForm from "@/components/contact/ContactForm";
import { FaWhatsapp } from "react-icons/fa";

export const metadata = {
  title: "Contact EllDesigns",
  description:
    "Connect with EllDesigns for bespoke tailoring, corporate uniforms, and couture consultations.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid gap-12 pt-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.4em] text-brandCrimson font-bold">
            Get in touch
          </span>
          <h1 className="text-4xl font-semibold">
            Let&apos;s curate your signature look
          </h1>
          <p className="text-sm text-slate-600">
            Whether you&apos;re outfitting an academy, reimagining your
            corporate identity, or crafting bespoke couture, EllDesigns brings
            your vision to life with meticulous detail.
          </p>

          <div className="rounded-3xl border border-rose-100 bg-white/95 p-8 shadow-lg">
            <h2 className="text-lg font-semibold text-brandCrimson">
              Visit our studio
            </h2>
            <p className="mt-4 text-sm text-slate-600">
              12 Samora Machel Avenue, Harare, Zimbabwe
              <br />
              Monday — Saturday: 9am to 7pm
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p>Email: hello@elldesigns.co.zw</p>
              <p>Phone: +263 77 123 4567</p>
            </div>
            <a
              href="https://wa.me/263771234567?text=Hi%20EllDesigns!%20I%27d%20love%20to%20book%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brandCrimson px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-neon transition hover:bg-brandPink"
            >
              <FaWhatsapp className="text-lg" /> WhatsApp Atelier
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-rose-100 shadow-lg">
            <iframe
              title="EllDesigns Studio Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.421286450415!2d31.04806347550046!3d-17.827477783032672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a5d0fa0d6173%3A0x4b001bc9d3170f8c!2sSamora%20Machel%20Ave%2C%20Harare!5e0!3m2!1sen!2szw!4v1699999999999!5m2!1sen!2szw"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
