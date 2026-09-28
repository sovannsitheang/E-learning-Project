"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="mt-5 rounded-lg bg-accent-subtle px-4 py-3 text-sm text-brand-300">
        Thank you! Your submission has been received.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex overflow-hidden rounded-lg bg-white/10">
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Submit
      </button>
    </form>
  );
}