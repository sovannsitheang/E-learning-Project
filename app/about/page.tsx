import Image from "next/image";
import SectionHeading from "@/components/ui/section-heading";

const members = [
  { name: "Sitheang SOVANN", role: "Home Page Creator", role2: "Navigation Bar Creator", role3: "Footer Creator", image: "/members/Theang.png" },
  { name: "Thana NEANG", role: "Courses Page Creator", image: "/members/Thana.jpg" },
  { name: "Sovannara REN", role: "About Page Creator", image: "/members/Sovannara.png" },
  { name: "Sinat SOUT", role: "Contact Page Creator", image: "/members/Sinat.jpg" },
  { name: "Piseth HIN", role: "My Courses Page Creator", image: "/members/Piseth.png" },
  { name: "Keopanha MONGKUL", role: "Login Page Creator", image: "/members/Keopanha.png" },
  { name: "Sonarith EKCHENDA", role: "Register Page Creator", image: "/members/Sonarith.jpg" },
];

const leader = members[0];
const otherMembers = members.slice(1);

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About G4-Learning
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            A free e-Learning platform for every student.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading
            center
            eyebrow="Who we are"
            title="Digital learning for every Cambodian child"
          />
          <div className="mt-10 space-y-5 text-base leading-relaxed text-slate-600">
            <p>
              G4-Learning — a name that blends the Khmer words for{" "}
              <strong className="font-semibold text-slate-900">digital</strong>{" "}
              and <strong className="font-semibold text-slate-900">learning</strong> —
              is an e-Learning platform offering free courses for students
              across Cambodia.
            </p>
            <p>
              The platform delivers free video lessons, exercises and digital
              resources aligned with the official national curriculum, covering
              Khmer literature, mathematics, science, social studies, English,
              ICT, arts and more for students from primary through upper
              secondary school.
            </p>
            <p>
              Our mission is simple: ensure every child — whether in Phnom Penh
              or a remote rural community — can continue learning anytime,
              anywhere, and build the knowledge and skills they need for the
              future of Cambodia.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading
            center
            eyebrow="Our members"
            title="The team behind G4-Learning"
          />
          <div className="mt-12">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="col-start-1 sm:col-start-1 lg:col-start-2 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                {leader.image ? (
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-700/10 font-bold text-brand-700">
                    {leader.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </span>
                )}
                <div>
                  <h3 className="font-semibold text-slate-900">{leader.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-brand-700">
                    {leader.role}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-brand-700">
                    {leader.role2}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-brand-700">
                    {leader.role3}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherMembers.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-700/10 font-bold text-brand-700">
                      {member.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </span>
                  )}
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {member.name}
                    </h3>
                    {member.role ? (
                      <p className="mt-0.5 text-sm font-medium text-brand-700">
                        {member.role}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}