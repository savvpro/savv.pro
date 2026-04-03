import Link from "next/link";

type FooterItem = {
  label: string;
  href: string;
};

const footerGroups: Array<{ title: string; items: FooterItem[] }> = [
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Sovereign AI", href: "/sovereign-ai" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Products",
    items: [
      { label: "Savv Pro Voice", href: "/products" },
      { label: "Savv Pro Signal", href: "/products" },
      { label: "Savv Pro Flow", href: "/products" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "AI Advisory", href: "/services" },
      { label: "Enterprise Buildouts", href: "/services" },
      { label: "Knowledge Systems", href: "/services" },
      { label: "Resource Augmentation", href: "/resource-augmentation" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "Healthcare & Pharmacy", href: "/solutions" },
      { label: "Wealth & Advisory", href: "/solutions" },
      { label: "Education & Training", href: "/solutions" },
      { label: "Professional Services", href: "/solutions" },
      { label: "Service Operations", href: "/solutions" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-white px-6 pb-14 pt-10 text-[#1f2327] md:px-[56px] lg:px-[124px]">
      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <div className="max-w-[360px] text-[14px] leading-[1.5] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
          <p className="mb-3">
            Chicago-based sovereign AI enterprise. Designing, deploying, and governing AI systems for high-trust businesses.
          </p>
          <p>Chicago, IL{"\u00b7"} Global Delivery</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-4 text-[10px] uppercase tracking-[0.4px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">{group.title}</p>
              <ul className="space-y-1 text-[14px] [font-family:Poppins,sans-serif]">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition-colors duration-150 hover:text-[#8b71fe]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 border-t border-[#1f2327]/20 pt-7" />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[10px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
          {"\u00a9"} 2026 Savv Pro. All rights reserved.
        </p>
        <div className="flex items-center gap-5 text-[12px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
          <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </Link>
          <Link href="#">Accessibility</Link>
          <a
            href="#top"
            aria-label="Back to top"
            className="ml-1 inline-flex size-[58px] items-center justify-center rounded-full border border-[#1f2327] text-[24px] leading-none transition-transform duration-200 hover:-translate-y-1"
          >
            {"\u2191"}
          </a>
        </div>
      </div>
    </footer>
  );
}
