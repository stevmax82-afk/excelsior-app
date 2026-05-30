// screens1.jsx — Onboarding + Home dashboard
// Exposes: Onboarding, HomeScreen, EventImage, EventHeroCard, IntroCard, KnowledgeChip, FeedItem, MemberRow

// ── editorial image placeholder ─────────────────────────────
function EventImage({ t, tint, kind, label, height = 150, radius, img }) {
  const [failed, setFailed] = React.useState(false);
  const showImg = img && !failed;
  return (
    <div style={{
      position: 'relative', height, borderRadius: radius ?? t.radiusSm, overflow: 'hidden',
      background: `linear-gradient(150deg, ${tint} 0%, ${hexA(tint, 0.55)} 55%, ${t.dark ? '#000' : tint} 130%)`,
    }}>
      {showImg && <img src={img} alt={label || kind || ''} loading="lazy" onError={() => setFailed(true)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
      {showImg && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(150deg, ${hexA(tint, 0.5)} 0%, ${hexA(tint, 0.18)} 45%, ${hexA('#000', 0.2)} 130%)`, mixBlendMode: 'multiply' }} />}
      {!showImg && <div style={{
        position: 'absolute', inset: 0, opacity: 0.5,
        backgroundImage: `radial-gradient(${hexA('#ffffff', 0.16)} 1px, transparent 1.4px)`,
        backgroundSize: '13px 13px',
      }} />}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 40%, ${hexA('#000', 0.42)})` }} />
      {kind && <div style={{
        position: 'absolute', top: 12, left: 12, padding: '5px 11px', borderRadius: 999,
        background: hexA('#000', 0.28), backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        border: `1px solid ${hexA('#fff', 0.22)}`, color: '#fff', fontFamily: t.fonts.titling,
        fontSize: 10.5, letterSpacing: 1.6, textTransform: 'uppercase',
      }}>{kind}</div>}
      {label && <div style={{
        position: 'absolute', bottom: 12, left: 14, right: 14, color: '#fff',
        fontFamily: t.fonts.sans, fontSize: 12.5, fontWeight: 600, letterSpacing: 0.2,
        display: 'flex', alignItems: 'center', gap: 6, opacity: 0.95,
      }}><EXIcon name="pin" size={14} color="#fff" sw={1.8} />{label}</div>}
    </div>
  );
}

// ── onboarding ──────────────────────────────────────────────
function Onboarding({ t, onEnter }) {
  const [step, setStep] = React.useState('welcome');
  const [applyStep, setApplyStep] = React.useState(0);
  const wrap = (children) => (
    <div style={{ minHeight: '100%', background: t.bg, color: t.text, display: 'flex', flexDirection: 'column' }}>{children}</div>
  );
  const Field = ({ label, value, ph }) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: t.fonts.titling, fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: t.mute, marginBottom: 7 }}>{label}</div>
      <div style={{
        padding: '14px 16px', borderRadius: t.radiusSm, border: `1px solid ${t.line}`,
        background: t.surface, fontFamily: t.fonts.sans, fontSize: 15.5,
        color: value ? t.text : t.faint,
      }}>{value || ph}</div>
    </div>
  );

  if (step === 'welcome') {
    return wrap(
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle, ${t.accentSoft}, transparent 65%)` }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <Monogram t={t} size={62} />
          <div style={{ height: 30 }} />
          <Wordmark t={t} size={26} />
          <div style={{ width: 30, height: 1, background: t.accentLine, margin: '26px 0' }} />
          <div style={{ fontFamily: t.fonts.display, fontStyle: t.fonts.isSerifDisplay ? 'italic' : 'normal', fontSize: 21, lineHeight: 1.5, textAlign: 'center', color: t.mute, fontWeight: 500, maxWidth: 300 }}>
            A private network of the region&rsquo;s most considered leaders.
          </div>
        </div>
        <div style={{ padding: 24, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 1 }}>
          <EXButton t={t} full size="lg" onClick={() => setStep('signin')}>I&rsquo;m a member</EXButton>
          <EXButton t={t} full size="lg" variant="outline" onClick={() => { setStep('apply'); setApplyStep(0); }}>Apply to join</EXButton>
          <div style={{ textAlign: 'center', fontFamily: t.fonts.sans, fontSize: 12.5, color: t.faint, marginTop: 4 }}>By invitation and approval &middot; GCC</div>
        </div>
      </div>
    );
  }

  if (step === 'signin') {
    return wrap(
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 28px 40px' }}>
        <button onClick={() => setStep('welcome')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', alignSelf: 'flex-start', marginBottom: 30 }}>
          <EXIcon name="chevL" size={26} color={t.mute} />
        </button>
        <Monogram t={t} size={44} />
        <h1 style={{ fontFamily: t.fonts.display, fontWeight: 600, fontSize: 34, margin: '20px 0 6px', letterSpacing: t.fonts.isSerifDisplay ? 0 : -0.5 }}>Welcome back.</h1>
        <p style={{ fontFamily: t.fonts.sans, fontSize: 15, color: t.mute, margin: '0 0 32px', lineHeight: 1.5 }}>Sign in to your membership.</p>
        <Field label="Email" value="adam@easytruck.ae" />
        <Field label="Password" value="\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7" />
        <div style={{ flex: 1 }} />
        <EXButton t={t} full size="lg" onClick={onEnter}>Enter the Club</EXButton>
        <div style={{ textAlign: 'center', marginTop: 16, fontFamily: t.fonts.sans, fontSize: 13.5, color: t.accent, fontWeight: 600 }}>Use Face ID instead</div>
      </div>
    );
  }

  // apply flow
  const steps = [
    { label: '01 \u00b7 You', fields: [['Full name', 'Adam Reyes'], ['Role / title', 'Founder & CEO']] },
    { label: '02 \u00b7 Business', fields: [['Company', 'EasyTruck'], ['Sector', 'Logistics & Mobility']] },
    { label: '03 \u00b7 Sponsor', fields: [['Referred by (optional)', 'Khalid Rahman'], ['LinkedIn', 'linkedin.com/in/\u2026']] },
  ];
  if (step === 'apply') {
    const s = steps[applyStep];
    return wrap(
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 28px 40px' }}>
        <button onClick={() => (applyStep === 0 ? setStep('welcome') : setApplyStep(applyStep - 1))} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', alignSelf: 'flex-start', marginBottom: 24 }}>
          <EXIcon name="chevL" size={26} color={t.mute} />
        </button>
        <div style={{ display: 'flex', gap: 6, marginBottom: 26 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= applyStep ? t.accent : t.line }} />
          ))}
        </div>
        <div style={{ fontFamily: t.fonts.titling, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: t.accent, marginBottom: 8 }}>{s.label}</div>
        <h1 style={{ fontFamily: t.fonts.display, fontWeight: 600, fontSize: 30, margin: '0 0 28px', letterSpacing: t.fonts.isSerifDisplay ? 0 : -0.4 }}>
          {applyStep === 0 ? 'Tell us who you are.' : applyStep === 1 ? 'And what you build.' : 'Who can vouch for you?'}
        </h1>
        {s.fields.map(([l, v]) => <Field key={l} label={l} value={v} />)}
        <div style={{ flex: 1 }} />
        <EXButton t={t} full size="lg" onClick={() => (applyStep < 2 ? setApplyStep(applyStep + 1) : setStep('pending'))}>
          {applyStep < 2 ? 'Continue' : 'Submit application'}
        </EXButton>
      </div>
    );
  }

  // pending
  return wrap(
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 36px', textAlign: 'center' }}>
      <div style={{ width: 78, height: 78, borderRadius: '50%', border: `1px solid ${t.accentLine}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.accentSoft }}>
        <EXIcon name="check" size={34} color={t.accent} sw={1.6} />
      </div>
      <h1 style={{ fontFamily: t.fonts.display, fontWeight: 600, fontSize: 30, margin: '28px 0 10px' }}>Application received.</h1>
      <p style={{ fontFamily: t.fonts.sans, fontSize: 15, color: t.mute, lineHeight: 1.6, maxWidth: 290, margin: 0 }}>
        Our membership committee reviews each application personally. You&rsquo;ll hear from us within five working days.
      </p>
      <div style={{ marginTop: 36 }}>
        <EXButton t={t} size="md" variant="accentGhost" icon="arrowR" onClick={onEnter}>Preview the members&rsquo; app</EXButton>
      </div>
    </div>
  );
}

