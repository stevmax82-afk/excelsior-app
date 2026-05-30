// theme.jsx — Excelsior Club design tokens + shared primitives
// Exposes (global): makeTheme, EXIcon, Avatar, Tag, EXButton, Card, SectionLabel,
//                    Wordmark, Monogram, hairline, lum

// ── color helpers ───────────────────────────────────────────
function lum(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const f = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function onAccent(hex) { return lum(hex) > 0.5 ? '#1A1813' : '#FBF8F1'; }
function hexA(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ── background presets: [bg, surface, raised] per mode ──────
const BG_PRESETS = {
  auto:    { label: 'Auto (direction)' },
  onyx:    { label: 'Onyx',     dark: ['#100E0B', '#1A1710', '#241F16'] },
  espresso:{ label: 'Espresso', dark: ['#1A1209', '#241A10', '#302414'] },
  ink:     { label: 'Slate',    dark: ['#11141A', '#1A1E26', '#262C36'] },
  forest:  { label: 'Forest',   dark: ['#0D1A14', '#16241D', '#1F3128'] },
  oxblood: { label: 'Oxblood',  dark: ['#1A0E0E', '#261717', '#341F1E'] },
  navy:    { label: 'Midnight', dark: ['#0D1422', '#18202F', '#222C3E'] },
  ivory:   { label: 'Ivory',    light: ['#F3F0E8', '#FFFFFF', '#FFFFFF'] },
  paper:   { label: 'Paper',    light: ['#F5F5EF', '#FFFFFF', '#FFFFFF'] },
  sand:    { label: 'Sand',     light: ['#EEE7D9', '#FFFDF8', '#FFFDF8'] },
  mist:    { label: 'Mist',     light: ['#EBEEEC', '#FFFFFF', '#FFFFFF'] },
  porcelain:{label: 'Porcelain',light: ['#ECECEA', '#FFFFFF', '#FFFFFF'] },
};

// ── theme factory ───────────────────────────────────────────
function makeTheme({ direction, mode, accent, displayFont, density, bgPreset }) {
  const dark = mode === 'dark';
  const warm = direction === 'residence';
  const base = dark
    ? {
        bg: warm ? '#0E0D0B' : '#0F1210',
        surface: warm ? '#17150F' : '#181C18',
        raised: warm ? '#211D15' : '#222722',
        line: 'rgba(255,255,255,0.11)',
        line2: 'rgba(255,255,255,0.06)',
        text: warm ? '#F2EEE4' : '#EDF0EB',
        mute: 'rgba(240,236,226,0.62)',
        faint: 'rgba(240,236,226,0.36)',
        chip: 'rgba(255,255,255,0.06)',
      }
    : {
        bg: warm ? '#F2EFE7' : '#F4F4EE',
        surface: '#FFFFFF',
        raised: '#FFFFFF',
        line: warm ? 'rgba(24,22,15,0.11)' : 'rgba(20,22,18,0.11)',
        line2: warm ? 'rgba(24,22,15,0.06)' : 'rgba(20,22,18,0.055)',
        text: warm ? '#1B1813' : '#181B15',
        mute: warm ? 'rgba(27,24,19,0.60)' : 'rgba(24,27,21,0.58)',
        faint: warm ? 'rgba(27,24,19,0.40)' : 'rgba(24,27,21,0.38)',
        chip: warm ? 'rgba(24,22,15,0.045)' : 'rgba(20,22,18,0.045)',
      };
  // ── background presets (override bg/surface/raised) ──────
  const preset = BG_PRESETS[bgPreset];
  if (preset && bgPreset !== 'auto') {
    const p = dark ? preset.dark : preset.light;
    if (p) { base.bg = p[0]; base.surface = p[1]; base.raised = p[2]; }
  }
  const sans = '"Hanken Grotesk", system-ui, sans-serif';
  const display = displayFont === 'sans'
    ? '"Hanken Grotesk", system-ui, sans-serif'
    : displayFont === 'caslon'
      ? '"Libre Caslon Display", Georgia, serif'
      : '"Cormorant Garamond", Georgia, serif';
  const titling = '"Marcellus", Georgia, serif';
  const isSerifDisplay = displayFont !== 'sans';
  const comfy = density !== 'compact';
  return {
    dark, warm, ...base,
    accent, onAccent: onAccent(accent), accentSoft: hexA(accent, dark ? 0.16 : 0.12),
    accentLine: hexA(accent, dark ? 0.4 : 0.34),
    fonts: { sans, display, titling, isSerifDisplay },
    radius: warm ? 15 : 22,
    radiusSm: warm ? 10 : 14,
    pad: comfy ? 20 : 16,
    gap: comfy ? 16 : 12,
    cardPad: comfy ? 18 : 14,
    shadow: dark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 12px 30px rgba(30,26,18,0.10)',
  };
}

// ── icon set (stroke, 24 grid) ──────────────────────────────
const EX_PATHS = {
  home: 'M3 10.5 12 3l9 7.5M5.5 9v11h13V9',
  calendar: 'M4 6h16v15H4zM4 10h16M8 3v5M16 3v5',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20c0-3.6 2.9-5.5 6.5-5.5s6.5 1.9 6.5 5.5M17 11.5a3 3 0 0 0 0-6M21.5 20c0-2.6-1.4-4.3-3.8-4.9',
  chat: 'M4 5h16v11H9l-4 4v-4H4z',
  card: 'M3 6h18v12H3zM3 10h18M7 15h5',
  search: 'm20 20-4.2-4.2M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z',
  chevR: 'm9 5 7 7-7 7',
  chevL: 'm15 5-7 7 7 7',
  chevD: 'm5 9 7 7 7-7',
  arrowR: 'M4 12h15m-6-6 6 6-6 6',
  star: 'M12 3.5 14.6 9l6 .8-4.4 4.2 1.1 6L12 17.1 6.7 20l1.1-6L3.4 9.8 9.4 9z',
  check: 'm5 12.5 4.5 4.5L19 7',
  plus: 'M12 5v14M5 12h14',
  bell: 'M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6ZM9.5 20a2.5 2.5 0 0 0 5 0',
  pin: 'M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12ZM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3.5 2.2',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  spark: 'M12 3v4m0 10v4m9-9h-4M7 12H3m13.5-5.5-2.8 2.8M9.3 14.7l-2.8 2.8m11-0-2.8-2.8M9.3 9.3 6.5 6.5',
  play: 'M8 5.5v13l11-6.5z',
  gift: 'M4 11h16v9H4zM4 11V8h16v3M12 8V20M12 8C9 8 8 4 12 4s3 4 0 4Z',
  gear: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.5 12c0-.6-.1-1.2-.2-1.7l2-1.5-2-3.5-2.4 1a7.5 7.5 0 0 0-2.9-1.7L13.5 1h-3l-.5 2.6A7.5 7.5 0 0 0 7 5.3l-2.4-1-2 3.5 2 1.5c-.1.5-.2 1.1-.2 1.7s.1 1.2.2 1.7l-2 1.5 2 3.5 2.4-1c.8.7 1.8 1.3 2.9 1.7l.5 2.6h3l.5-2.6c1.1-.4 2-1 2.9-1.7l2.4 1 2-3.5-2-1.5c.1-.5.2-1.1.2-1.7Z',
  close: 'M6 6l12 12M18 6 6 18',
  filter: 'M3 5h18l-7 8v6l-4-2v-4z',
  share: 'M16 6 12 2 8 6M12 2v13M5 12v8h14v-8',
  qr: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z',
  mic: 'M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3ZM6 11a6 6 0 0 0 12 0M12 17v4',
  headphones: 'M4 13v-1a8 8 0 0 1 16 0v1M4 13h3v6H5a1 1 0 0 1-1-1zM20 13h-3v6h2a1 1 0 0 0 1-1z',
  briefcase: 'M3 8h18v12H3zM8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18',
  handshake: 'M11 7 8 4 2 9l3 3M13 7l3-3 6 5-3 3M5 12l3 3M19 12l-3 3-3-3-2 2 3 3 5-5',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18',
  heart: 'M12 20S4 14.5 4 8.8C4 6 6 4 8.4 4c1.6 0 2.9.9 3.6 2.2C12.7 4.9 14 4 15.6 4 18 4 20 6 20 8.8 20 14.5 12 20 12 20Z',
  quote: 'M9 7c-2.5 0-4 2-4 4.5S6.5 16 9 16M9 7v9M19 7c-2.5 0-4 2-4 4.5S16.5 16 19 16M19 7v9',
  doc: 'M6 3h8l4 4v14H6zM14 3v4h4',
};
function EXIcon({ name, size = 22, color = 'currentColor', sw = 1.6, fill = false, style }) {
  const d = EX_PATHS[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? color : 'none'}
      stroke={fill ? 'none' : color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}>
      <path d={d} />
    </svg>
  );
}

// ── avatar (initials, no fake faces) ────────────────────────
const AV_TINTS = [
  ['#3C5A78', '#fff'], ['#2E5E4E', '#fff'], ['#7E3B3B', '#fff'],
  ['#6B5B95', '#fff'], ['#9A6B3A', '#fff'], ['#46566B', '#fff'],
  ['#5C6B4A', '#fff'], ['#8A5A4A', '#fff'],
];
function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}
function Avatar({ name, size = 44, ring, t, img }) {
  const idx = (name.charCodeAt(0) + (name.charCodeAt(name.length - 1) || 0)) % AV_TINTS.length;
  const [bg, fg] = AV_TINTS[idx];
  const [failed, setFailed] = React.useState(false);
  const ringShadow = ring ? `0 0 0 2px ${ring}` : 'none';
  if (img && !failed) {
    return (
      <img src={img} alt={name} onError={() => setFailed(true)} loading="lazy" style={{
        width: size, height: size, borderRadius: '50%', objectFit: 'cover',
        flexShrink: 0, display: 'block', boxShadow: ringShadow, background: bg,
      }} />
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: bg, color: fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      fontFamily: t ? t.fonts.titling : 'serif', fontSize: size * 0.36, letterSpacing: 0.5,
      boxShadow: ringShadow, userSelect: 'none',
    }}>{initials(name)}</div>
  );
}

