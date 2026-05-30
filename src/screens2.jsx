// screens2.jsx — shared headers + Events + Network + Member profile
// Exposes: ScreenTitle, PushHeader, Segmented, SearchBar, EventsScreen, EventDetail, NetworkScreen, MemberProfile

function ScreenTitle({ t, title, sub, right }) {
  return (
    <div style={{ padding: `8px ${t.pad}px 10px`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      <div>
        {sub && <div style={{ fontFamily: t.fonts.titling, fontSize: 11, letterSpacing: 2.2, textTransform: 'uppercase', color: t.accent, marginBottom: 5 }}>{sub}</div>}
        <h1 style={{ fontFamily: t.fonts.display, fontWeight: 600, fontSize: 32, margin: 0, letterSpacing: t.fonts.isSerifDisplay ? 0 : -0.6 }}>{title}</h1>
      </div>
      {right}
    </div>
  );
}

function PushHeader({ t, title, onBack, right, transparent }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 20, display: 'flex', alignItems: 'center', gap: 10,
      padding: `10px ${t.pad}px 10px`,
      background: transparent ? 'transparent' : hexA(t.bg, 0.86),
      backdropFilter: transparent ? 'none' : 'blur(12px)', WebkitBackdropFilter: transparent ? 'none' : 'blur(12px)',
      borderBottom: transparent ? 'none' : `1px solid ${t.line2}`,
    }}>
      <button onClick={onBack} style={{ background: transparent ? hexA('#000', 0.3) : t.chip, border: `1px solid ${transparent ? hexA('#fff', 0.2) : t.line2}`, width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
        <EXIcon name="chevL" size={20} color={transparent ? '#fff' : t.text} sw={2} />
      </button>
      <div style={{ flex: 1, fontFamily: t.fonts.sans, fontWeight: 700, fontSize: 16, color: transparent ? '#fff' : t.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', opacity: transparent ? 0 : 1 }}>{title}</div>
      {right}
    </div>
  );
}

function Segmented({ t, options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4, padding: 4, background: t.chip, borderRadius: 999, border: `1px solid ${t.line2}` }}>
      {options.map((o) => {
        const active = o === value;
        return (
          <button key={o} onClick={() => onChange(o)} style={{
            flex: 1, padding: '8px 4px', borderRadius: 999, border: 'none', cursor: 'pointer',
            fontFamily: t.fonts.sans, fontSize: 13, fontWeight: 600, letterSpacing: 0.1,
            background: active ? t.accent : 'transparent', color: active ? t.onAccent : t.mute,
            transition: 'all .18s',
          }}>{o}</button>
        );
      })}
    </div>
  );
}

function SearchBar({ t, placeholder }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 15px', background: t.chip, borderRadius: 999, border: `1px solid ${t.line2}` }}>
      <EXIcon name="search" size={18} color={t.faint} />
      <span style={{ fontFamily: t.fonts.sans, fontSize: 14.5, color: t.faint }}>{placeholder}</span>
    </div>
  );
}

// ── Events ──────────────────────────────────────────────────
function EventCard({ t, ev, onOpen, mine }) {
  return (
    <Card t={t} pad={0} onClick={onOpen} style={{ overflow: 'hidden', marginBottom: t.gap }}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 108, flexShrink: 0 }}>
          <EventImage t={t} tint={ev.tint} height={'100%'} radius={0} img={ev.img} />
        </div>
        <div style={{ flex: 1, padding: t.cardPad, minWidth: 0 }}>
          <div style={{ fontFamily: t.fonts.titling, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: t.accent, marginBottom: 6 }}>{ev.kind}</div>
          <div style={{ fontFamily: t.fonts.display, fontSize: 18, lineHeight: 1.2, fontWeight: 600, letterSpacing: t.fonts.isSerifDisplay ? 0 : -0.2 }}>{ev.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 9, fontFamily: t.fonts.sans, fontSize: 12.5, color: t.mute }}>
            <EXIcon name="calendar" size={13} color={t.mute} />{ev.date} &middot; {ev.time.split(' ')[0]}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 11 }}>
            <span style={{ fontFamily: t.fonts.sans, fontSize: 12, color: t.faint }}>{ev.going}/{ev.capacity} going</span>
            {mine ? <Tag t={t} tone="accent"><EXIcon name="check" size={12} color={t.accent} sw={2.2} />Going</Tag>
              : ev.going >= ev.capacity ? <Tag t={t}>Waitlist</Tag>
              : <span style={{ fontFamily: t.fonts.sans, fontSize: 12.5, fontWeight: 700, color: t.accent }}>{ev.price}</span>}
          </div>
        </div>
      </div>
    </Card>
  );
}

