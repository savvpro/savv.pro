import type { ReactNode } from "react";

/**
 * Wraps a piece of content (the AgentTerminal) in a stylised MacBook lid.
 *
 * Anatomy (top-to-bottom):
 *   • Aluminum body — visible silver/space-gray gradient
 *   • Top bezel with a centered NOTCH containing a camera lens
 *   • Black screen bezel surrounding the screen content
 *   • Italic wordmark in the chin (the bottom of the aluminum lid)
 *   • Hinge stub hinting at the keyboard deck just out of frame
 *   • Floor shadow grounding the laptop on the page
 */
export function MacBookFrame({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`mbp ${className}`}>
      <div className="mbp-lid">
        <div className="mbp-bezel">
          <div className="mbp-notch" aria-hidden>
            <div className="mbp-camera" aria-hidden />
          </div>
          <div className="mbp-screen-edge" aria-hidden />
          <div className="mbp-screen">{children}</div>
        </div>
        <div className="mbp-chin" aria-hidden>
          {label ?? "savv.pro"}
        </div>
      </div>
      <div className="mbp-hinge" aria-hidden />
      <div className="mbp-floor-shadow" aria-hidden />
    </div>
  );
}
