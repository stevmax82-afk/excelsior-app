// data.jsx — Excelsior Club mock content
// Exposes (global): EX_DATA

const MEMBERS = [
  { id: 'm1', name: 'Layla Al Mansoori', role: 'Founder & CEO', company: 'Meridian Capital Partners', sector: 'Investment', city: 'Dubai', tier: 'Founding', tags: ['Private Equity', 'Family Office', 'MENA'], bio: 'Building a regional growth fund focused on consumer and fintech. Twenty years across London and the Gulf.', mutuals: 12, since: '2021' },
  { id: 'm2', name: 'Omar Haddad', role: 'Managing Partner', company: 'Haddad & Co. Advisory', sector: 'Professional Services', city: 'Dubai', tier: 'Member', tags: ['M&A', 'Legal', 'Governance'], bio: 'Cross-border M&A counsel to founders and boards across the GCC.', mutuals: 8, since: '2022' },
  { id: 'm3', name: 'Priya Nair', role: 'Co-founder', company: 'Kindred Health', sector: 'Healthcare', city: 'Abu Dhabi', tier: 'Member', tags: ['HealthTech', 'Series B', 'Operations'], bio: 'Scaling preventative care clinics across the Emirates. Ex-McKinsey.', mutuals: 5, since: '2023' },
  { id: 'm4', name: 'James Okonkwo', role: 'Group CFO', company: 'Sahara Logistics', sector: 'Logistics', city: 'Dubai', tier: 'Member', tags: ['Finance', 'Supply Chain', 'IPO'], bio: 'Took two businesses to public listing. Now leading a regional logistics roll-up.', mutuals: 9, since: '2021' },
  { id: 'm5', name: 'Sofia Marchetti', role: 'Creative Director', company: 'Atelier Marchetti', sector: 'Design & Brand', city: 'Dubai', tier: 'Member', tags: ['Branding', 'Luxury', 'Retail'], bio: 'Brand and experience studio for hospitality and luxury retail.', mutuals: 4, since: '2024' },
  { id: 'm6', name: 'Khalid Rahman', role: 'Founder', company: 'Vertex Proptech', sector: 'Real Estate', city: 'Dubai', tier: 'Founding', tags: ['PropTech', 'Real Estate', 'AI'], bio: 'Digitising property management for the Gulf\u2019s largest developers.', mutuals: 11, since: '2020' },
  { id: 'm7', name: 'Aisha Demir', role: 'Partner', company: 'Northbridge Ventures', sector: 'Venture Capital', city: 'Riyadh', tier: 'Member', tags: ['VC', 'Early Stage', 'SaaS'], bio: 'Investing in seed and Series A across MENA. Board seats in eight portfolio companies.', mutuals: 7, since: '2022' },
  { id: 'm8', name: 'Daniel Weiss', role: 'CEO', company: 'Helios Energy', sector: 'Energy', city: 'Abu Dhabi', tier: 'Member', tags: ['Cleantech', 'Infrastructure', 'ESG'], bio: 'Developing utility-scale solar across the region.', mutuals: 6, since: '2023' },
  { id: 'm9', name: 'Reem Al Suwaidi', role: 'Managing Director', company: 'Pearl Hospitality Group', sector: 'Hospitality', city: 'Dubai', tier: 'Member', tags: ['F&B', 'Hospitality', 'Expansion'], bio: 'Twelve restaurant concepts and counting. Obsessed with guest experience.', mutuals: 10, since: '2021' },
  { id: 'm10', name: 'Marcus Lee', role: 'Founder & CTO', company: 'Cipher Security', sector: 'Technology', city: 'Dubai', tier: 'Member', tags: ['Cybersecurity', 'Enterprise', 'AI'], bio: 'Protecting critical infrastructure for governments and banks.', mutuals: 3, since: '2024' },
];

