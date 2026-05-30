// screens3.jsx — Inbox + Thread + Membership card + Pay + Knowledge + Perks
// Exposes: InboxScreen, ThreadScreen, CardScreen, PayScreen, KnowledgeScreen, PerksScreen, MembershipCard

// ── Inbox ───────────────────────────────────────────────────
function InboxScreen({ t, nav }) {
  const D = window.EX_DATA;
  return (
    <div>
      <ScreenTitle t={t} sub="Direct & private" title="Inbox" right={
        <button style={{ background: t.chip, border: `1px solid ${t.line2}`, width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <EXIcon name="plus" size={20} color={t.text} sw={2} />
        </button>} />
      <div style={{ padding: `4px ${t.pad}px 14px` }}><SearchBar t={t} placeholder="Search conversations" /></div>
      <div style={{ padding: `0 ${t.pad}px` }}>
        {D.THREADS.map((th, i) => { const m = D.memberById(th.memberId); return (
          <div key={th.id} onClick={() => nav.push('thread', { memberId: m.id })} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 0', borderTop: i ? `1px solid ${t.line2}` : 'none', cursor: 'pointer' }}>
            <Avatar name={m.name} size={52} t={t} img={m.photo} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: t.fonts.sans, fontWeight: 700, fontSize: 15 }}>{m.name}</span>
                <span style={{ fontFamily: t.fonts.sans, fontSize: 12, color: t.faint }}>{th.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
                <span style={{ flex: 1, fontFamily: t.fonts.sans, fontSize: 13.5, color: th.unread ? t.text : t.mute, fontWeight: th.unread ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{th.last}</span>
                {th.unread > 0 && <span style={{ minWidth: 19, height: 19, padding: '0 5px', borderRadius: 999, background: t.accent, color: t.onAccent, fontFamily: t.fonts.sans, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{th.unread}</span>}
              </div>
            </div>
          </div>
        ); })}
      </div>
    </div>
  );
}

function ThreadScreen({ t, params, nav }) {
  const D = window.EX_DATA;
  const m = D.memberById(params.memberId);
  const th = D.THREADS.find((x) => x.memberId === params.memberId) || { msgs: [] };
  const msgs = th.msgs.length ? th.msgs : [{ me: false, text: `Hi ${D.ME.name.split(' ')[0]} \u2014 great to connect here.`, time: 'now' }];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <PushHeader t={t} onBack={nav.pop} title="" right={null} />
      <div style={{ marginTop: -54, paddingTop: 54 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 0 16px', borderBottom: `1px solid ${t.line2}` }}>
          <Avatar name={m.name} size={56} t={t} img={m.photo} />
          <div style={{ fontFamily: t.fonts.sans, fontWeight: 700, fontSize: 16, marginTop: 9 }}>{m.name}</div>
          <div style={{ fontFamily: t.fonts.sans, fontSize: 12.5, color: t.mute }}>{m.role}, {m.company}</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: `18px ${t.pad}px`, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ textAlign: 'center', fontFamily: t.fonts.sans, fontSize: 11.5, color: t.faint, marginBottom: 4 }}>Connected at Founders&rsquo; Roundtable &middot; June</div>
        {msgs.map((msg, i) => (
          <div key={i} style={{ alignSelf: msg.me ? 'flex-end' : 'flex-start', maxWidth: '78%' }}>
            <div style={{
              padding: '11px 15px', borderRadius: 20, fontFamily: t.fonts.sans, fontSize: 14.5, lineHeight: 1.45,
              background: msg.me ? t.accent : t.surface, color: msg.me ? t.onAccent : t.text,
              border: msg.me ? 'none' : `1px solid ${t.line}`,
              borderBottomRightRadius: msg.me ? 6 : 20, borderBottomLeftRadius: msg.me ? 20 : 6,
            }}>{msg.text}</div>
            <div style={{ fontFamily: t.fonts.sans, fontSize: 11, color: t.faint, marginTop: 4, textAlign: msg.me ? 'right' : 'left', padding: '0 6px' }}>{msg.time}</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'sticky', bottom: 0, padding: `12px ${t.pad}px 28px`, background: hexA(t.bg, 0.92), backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: `1px solid ${t.line2}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, padding: '12px 18px', borderRadius: 999, background: t.chip, border: `1px solid ${t.line2}`, fontFamily: t.fonts.sans, fontSize: 14.5, color: t.faint }}>Message&hellip;</div>
        <button style={{ width: 44, height: 44, borderRadius: '50%', background: t.accent, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <EXIcon name="arrowR" size={20} color={t.onAccent} sw={2} />
        </button>
      </div>
    </div>
  );
}

// ── Membership card (luxe, theme-independent dark foil) ─────
function MembershipCard({ t, large }) {
  const D = window.EX_DATA;
  const h = large ? 220 : 200;
  return (
    <div style={{ position: 'relative', height: h, borderRadius: 20, overflow: 'hidden', background: 'linear-gradient(135deg, #211C13 0%, #14110B 55%, #2A2317 100%)', boxShadow: t.shadow, border: `1px solid ${hexA(t.accent, 0.3)}` }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: `radial-gradient(${hexA(t.accent, 0.1)} 1px, transparent 1.4px)`, backgroundSize: '15px 15px' }} />
      <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${hexA(t.accent, 0.22)}, transparent 70%)` }} />
      <div style={{ position: 'relative', padding: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: t.fonts.titling, fontSize: 13, letterSpacing: 4, color: '#E9DEC6' }}>EXCELSIOR</div>
            <div style={{ fontFamily: t.fonts.titling, fontSize: 9, letterSpacing: 3, color: hexA('#E9DEC6', 0.6), marginTop: 2 }}>MEMBERS&rsquo; CLUB</div>
          </div>
          <Monogram t={t} size={40} tone="#D8B978" />
        </div>
        <div>
          <div style={{ fontFamily: t.fonts.titling, fontSize: 10, letterSpacing: 2, color: hexA('#D8B978', 0.9), textTransform: 'uppercase', marginBottom: 4 }}>{D.ME.tier}</div>
          <div style={{ fontFamily: t.fonts.display, fontSize: 24, fontWeight: 600, color: '#F4ECD9' }}>{D.ME.name}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12 }}>
            <div>
              <div style={{ fontFamily: t.fonts.sans, fontSize: 10, color: hexA('#E9DEC6', 0.5), letterSpacing: 1 }}>MEMBER NO.</div>
              <div style={{ fontFamily: t.fonts.titling, fontSize: 15, color: '#E9DEC6', letterSpacing: 1 }}>{D.ME.memberNo}</div>
            </div>
            <div>
              <div style={{ fontFamily: t.fonts.sans, fontSize: 10, color: hexA('#E9DEC6', 0.5), letterSpacing: 1 }}>SINCE</div>
              <div style={{ fontFamily: t.fonts.titling, fontSize: 15, color: '#E9DEC6', letterSpacing: 1 }}>{D.ME.since.split(' ')[1]}</div>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 9, background: '#F4ECD9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <EXIcon name="qr" size={30} color="#14110B" sw={1.4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardScreen({ t, nav }) {
  const D = window.EX_DATA;
  const links = [
    { icon: 'gift', label: 'Member perks', sub: `${D.PERKS.length} partner offers`, go: () => nav.push('perks', {}) },
    { icon: 'headphones', label: 'Knowledge hub', sub: 'Podcasts, replays & masterminds', go: () => nav.push('knowledge', {}) },
    { icon: 'briefcase', label: 'My profile', sub: 'How members see you', go: () => nav.push('member', { id: 'm1' }) },
    { icon: 'gear', label: 'Settings & privacy', sub: 'Notifications, visibility', go: () => {} },
  ];
  return (
    <div>
      <ScreenTitle t={t} sub="Your membership" title="The Card" />
      <div style={{ padding: `6px ${t.pad}px 0` }}>
        <MembershipCard t={t} large />
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <EXButton t={t} size="md" full variant="ghost" icon="qr">Show pass</EXButton>
          <EXButton t={t} size="md" full variant="ghost" icon="share">Add to Wallet</EXButton>
        </div>
      </div>

      {/* plan / renewal */}
      <div style={{ padding: `24px ${t.pad}px 0` }}>
        <SectionLabel t={t}>Plan</SectionLabel>
        <Card t={t}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: t.fonts.display, fontSize: 19, fontWeight: 600 }}>{D.ME.plan} membership</div>
              <div style={{ fontFamily: t.fonts.sans, fontSize: 13, color: t.mute, marginTop: 2 }}>Renews {D.ME.renews}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: t.fonts.display, fontSize: 19, fontWeight: 600, color: t.accent }}>AED 4,995</div>
              <div style={{ fontFamily: t.fonts.sans, fontSize: 12, color: t.faint }}>per year</div>
            </div>
          </div>
          <div style={{ height: 1, background: t.line2, margin: '14px 0' }} />
          <div style={{ display: 'flex', gap: 10 }}>
            <EXButton t={t} size="md" full onClick={() => nav.push('pay', {})}>Manage membership</EXButton>
          </div>
        </Card>
      </div>

      <div style={{ padding: `24px ${t.pad}px 0` }}>
        <Card t={t} pad={0}>
          {links.map((l, i) => (
            <div key={l.label} onClick={l.go} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: t.cardPad, borderTop: i ? `1px solid ${t.line2}` : 'none', cursor: 'pointer' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: t.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <EXIcon name={l.icon} size={20} color={t.accent} sw={1.7} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: t.fonts.sans, fontWeight: 600, fontSize: 15 }}>{l.label}</div>
                <div style={{ fontFamily: t.fonts.sans, fontSize: 12.5, color: t.mute }}>{l.sub}</div>
              </div>
              <EXIcon name="chevR" size={18} color={t.faint} />
            </div>
          ))}
        </Card>
      </div>
      <div style={{ padding: `20px ${t.pad}px 0`, textAlign: 'center' }}>
        <span style={{ fontFamily: t.fonts.titling, fontSize: 11, letterSpacing: 2, color: t.faint }}>THE EXCELSIOR CLUB &middot; EST. 2021</span>
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}

