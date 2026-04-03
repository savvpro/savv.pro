import type { Metadata } from "next";
import { PageTemplate } from "@/components/site";
import { createPageMetadata } from "@/lib/seo";

const interests = [
  "Sovereign AI Advisory",
  "Enterprise AI Buildout",
  "Knowledge System Design",
  "Workflow Automation",
  "Managed AI Operations",
  "Resource Augmentation",
  "Product Demo (Voice / Signal / Flow)",
  "Something Else",
];

const companySizes = ["1–10", "11–50", "51–250", "251–1000", "1000+"];

export const metadata: Metadata = createPageMetadata({
  title: "Contact Savv Pro",
  description:
    "Book a strategy call with Savv Pro to discuss sovereign AI advisory, enterprise deployment, automation, and product implementation.",
  path: "/contact",
  keywords: ["contact savv pro", "book ai strategy call", "enterprise ai consultation"],
});

export default function ContactPage() {
  return (
    <PageTemplate
      active="Contact"
      pillLabel="Strategy Call"
      pillCaption="Let's talk"
      title="Book a Strategy Call"
      description="Tell us about your business and what you're trying to solve. We'll come prepared with relevant context, not a generic pitch."
    >
      {/* ── Form section ── */}
      <section className="relative mx-6 overflow-hidden rounded-[32px] bg-[#070b14] px-[80px] py-20 text-white">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] opacity-15"
          style={{ background: "radial-gradient(circle at 80% 10%, #8b71fe 0%, transparent 60%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] opacity-10"
          style={{ background: "radial-gradient(circle at 20% 90%, #f97316 0%, transparent 60%)" }}
        />

        <div className="relative grid grid-cols-[1fr_1.6fr] gap-20">
          {/* Left — context */}
          <div className="self-start">
            <p className="mb-6 text-[13px] uppercase tracking-[0.25em] text-[#8b71fe] [font-family:Poppins,sans-serif]">
              What to Expect
            </p>
            <ul className="space-y-5">
              {[
                ["30–45 min", "Focused conversation, no filler"],
                ["No sales script", "We listen before we recommend"],
                ["Relevant context", "We review your submission before the call"],
                ["Clear next step", "You leave knowing exactly what comes next"],
              ].map(([heading, body]) => (
                <li key={heading} className="flex gap-4">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b71fe]" />
                  <div>
                    <p className="text-[15px] font-semibold text-white [font-family:Poppins,sans-serif]">{heading}</p>
                    <p className="text-[13px] text-white/55 [font-family:Poppins,sans-serif]">{body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-[20px] border border-white/10 bg-white/5 p-6">
              <p className="mb-1 text-[13px] uppercase tracking-[0.2em] text-white/40 [font-family:Poppins,sans-serif]">Response Time</p>
              <p className="text-[22px] [font-family:Montserrat,sans-serif]">Within 24 hours</p>
              <p className="mt-1 text-[13px] text-white/50 [font-family:Poppins,sans-serif]">Chicago, IL · Global Delivery</p>
            </div>
          </div>

          {/* Right — form */}
          <form className="space-y-6">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-[12px] uppercase tracking-[0.15em] text-white/50 [font-family:Poppins,sans-serif]">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Jane"
                  className="w-full rounded-[14px] border border-white/10 bg-white/5 px-4 py-3.5 text-[14px] text-white placeholder-white/25 outline-none transition-colors duration-200 focus:border-[#8b71fe]/50 focus:bg-white/8 [font-family:Poppins,sans-serif]"
                />
              </div>
              <div>
                <label className="mb-2 block text-[12px] uppercase tracking-[0.15em] text-white/50 [font-family:Poppins,sans-serif]">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Smith"
                  className="w-full rounded-[14px] border border-white/10 bg-white/5 px-4 py-3.5 text-[14px] text-white placeholder-white/25 outline-none transition-colors duration-200 focus:border-[#8b71fe]/50 focus:bg-white/8 [font-family:Poppins,sans-serif]"
                />
              </div>
            </div>

            {/* Email + Company row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-[12px] uppercase tracking-[0.15em] text-white/50 [font-family:Poppins,sans-serif]">
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="jane@company.com"
                  className="w-full rounded-[14px] border border-white/10 bg-white/5 px-4 py-3.5 text-[14px] text-white placeholder-white/25 outline-none transition-colors duration-200 focus:border-[#8b71fe]/50 focus:bg-white/8 [font-family:Poppins,sans-serif]"
                />
              </div>
              <div>
                <label className="mb-2 block text-[12px] uppercase tracking-[0.15em] text-white/50 [font-family:Poppins,sans-serif]">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  className="w-full rounded-[14px] border border-white/10 bg-white/5 px-4 py-3.5 text-[14px] text-white placeholder-white/25 outline-none transition-colors duration-200 focus:border-[#8b71fe]/50 focus:bg-white/8 [font-family:Poppins,sans-serif]"
                />
              </div>
            </div>

            {/* Company size */}
            <div>
              <label className="mb-2 block text-[12px] uppercase tracking-[0.15em] text-white/50 [font-family:Poppins,sans-serif]">
                Company Size
              </label>
              <div className="flex flex-wrap gap-2">
                {companySizes.map((size) => (
                  <label
                    key={size}
                    className="cursor-pointer rounded-[51px] border border-white/10 bg-white/5 px-4 py-2 text-[13px] text-white/65 transition-colors duration-200 hover:border-[#8b71fe]/50 hover:text-white has-[:checked]:border-[#8b71fe] has-[:checked]:bg-[#8b71fe]/15 has-[:checked]:text-white [font-family:Poppins,sans-serif]"
                  >
                    <input type="radio" name="companySize" value={size} className="sr-only" />
                    {size}
                  </label>
                ))}
              </div>
            </div>

            {/* Area of interest */}
            <div>
              <label className="mb-2 block text-[12px] uppercase tracking-[0.15em] text-white/50 [font-family:Poppins,sans-serif]">
                Area of Interest
              </label>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <label
                    key={interest}
                    className="cursor-pointer rounded-[51px] border border-white/10 bg-white/5 px-4 py-2 text-[13px] text-white/65 transition-colors duration-200 hover:border-[#8b71fe]/50 hover:text-white has-[:checked]:border-[#8b71fe] has-[:checked]:bg-[#8b71fe]/15 has-[:checked]:text-white [font-family:Poppins,sans-serif]"
                  >
                    <input type="checkbox" name="interest" value={interest} className="sr-only" />
                    {interest}
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-[12px] uppercase tracking-[0.15em] text-white/50 [font-family:Poppins,sans-serif]">
                What are you trying to solve?
              </label>
              <textarea
                rows={4}
                placeholder="Briefly describe the challenge or opportunity you want to explore..."
                className="w-full resize-none rounded-[14px] border border-white/10 bg-white/5 px-4 py-3.5 text-[14px] text-white placeholder-white/25 outline-none transition-colors duration-200 focus:border-[#8b71fe]/50 focus:bg-white/8 [font-family:Poppins,sans-serif]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-[16px] bg-[#f97316] py-4 text-[15px] font-semibold text-white shadow-[0_2px_20px_rgba(249,115,22,0.35)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_4px_28px_rgba(249,115,22,0.5)] [font-family:Poppins,sans-serif]"
            >
              Request My Strategy Call
            </button>
            <p className="text-center text-[12px] text-white/30 [font-family:Poppins,sans-serif]">
              No commitment. We&apos;ll reach out within 24 hours to confirm.
            </p>
          </form>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-20" />
    </PageTemplate>
  );
}


