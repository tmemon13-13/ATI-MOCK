/* ==========================================================================
   Site content. In production this comes from the CMS — everything here is
   structured so each array maps cleanly to a CMS collection.
   Items flagged `sample: true` are placeholder copy and must be replaced.
   ========================================================================== */

window.SITE = {
  // Contract 2026 negotiation status. Set `current` to the active step index.
  contract: {
    current: 1,
    sample: true,
    steps: [
      { title: "Section 6 Opener Exchange", text: "Proposals exchanged with management; the Railway Labor Act process formally begins." },
      { title: "Direct Negotiations", text: "Your Negotiating Committee at the table, section by section." },
      { title: "Federal Mediation (NMB)", text: "If needed, a National Mediation Board mediator joins the talks." },
      { title: "Tentative Agreement", text: "MEC reviews any TA and decides whether to send it to the pilots." },
      { title: "Pilot Ratification Vote", text: "Every ATI pilot gets a vote. Road shows and full TA materials first." }
    ]
  },

  leaders: [
    { name: "Mike Sterling", role: "MEC Chairman & Captain Representative", phone: "410-997-6897", email: "Mike.Sterling@alpa.org" },
    { name: "James Muchowicz", role: "MEC Vice-Chairman & F/O Representative", phone: "602-524-2839", email: "James.Muchowicz@alpa.org" },
    { name: "Josh Hoy", role: "MEC Secretary/Treasurer", phone: "770-712-3531", email: "Josh.Hoy@alpa.org" },
    { name: "Dan Grimes", role: "MEC Executive Administrator", phone: "417-827-5528", email: "Dan.Grimes@alpa.org" }
  ],

  // type → pill style
  commTypes: {
    "MEC Alert": "alert",
    "Skypointer": "sky",
    "Hotline": "gold",
    "SPSC Newsletter": "green",
    "All-Pilot Call": "red",
    "Contract 2026": ""
  },

  comms: [
    { type: "Contract 2026", date: "2026-10-06", title: "Negotiations Update: Session 14 Recap", excerpt: "Your Negotiating Committee completed another week at the table. Here's where we stand on scheduling, scope, and compensation sections.", sample: true, featured: true },
    { type: "All-Pilot Call", date: "2026-10-02", title: "September All-Pilot Call Recording Now Available", excerpt: "Missed the call? Watch the full recording with MEC officers and the Negotiating Committee, including the pilot Q&A.", sample: true },
    { type: "MEC Alert", date: "2026-09-29", title: "Reserve Scheduling Reminders for the Peak Season", excerpt: "Know your rights on reserve availability, short-call assignments and rest requirements before peak flying begins.", sample: true },
    { type: "Skypointer", date: "2026-09-22", title: "Skypointer — Fall 2026 Edition", excerpt: "Committee spotlights, a look back at the summer MEC meeting, and what's next for Contract 2026.", sample: true },
    { type: "SPSC Newsletter", date: "2026-09-15", title: "Fatigue Reporting 101", excerpt: "How to file a fatigue call, what happens next, and how the Fatigue Action Committee uses your reports.", sample: true },
    { type: "Hotline", date: "2026-09-08", title: "Hotline: Training Department Updates", excerpt: "Recorded update covering recurrent training changes and the new scheduling window for upgrades.", sample: true },
    { type: "MEC Alert", date: "2026-08-30", title: "MEC Regular Meeting Summary", excerpt: "Resolutions passed, committee reports and budget highlights from the August MEC meeting.", sample: true }
  ],

  events: [
    { date: "2026-10-21", title: "All-Pilot Call", meta: "1900 ET · Zoom (login required)", sample: true },
    { date: "2026-11-04", title: "MEC Regular Meeting", meta: "Nov 4–6 · Wilmington, OH", sample: true },
    { date: "2026-11-12", title: "Contract 2026 Road Show", meta: "CVG crew room · 1000–1400", sample: true }
  ],

  calls: [
    { title: "September All-Pilot Call", date: "2026-10-02", length: "1:12:40", sample: true },
    { title: "August All-Pilot Call", date: "2026-08-28", length: "58:15", sample: true },
    { title: "Contract 2026 Kickoff Call", date: "2026-07-17", length: "1:31:02", sample: true }
  ],

  resources: [
    { group: "ATI Pilot Resources", items: [
      { title: "Contract, LOAs & MOUs", icon: "scale", desc: "Current CBA plus every letter of agreement and memorandum.", login: true },
      { title: "MEC Policy Manual", icon: "book", desc: "How your MEC is governed and how decisions are made.", login: true },
      { title: "ATI Seniority List", icon: "users", desc: "The current seniority list, updated monthly.", login: true },
      { title: "DART", icon: "target", desc: "Send a question straight to MEC leaders and subject-matter experts.", login: true },
      { title: "Dispute Tracking System (DTS)", icon: "alert", desc: "File and track a grievance or contract dispute.", login: true },
      { title: "Contract 2026 Hub", icon: "file", desc: "Status, FAQs and documents for the current negotiations.", href: "contract-2026.html" }
    ]},
    { group: "ALPA National", items: [
      { title: "Air Line Pilot Magazine", icon: "news", desc: "ALPA's monthly magazine for members.", external: true },
      { title: "ALPA Constitution & By-Laws", icon: "clipboard", desc: "The governing document for the Association.", external: true },
      { title: "Code of Ethics", icon: "shield", desc: "The professional standard every ALPA pilot holds.", external: true },
      { title: "ALPA Discounts", icon: "star", desc: "Member savings on travel, insurance and more.", external: true },
      { title: "Jumpseat Info", icon: "plane", desc: "Jumpseat agreements and reciprocal carrier list.", external: true },
      { title: "ID90 Travel", icon: "briefcase", desc: "Discounted travel for airline employees.", external: true }
    ]},
    { group: "Communications", items: [
      { title: "ATI Skypointer", icon: "news", desc: "The MEC's newsletter for the ATI pilot group.", href: "communications.html#Skypointer" },
      { title: "Hotline", icon: "phone", desc: "Recorded updates from MEC leadership.", href: "communications.html#Hotline" },
      { title: "MEC Alert", icon: "bell", desc: "Time-sensitive notices from your MEC.", href: "communications.html#MEC Alert" },
      { title: "SPSC Newsletter", icon: "megaphone", desc: "Safety and pilot support updates.", href: "communications.html#SPSC Newsletter" },
      { title: "All-Pilot Call Recordings", icon: "mic", desc: "Every all-pilot call, on demand.", href: "communications.html#All-Pilot Call" },
      { title: "All Communications", icon: "mail", desc: "The full archive, searchable and filterable.", href: "communications.html" }
    ]}
  ],

  // `verify: true` = not visible in the current site's dropdown screenshot; confirm with MEC.
  committees: [
    { name: "Accident Investigation", group: "Safety & Security", icon: "search", desc: "Responds when an ATI aircraft is involved in an accident or serious incident, protecting crews and working alongside ALPA's national investigators." },
    { name: "ASAP", full: "Aviation Safety Action Program", group: "Safety & Security", icon: "shield", desc: "Represents pilots on the Event Review Committee so voluntary safety reports lead to fixes, not discipline." },
    { name: "CASC", full: "Central Air Safety Committee", group: "Safety & Security", icon: "plane", desc: "Coordinates the MEC's safety programs and works with the company on operational hazards." },
    { name: "FOQA", full: "Flight Operational Quality Assurance", group: "Safety & Security", icon: "chart", desc: "Protects de-identified flight data while using trends to improve safety for the whole fleet." },
    { name: "Security", group: "Safety & Security", icon: "lock", desc: "Cargo security, FFDO support and threat-related issues affecting ATI crews.", verify: true },
    { name: "Contract Negotiating", group: "Contract & Representation", icon: "scale", desc: "At the table for Contract 2026, negotiating section by section on behalf of every ATI pilot." },
    { name: "Grievance", group: "Contract & Representation", icon: "alert", desc: "Enforces the contract: investigates disputes, files grievances and takes cases through the process." },
    { name: "Scheduling", group: "Contract & Representation", icon: "calendar", desc: "Monitors bid packages, reserve and trip construction to make sure the contract is followed.", verify: true },
    { name: "Retirement & Insurance", group: "Contract & Representation", icon: "briefcase", desc: "Helps pilots understand retirement plans, insurance and benefits.", verify: true },
    { name: "CIRP", full: "Critical Incident Response Program", group: "Pilot Wellness", icon: "heart", desc: "Trained peers who support pilots and their families after a critical incident." },
    { name: "Fatigue Action", group: "Pilot Wellness", icon: "moon", desc: "Reviews fatigue calls and pushes for schedules that keep pilots rested and safe." },
    { name: "HIMS", group: "Pilot Wellness", icon: "hand", desc: "Confidential help for pilots facing substance-use issues and support through recovery and return to flying." },
    { name: "Pilot Peer Support", group: "Pilot Wellness", icon: "users", desc: "Confidential, pilot-to-pilot support for life's challenges, on or off the line.", verify: true },
    { name: "Professional Standards", group: "Pilot Wellness", icon: "check", desc: "Resolves pilot-to-pilot issues peer to peer, before they become company matters.", verify: true },
    { name: "Communications", group: "Advocacy & Communications", icon: "megaphone", desc: "Keeps the pilot group informed through alerts, newsletters, calls and this website." },
    { name: "Government Affairs", group: "Advocacy & Communications", icon: "landmark", desc: "Works with ALPA's Washington team on legislation and regulations that affect cargo pilots." },
    { name: "Jumpseat", group: "Advocacy & Communications", icon: "plane", desc: "Maintains jumpseat agreements and helps pilots commute.", verify: true }
  ]
};
