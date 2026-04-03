/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { assets } from "../assets";

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
    <footer id="site-footer" className="relative h-[421px] bg-white px-[124px] pt-10 text-[#1f2327]">
      <div className="flex items-start justify-between">
        <div className="max-w-[360px]">
          <Link href="/" className="mb-5 inline-block">
            <img src="/transparent-bg-black.png" alt="Savv Pro logo" className="h-[38px] w-auto" />
          </Link>
          <p className="mb-3 text-[14px] leading-[1.5] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
            Chicago-based sovereign AI enterprise. Designing, deploying, and governing AI systems for high-trust businesses.
          </p>
          <p className="text-[14px] leading-[1.5] text-[#5a5a5a] [font-family:Poppins,sans-serif]">Chicago, IL · Global Delivery</p>
        </div>

        <div className="grid w-[920px] grid-cols-4 gap-10">
          {footerLinks.map(({ title, items }) => (
            <div key={title}>
              <p className="mb-6 text-[10px] uppercase tracking-[0.4px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">{title}</p>
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

      <div className="mt-12 border-t border-[#1f2327]/20 pt-7" />

      <div className="mt-10 flex items-end justify-between">
        <p className="text-[10px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">© 2026 Savv Pro. All rights reserved.</p>
        <div className="flex items-center gap-5 text-[12px] text-[#5a5a5a] [font-family:Poppins,sans-serif]">
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
          <a href="#" className="transition-colors duration-150 hover:text-[#1f2327]">Accessibility</a>
          <a href="#top" aria-label="Back to top" className="ml-4 inline-flex">
            <img src={assets.scrollTop} alt="Back to top" className="size-[60px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
