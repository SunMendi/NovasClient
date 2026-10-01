import { ConsultancyCategory, ConsultancyService } from '../types';

export const CONSULTANCY_CATEGORIES: ConsultancyCategory[] = [
  {
    id: 'international',
    slug: 'international',
    name: 'International Consultancy',
    tagline: 'Global OEM Representation & Cross-Border Sovereign Trade',
    description: 'Advising defense ministries, foreign manufacturers, and multinational corporations on technology transfer, End-User Certificates (EUC), international trade compliance, and regional partnership agreements.',
    iconName: 'Globe2'
  },
  {
    id: 'it-telecom',
    slug: 'it-telecom',
    name: 'IT & Telecommunication',
    tagline: 'Mission-Critical Comms, Data Centers & Cyber Infrastructure',
    description: 'Architecting sovereign digital networks, tactical military radio backbones, Tier-III/IV edge data centers, encrypted communication systems, and cyber defense operation centers.',
    iconName: 'Cpu'
  },
  {
    id: 'project',
    slug: 'project',
    name: 'Project Consultancy',
    tagline: 'Turnkey Industrial EPC & Heavy Machinery Feasibility',
    description: 'Comprehensive project management and engineering advisory for high-capital infrastructure, naval shipyard modernizations, power generation facilities, and automated manufacturing plants.',
    iconName: 'Briefcase'
  },
  {
    id: 'tender',
    slug: 'tender',
    name: 'Tender Consultancy',
    tagline: 'Government DGDP & Institutional Bidding Advisory',
    description: 'Expert guidance on Directorate General Defence Purchase (DGDP) protocols, International Competitive Bidding (ICB), commercial valuation, compliant bid documentation, and contract execution.',
    iconName: 'FileCheck'
  },
  {
    id: 'real-estate-construction',
    slug: 'real-estate-construction',
    name: 'Real Estate & Construction',
    tagline: 'Specialized Defense Cantonments & Marine Civil Infrastructure',
    description: 'Structural engineering, marine berth construction, specialized high-security defense compounds, deep sea port facilities, and industrial park real estate feasibility studies.',
    iconName: 'Building2'
  }
];