function PayScreen({ t, nav }) {
  const [plan, setPlan] = React.useState('annual');
  const [pay, setPay] = React.useState('card');
  const opts = [
    { id: 'annual', label: 'Annual', price: 'AED 4,995', unit: 'billed yearly', save: 'Save AED 945' },
    { id: 'monthly', label: 'Monthly', price: 'AED 495', unit: 'billed monthly', save: null },
  ];
  const pays = [
    { id: 'card', label: 'Visa \u00b7\u00b7\u00b7\u00b7 4071', icon: 'card' },
    { id: 'tamara', label: 'Tamara \u2014 split in 4', icon: 'spark' },
  ];
  return (
    <div>
      <PushHeader t={t} title="Manage membership" onBack={nav.pop} />
      <div style={{ padding: `8px ${t.pad}px 120px` }}>
        <h2 style={{ fontFamily: t.fonts.display, fontWeight: 600, fontSize: 24, margin: '6px 0 18px' }}>Choose your plan</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {opts.map((o) => {
            const active = plan === o.id;
            return (
              <div key={o.id} onClick={() => setPlan(o.id)} style={{
                padding: 18, borderRadius: t.radius, cursor: 'pointer',
                border: `1.5px solid ${active ? t.accent : t.line}`, background: active ? t.accentSoft : t.surface,
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${active ? t.accent : t.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {active && <div style={{ width: 11, height: 11, borderRadius: '50%', background: t.accent }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: t.fonts.display, fontSize: 18, fontWeight: 600 }}>{o.label}</span>
                    {o.save && <Tag t={t} tone="accent">{o.save}</Tag>}
                  </div>
                  <div style={{ fontFamily: t.fonts.sans, fontSize: 12.5, color: t.mute, marginTop: 2 }}>{o.unit}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: t.fonts.display, fontSize: 18, fontWeight: 600 }}>{o.price}</div>
                </div>
              </div>
            );
          })}
        </div>

        <SectionLabel t={t}>Payment method</SectionLabel>
        <Card t={t} pad={0}>
          {pays.map((p, i) => {
            const active = pay === p.id;
            return (
              <div key={p.id} onClick={() => setPay(p.id)} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: t.cardPad, borderTop: i ? `1px solid ${t.line2}` : 'none', cursor: 'pointer' }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: t.chip, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <EXIcon name={p.icon} size={18} color={t.text} sw={1.7} />
                </div>
                <span style={{ flex: 1, fontFamily: t.fonts.sans, fontSize: 15, fontWeight: 500 }}>{p.label}</span>
                <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${active ? t.accent : t.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {active && <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.accent }} />}
                </div>
              </div>
            );
          })}
        </Card>
      </div>
      <div style={{ position: 'sticky', bottom: 0, padding: `14px ${t.pad}px 30px`, background: hexA(t.bg, 0.92), backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: `1px solid ${t.line2}` }}>
        <EXButton t={t} size="lg" full onClick={nav.pop}>Confirm &middot; {plan === 'annual' ? 'AED 4,995 / yr' : 'AED 495 / mo'}</EXButton>
      </div>
    </div>
  );
}

