import type { Metadata } from "next";
import { PageTemplate } from "@/components/site";
import { createPageMetadata } from "@/lib/seo";

const CALENDAR_URL = "https://calendar.app.google/euWtAE4ETqsQgXfw8";

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
      description="Choose a time that works for you and book directly into our calendar."
    >
      <section className="mx-3 md:mx-6">
        <iframe
          src={CALENDAR_URL}
          title="Savv Pro booking calendar"
          className="min-h-[760px] w-full rounded-[24px] border border-[#1f2327]/10 bg-white md:rounded-[32px]"
        />
      </section>

      <div className="h-20" />
    </PageTemplate>
  );
}