// ── small pieces ────────────────────────────────────────────
function Tag({ t, children, tone = 'default', style }) {
  const isAccent = tone === 'accent';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 600,
      letterSpacing: 0.3, fontFamily: t.fonts.sans, whiteSpace: 'nowrap',
      background: isAccent ? t.accentSoft : t.chip,
      color: isAccent ? (t.dark ? t.accent : t.accent) : t.mute,
      border: `1px solid ${isAccent ? t.accentLine : t.line2}`,
      ...style,
    }}>{children}</span>
  );
}

function SectionLabel({ t, children, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
      <div style={{
        fontFamily: t.fonts.titling, fontSize: 12.5, letterSpacing: 1.8,
        textTransform: 'uppercase', color: t.mute, minWidth: 0,
      }}>{children}</div>
      {action && (
        <button onClick={onAction} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0,
          fontFamily: t.fonts.sans, fontSize: 12.5, fontWeight: 600, letterSpacing: 0.2,
          color: t.accent, display: 'flex', alignItems: 'center', gap: 2, whiteSpace: 'nowrap',
        }}>{action}<EXIcon name="chevR" size={13} color={t.accent} sw={2} /></button>
      )}
    </div>
  );
}

function Card({ t, children, style, onClick, pad }) {
  return (
    <div onClick={onClick} style={{
      background: t.surface, borderRadius: t.radius, border: `1px solid ${t.line}`,
      padding: pad ?? t.cardPad, boxSizing: 'border-box',
      cursor: onClick ? 'pointer' : 'default', ...style,
    }}>{children}</div>
  );
}

