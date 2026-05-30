// app.jsx — Excelsior Club shell: theme, navigation, tab bar, tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "residence",
  "mode": "dark",
  "bgPreset": "auto",
  "accent": "#C6A86B",
  "displayFont": "cormorant",
  "density": "comfortable"
}/*EDITMODE-END*/;

const TABS = [
  { id: 'home', label: 'Club', icon: 'home' },
  { id: 'events', label: 'Events', icon: 'calendar' },
  { id: 'network', label: 'Network', icon: 'users' },
  { id: 'inbox', label: 'Inbox', icon: 'chat' },
  { id: 'card', label: 'Card', icon: 'card' },
];

function TabBar({ t, active, onTab, unread }) {
  return (
    <div style={{
      flexShrink: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around',
      padding: '10px 8px 22px', background: hexA(t.bg, 0.9),
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderTop: `1px solid ${t.line2}`,
    }}>
      {TABS.map((tab) => {
        const on = active === tab.id;
        return (
          <button key={tab.id} onClick={() => onTab(tab.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative', minWidth: 52,
          }}>
            <div style={{ position: 'relative' }}>
              <EXIcon name={tab.icon} size={24} color={on ? t.accent : t.faint} sw={on ? 1.9 : 1.6} fill={false} />
              {tab.id === 'inbox' && unread > 0 && (
                <div style={{ position: 'absolute', top: -3, right: -5, minWidth: 15, height: 15, padding: '0 4px', borderRadius: 999, background: t.accent, color: t.onAccent, fontFamily: t.fonts.sans, fontSize: 9.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${t.bg}` }}>{unread}</div>
              )}
            </div>
            <span style={{ fontFamily: t.fonts.titling, fontSize: 9.5, letterSpacing: 1.2, textTransform: 'uppercase', color: on ? t.accent : t.faint }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function FadeIn({ trigger, children, kind }) {
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    setOn(false);
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(r);
  }, [trigger]);
  const off = kind === 'push' ? 'translateX(26px)' : kind === 'pop' ? 'translateX(-20px)' : 'translateY(7px)';
  return (
    <div style={{ opacity: on ? 1 : 0, transform: on ? 'none' : off, transition: 'opacity .3s ease, transform .32s cubic-bezier(.22,.61,.36,1)' }}>
      {children}
    </div>
  );
}

function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const t = makeTheme(tw);
  const [entered, setEntered] = React.useState(false);
  const [tab, setTab] = React.useState('home');
  const [stack, setStack] = React.useState([]); // [{name, params}]
  const [anim, setAnim] = React.useState('');
  const scrollRef = React.useRef(null);

  const resetScroll = () => { if (scrollRef.current) scrollRef.current.scrollTop = 0; };
  const nav = {
    tab: (id) => { setStack([]); setTab(id); setAnim('fade'); resetScroll(); },
    push: (name, params) => { setStack((s) => [...s, { name, params }]); setAnim('push'); resetScroll(); },
    pop: () => { setStack((s) => s.slice(0, -1)); setAnim('pop'); resetScroll(); },
  };

  const current = stack.length ? stack[stack.length - 1] : { name: tab, params: {} };
  const isOverlay = stack.length > 0;
  const D = window.EX_DATA;
  const totalUnread = D.THREADS.reduce((a, x) => a + x.unread, 0);

  const renderScreen = (scr) => {
    const p = { t, nav, params: scr.params };
    switch (scr.name) {
      case 'home': return <HomeScreen {...p} />;
      case 'events': return <EventsScreen {...p} />;
      case 'network': return <NetworkScreen {...p} />;
      case 'inbox': return <InboxScreen {...p} />;
      case 'card': return <CardScreen {...p} />;
      case 'event': return <EventDetail {...p} />;
      case 'requestEvent': return <RequestEventScreen {...p} />;
      case 'member': return <MemberProfile {...p} />;
      case 'thread': return <ThreadScreen {...p} />;
      case 'knowledge': return <KnowledgeScreen {...p} />;
      case 'perks': return <PerksScreen {...p} />;
      case 'pay': return <PayScreen {...p} />;
      default: return <HomeScreen {...p} />;
    }
  };

  if (!entered) {
    return (
      <IOSDevice dark={t.dark} width={402} height={874}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, color: t.text, fontFamily: t.fonts.sans, WebkitFontSmoothing: 'antialiased' }}>
          <div style={{ height: 50, flexShrink: 0, background: t.bg }} />
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
            <Onboarding t={t} onEnter={() => setEntered(true)} />
          </div>
        </div>
        <Tweaks t={t} tw={tw} setTweak={setTweak} />
      </IOSDevice>
    );
  }

  return (
    <IOSDevice dark={t.dark} width={402} height={874}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: t.bg, color: t.text, fontFamily: t.fonts.sans, WebkitFontSmoothing: 'antialiased' }}>
        {/* status-bar safe area */}
        <div style={{ height: 50, flexShrink: 0, background: t.bg }} />
        {/* scroll */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
          <div style={{ paddingBottom: isOverlay ? 0 : 16 }}>{renderScreen(current)}</div>
        </div>
        {!isOverlay && <TabBar t={t} active={tab} onTab={nav.tab} unread={totalUnread} />}
      </div>

      <Tweaks t={t} tw={tw} setTweak={setTweak} />
    </IOSDevice>
  );
}

// ── background swatch picker ────────────────────────────────
function BgPicker({ t, mode, value, onChange }) {
  const dark = mode === 'dark';
  const keys = Object.keys(BG_PRESETS).filter((k) => k === 'auto' || (dark ? BG_PRESETS[k].dark : BG_PRESETS[k].light));
  const swatchFor = (k) => {
    if (k === 'auto') return null;
    const p = dark ? BG_PRESETS[k].dark : BG_PRESETS[k].light;
    return p ? p[0] : null;
  };
  return (
    <div style={{ padding: '4px 0 12px' }}>
      <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.55)', marginBottom: 9, letterSpacing: 0.2 }}>Background</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
        {keys.map((k) => {
          const sw = swatchFor(k);
          const active = value === k;
          return (
            <button key={k} title={BG_PRESETS[k].label} onClick={() => onChange(k)} style={{
              aspectRatio: '1', borderRadius: 9, cursor: 'pointer', position: 'relative',
              background: sw || 'linear-gradient(135deg, #0E0D0B 50%, #F3F0E8 50%)',
              border: active ? '2px solid #111' : '1px solid rgba(0,0,0,0.18)',
              boxShadow: active ? '0 0 0 2px #fff inset' : 'none', padding: 0,
            }}>
              {active && <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: sw && lum(sw) > 0.5 ? '#111' : '#fff', fontSize: 13, fontWeight: 700 }}>✓</span>}
            </button>
          );
        })}
      </div>
      <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: 11.5, color: 'rgba(0,0,0,0.45)', marginTop: 8 }}>{BG_PRESETS[value] ? BG_PRESETS[value].label : 'Auto'}</div>
    </div>
  );
}

// ── Tweaks panel ────────────────────────────────────────────
function Tweaks({ t, tw, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Direction" />
      <TweakRadio label="Aesthetic" value={tw.direction}
        options={['residence', 'atrium']}
        onChange={(v) => {
          // each direction carries its signature defaults, but keep user's mode
          if (v === 'residence') setTweak({ direction: v, accent: '#C6A86B', displayFont: 'cormorant' });
          else setTweak({ direction: v, accent: '#2E5E4E', displayFont: 'sans' });
        }} />
      <div style={{ padding: '2px 2px 10px', fontFamily: t.fonts.sans, fontSize: 11.5, color: 'rgba(0,0,0,0.45)', lineHeight: 1.4 }}>
        {tw.direction === 'residence' ? 'The Residence — dark, serif-led, gold. Classic luxury.' : 'The Atrium — light, editorial, calm. Modern executive.'}
      </div>

      <TweakSection label="Appearance" />
      <TweakRadio label="Theme" value={tw.mode} options={['dark', 'light']} onChange={(v) => setTweak('mode', v)} />
      <BgPicker t={t} mode={tw.mode} value={tw.bgPreset} onChange={(v) => setTweak('bgPreset', v)} />
      <TweakColor label="Accent" value={tw.accent}
        options={['#C6A86B', '#B98A4B', '#2E5E4E', '#7E3B3B', '#3C5A78']}
        onChange={(v) => setTweak('accent', v)} />

      <TweakSection label="Typography" />
      <TweakSelect label="Display font" value={tw.displayFont}
        options={[
          { value: 'cormorant', label: 'Cormorant (serif)' },
          { value: 'caslon', label: 'Caslon (serif)' },
          { value: 'sans', label: 'Hanken (sans)' },
        ]}
        onChange={(v) => setTweak('displayFont', v)} />

      <TweakSection label="Layout" />
      <TweakRadio label="Density" value={tw.density} options={['comfortable', 'compact']} onChange={(v) => setTweak('density', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