const EVENTS = [
  {
    id: 'e1', title: 'Founders\u2019 Roundtable: Raising in a Tighter Market', kind: 'Roundtable', pillar: 'Knowledge & Growth',
    date: 'Thu 12 June', time: '8:00 \u2013 10:00 AM', venue: 'The Capital Club, DIFC', city: 'Dubai', tint: '#2E5E4E',
    capacity: 14, going: 11, price: 'Included', host: 'Aisha Demir',
    blurb: 'An intimate, off-the-record session with eight founders who closed rounds this year. Chatham House rules.',
    tags: ['Members only', 'Limited to 14'],
  },
  {
    id: 'e2', title: 'An Evening Worth Remembering', kind: 'Flagship', pillar: 'Curated Experiences',
    date: 'Fri 22 May', time: '3:00 \u2013 7:00 PM', venue: 'Five Iron Golf \u2192 Logs & Embers', city: 'Dubai', tint: '#9A6B3A',
    capacity: 60, going: 47, price: 'Included', host: 'The Excelsior Club',
    blurb: 'Three hours of golf, unlimited drinks and canap\u00e9s, a members\u2019 tournament with a serious prize \u2014 then the night continues over an exceptional happy-hour menu.',
    tags: ['Members + guests', 'Tournament'],
  },
  {
    id: 'e3', title: 'Private Dinner with Reem Al Suwaidi', kind: 'Dinner', pillar: 'Curated Experiences',
    date: 'Wed 18 June', time: '7:30 PM', venue: 'Pearl, Jumeirah', city: 'Dubai', tint: '#7E3B3B',
    capacity: 12, going: 12, price: 'AED 350', host: 'Reem Al Suwaidi',
    blurb: 'A seated dinner for twelve. The MD of Pearl Hospitality on building beloved brands in a crowded market.',
    tags: ['Waitlist', 'Seated, 12'],
  },
  {
    id: 'e4', title: 'Sunrise Padel & Coffee', kind: 'Social', pillar: 'Curated Experiences',
    date: 'Sat 28 June', time: '7:00 AM', venue: 'Reform Padel, Al Quoz', city: 'Dubai', tint: '#3C5A78',
    capacity: 16, going: 9, price: 'Included', host: 'Khalid Rahman',
    blurb: 'Doubles, then flat whites. Bring your competitive streak; partners assigned on the day.',
    tags: ['Members only', 'Active'],
  },
  {
    id: 'e5', title: 'Masterclass: Scaling Across the GCC', kind: 'Expert Session', pillar: 'Knowledge & Growth',
    date: 'Tue 1 July', time: '6:00 \u2013 7:30 PM', venue: 'Online \u00b7 Members App', city: 'Virtual', tint: '#6B5B95',
    capacity: 200, going: 63, price: 'Included', host: 'James Okonkwo',
    blurb: 'A practical session on entity structuring, talent, and the operational reality of expanding into Saudi.',
    tags: ['Virtual', 'Replay available'],
  },
];

const INTROS = [
  { id: 'i1', memberId: 'm7', reason: 'Both investing in regional fintech', basis: 'Shared interest \u00b7 Investment' },
  { id: 'i2', memberId: 'm4', reason: 'Preparing for a public listing this year', basis: 'Goal match \u00b7 IPO' },
  { id: 'i3', memberId: 'm5', reason: 'You both attended the May flagship', basis: 'Met at an event' },
];

const THREADS = [
  { id: 't1', memberId: 'm1', last: 'Wonderful to meet at the roundtable \u2014 let\u2019s find a coffee.', time: '9:24 AM', unread: 2,
    msgs: [
      { me: false, text: 'Wonderful to meet at the roundtable this morning.', time: '9:18 AM' },
      { me: false, text: 'Your point on family-office capital really landed. Let\u2019s find a coffee.', time: '9:24 AM' },
    ] },
  { id: 't2', memberId: 'm6', last: 'Sending the deck over now. Thanks for the intro!', time: 'Yesterday', unread: 0,
    msgs: [
      { me: true, text: 'Great chatting \u2014 happy to introduce you to the Helios team.', time: 'Yesterday' },
      { me: false, text: 'Sending the deck over now. Thanks for the intro!', time: 'Yesterday' },
    ] },
  { id: 't3', memberId: 'm9', last: 'Table\u2019s booked for 12 on the 18th. See you there.', time: 'Mon', unread: 0,
    msgs: [
      { me: false, text: 'Table\u2019s booked for 12 on the 18th. See you there.', time: 'Mon' },
    ] },
];

const PERKS = [
  { id: 'p1', brand: 'The Lana, Dorchester', offer: 'Member rate + suite upgrade', cat: 'Stay', tint: '#9A6B3A' },
  { id: 'p2', brand: 'NetJets', offer: 'Complimentary consultation & flight credit', cat: 'Travel', tint: '#3C5A78' },
  { id: 'p3', brand: 'Pearl Hospitality', offer: 'Priority reservations across 12 venues', cat: 'Dining', tint: '#7E3B3B' },
  { id: 'p4', brand: 'Sundar Wellness', offer: '3 months complimentary membership', cat: 'Wellbeing', tint: '#2E5E4E' },
];