function EXButton({ t, children, onClick, variant = 'solid', size = 'md', full, icon, style }) {
  const pad = size === 'lg' ? '16px 22px' : size === 'sm' ? '8px 14px' : '13px 18px';
  const fs = size === 'lg' ? 16 : size === 'sm' ? 13 : 15;
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: pad, fontSize: fs, fontWeight: 600, fontFamily: t.fonts.sans,
    letterSpacing: 0.2, borderRadius: 999, cursor: 'pointer', width: full ? '100%' : undefined,
    boxSizing: 'border-box', transition: 'opacity .15s, background .15s', border: '1px solid transparent',
    whiteSpace: 'nowrap',
  };
  const variants = {
    solid: { background: t.accent, color: t.onAccent, border: 'none' },
    outline: { background: 'transparent', color: t.text, border: `1px solid ${t.line}` },
    ghost: { background: t.chip, color: t.text, border: `1px solid ${t.line2}` },
    accentGhost: { background: t.accentSoft, color: t.accent, border: `1px solid ${t.accentLine}` },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}
      onMouseDown={(e) => (e.currentTarget.style.opacity = 0.82)}
      onMouseUp={(e) => (e.currentTarget.style.opacity = 1)}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}>
      {icon && <EXIcon name={icon} size={fs + 2} color={variant === 'solid' ? t.onAccent : (variant === 'accentGhost' ? t.accent : t.text)} sw={1.9} />}
      {children}
    </button>
  );
}

// ── brand marks ─────────────────────────────────────────────
function Monogram({ t, size = 40, tone }) {
  const c = tone || t.accent;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
      <circle cx="24" cy="24" r="22.5" fill="none" stroke={c} strokeWidth="1" opacity="0.55" />
      <circle cx="24" cy="24" r="18.5" fill="none" stroke={c} strokeWidth="0.7" opacity="0.3" />
      <text x="24" y="24" textAnchor="middle" dominantBaseline="central"
        fontFamily='"Marcellus", serif' fontSize="22" fill={c} letterSpacing="0">E</text>
    </svg>
  );
}

function Wordmark({ t, color, size = 15, sub = true }) {
  const c = color || t.text;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, lineHeight: 1 }}>
      <div style={{
        fontFamily: t.fonts.titling, fontSize: size * 0.62, letterSpacing: size * 0.28,
        color: c, opacity: 0.7, textIndent: size * 0.28,
      }}>THE</div>
      <div style={{
        fontFamily: t.fonts.titling, fontSize: size, letterSpacing: size * 0.22,
        color: c, textIndent: size * 0.22,
      }}>EXCELSIOR</div>
      {sub && <div style={{
        fontFamily: t.fonts.titling, fontSize: size * 0.62, letterSpacing: size * 0.5,
        color: c, opacity: 0.7, textIndent: size * 0.5, marginTop: 1,
      }}>CLUB</div>}
    </div>
  );
}

Object.assign(window, {
  makeTheme, BG_PRESETS, EXIcon, Avatar, Tag, EXButton, Card, SectionLabel, Wordmark, Monogram,
  lum, hexA, initials,
});