function EventsScreen({ t, nav }) {
  const D = window.EX_DATA;
  const [filter, setFilter] = React.useState('Upcoming');
  const mine = ['e2', 'e1'];
  let list = D.EVENTS;
  if (filter === 'Curated') list = D.EVENTS.filter((e) => e.pillar === 'Curated Experiences');
  if (filter === 'Knowledge') list = D.EVENTS.filter((e) => e.pillar === 'Knowledge & Growth');
  if (filter === 'Yours') list = D.EVENTS.filter((e) => mine.includes(e.id));
  return (
    <div>
      <ScreenTitle t={t} sub="Curated experiences" title="Events" />
      <div style={{ padding: `4px ${t.pad}px 16px` }}>
        <Segmented t={t} options={['Upcoming', 'Curated', 'Knowledge', 'Yours']} value={filter} onChange={setFilter} />
      </div>
      <div style={{ padding: `0 ${t.pad}px` }}>
        {list.map((ev) => <EventCard key={ev.id} t={t} ev={ev} mine={mine.includes(ev.id)} onOpen={() => nav.push('event', { id: ev.id })} />)}
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}

function EventDetail({ t, params, nav }) {
  const D = window.EX_DATA;
  const ev = D.EVENTS.find((e) => e.id === params.id);
  const [going, setGoing] = React.useState(['e2', 'e1'].includes(ev.id));
  const attendees = D.MEMBERS.slice(0, 6);
  const full = ev.going >= ev.capacity && !going;
  const expect = [
    { icon: 'clock', label: ev.time },
    { icon: 'pin', label: ev.venue },
    { icon: 'users', label: `${ev.going} attending \u00b7 ${ev.capacity} capacity` },
    { icon: 'star', label: `Hosted by ${ev.host}` },
  ];
  return (
    <div style={{ position: 'relative' }}>
      <PushHeader t={t} title={ev.title} onBack={nav.pop} right={
        <button style={{ background: t.chip, border: `1px solid ${t.line2}`, width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <EXIcon name="share" size={16} color={t.text} sw={1.8} />
        </button>} />
      <div style={{ padding: `4px ${t.pad}px 0` }}>
        <EventImage t={t} tint={ev.tint} kind={ev.pillar} height={240} img={ev.img} />
      </div>
      <div style={{ padding: `20px ${t.pad}px 120px`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: t.accent, fontFamily: t.fonts.sans, fontSize: 13, fontWeight: 700, letterSpacing: 0.3, marginBottom: 8 }}>
          <EXIcon name="calendar" size={15} color={t.accent} sw={1.9} />{ev.date}
        </div>
        <h1 style={{ fontFamily: t.fonts.display, fontWeight: 600, fontSize: 28, lineHeight: 1.18, margin: '0 0 14px', letterSpacing: t.fonts.isSerifDisplay ? 0 : -0.5 }}>{ev.title}</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {ev.tags.map((tg) => <Tag key={tg} t={t}>{tg}</Tag>)}
        </div>
        <p style={{ fontFamily: t.fonts.sans, fontSize: 15.5, lineHeight: 1.6, color: t.text, opacity: 0.88, margin: '0 0 22px' }}>{ev.blurb}</p>

        <Card t={t} style={{ marginBottom: 22 }}>
          {expect.map((e, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '11px 0', borderTop: i ? `1px solid ${t.line2}` : 'none' }}>
              <EXIcon name={e.icon} size={19} color={t.accent} sw={1.7} />
              <span style={{ fontFamily: t.fonts.sans, fontSize: 14.5, color: t.text }}>{e.label}</span>
            </div>
          ))}
        </Card>

        <SectionLabel t={t} action="See all" onAction={() => {}}>Who&rsquo;s attending</SectionLabel>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {attendees.map((m, i) => (
            <div key={m.id} style={{ marginLeft: i ? -12 : 0, zIndex: attendees.length - i }}>
              <Avatar name={m.name} size={44} t={t} ring={t.bg} img={m.photo} />
            </div>
          ))}
          <div style={{ marginLeft: 10, fontFamily: t.fonts.sans, fontSize: 13.5, color: t.mute }}>+{ev.going - attendees.length} members</div>
        </div>
      </div>

      {/* sticky RSVP */}
      <div style={{ position: 'sticky', bottom: 0, padding: `14px ${t.pad}px 30px`, background: hexA(t.bg, 0.92), backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: `1px solid ${t.line2}`, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontFamily: t.fonts.sans, fontSize: 12, color: t.mute }}>{going ? 'You\u2019re going' : ev.price}</div>
          <div style={{ fontFamily: t.fonts.display, fontSize: 18, fontWeight: 600 }}>{going ? '\u2713 Confirmed' : full ? 'Event full' : ev.price === 'Included' ? 'Members only' : ev.price}</div>
        </div>
        <EXButton t={t} size="lg" full variant={going ? 'outline' : 'solid'} onClick={() => setGoing(!going)}>
          {going ? 'Cancel RSVP' : full ? 'Join waitlist' : 'Reserve my place'}
        </EXButton>
      </div>
    </div>
  );
}

// ── Network ─────────────────────────────────────────────────
const SECTORS = ['All', 'Investment', 'Technology', 'Healthcare', 'Hospitality', 'Real Estate', 'Energy'];

function NetworkScreen({ t, nav }) {
  const D = window.EX_DATA;
  const [tab, setTab] = React.useState('Directory');
  const [sector, setSector] = React.useState('All');
  const members = sector === 'All' ? D.MEMBERS : D.MEMBERS.filter((m) => m.sector === sector || m.tags.includes(sector));
  return (
    <div>
      <ScreenTitle t={t} sub="The executive network" title="Network" />
      <div style={{ padding: `4px ${t.pad}px 16px` }}>
        <Segmented t={t} options={['Directory', 'Intros', 'Feed']} value={tab} onChange={setTab} />
      </div>

      {tab === 'Directory' && (
        <div>
          <div style={{ padding: `0 ${t.pad}px 14px` }}><SearchBar t={t} placeholder="Search members, companies, sectors" /></div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: `0 ${t.pad}px 16px`, scrollbarWidth: 'none' }}>
            {SECTORS.map((s) => (
              <button key={s} onClick={() => setSector(s)} style={{
                flexShrink: 0, padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
                fontFamily: t.fonts.sans, fontSize: 13, fontWeight: 600,
                background: sector === s ? t.accentSoft : 'transparent',
                color: sector === s ? t.accent : t.mute,
                border: `1px solid ${sector === s ? t.accentLine : t.line}`,
              }}>{s}</button>
            ))}
          </div>
          <div style={{ padding: `0 ${t.pad}px` }}>
            <div style={{ fontFamily: t.fonts.sans, fontSize: 12.5, color: t.faint, marginBottom: 4 }}>{members.length} members</div>
            {members.map((m, i) => (
              <div key={m.id} style={{ borderTop: i ? `1px solid ${t.line2}` : 'none' }}>
                <MemberRow t={t} member={m} onOpen={() => nav.push('member', { id: m.id })} />
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Intros' && (
        <div style={{ padding: `0 ${t.pad}px` }}>
          <p style={{ fontFamily: t.fonts.sans, fontSize: 14, color: t.mute, lineHeight: 1.5, margin: '0 0 16px' }}>Three introductions selected for you this week, based on your goals and the people you&rsquo;ve met.</p>
          {D.INTROS.map((intro) => { const m = D.memberById(intro.memberId); return (
            <Card t={t} key={intro.id} style={{ marginBottom: t.gap }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 14 }}>
                <Avatar name={m.name} size={54} t={t} img={m.photo} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: t.fonts.sans, fontWeight: 700, fontSize: 16 }}>{m.name}</div>
                  <div style={{ fontFamily: t.fonts.sans, fontSize: 13, color: t.mute }}>{m.role}, {m.company}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 13px', borderRadius: t.radiusSm, background: t.accentSoft, border: `1px solid ${t.accentLine}`, marginBottom: 14 }}>
                <EXIcon name="spark" size={16} color={t.accent} sw={1.7} />
                <span style={{ fontFamily: t.fonts.sans, fontSize: 13, color: t.dark ? t.text : t.accent, lineHeight: 1.4 }}>{intro.basis} &mdash; {intro.reason.toLowerCase()}.</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <EXButton t={t} size="md" style={{ flex: 1 }} icon="handshake" onClick={() => nav.push('member', { id: m.id })}>Request intro</EXButton>
                <EXButton t={t} size="md" variant="ghost" onClick={() => {}}>Skip</EXButton>
              </div>
            </Card>
          ); })}
        </div>
      )}

      {tab === 'Feed' && (
        <div style={{ padding: `0 ${t.pad}px` }}>
          <Card t={t} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <Avatar name={D.ME.name} size={40} t={t} img={D.ME.photo} />
            <span style={{ fontFamily: t.fonts.sans, fontSize: 14, color: t.faint, flex: 1 }}>Share an ask, a win, or an offer&hellip;</span>
            <EXIcon name="plus" size={20} color={t.accent} sw={2} />
          </Card>
          {D.FEED.map((f) => { const m = D.memberById(f.memberId); return (
            <FeedItem key={f.id} t={t} item={f} member={m} onOpen={() => nav.push('member', { id: m.id })} />
          ); })}
        </div>
      )}
      <div style={{ height: 20 }} />
    </div>
  );
}

