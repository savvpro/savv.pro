/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const footerLinks = [
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

export function FooterSection() {
  return (
    <footer id="site-footer" className="relative bg-white px-4 sm:px-8 md:px-[124px] pt-10 pb-10 text-[#1f2327]">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
        <div className="max-w-[360px]">
          <Link href="/" className="mb-5 inline-block">
            <img src="/transparent-bg-black.webp" alt="Savv Pro logo" className="h-[38px] w-auto" />
          </Link>
          <p className="mb-3 text-[14px] leading-[1.5] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
            Sovereign AI enterprise. Designing, deploying, and governing AI systems for high-trust businesses.
          </p>
          <p className="text-[14px] leading-[1.5] text-[#5a5a5a] [font-family:Poppins,sans-serif]">Islamabad, Pakistan · Global Delivery</p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="mailto:info@savv.pro"
              aria-label="Email Savv Pro"
              className="inline-flex size-10 items-center justify-center rounded-full border border-[#1f2327]/12 text-[#1f2327] transition-colors duration-150 hover:border-[#8b71fe]/30 hover:bg-[#f0edff] hover:text-[#8b71fe]"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
                <path
                  d="M4 7.5l8 5.5 8-5.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="3.25"
                  y="5.25"
                  width="17.5"
                  height="13.5"
                  rx="2.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/savv-pro/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Savv Pro on LinkedIn"
              className="inline-flex size-10 items-center justify-center rounded-full border border-[#1f2327]/12 text-[#1f2327] transition-colors duration-150 hover:border-[#8b71fe]/30 hover:bg-[#f0edff] hover:text-[#8b71fe]"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                <path d="M6.94 8.5a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88ZM5.7 10.03h2.48V18H5.7v-7.97Zm4.03 0h2.37v1.09h.03c.33-.63 1.14-1.3 2.35-1.3 2.5 0 2.96 1.64 2.96 3.77V18h-2.47v-3.9c0-.93-.02-2.12-1.29-2.12-1.3 0-1.5 1.01-1.5 2.05V18H9.73v-7.97Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {footerLinks.map(({ title, items }) => (
            <div key={title}>
              <p className="mb-4 md:mb-6 text-[10px] uppercase tracking-[0.4px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">{title}</p>
              <ul className="space-y-1 text-[14px] [font-family:Poppins,sans-serif]">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-[#1f2327] transition-colors duration-150 hover:text-[#8b71fe]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-[#1f2327]/20 pt-7" />

      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[10px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">© 2026 Savv Pro. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:text-[#1f2327]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:text-[#1f2327]"
          >
            Terms of Service
          </Link>
          <a
            href="#top"
            aria-label="Back to top"
            className="inline-flex size-[52px] items-center justify-center rounded-full border-2 border-[#1f2327]/85 bg-[#1f2327] text-white shadow-[0_4px_24px_rgba(0,0,0,0.16)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#2d3238] md:size-[60px]"
          >
            <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden>
              <path
                d="M6 15l6-6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 10l6-6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