// ── home sub-components ─────────────────────────────────────
function EventHeroCard({ t, ev, rsvp, onOpen }) {
  return (
    <Card t={t} pad={0} onClick={onOpen} style={{ overflow: 'hidden' }}>
      <EventImage t={t} tint={ev.tint} kind={ev.kind} label={ev.venue} height={168} radius={0} img={ev.img} />
      <div style={{ padding: t.cardPad }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9, color: t.accent, fontFamily: t.fonts.sans, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.3 }}>
          <EXIcon name="calendar" size={14} color={t.accent} sw={1.9} />{ev.date} &middot; {ev.time}
        </div>
        <div style={{ fontFamily: t.fonts.display, fontSize: 22, lineHeight: 1.2, fontWeight: 600, letterSpacing: t.fonts.isSerifDisplay ? 0 : -0.3 }}>{ev.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: -8 }}>
            <span style={{ fontFamily: t.fonts.sans, fontSize: 13, color: t.mute }}>{ev.going} attending &middot; {ev.capacity - ev.going} seats left</span>
          </div>
          {rsvp
            ? <Tag t={t} tone="accent"><EXIcon name="check" size={13} color={t.accent} sw={2.2} />Going</Tag>
            : <EXButton t={t} size="sm">RSVP</EXButton>}
        </div>
      </div>
    </Card>
  );
}

