interface LogoProps {
  className?: string;
}

// Fox/wolf silhouette logo matching the design
export default function Logo({ className = "w-8 h-8" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Stylized fox/wolf silhouette */}
      <path
        d="M5 35 L8 28 L6 20 L10 15 L8 8 L15 12 L20 5 L25 12 L32 8 L30 15 L34 20 L32 28 L35 35 L28 32 L20 36 L12 32 Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
