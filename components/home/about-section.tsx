import Button from "@/components/ui/button";

const features = [
  {
    icon: "school",
    title: "Free Access",
    text: "All lessons are free for students, teachers and the general public.",
  },
  {
    icon: "mobile_friendly",
    title: "Learn Anywhere",
    text: "Lessons work on desktop, tablet and mobile without data charges via selected operators.",
  },
  {
    icon: "book",
    title: "National Curriculum",
    text: "Content follows the official textbooks and the national curriculum.",
  },
  {
    icon: "verified",
    title: "Certified Lessons",
    text: "Every lesson is reviewed by experienced educators before publishing.",
  },
];

export default function AboutSection() {
  return (
    <section className="bg-accent-subtle/50 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            About G4-Learning
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            We provide complete learning facilities
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted">
            G4-Learning — from the Khmer words for &ldquo;digital learning&rdquo; — is a
            free e-Learning platform that delivers video lessons and digital
            exercises to students from primary to upper secondary school,
            helping every child continue learning anytime, anywhere.
          </p>
          <Button href="/about" className="mt-8 rounded-lg">
            Learn More About Us
          </Button>
        </div>

        <div className="grid gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-5 rounded-xl bg-surface p-5 shadow-sm"
            >
              <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-accent">
                <Icon name={feature.icon} />
              </span>
              <div>
                <p className="font-semibold text-fg">{feature.title}</p>
                <p className="mt-0.5 max-w-sm text-sm leading-relaxed text-fg-muted">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const icons: Record<string, string> = {
  school:
    "M12 3 1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z",
  mobile_friendly:
    "M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zM9 17h6v2H9v-2zm6.5-4.5L11 17l-3.5-3.5 1.06-1.06L11 14.88l4.44-4.44 1.06 1.06z",
  book: "M12 4C9.5 4 7 4.6 4.5 5.5v14C7 18.6 9.5 18 12 18s5 .6 7.5 1.5v-14C17 4.6 14.5 4 12 4zm-6 4h4v6H6V8zm8 0h4v6h-4V8zm-8 8h4v2H6v-2zm8 0h4v2h-4v-2z",
  verified:
    "M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
};

function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
      <path d={icons[name] ?? icons.book} />
    </svg>
  );
}