import styles from './LineIcon.module.css';

const paths = {
  code: <path d="M14 8l-4 4 4 4M18 8l4 4-4 4M8 5h16a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2z" />,
  ui: <path d="M7 6h18v16H7zM10 10h5M10 14h12M10 18h7M20 10h2" />,
  speed: <path d="M6 20a10 10 0 1120 0M16 20l5-7M11 16l-2-2M21 11l2-2" />,
  cloud: <path d="M11 21h13a5 5 0 10-1.2-9.85A7 7 0 009 13.2 4 4 0 0011 21zM17 16v-6M14 13l3-3 3 3" />,
  shop: <path d="M8 11h20l-2 8H11L8 6H5M12 25a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zM23 25a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zM12 15h14" />,
  api: <path d="M9 12H7a3 3 0 000 6h2M23 12h2a3 3 0 010 6h-2M11 16h10M14 10l-3 12M21 10l-3 12" />,
  rocket: <path d="M17 21l-6 6-2-6-6-2 6-6c4-4 8-6 16-6 0 8-2 12-6 16zM18 11h.01M9 21l-3 3M13 25l-1 4M5 17l-4 1" />,
  tools: <path d="M20 5a6 6 0 01-7.8 7.8L6 19v5h5l6.2-6.2A6 6 0 0125 10l-4 4-5-5 4-4z" />,
};

export default function LineIcon({ name }) {
  return (
    <svg className={styles.icon} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id={`iconGrad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d5ff" />
          <stop offset="100%" stopColor="#1687ff" />
        </linearGradient>
      </defs>
      <g className={styles[name]} fill="none" stroke={`url(#iconGrad-${name})`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </g>
    </svg>
  );
}
