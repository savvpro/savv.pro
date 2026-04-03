import Link from "next/link";

export function LegalMarketingFooter() {
  return (
    <footer className="mt-20 border-t border-[#1f2327]/15 pt-14 [font-family:Poppins,sans-serif]">
      <div>
        <p className="text-[18px] font-semibold tracking-wide text-[#1f2327]">SAVV.PRO</p>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#5a5a5a]">
          Revolutionizing mobile AI infrastructure with cutting-edge technology for developers worldwide.
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-[#1f2327]/10 pt-8 text-[13px] text-[#5a5a5a] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Savv.Pro. All rights reserved.</p>
        <div className="flex flex-wrap gap-6">
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#8b71fe]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#8b71fe]"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