function MemberProfile({ t, params, nav }) {
  const D = window.EX_DATA;
  const m = D.memberById(params.id);
  return (
    <div>
      <PushHeader t={t} title={m.name} onBack={nav.pop} right={
        <button style={{ background: t.chip, border: `1px solid ${t.line2}`, width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <EXIcon name="share" size={16} color={t.text} sw={1.8} />
        </button>} />
      <div style={{ padding: `8px ${t.pad}px 0`, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Avatar name={m.name} size={92} t={t} img={m.photo} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
          <h1 style={{ fontFamily: t.fonts.display, fontWeight: 600, fontSize: 26, margin: 0 }}>{m.name}</h1>
          {m.tier === 'Founding' && <span style={{ fontFamily: t.fonts.titling, fontSize: 9, letterSpacing: 1, color: t.accent, border: `1px solid ${t.accentLine}`, padding: '2px 6px', borderRadius: 4 }}>FOUNDING</span>}
        </div>
        <div style={{ fontFamily: t.fonts.sans, fontSize: 15, color: t.text, marginTop: 5 }}>{m.role}</div>
        <div style={{ fontFamily: t.fonts.sans, fontSize: 14, color: t.mute }}>{m.company}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontFamily: t.fonts.sans, fontSize: 13, color: t.faint }}>
          <EXIcon name="pin" size={14} color={t.faint} />{m.city} &middot; Member since {m.since}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, padding: `20px ${t.pad}px` }}>
        <EXButton t={t} size="md" full icon="chat" onClick={() => nav.push('thread', { memberId: m.id })}>Message</EXButton>
        <EXButton t={t} size="md" full variant="accentGhost" icon="handshake">Connect</EXButton>
      </div>

      <div style={{ padding: `0 ${t.pad}px` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: t.radiusSm, background: t.chip, marginBottom: 22 }}>
          <div style={{ display: 'flex' }}>
            {D.MEMBERS.slice(2, 5).map((x, i) => <div key={x.id} style={{ marginLeft: i ? -10 : 0 }}><Avatar name={x.name} size={28} t={t} ring={t.chip} img={x.photo} /></div>)}
          </div>
          <span style={{ fontFamily: t.fonts.sans, fontSize: 13, color: t.mute }}><b style={{ color: t.text }}>{m.mutuals} mutual</b> connections</span>
        </div>

        <SectionLabel t={t}>About</SectionLabel>
        <p style={{ fontFamily: t.fonts.sans, fontSize: 15, lineHeight: 1.6, color: t.text, opacity: 0.88, margin: '0 0 22px' }}>{m.bio}</p>

        <SectionLabel t={t}>Focus</SectionLabel>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {m.tags.map((tg) => <Tag t={t} key={tg} tone="accent">{tg}</Tag>)}
          <Tag t={t}>{m.sector}</Tag>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}

Object.assign(window, { ScreenTitle, PushHeader, Segmented, SearchBar, EventsScreen, EventDetail, NetworkScreen, MemberProfile, EventCard });
