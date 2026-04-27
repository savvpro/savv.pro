"use client";

import { useState } from "react";

function Bone({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-full bg-[#ececec] animate-pulse ${className}`}
      style={style}
    />
  );
}

function ShimmerSkeleton() {
  return (
    <div className="w-full p-5 flex flex-col gap-4" style={{ height: "1220px" }}>
      {/* Top header: logo | title | google calendar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <Bone className="h-5 w-16" />
          <Bone className="h-5 w-40" />
        </div>
        <div className="flex items-center gap-2">
          <Bone className="h-5 w-5 rounded-sm" />
          <Bone className="h-5 w-28" />
        </div>
      </div>

      {/* Sub-header: 60 min | Google Meet */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-center gap-2">
          <Bone className="h-4 w-4 rounded-full" />
          <Bone className="h-3.5 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Bone className="h-4 w-4 rounded-sm" />
          <Bone className="h-3.5 w-56" />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#ececec] mx-1" />

      {/* Select appointment time + timezone */}
      <div className="flex items-center justify-between px-1">
        <Bone className="h-4 w-44" />
        <Bone className="h-3.5 w-52" />
      </div>

      {/* Main body: mini calendar + week grid */}
      <div className="flex gap-6 flex-1 px-1">
        {/* Mini calendar */}
        <div className="w-[200px] shrink-0 flex flex-col gap-3">
          {/* Month nav */}
          <div className="flex items-center justify-between">
            <Bone className="h-4 w-20" />
            <div className="flex gap-2">
              <Bone className="h-4 w-4 rounded-full" />
              <Bone className="h-4 w-4 rounded-full" />
            </div>
          </div>
          {/* Day-of-week labels */}
          <div className="grid grid-cols-7 gap-1">
            {["S","M","T","W","T","F","S"].map((_, i) => (
              <Bone key={i} className="h-3 w-full rounded-sm" />
            ))}
          </div>
          {/* Date cells */}
          {Array.from({ length: 5 }).map((_, r) => (
            <div key={r} className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, c) => (
                <Bone key={c} className="h-6 w-6 rounded-full" style={{ animationDelay: `${(r * 7 + c) * 20}ms` }} />
              ))}
            </div>
          ))}
        </div>

        {/* Week view */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* Day headers row */}
          <div className="grid grid-cols-7 gap-2 mb-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <Bone className="h-3 w-6" />
                <Bone className="h-8 w-8 rounded-full" />
              </div>
            ))}
          </div>

          {/* Time slot rows — cols 0,5,6 are dashes (empty), cols 1-4 have pills */}
          {Array.from({ length: 14 }).map((_, r) => (
            <div key={r} className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, c) => {
                const isEmpty = c === 5 || c === 6 || (c === 0 && r > 4);
                return isEmpty ? (
                  <div key={c} className="flex items-center justify-center h-9">
                    <Bone className="h-1 w-4 rounded-full" style={{ animationDelay: `${(r + c) * 30}ms` }} />
                  </div>
                ) : (
                  <Bone
                    key={c}
                    className="h-9 w-full rounded-full"
                    style={{ animationDelay: `${(r + c) * 30}ms` }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom banner */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <Bone className="h-4 w-4 rounded-sm" />
        <Bone className="h-3.5 w-48" />
        <Bone className="h-3.5 w-20" />
      </div>
    </div>
  );
}

export function CalendarEmbed({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full" style={{ height: "1220px" }}>
      {!loaded && (
        <div className="absolute inset-0">
          <ShimmerSkeleton />
        </div>
      )}

      <iframe
        src={src}
        title="Savv Pro booking calendar"
        scrolling="no"
        onLoad={() => setLoaded(true)}
        style={{
          display: "block",
          width: "100%",
          height: "1220px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
          border: "none",
        }}
      />
    </div>
  );
}