// ── Knowledge ───────────────────────────────────────────────
function KnowledgeScreen({ t, nav }) {
  const D = window.EX_DATA;
  const feat = D.KNOWLEDGE[0];
  return (
    <div>
      <PushHeader t={t} title="Knowledge & growth" onBack={nav.pop} />
      <div style={{ padding: `8px ${t.pad}px 0` }}>
        <Card t={t} pad={0} style={{ overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ position: 'relative', height: 170, background: `linear-gradient(140deg, ${feat.tint}, ${hexA(feat.tint, 0.55)})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {feat.img && <img src={feat.img} alt={feat.title} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
            {feat.img
              ? <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(140deg, ${hexA(feat.tint, 0.55)}, ${hexA('#000', 0.3)})`, mixBlendMode: 'multiply' }} />
              : <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: `radial-gradient(${hexA('#fff', 0.16)} 1px, transparent 1.4px)`, backgroundSize: '13px 13px' }} />}
            <div style={{ position: 'relative', width: 58, height: 58, borderRadius: '50%', background: hexA('#000', 0.28), backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${hexA('#fff', 0.3)}` }}>
              <EXIcon name="mic" size={26} color="#fff" sw={1.7} />
            </div>
          </div>
          <div style={{ padding: t.cardPad }}>
            <div style={{ fontFamily: t.fonts.titling, fontSize: 10.5, letterSpacing: 1.6, textTransform: 'uppercase', color: t.accent, marginBottom: 6 }}>Latest podcast &middot; {feat.dur}</div>
            <div style={{ fontFamily: t.fonts.display, fontSize: 21, fontWeight: 600, lineHeight: 1.2 }}>{feat.title}</div>
            <div style={{ fontFamily: t.fonts.sans, fontSize: 13.5, color: t.mute, marginTop: 6 }}>with {feat.who}</div>
          </div>
        </Card>

        <SectionLabel t={t}>Library</SectionLabel>
        {D.KNOWLEDGE.slice(1).map((k) => (
          <Card t={t} key={k.id} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: t.gap }}>
            <div style={{ position: 'relative', width: 56, height: 56, borderRadius: t.radiusSm, overflow: 'hidden', background: `linear-gradient(140deg, ${k.tint}, ${hexA(k.tint, 0.6)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {k.img && <img src={k.img} alt={k.title} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
              {k.img && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(140deg, ${hexA(k.tint, 0.5)}, ${hexA('#000', 0.3)})`, mixBlendMode: 'multiply' }} />}
              <EXIcon name={k.icon} size={22} color="#fff" sw={1.7} fill={k.icon === 'play'} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: t.fonts.titling, fontSize: 10, letterSpacing: 1.3, textTransform: 'uppercase', color: t.accent, marginBottom: 4 }}>{k.type} &middot; {k.dur}</div>
              <div style={{ fontFamily: t.fonts.sans, fontWeight: 600, fontSize: 15, lineHeight: 1.3 }}>{k.title}</div>
              <div style={{ fontFamily: t.fonts.sans, fontSize: 12.5, color: t.mute, marginTop: 2 }}>{k.who}</div>
            </div>
            <EXIcon name="chevR" size={18} color={t.faint} />
          </Card>
        ))}
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}

// ── Perks ───────────────────────────────────────────────────
function PerksScreen({ t, nav }) {
  const D = window.EX_DATA;
  return (
    <div>
      <PushHeader t={t} title="Member perks" onBack={nav.pop} />
      <div style={{ padding: `8px ${t.pad}px 0` }}>
        <p style={{ fontFamily: t.fonts.sans, fontSize: 14.5, color: t.mute, lineHeight: 1.55, margin: '4px 0 22px' }}>A curated set of partner privileges, extended only to Excelsior members.</p>
        {D.PERKS.map((p) => (
          <Card t={t} key={p.id} pad={0} style={{ overflow: 'hidden', marginBottom: t.gap }}>
            <div style={{ display: 'flex' }}>
              <div style={{ position: 'relative', width: 84, flexShrink: 0, overflow: 'hidden', background: `linear-gradient(140deg, ${p.tint}, ${hexA(p.tint, 0.6)})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {p.img && <img src={p.img} alt={p.brand} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                {p.img && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(140deg, ${hexA(p.tint, 0.62)}, ${hexA('#000', 0.35)})`, mixBlendMode: 'multiply' }} />}
                <div style={{ position: 'relative' }}><Monogram t={t} size={34} tone="#fff" /></div>
              </div>
              <div style={{ flex: 1, padding: t.cardPad }}>
                <div style={{ fontFamily: t.fonts.titling, fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: t.accent, marginBottom: 5 }}>{p.cat}</div>
                <div style={{ fontFamily: t.fonts.display, fontSize: 17, fontWeight: 600, lineHeight: 1.2 }}>{p.brand}</div>
                <div style={{ fontFamily: t.fonts.sans, fontSize: 13, color: t.mute, marginTop: 4, lineHeight: 1.4 }}>{p.offer}</div>
              </div>
            </div>
            <div style={{ padding: `0 ${t.cardPad}px ${t.cardPad}px`, marginTop: -2 }}>
              <EXButton t={t} size="sm" variant="accentGhost" full>Reveal code</EXButton>
            </div>
          </Card>
        ))}
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}

Object.assign(window, { InboxScreen, ThreadScreen, CardScreen, PayScreen, KnowledgeScreen, PerksScreen, MembershipCard });
