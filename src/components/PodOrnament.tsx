interface PodOrnamentProps {
  className?: string;
}

/** A single cardamom pod, drawn as line art. Purely decorative. */
export function PodOrnament({ className }: PodOrnamentProps) {
  return (
    <svg
      viewBox="0 0 120 250"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M60 14C98 64 106 156 60 236C14 156 22 64 60 14Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M60 14C60 90 60 160 60 236M60 14C82 72 84 160 60 236M60 14C38 72 36 160 60 236"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M60 14V3M53 237h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