export const CONSULTANCY_SERVICES: ConsultancyService[] = [
  // 1. INTERNATIONAL CONSULTANCY
  {
    id: 'global-oem-representation',
    slug: 'global-oem-representation',
    name: 'Foreign OEM Representation & Trade Alliances',
    categoryId: 'international',
    categoryName: 'International Consultancy',
    tagline: 'Tier-1 liaison connecting European, American & Asian manufacturers with sovereign buyers.',
    summary: 'Strategic market entry and authorized agency representation for global defense, maritime, and aerospace manufacturers seeking accredited accreditation in Bangladesh and South Asia.',
    description: 'Novas acts as the authorized domestic liaison for world-class OEMs across Europe, North America, and East Asia. We manage local regulatory vetting, defense ministry authorizations, technical symposium demonstrations, and commercial bid integration.',
    deliverables: [
      'Accredited Ministry of Defence (MoD) local agent registration',
      'Market opportunity assessment and long-term procurement pipeline forecasting',
      'Representation at DGDP, Armed Forces Division (AFD), and paramilitary headquarters',
      'Bilingual contract negotiation, banking guarantees, and Letter of Credit (LC) oversight',
      'Dedicated domestic warranty and after-sales field support logistics'
    ],
    targetClients: [
      'International Defense Contractors (NATO/EU/US)',
      'Naval Architecture & Marine Equipment Manufacturers',
      'Heavy Industrial Plant & Machinery Exporters',
      'Foreign Trade & Investment Development Agencies'
    ],
    methodology: [
      { step: '01', title: 'Regulatory Compliance Audit', desc: 'Verify local accreditation requirements, DGDP supplier eligibility, and bilateral export protocols.' },
      { step: '02', title: 'Stakeholder Engagement', desc: 'Conduct formal capability presentations and technical workshops with military and civil end-user committees.' },
      { step: '03', title: 'Tender Pipeline Matching', desc: 'Align OEM product catalogs with sovereign annual fiscal procurement schedules.' },
      { step: '04', title: 'Lifecycle Contract Execution', desc: 'Oversee delivery, customs clearance, bonded warehouse inspection, and payment milestone releases.' }
    ],
    standards: ['DGDP Registered Agent Protocols', 'FCPA & UK Bribery Act Compliant', 'ISO 9001:2015 Quality Management'],
    duration: 'Multi-Year Agency Agreement (Retainer / Milestone-Based)',
    leadAdvisors: 'International Trade Division & Senior Ex-Military Logistics Officers',
    imageUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'export-control-euc-licensing',
    slug: 'export-control-euc-licensing',
    name: 'Export Control, EUC & Sanctions Compliance',
    categoryId: 'international',
    categoryName: 'International Consultancy',
    tagline: 'Navigating international non-proliferation laws and fast-track End-User Certificates.',
    summary: 'Comprehensive legal and regulatory guidance for cross-border transfer of dual-use goods, defense hardware, and sensitive military technologies.',
    description: 'We advise defense contractors and government purchasers through the complex web of BAFA (Germany), ITAR/EAR (USA), UK Export Control Joint Unit (ECJU), and EU Dual-Use regulations. We draft, verify, and shepherd End-User Certificates (EUC) to prevent customs delays or licensing rejections.',
    deliverables: [
      'Bilateral End-User Certificate (EUC) drafting, vetting, and ministerial sign-off',
      'Dual-use commodity classification (ECCN / Military List)',
      'Sanctions screening and international non-proliferation verification',
      'Dangerous Goods (DG) Class 1 hazardous transit permits and air/sea routing',
      'Pre-shipment inspection (PSI) and chain-of-custody documentation'
    ],
    targetClients: [
      'Directorate General Defence Purchase (DGDP)',
      'Armed Forces Ordnance & Armament Directorates',
      'International Aerospace & Ballistic Manufacturers',
      'Strategic Government Supply Corporations'
    ],
    methodology: [
      { step: '01', title: 'Classification & Scope', desc: 'Classify equipment under Wassenaar Arrangement and regional export control frameworks.' },
      { step: '02', title: 'Documentation Drafting', desc: 'Prepare authenticated government End-User Undertakings and consular legalizations.' },
      { step: '03', title: 'Ministry Coordination', desc: 'Liaise directly with foreign trade ministries for prompt license issuance.' },
      { step: '04', title: 'Customs & Port Handover', desc: 'Execute secure port entry and verified handover to armed forces depots.' }
    ],
    standards: ['Wassenaar Arrangement Guidelines', 'ITAR / EAR Protocols', 'EU Dual-Use Regulation (EU) 2021/821'],
    duration: '4 to 8 Weeks per Consignment License',
    leadAdvisors: 'Defense Legal Counsel & Maritime Trade Specialists',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    featured: false
  },

  // 2. IT AND TELECOMMUNICATION
  {
    id: 'tactical-comms-c4isr',
    slug: 'tactical-comms-c4isr',
    name: 'Tactical Comms, C4ISR & Cyber Security Architecture',
    categoryId: 'it-telecom',
    categoryName: 'IT & Telecommunication',
    tagline: 'Battlefield-ready encrypted radio mesh networks and sovereign cyber operations.',
    summary: 'Design and implementation advisory for hardened tactical communications, border sensor grids, C4ISR command architectures, and mission-critical cybersecurity.',
    description: 'Our telecommunication and defense electronics advisory unit helps military signals commands, police headquarters, and border forces design end-to-end secure communication ecosystems. We cover HF/VHF/UHF tactical radios, MANET IP mesh nodes, encrypted satellite links, and 24/7 Security Operations Centers (SOC).',
    deliverables: [
      'C4ISR interoperability architecture blueprints and radio frequency (RF) planning',
      'MANET self-healing mobile ad-hoc tactical data mesh network designs',
      'Air-gapped modular Security Operations Center (SOC) engineering',
      'Electronic Warfare (EW) counter-measure and signal jamming resilience audits',
      'Encrypted voice, video, and drone telemetry integration blueprints'
    ],
    targetClients: [
      'Military Signals Corps & Joint Command Headquarters',
      'Border Guard Telecommunication Directorates',
      'National Police & Rapid Response Forces',
      'Coast Guard Coastal Radar & VTS Commands'
    ],
    methodology: [
      { step: '01', title: 'Electromagnetic Survey', desc: 'Survey operating terrain, signal attenuation, and electronic threat landscape.' },
      { step: '02', title: 'System Architecture Design', desc: 'Engineer multi-layer encrypted communication topology with zero single points of failure.' },
      { step: '03', title: 'Hardware Proof of Concept', desc: 'Deploy field test beds for tactical range, throughput, and jamming resistance verification.' },
      { step: '04', title: 'Commissioning & Training', desc: 'Deliver operator training curricula and sovereign key-management protocols.' }
    ],
    standards: ['MIL-STD-188-110D', 'FIPS 140-2 Level 3 Cryptography', 'STANAG 4285 / 5066', 'ISO/IEC 27001'],
    duration: '3 to 6 Months (Scoping to Field Integration)',
    leadAdvisors: 'Principal Systems Architect & Military Electronics Engineers',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'telecom-backbone-datacenter',
    slug: 'telecom-backbone-datacenter',
    name: 'National Telecom Backbone & Tier-III/IV Data Centers',
    categoryId: 'it-telecom',
    categoryName: 'IT & Telecommunication',
    tagline: 'High-throughput optical fiber, sovereign cloud, and carrier-grade infrastructure.',
    summary: 'Engineering advisory for nationwide fiber optic transmission, submarine cable terminal landing, and fault-tolerant government data center facilities.',
    description: 'We assist telecom operators, state utilities, and railway communications departments with high-capacity DWDM optical fiber transmission, wireless towers, power resilience, and Uptime Institute compliant Tier-III/IV data centers.',
    deliverables: [
      'High-capacity DWDM/OTN optical transmission backbone network design',
      'Tier-III & Tier-IV data center MEP (Mechanical, Electrical, Plumbing) specifications',
      'Redundant N+1 and 2N cooling, backup diesel, and UPS architecture',
      'Carrier-neutral interconnect and submarine cable landing station designs',
      'Disaster Recovery (DR) and business continuity engineering'
    ],
    targetClients: [
      'Ministry of Posts, Telecommunications & Information Technology',
      'National Telecom Transmission Network (NTTN) Operators',
      'State-Owned Internet & Submarine Cable Enterprises',
      'Large Banking & Financial Telecommunications Hubs'
    ],
    methodology: [
      { step: '01', title: 'Capacity & Route Feasibility', desc: 'Assess bandwidth growth projections, optical path loss, and geographical civil hazards.' },
      { step: '02', title: 'Detailed Engineering Design', desc: 'Deliver complete architectural, electrical, fire suppression, and cooling designs.' },
      { step: '03', title: 'Tender Specification Prep', desc: 'Draft comprehensive technical specifications for international EPC tenders.' },
      { step: '04', title: 'Site Supervision & Acceptance', desc: 'Oversee factory acceptance tests (FAT) and site acceptance tests (SAT).' }
    ],
    standards: ['TIA-942 Tier-III/IV', 'ITU-T G.652/G.655 Optical Specs', 'ASHRAE Thermal Guidelines', 'ISO 22301'],
    duration: '6 to 12 Months',
    leadAdvisors: 'Chartered Telecom Engineers & Data Center Certified Specialists',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    featured: false
  },

  // 3. PROJECT CONSULTANCY
  {
    id: 'naval-shipyard-modernization',
    slug: 'naval-shipyard-modernization',
    name: 'Naval Shipyard & Marine Engineering Project Advisory',
    categoryId: 'project',
    categoryName: 'Project Consultancy',
    tagline: 'Dry dock modernization, CNC plasma cutting line, and slipway engineering.',
    summary: 'Turnkey technical advisory for naval dockyards, commercial slipways, and aluminum/steel vessel fabrication facility upgrades.',
    description: 'Novas leverages deep naval architecture expertise to consult on shipyard master planning, gantry crane load calculations, automated plate-cutting machinery, and vessel construction project management.',
    deliverables: [
      'Shipyard master layout planning and material workflow optimization',
      'Dry dock civil extension and 1,500+ DWT slipway load calculations',
      'Automated CNC plasma cutting bed and welding bay specification',
      'Class Society (Bureau Veritas, Lloyds) certification roadmaps',
      'Milestone-based project management for new vessel construction programs'
    ],
    targetClients: [
      'Naval Dockyards & Coast Guard Maintenance Depots',
      'Commercial Shipbuilding & Ship Repair Yards',
      'Port Authority Marine Engineering Departments',
      'Inland Waterways Transportation Authorities'
    ],
    methodology: [
      { step: '01', title: 'Facility Audit', desc: 'Inspect existing fabrication bays, lifting apparatus, and slipway slope mechanics.' },
      { step: '02', title: 'Process Modernization Plan', desc: 'Design upgraded workflow integrating automated cutting, shot-blasting, and modular assembly.' },
      { step: '03', title: 'Machinery Procurement', desc: 'Specify high-capacity gantry cranes, plate rollers, and welding power units.' },
      { step: '04', title: 'Class Certification Sign-Off', desc: 'Ensure all facilities meet international classification society shipbuilding audits.' }
    ],
    standards: ['Bureau Veritas Shipyard Rules', 'Lloyds Register Marine Guidelines', 'ISO 3834 Welding Quality'],
    duration: '6 to 18 Months',
    leadAdvisors: 'Senior Naval Architects & Marine Structural Engineers',
    imageUrl: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'heavy-epc-machinery-advisory',
    slug: 'heavy-epc-machinery-advisory',
    name: 'Turnkey Heavy Industry & EPC Plant Automation',
    categoryId: 'project',
    categoryName: 'Project Consultancy',
    tagline: 'Power plant auxiliaries, heavy steel manufacturing, and SCADA automation.',
    summary: 'Comprehensive engineering consultancy for large-scale energy projects, steel mills, and automated manufacturing installations.',
    description: 'We assist industrial promoters and EPC consortiums in evaluating heavy machinery specifications, process automation, high-capacity diesel/gas turbine generation, and industrial effluent control systems.',
    deliverables: [
      'Industrial plant technical feasibility and machinery CAPEX/OPEX modeling',
      'SCADA automation and industrial PLC instrumentation engineering',
      'High-capacity backup power generation (multi-megawatt diesel/gas) design',
      'Heavy piping, high-pressure pump skids, and valve manifold blueprints',
      'OEM technical audit and site erection supervision'
    ],
    targetClients: [
      'Power Generation & Independent Power Producers (IPP)',
      'Steel Re-Rolling & Heavy Fabrication Conglomerates',
      'Petrochemical & Fertilizer Processing Complexes',
      'Cement & Heavy Mineral Extraction Plants'
    ],
    methodology: [
      { step: '01', title: 'Energy & Mass Balance', desc: 'Perform thermal, hydraulic, and electrical load simulations.' },
      { step: '02', title: 'Equipment Sourcing Plan', desc: 'Evaluate Tier-1 OEM machinery bids across efficiency, reliability, and lifecycle cost.' },
      { step: '03', title: 'Installation Supervision', desc: 'Direct on-site alignment, vibration testing, and electrical synchronization.' },
      { step: '04', title: 'Commissioning & Handover', desc: 'Validate guaranteed output metrics during formal performance test runs.' }
    ],
    standards: ['ASME Section VIII', 'IEC 61508 / 61511 Safety Integrity', 'ISO 50001 Energy Management'],
    duration: '4 to 12 Months',
    leadAdvisors: 'Mechanical & EPC Senior Consulting Engineers',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    featured: false
  },

  // 4. TENDER CONSULTANCY
  {
    id: 'dgdp-defense-tender-bidding',
    slug: 'dgdp-defense-tender-bidding',
    name: 'DGDP Defense Tender Preparation & Bid Compliance',
    categoryId: 'tender',
    categoryName: 'Tender Consultancy',
    tagline: 'Flawless compliance for high-stakes military and paramilitary procurement tenders.',
    summary: 'Specialized advisory for local and international contractors bidding under the Directorate General Defence Purchase (DGDP), Armed Forces Division (AFD), and government institutional formats.',
    description: 'Securing defense tenders requires zero-defect compliance with complex General Conditions of Contract (GCC), Special Conditions of Contract (SCC), technical specification matrixes, and performance bank guarantees. Novas brings 13+ years of firsthand procurement experience to eliminate bid disqualifications and maximize winning margins.',
    deliverables: [
      'Full technical compliance matrix mapping against tender Schedule of Requirements (SOR)',
      'OEM authorization letters, warranty endorsements, and lab certification dossier prep',
      'Tender security (Earnest Money Deposit) and Performance Guarantee (PG) advisory',
      'DGDP Schedule ‘A’ and Schedule ‘B’ documentation vetting',
      'Representation during pre-bid meetings and technical clarification sessions'
    ],
    targetClients: [
      'International Defense Hardware & Tactical OEMs',
      'Domestic Prime Vendors & Military Contractors',
      'Paramilitary & Police Specialized Procurement Desks',
      'United Nations Peacekeeping Mission Equipment Suppliers'
    ],
    methodology: [
      { step: '01', title: 'Tender Dissection', desc: 'Extract strict mandatory requirements, penalty clauses, and delivery milestones.' },
      { step: '02', title: 'Technical Dossier Building', desc: 'Compile certified test reports, military ballistic certificates, and OEM agency letters.' },
      { step: '03', title: 'Commercial Strategy', desc: 'Model competitive pricing, foreign currency exchange risk, and duty/tax structures.' },
      { step: '04', title: 'Post-Award Execution', desc: 'Manage factory pre-shipment inspections, harbor trials, and formal acceptance protocols.' }
    ],
    standards: ['DGDP Standard Procurement Guidelines', 'Public Procurement Act (PPA) / PPR-2008', 'UN Procurement Standards'],
    duration: '2 to 6 Weeks per Tender Tender Cycle',
    leadAdvisors: 'Former Senior DGDP Officers & Defense Procurement Specialists',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'icb-government-procurement',
    slug: 'icb-government-procurement',
    name: 'International Competitive Bidding (ICB) Advisory',
    categoryId: 'tender',
    categoryName: 'Tender Consultancy',
    tagline: 'World Bank, ADB, and sovereign institutional mega-tender management.',
    summary: 'Advisory services for major multilateral development bank (MDB) tenders and national infrastructure procurement programs.',
    description: 'We guide international consortiums and domestic EPC firms through International Competitive Bidding (ICB) and National Competitive Bidding (NCB) financed by the World Bank, Asian Development Bank (ADB), JICA, and Bangladesh government ministries.',
    deliverables: [
      'Comprehensive ICB bid document preparation (FIDIC Yellow / Silver Book formats)',
      'Joint Venture (JV) and Consortium agreement structuring with foreign partners',
      'Bid price estimation, customs duty escalation, and advance payment security planning',
      'Environmental and Social Impact Assessment (ESIA) tender compliance',
      'Post-tender defense of technical proposals during evaluation committee hearings'
    ],
    targetClients: [
      'Civil Works & EPC Construction Consortiums',
      'Port Authorities & Marine Terminal Operators',
      'Power Grid & Energy Transmission Contractors',
      'Railway & Highway Infrastructure Developers'
    ],
    methodology: [
      { step: '01', title: 'Eligibility & Prequalification', desc: 'Validate financial turnover, credit line availability, and technical past experience.' },
      { step: '02', title: 'Proposal Authoring', desc: 'Draft technical methodology, work breakdown structures, and equipment mobilization schedules.' },
      { step: '03', title: 'Risk Allocation', desc: 'Identify latent commercial risks in liquidated damages, force majeure, and exchange rates.' },
      { step: '04', title: 'Submission & Follow-Up', desc: 'Coordinate sealed envelope or e-GP tender submission with full chain of custody.' }
    ],
    standards: ['FIDIC Contract Conditions', 'World Bank Procurement Regulations', 'ADB Procurement Policy (2017)'],
    duration: '4 to 10 Weeks',
    leadAdvisors: 'Infrastructure Procurement Counsel & Senior Quantity Surveyors',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    featured: false
  },

  // 5. REAL ESTATE AND CONSTRUCTION
  {
    id: 'specialized-defense-compounds',
    slug: 'specialized-defense-compounds',
    name: 'Specialized Defense Cantonments & Secure Facility Engineering',
    categoryId: 'real-estate-construction',
    categoryName: 'Real Estate & Construction',
    tagline: 'Hardened compounds, ballistic-rated bunkers, and military infrastructure.',
    summary: 'Architectural, civil, and physical security design advisory for high-security defense bases, ammunition depots, and command centers.',
    description: 'Novas provides specialized civil engineering and facility security consultancy for sovereign armed forces installations, secure cantonment sectors, underground command bunkers, ballistic-resistant perimeter structures, and climate-controlled ammunition storage depots.',
    deliverables: [
      'Blast-resistant and ballistic-rated architectural structural designs',
      'High-security perimeter intrusion detection system (PIDS) integration',
      'Underground reinforced bunker and hardened shelter structural calculations',
      'Ammunition & explosive ordnance depot (magazine) safety layout planning',
      'SCIF (Sensitive Compartmented Information Facility) acoustic & TEMPEST shielding'
    ],
    targetClients: [
      'Military Engineering Services (MES) & Base Engineers',
      'Armed Forces Division Construction Wings',
      'Special Forces Tactical Training Centers',
      'Strategic Government Security Headquarters'
    ],
    methodology: [
      { step: '01', title: 'Threat Vulnerability Assessment', desc: 'Model explosive blast radii, ballistic penetration threats, and forced-entry vectors.' },
      { step: '02', title: 'Hardened Structural Design', desc: 'Engineer reinforced concrete structures meeting international military survivability criteria.' },
      { step: '03', title: 'Security Envelope Integration', desc: 'Design biometric access airlocks, perimeter surveillance, and backup power grids.' },
      { step: '04', title: 'Quality Assurance Supervision', desc: 'Monitor material testing (cube strength, rebar tensile testing) during site construction.' }
    ],
    standards: ['UFC 4-010-01 DoD Anti-Terrorism Standards', 'MIL-HDBK-1013/1A', 'BNBC (Bangladesh National Building Code)'],
    duration: '6 to 18 Months',
    leadAdvisors: 'Chartered Structural Engineers & Defense Infrastructure Consultants',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'coastal-berth-port-infrastructure',
    slug: 'coastal-berth-port-infrastructure',
    name: 'Deep Sea Port, Coastal Berth & Marine Civil Engineering',
    categoryId: 'real-estate-construction',
    categoryName: 'Real Estate & Construction',
    tagline: 'Heavy-duty jetty berths, breakwaters, and maritime terminal civil works.',
    summary: 'Civil and geotechnical engineering consultancy for port terminals, coastal jetties, dredging operations, and marine industrial real estate.',
    description: 'Advising port authorities, private terminal operators, and economic zone developers on marine structural engineering, jetty piling, dredging hydrodynamics, breakwater construction, and heavy container yard paving.',
    deliverables: [
      'Marine jetty structural design for container and bulk cargo vessels',
      'Geotechnical borehole analysis and marine piling load capacity modeling',
      'Coastal hydrodynamics, wave tranquility, and breakwater feasibility studies',
      'Heavy container yard pavement and gantry crane rail foundation engineering',
      'Environmental Impact Assessment (EIA) and coastal regulatory clearances'
    ],
    targetClients: [
      'Port Authorities (Chattogram, Mongla, Payra, Matarbari)',
      'Private Container Terminal Concessionaires',
      'Special Economic Zone (SEZ) Marine Infrastructure Wings',
      'Offshore Energy Supply Base Operators'
    ],
    methodology: [
      { step: '01', title: 'Bathymetric & Geotechnical Survey', desc: 'Map subsea seabed topography, tidal currents, and soil bearing strata.' },
      { step: '02', title: 'Structural Maritime Modeling', desc: 'Simulate vessel berthing energy, wave impact loads, and seismic soil liquefaction.' },
      { step: '03', title: 'Engineering Drawings & BOQ', desc: 'Deliver detailed structural CAD drawings, bill of quantities (BOQ), and tender packages.' },
      { step: '04', title: 'Construction Oversight', desc: 'Conduct pile driving monitoring, concrete durability inspections, and cathodic protection tests.' }
    ],
    standards: ['PIANC Marine Guidelines', 'BS 6349 Maritime Structures', 'ASTM Marine Piling Standards'],
    duration: '6 to 24 Months',
    leadAdvisors: 'Senior Coastal Civil Engineers & Geotechnical Maritime Specialists',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    featured: false
  }
];

export const getConsultancyCategoryById = (id?: string) => {
  if (!id) return undefined;
  const normalized = id.toLowerCase().trim();
  return CONSULTANCY_CATEGORIES.find(
    (c) => c.id.toLowerCase() === normalized || c.slug.toLowerCase() === normalized
  );
};

export const getConsultancyServiceById = (id?: string) => {
  if (!id) return undefined;
  const normalized = id.toLowerCase().trim();
  return CONSULTANCY_SERVICES.find(
    (s) => s.id.toLowerCase() === normalized || s.slug.toLowerCase() === normalized
  );
};

export const getConsultancyServicesByCategory = (categoryId?: string) => {
  if (!categoryId || categoryId === 'all') return CONSULTANCY_SERVICES;
  const normalized = categoryId.toLowerCase().trim();
  return CONSULTANCY_SERVICES.filter(
    (s) => s.categoryId.toLowerCase() === normalized
  );
};