function IntroCard({ t, intro, member, onOpen }) {
  return (
    <Card t={t} onClick={onOpen} style={{ width: 230, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <Avatar name={member.name} size={46} t={t} img={member.photo} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: t.fonts.sans, fontWeight: 700, fontSize: 14.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.name}</div>
          <div style={{ fontFamily: t.fonts.sans, fontSize: 12, color: t.mute, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.role}</div>
        </div>
      </div>
      <div style={{ fontFamily: t.fonts.sans, fontSize: 13, color: t.text, lineHeight: 1.45, opacity: 0.85, flex: 1 }}>&ldquo;{intro.reason}.&rdquo;</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <EXButton t={t} size="sm" variant="accentGhost" style={{ flex: 1 }}>Connect</EXButton>
        <EXButton t={t} size="sm" variant="ghost" style={{ flex: 1 }}>View</EXButton>
      </div>
    </Card>
  );
}

function KnowledgeChip({ t, k, onOpen }) {
  const [failed, setFailed] = React.useState(false);
  const showImg = k.img && !failed;
  return (
    <Card t={t} pad={0} onClick={onOpen} style={{ width: 210, flexShrink: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 96, background: `linear-gradient(140deg, ${k.tint}, ${hexA(k.tint, 0.6)})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {showImg && <img src={k.img} alt={k.title} loading="lazy" onError={() => setFailed(true)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
        {showImg && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(140deg, ${hexA(k.tint, 0.55)}, ${hexA('#000', 0.28)})`, mixBlendMode: 'multiply' }} />}
        <div style={{ position: 'relative', width: 44, height: 44, borderRadius: '50%', background: hexA('#000', 0.25), backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${hexA('#fff', 0.25)}` }}>
          <EXIcon name={k.icon} size={20} color="#fff" sw={1.8} fill={k.icon === 'play'} />
        </div>
      </div>
      <div style={{ padding: 13 }}>
        <div style={{ fontFamily: t.fonts.titling, fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: t.accent, marginBottom: 5 }}>{k.type} &middot; {k.dur}</div>
        <div style={{ fontFamily: t.fonts.sans, fontWeight: 600, fontSize: 13.5, lineHeight: 1.3 }}>{k.title}</div>
      </div>
    </Card>
  );
}

function FeedItem({ t, item, member, onOpen }) {
  const toneMap = { Ask: '#3C5A78', Win: '#2E5E4E', Offer: '#9A6B3A' };
  return (
    <div style={{ padding: '16px 0', borderBottom: `1px solid ${t.line2}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 10 }}>
        <Avatar name={member.name} size={40} t={t} img={member.photo} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: t.fonts.sans, fontWeight: 700, fontSize: 14 }}>{member.name}</div>
          <div style={{ fontFamily: t.fonts.sans, fontSize: 12, color: t.mute }}>{member.company} &middot; {item.time}</div>
        </div>
        <span style={{ fontFamily: t.fonts.titling, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: toneMap[item.kind], padding: '3px 9px', borderRadius: 999, border: `1px solid ${hexA(toneMap[item.kind], 0.4)}` }}>{item.kind}</span>
      </div>
      <div style={{ fontFamily: t.fonts.sans, fontSize: 14.5, lineHeight: 1.5, color: t.text, opacity: 0.92 }}>{item.text}</div>
      <div style={{ display: 'flex', gap: 18, marginTop: 12, color: t.mute, fontFamily: t.fonts.sans, fontSize: 13 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><EXIcon name="heart" size={16} color={t.mute} />{item.likes}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><EXIcon name="chat" size={16} color={t.mute} />{item.replies}</span>
      </div>
    </div>
  );
}

function MemberRow({ t, member, onOpen, action }) {
  return (
    <div onClick={onOpen} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 0', cursor: 'pointer' }}>
      <Avatar name={member.name} size={48} t={t} img={member.photo} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontFamily: t.fonts.sans, fontWeight: 700, fontSize: 15 }}>{member.name}</span>
          {member.tier === 'Founding' && <span style={{ fontFamily: t.fonts.titling, fontSize: 9, letterSpacing: 1, color: t.accent, border: `1px solid ${t.accentLine}`, padding: '1.5px 5px', borderRadius: 4 }}>FOUNDING</span>}
        </div>
        <div style={{ fontFamily: t.fonts.sans, fontSize: 13, color: t.mute, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.role}, {member.company}</div>
      </div>
      {action || <EXIcon name="chevR" size={18} color={t.faint} />}
    </div>
  );
}