const KNOWLEDGE = [
  { id: 'k1', type: 'Podcast', dur: '42 min', title: 'What I Learned Taking a Company Public', who: 'James Okonkwo', tint: '#46566B', icon: 'mic' },
  { id: 'k2', type: 'Session Replay', dur: '1h 12m', title: 'Brand Equity in Luxury Hospitality', who: 'Sofia Marchetti', tint: '#7E3B3B', icon: 'play' },
  { id: 'k3', type: 'Mastermind', dur: 'Monthly', title: 'The Operators\u2019 Circle', who: '8 members \u00b7 invitation only', tint: '#2E5E4E', icon: 'users' },
  { id: 'k4', type: 'Briefing', dur: '6 min read', title: 'GCC Capital Markets \u2014 Q2 Outlook', who: 'Excelsior Research', tint: '#6B5B95', icon: 'doc' },
];

const FEED = [
  { id: 'f1', memberId: 'm3', time: '2h', text: 'Looking to connect with anyone who has scaled clinical operations into Saudi \u2014 happy to trade notes.', kind: 'Ask', likes: 9, replies: 4 },
  { id: 'f2', memberId: 'm8', time: '5h', text: 'Helios just energised our second utility-scale site. Proud of the team. If ESG-linked financing is on your radar, my inbox is open.', kind: 'Win', likes: 23, replies: 7 },
  { id: 'f3', memberId: 'm5', time: '1d', text: 'Hosting a small studio tour next week for anyone curious about brand-building for hospitality. Five spots.', kind: 'Offer', likes: 14, replies: 6 },
];

const ME = {
  name: 'Adam Reyes', role: 'Founder & CEO', company: 'EasyTruck', tier: 'Founding Member',
  memberNo: 'EC\u2009\u00b7\u2009047', since: 'March 2021', renews: '14 March 2027', plan: 'Annual', city: 'Dubai',
};

// ── imagery (demo placeholders) ─────────────────────────────
// Faces: randomuser.me purpose-built placeholder portraits (stand-ins for the
// fictional members — real member photos replace these in production).
// Scenes: loremflickr themed photos, deterministic via ?lock=.
const RU = (g, n) => `https://randomuser.me/api/portraits/${g}/${n}.jpg`;
const LF = (kw, lock, w = 640, h = 420) => `https://loremflickr.com/${w}/${h}/${kw}?lock=${lock}`;

const MEMBER_PHOTOS = {
  m1: RU('women', 65), m2: RU('men', 32), m3: RU('women', 44), m4: RU('men', 51),
  m5: RU('women', 68), m6: RU('men', 76), m7: RU('women', 12), m8: RU('men', 45),
  m9: RU('women', 30), m10: RU('men', 22),
};
MEMBERS.forEach((m) => { m.photo = MEMBER_PHOTOS[m.id]; });
ME.photo = RU('men', 3);

const EVENT_IMG = {
  e1: LF('business,meeting,boardroom', 21),
  e2: LF('golf,course', 7),
  e3: LF('fine,dining,restaurant', 5),
  e4: LF('tennis,court,sport', 12),
  e5: LF('dubai,skyline,city', 3),
};
EVENTS.forEach((e) => { e.img = EVENT_IMG[e.id]; });

const KNOWLEDGE_IMG = {
  k1: LF('podcast,microphone,studio', 4),
  k2: LF('conference,stage,speaker', 8),
  k3: LF('business,team,meeting', 14),
  k4: LF('finance,chart,report', 9),
};
KNOWLEDGE.forEach((k) => { k.img = KNOWLEDGE_IMG[k.id]; });

const PERK_IMG = {
  p1: LF('luxury,hotel,suite', 2),
  p2: LF('private,jet,airplane', 6),
  p3: LF('restaurant,dining,interior', 10),
  p4: LF('spa,wellness,massage', 15),
};
PERKS.forEach((p) => { p.img = PERK_IMG[p.id]; });

window.EX_DATA = { MEMBERS, EVENTS, INTROS, THREADS, PERKS, KNOWLEDGE, FEED, ME,
  memberById: (id) => MEMBERS.find((m) => m.id === id) };
