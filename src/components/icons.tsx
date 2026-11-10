// 内联 SVG 图标（stroke 使用 currentColor）

export const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const WarnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5v.01" />
  </svg>
);

export const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

export const FlowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="5" cy="6" r="2" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="19" cy="12" r="2" />
    <path d="M7 6h4a3 3 0 0 1 3 3v0a3 3 0 0 0 3 3M7 18h4a3 3 0 0 0 3-3v0a3 3 0 0 1 3-3" />
  </svg>
);

export const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
  </svg>
);

export const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </svg>
);

/** GHS06 急性毒性标志（红框菱形里的骷髅交叉骨），用于含氢氟酸 / 氟化氢铵这类极危险化学品的产品；颜色固定，不随主题变化 */
export const ToxicIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M50 4 96 50 50 96 4 50Z" fill="#fff" stroke="#e1251b" strokeWidth="7" strokeLinejoin="round" />
    <g stroke="#111" strokeWidth="6" strokeLinecap="round">
      <path d="M31 58 69 75M69 58 31 75" />
    </g>
    <g fill="#111">
      <circle cx="29" cy="55.5" r="4" />
      <circle cx="27" cy="60.5" r="4" />
      <circle cx="71" cy="55.5" r="4" />
      <circle cx="73" cy="60.5" r="4" />
      <circle cx="29" cy="77.5" r="4" />
      <circle cx="27" cy="72.5" r="4" />
      <circle cx="71" cy="77.5" r="4" />
      <circle cx="73" cy="72.5" r="4" />
      <path d="M50 24c-9.5 0-15.5 6.6-15.5 14.6 0 5.2 2.6 8.8 6 10.9V56h19v-6.5c3.4-2.1 6-5.7 6-10.9C65.5 30.6 59.5 24 50 24Z" />
    </g>
    <g fill="#fff">
      <ellipse cx="44" cy="40" rx="4.2" ry="4.8" />
      <ellipse cx="56" cy="40" rx="4.2" ry="4.8" />
      <path d="M50 45.5 47.6 50h4.8Z" />
      <rect x="45" y="52" width="1.8" height="4" />
      <rect x="49.1" y="52" width="1.8" height="4" />
      <rect x="53.2" y="52" width="1.8" height="4" />
    </g>
  </svg>
);