// ── home screen ─────────────────────────────────────────────
function HomeScreen({ t, nav }) {
  const D = window.EX_DATA;
  const flagship = D.EVENTS[1];
  const upcoming = [D.EVENTS[0], D.EVENTS[3]];
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  return (
    <div>
      {/* top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `8px ${t.pad}px 4px` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Monogram t={t} size={34} />
          <div style={{ fontFamily: t.fonts.titling, fontSize: 15, letterSpacing: 3, color: t.text }}>EXCELSIOR</div>
        </div>
        <div onClick={() => {}} style={{ position: 'relative', cursor: 'pointer' }}>
          <EXIcon name="bell" size={23} color={t.text} sw={1.6} />
          <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, borderRadius: '50%', background: t.accent, border: `1.5px solid ${t.bg}` }} />
        </div>
      </div>

      <div style={{ padding: `14px ${t.pad}px 0` }}>
        <div style={{ fontFamily: t.fonts.sans, fontSize: 14, color: t.mute }}>{greet},</div>
        <h1 style={{ fontFamily: t.fonts.display, fontWeight: 600, fontSize: 30, margin: '2px 0 0', letterSpacing: t.fonts.isSerifDisplay ? 0 : -0.5 }}>{D.ME.name.split(' ')[0]}.</h1>
      </div>

      {/* membership mini card */}
      <div style={{ padding: `16px ${t.pad}px 0` }}>
        <div onClick={() => nav.tab('card')} style={{ cursor: 'pointer', borderRadius: t.radius, padding: '15px 18px', position: 'relative', overflow: 'hidden',
          background: t.dark ? `linear-gradient(120deg, ${t.raised}, ${t.surface})` : `linear-gradient(120deg, #1B1813, #2A251B)`,
          border: `1px solid ${t.dark ? t.line : 'transparent'}` }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${t.accentSoft}, transparent 70%)` }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div>
              <div style={{ fontFamily: t.fonts.titling, fontSize: 10.5, letterSpacing: 2, color: t.accent, textTransform: 'uppercase' }}>{D.ME.tier}</div>
              <div style={{ fontFamily: t.fonts.display, fontSize: 19, color: '#F2EEE4', marginTop: 3, fontWeight: 600 }}>{D.ME.name}</div>
              <div style={{ fontFamily: t.fonts.sans, fontSize: 12, color: hexA('#F2EEE4', 0.55), marginTop: 2 }}>Member {D.ME.memberNo} &middot; since {D.ME.since}</div>
            </div>
            <div style={{ width: 46, height: 46, borderRadius: 10, background: hexA('#F2EEE4', 0.08), border: `1px solid ${hexA('#F2EEE4', 0.18)}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <EXIcon name="qr" size={26} color={t.accent} sw={1.4} />
            </div>
          </div>
        </div>
      </div>

      {/* next event */}
      <div style={{ padding: `26px ${t.pad}px 0` }}>
        <SectionLabel t={t} action="All events" onAction={() => nav.tab('events')}>Your next evening</SectionLabel>
        <EventHeroCard t={t} ev={flagship} rsvp onOpen={() => nav.push('event', { id: flagship.id })} />
      </div>

      {/* intros */}
      <div style={{ paddingTop: 26 }}>
        <div style={{ padding: `0 ${t.pad}px` }}>
          <SectionLabel t={t} action="Network" onAction={() => nav.tab('network')}>People you should meet</SectionLabel>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: `0 ${t.pad}px 4px`, scrollbarWidth: 'none' }}>
          {D.INTROS.map((i) => { const m = D.memberById(i.memberId); return (
            <IntroCard key={i.id} t={t} intro={i} member={m} onOpen={() => nav.push('member', { id: m.id })} />
          ); })}
        </div>
      </div>

      {/* knowledge */}
      <div style={{ paddingTop: 26 }}>
        <div style={{ padding: `0 ${t.pad}px` }}>
          <SectionLabel t={t} action="Hub" onAction={() => nav.push('knowledge', {})}>Knowledge &amp; growth</SectionLabel>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: `0 ${t.pad}px 4px`, scrollbarWidth: 'none' }}>
          {D.KNOWLEDGE.map((k) => <KnowledgeChip key={k.id} t={t} k={k} onOpen={() => nav.push('knowledge', {})} />)}
        </div>
      </div>

      {/* feed */}
      <div style={{ padding: `26px ${t.pad}px 0` }}>
        <SectionLabel t={t} action="Open feed" onAction={() => nav.tab('network')}>From the membership</SectionLabel>
        <div>
          {D.FEED.slice(0, 2).map((f) => { const m = D.memberById(f.memberId); return (
            <FeedItem key={f.id} t={t} item={f} member={m} onOpen={() => nav.push('member', { id: m.id })} />
          ); })}
        </div>
      </div>

      {/* upcoming */}
      <div style={{ padding: `26px ${t.pad}px 0` }}>
        <SectionLabel t={t}>Also on the calendar</SectionLabel>
        <Card t={t} pad={0}>
          {upcoming.map((ev, i) => (
            <div key={ev.id} onClick={() => nav.push('event', { id: ev.id })} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: t.cardPad, borderTop: i ? `1px solid ${t.line2}` : 'none', cursor: 'pointer' }}>
              <div style={{ width: 50, textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontFamily: t.fonts.display, fontSize: 22, fontWeight: 600, lineHeight: 1 }}>{ev.date.split(' ')[1]}</div>
                <div style={{ fontFamily: t.fonts.titling, fontSize: 10, letterSpacing: 1.5, color: t.mute, textTransform: 'uppercase' }}>{ev.date.split(' ')[2]}</div>
              </div>
              <div style={{ width: 1, height: 34, background: t.line }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: t.fonts.sans, fontWeight: 600, fontSize: 14.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</div>
                <div style={{ fontFamily: t.fonts.sans, fontSize: 12.5, color: t.mute }}>{ev.time} &middot; {ev.venue}</div>
              </div>
              <EXIcon name="chevR" size={17} color={t.faint} />
            </div>
          ))}
        </Card>
      </div>

      <div style={{ height: 24 }} />
    </div>
  );
}

Object.assign(window, { Onboarding, HomeScreen, EventImage, EventHeroCard, IntroCard, KnowledgeChip, FeedItem, MemberRow });
