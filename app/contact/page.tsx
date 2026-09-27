import SectionHeading from "@/components/ui/section-heading";

const contactMethods = [
  {
    icon: "location",
    title: "Address",
    lines: ["Phnom Penh, Cambodia"],
  },
  {
    icon: "mail",
    title: "Email",
    lines: ["g4learning@gmail.com"],
  },
  {
    icon: "phone",
    title: "Phone",
    lines: ["+855 88 888 888", "+855 99 999 999"],
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Questions, feedback or technical support — we are here to help.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-5">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700/10 text-brand-700">
                    <Icon name={method.icon} />
                  </span>
                  <h2 className="font-semibold text-slate-900">{method.title}</h2>
                </div>
                <div className=" space-y-0.5 pl-14 text-sm text-slate-600">
                  {method.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <SectionHeading
              title="Send us a message"
              description="We usually reply within two working days."
            />
            <form className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Full name</span>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Email</span>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Subject
                </span>
                <input
                  type="text"
                  required
                  placeholder="How can we help?"
                  className="mt-1.5 h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Message</span>
                <textarea
                  required
                  rows={6}
                  placeholder="Write your message..."
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

const icons: Record<string, string> = {
  location: "M12 2a8 8 0 00-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z",
  mail: "M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
  phone: "M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.25 1.01l-2.2 2.22z",
};

function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
      <path d={icons[name] ?? icons.mail} />
    </svg>
  );
}