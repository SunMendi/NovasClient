import { Sector } from '../types';

export const SECTORS: Sector[] = [
  {
    id: 'defence',
    slug: 'defence',
    name: 'Defence',
    headline: 'Force Protection & Tactical Superiority',
    tagline: 'Certified tactical systems, personal protection, and mission equipment for armed forces and security operators.',
    description: 'Novas supplies battle-proven force protection systems, body armor, optronics, and secure tactical communications to South Asian defense ministries, coast guards, and special operations units with complete end-user documentation and certification traceability.',
    iconName: 'Shield',
    accentColor: '#f59e0b',
    capabilities: [
      'NIJ Level III & IV Ballistic Armor & Composite Helmets',
      'Gen-3 Autogated Night Vision & Thermal Optronics',
      'Tactical Radio Intercoms & Active Hearing Headsets',
      'Special Reconnaissance & Border Surveillance UAVs',
      'EOD (Explosive Ordnance Disposal) Protection Suits'
    ],
    targetOperators: [
      'Ministry of Defence & Joint Headquarters',
      'Army Logistics & Ordnance Corps',
      'Border Guard & Rapid Response Battalions',
      'Special Weapons & Tactical Law Enforcement'
    ],
    complianceStandards: ['NIJ 0101.06', 'MIL-STD-810H', 'STANAG 2920', 'ISO 9001:2015'],
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'maritime',
    slug: 'maritime',
    name: 'Maritime',
    headline: 'Naval Engineering & Blue Economy Systems',
    tagline: 'Naval platforms, marine electronics, port security, and hydrographic instrumentation.',
    description: 'Bridging world-class naval architecture and marine equipment OEMs with regional navies, coast guards, port authorities, and offshore contractors. From custom aluminum patrol boats to multibeam bathymetric sonars and IMO/SOLAS navigation radar arrays.',
    iconName: 'Anchor',
    accentColor: '#0ea5e9',
    capabilities: [
      'Naval Workboat & Fast Interceptor Patrol Vessels',
      'X-Band & S-Band IMO/SOLAS Navigation Radars',
      'High-Resolution Multibeam Sonar & Hydrographic Systems',
      'Davit-Launched Self-Righting Life Rafts (SOLAS/MED-B)',
      'Aids to Navigation (AtoN) & Harbor Vessel Traffic Monitoring'
    ],
    targetOperators: [
      'Naval Fleet Commands & Coast Guard Commands',
      'Port Authorities & Harbor Master Divisions',
      'Offshore Energy Support & Marine Salvage',
      'Hydrographic Department & Survey Institutes'
    ],
    complianceStandards: ['IMO / SOLAS', 'MED-B Type Approved', 'Bureau Veritas', 'Lloyds Register'],
    imageUrl: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'industry',
    slug: 'industry',
    name: 'Industry',
    headline: 'Turnkey Machinery & Industrial Automation',
    tagline: 'Heavy machinery, plant automation, and turnkey project supply for energy and manufacturing.',
    description: 'Supplying heavy industrial plant equipment, process control hardware, backup power generation, and specialized fabrication machinery for high-output manufacturing, energy generation, and infrastructure megaprojects.',
    iconName: 'Factory',
    accentColor: '#f97316',
    capabilities: [
      'Heavy Industrial Pumps & Valve Manifolds',
      'Turbine & High-Capacity Diesel Power Generators',
      'Automated CNC Metal Cutting & Fabrication Centers',
      'Process Control SCADA & Instrumentation Panels',
      'Overhead Gantry Cranes & Heavy Material Handling'
    ],
    targetOperators: [
      'Power Generation & Energy Utilities',
      'Shipyard & Heavy Steel Fabrication Plants',
      'Petrochemical Refineries & Chemical Facilities',
      'National Infrastructure EPC Contractors'
    ],
    complianceStandards: ['CE Marked', 'ASME Boiler Code', 'IEC 61508', 'ISO 14001'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'geospatial',
    slug: 'geospatial',
    name: 'Geospatial',
    headline: 'Spatial Intelligence & Earth Observation',
    tagline: 'GIS, remote sensing, GNSS surveying, and photogrammetric spatial intelligence.',
    description: 'Empowering national survey organizations, urban planning directorates, and defense intelligence with high-precision GNSS receivers, LiDAR drones, satellite imagery analysis, and enterprise spatial database infrastructure.',
    iconName: 'Map',
    accentColor: '#10b981',
    capabilities: [
      'Multi-Constellation RTK GNSS Survey Receivers',
      'Airborne & Mobile LiDAR Mapping Systems',
      'Sub-Meter High-Resolution Satellite Imagery Feeds',
      'Geographic Information Systems (GIS) Enterprise Software',
      'Digital Twin & 3D Terrain Elevation Modeling'
    ],
    targetOperators: [
      'Survey of Bangladesh & Cartography Directorates',
      'Defense Geospatial Intelligence Units',
      'Water Resources & Coastal Flood Modeling Authorities',
      'Transportation & Highway Design Institutes'
    ],
    complianceStandards: ['OGC Standards', 'ISO 19115', 'RTCM 3.x', 'WGS84 Certified'],
    imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ict',
    slug: 'ict',
    name: 'ICT',
    headline: 'Mission-Critical Digital & Cyber Infrastructure',
    tagline: 'Enterprise IT, cybersecurity, tactical cloud, and hardened communications.',
    description: 'Engineering resilient, air-gapped data centers, encrypted communication backbones, and zero-trust cybersecurity operations centers for government ministries, military commands, and critical national infrastructure operators.',
    iconName: 'Cpu',
    accentColor: '#8b5cf6',
    capabilities: [
      'Encrypted Tactical Radios & IP Mesh Networks',
      'Air-Gapped Modular Edge Data Centers',
      'Threat Hunting & Cyber Command Operations Centers (SOC)',
      'Fiber Optic High-Throughput Long-Haul Transmission',
      'Defense-Grade Biometric Access Control & Surveillance'
    ],
    targetOperators: [
      'Ministry of ICT & Digital Governance Agencies',
      'Military Signals & Communications Directorates',
      'National Cyber Security Agencies',
      'Central Bank & Financial Telecommunications Hubs'
    ],
    complianceStandards: ['NIST SP 800-53', 'ISO 27001', 'FIPS 140-2 Level 3', 'Common Criteria EAL4+'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'logistics-supply',
    slug: 'logistics-supply',
    name: 'Logistics & Supply',
    headline: 'Global Sourcing & Secure Last-Mile Logistics',
    tagline: 'Strategic sourcing, bonded warehousing, hazardous cargo, and turnkey commissioning.',
    description: 'Managing end-to-end global supply chains from OEM factory floor in Europe, North America, or East Asia to secure delivery, customs clearance, bonded warehousing, and on-site testing anywhere across South Asia.',
    iconName: 'Truck',
    accentColor: '#ec4899',
    capabilities: [
      'Dangerous Goods (DG) Class 1 Explosive Freight Handling',
      'Direct Factory OEM Sourcing & Verified Chain of Custody',
      'Chittagong & Mongla Port Customs Expedited Clearance',
      'Climate-Controlled Bonded High-Security Warehousing',
      'On-Site Engineering Commissioning & Operator Training'
    ],
    targetOperators: [
      'Directorate General of Defence Purchase (DGDP)',
      'State-Owned Strategic Enterprises & Corporations',
      'International Humanitarian Relief Missions',
      'Commercial Shipping & Energy Concessionaires'
    ],
    complianceStandards: ['IATA DGR', 'IMDG Code', 'WCO SAFE Framework', 'ISO 28000'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
  }
];
