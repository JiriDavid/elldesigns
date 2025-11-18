"use client";

import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [formState, setFormState] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Unable to send message");
      }

      setStatus({
        type: "success",
        message: "Message sent. Our team will connect with you shortly.",
      });
      setFormState(initialState);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-rose-100 bg-white/95 p-8 shadow-lg"
    >
      <div>
        <label
          className="text-xs uppercase tracking-[0.3em] text-slate-500"
          htmlFor="name"
        >
          Full name
        </label>
        <input
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          className="mt-2 w-full rounded-full border border-rose-100 bg-white px-4 py-3 text-sm text-[#1f151d] focus:border-brandPink focus:ring-brandPink"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label
          className="text-xs uppercase tracking-[0.3em] text-slate-500"
          htmlFor="email"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          className="mt-2 w-full rounded-full border border-rose-100 bg-white px-4 py-3 text-sm text-[#1f151d] focus:border-brandPink focus:ring-brandPink"
          placeholder="email@example.com"
          required
        />
      </div>
      <div>
        <label
          className="text-xs uppercase tracking-[0.3em] text-slate-500"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formState.message}
          onChange={handleChange}
          className="mt-2 w-full rounded-3xl border border-rose-100 bg-white px-4 py-3 text-sm text-[#1f151d] focus:border-brandPink focus:ring-brandPink"
          placeholder="Tell us about your project or uniform needs"
          required
        />
      </div>
      {status.message ? (
        <p
          className={`text-sm ${
            status.type === "success" ? "text-emerald-600" : "text-brandCrimson"
          }`}
        >
          {status.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-brandCrimson px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-neon transition hover:bg-brandPink disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
