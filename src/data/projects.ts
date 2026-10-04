export interface Project {
  id: string;
  slug?: string;
  title: string;
  category: "defence" | "maritime" | "industry" | "consultancy" | "geospatial";
  sectorName: string;
  client: string;
  location: string;
  year: string;
  image: string;
  summary: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  status: "Completed" | "Active" | "Delivered";
}

export const PROJECTS: Project[] = [
  {
    id: "naval-interceptor-craft-patrol",
    title: "High-Speed Tactical Naval Interceptor Workboats",
    category: "maritime",
    sectorName: "Maritime & Naval",
    client: "National Naval & Coast Guard Authorities",
    location: "Chittagong & Mongla Coastal Waters, Bangladesh",
    year: "2024",
    image: "/assets/hero/hero-maritime-Z9Kk4jOd.jpg",
    summary: "Turnkey delivery and systems integration of high-speed naval interceptor workboats equipped with marine X-band surveillance radar and tactical VHF comms.",
    description: `Novas BD spearheaded the full technical procurement, naval architecture assessment, and shipyard integration for rapid response naval interceptor workboats.
    Designed for shallow draft operations, anti-piracy interception, and EEZ (Exclusive Economic Zone) maritime policing, each vessel features reinforced marine-grade 5083-H116 aluminium hulls and integrated twin diesel waterjet propulsion systems.
    Our specialized 24-member engineering team provided on-site sea trial commissioning, hydrographic sonar calibration, and dedicated after-sales operational training for maritime crews.`,
    features: [
      "Twin marine diesel inboard engines with high-thrust waterjet propulsion",
      "Reinforced 5083-H116 marine aluminium hull construction",
      "High-definition X-band tactical surveillance radar array",
      "MIL-STD-810H encrypted tactical VHF/HF marine communications suite",
      "FLIR thermal night-vision optical camera for 24/7 all-weather operations",
      "SOLAS-compliant life-saving apparatus and deployable rescue gear"
    ],
    specs: [
      { label: "Length Overall (LOA)", value: "14.80 meters" },
      { label: "Beam (Width)", value: "3.90 meters" },
      { label: "Maximum Speed", value: "38+ Knots" },
      { label: "Operating Range", value: "320 Nautical Miles" },
      { label: "Hull Material", value: "Marine Grade 5083-H116 Aluminium" },
      { label: "Compliance Standard", value: "IMO / SOLAS / MED-B" }
    ],
    status: "Delivered"
  },
  {
    id: "tactical-border-surveillance-radar",
    title: "Border Surveillance Radar & Electro-Optical Reconnaissance",
    category: "defence",
    sectorName: "Defence & Tactical",
    client: "Border Security Forces & Defense Ministry",
    location: "Eastern & Northern Frontier Sectors, Bangladesh",
    year: "2023 - 2024",
    image: "/assets/hero/hero-defence-CzOJrdZI.jpg",
    summary: "Deployment of tactical perimeter ground-surveillance radar with co-mounted long-range thermal electro-optical tracking cameras for 24/7 sovereign border security.",
    description: `A mission-critical national security project involving the procurement, tactical siting, and hardware integration of ground surveillance radar (GSR) towers.
    The system delivers automated moving target indicator (MTI) alerts across rugged terrain, integrating AI-assisted target classification to distinguish between human operators, vehicles, and wildlife.
    Novas executed end-to-end logistics, hardened tactical power backup systems, and military-grade fiber optic network integration into regional command centers.`,
    features: [
      "Continuous 360° ground surveillance with automated target classification",
      "Cooled thermal imaging camera with detection range exceeding 12 km",
      "MIL-STD-810H environmental hardening (-20°C to +55°C operation)",
      "Automated radar-slew-to-cue optical tracking system",
      "Autonomous solar & tactical generator hybrid backup power",
      "Encrypted secure C4ISR telemetry datalink to central headquarters"
    ],
    specs: [
      { label: "Detection Range", value: "Up to 15 km (Vehicles) / 8 km (Personnel)" },
      { label: "Azimuth Coverage", value: "360° Continuous Rotation" },
      { label: "Thermal Sensor", value: "640x512 Cooled InSb MWIR" },
      { label: "Standards", value: "MIL-STD-810H, IP67 Waterproof" },
      { label: "Power Autonomy", value: "72 Hours Continuous Unattended" },
      { label: "Origin Verification", value: "Certified Global OEM" }
    ],
    status: "Completed"
  },
  {
    id: "military-frontline-medical-trauma",
    title: "Frontline Tactical Combat Casualty Care (TCCC) Program",
    category: "defence",
    sectorName: "Medical & Humanitarian",
    client: "Armed Forces Medical Directorate & UN Peacekeeping Mission",
    location: "Dhaka Central Medical Depot & Field Deployments",
    year: "2024",
    image: "/assets/hero/hero-medical-DBJtfXpF.jpg",
    summary: "Large-scale procurement and supply of tactical trauma kits, deployable field monitors, and specialized surgical casualty units for national and UN deployment.",
    description: `Equipping tactical response units and peacekeeping battalions with gold-standard Tactical Combat Casualty Care (TCCC) medical supplies.
    Novas sourced and delivered vacuum-sealed modular trauma packs, combat-grade hemostatic dressings, tourniquets, portable vital-sign monitors, and deployable disaster relief medical shelters.
    Each package undergoes rigorous humidity and shelf-life verification to ensure 100% operational readiness in harsh field conditions.`,
    features: [
      "CoTCCC-approved combat application tourniquets and hemostatic gauze",
      "Hardened portable multi-parameter field patient monitors",
      "Negative-pressure deployable field casualty treatment units",
      "Vacuum-sealed, weather-proof ballistic nylon IFAK trauma pouches",
      "Cold-chain compliant medical transport containers with temperature loggers",
      "Hands-on tactical trauma simulator kits for military medical personnel"
    ],
    specs: [
      { label: "Compliance Standard", value: "CoTCCC Guidelines & CE/FDA Class II" },
      { label: "Operating Temperature", value: "-10°C to +50°C" },
      { label: "Packaging Barrier", value: "Hermetically Sealed MIL-SPEC Foil" },
      { label: "Lead Time Delivered", value: "21 Days Express Air Procurement" },
      { label: "Shelf Life Guarantee", value: "5 Years Minimum Expiry" },
      { label: "Training Support", value: "Certified Clinical Masterclasses" }
    ],
    status: "Completed"
  },
  {
    id: "shipyard-heavy-industrial-cnc-automation",
    title: "Automated Shipyard CNC Plasma Cutting & Fabrication Line",
    category: "industry",
    sectorName: "Heavy Industry & Shipyard",
    client: "Strategic Naval & Commercial Shipyard Facility",
    location: "Narayanganj & Chittagong Shipyards, Bangladesh",
    year: "2023",
    image: "/assets/hero/hero-logistics-sV_p9M_H.jpg",
    summary: "Turnkey EPC installation of high-precision heavy industrial gantry CNC plasma plate-cutting machines and automated submerged-arc welding stations.",
    description: `Modernizing sovereign shipbuilding capabilities through the design, procurement, structural foundation engineering, and commissioning of heavy CNC plasma cutting tables.
    The automated fabrication facility handles high-tensile steel plates up to 50mm thickness, reducing vessel hull fabrication lead times by 40% while ensuring sub-millimeter cutting accuracy.
    Novas supplied complete CAD/CAM nesting software suites, turnkey dust extraction systems, and certified operator training.`,
    features: [
      "Dual-gantry heavy duty CNC plasma and oxy-fuel cutting stations",
      "Multi-torch high-definition plasma power units (400 Ampere)",
      "Automated beveling head for weld-preparation edge cutting",
      "Integrated down-draft eco fume filtration and dust extraction",
      "High-speed digital servo drives with optical rail alignment",
      "Comprehensive 3-year OEM preventive maintenance package"
    ],
    specs: [
      { label: "Working Cutting Width", value: "6.0 Meters Effective" },
      { label: "Working Cutting Length", value: "32.0 Meters Continuous Rail" },
      { label: "Plate Thickness", value: "Up to 50mm (Plasma) / 150mm (Oxy)" },
      { label: "Positioning Accuracy", value: "±0.1 mm/meter" },
      { label: "Control System", value: "Industrial CNC with Automated Nesting" },
      { label: "Certification", value: "ISO 9001:2015 & CE Industrial Machinery" }
    ],
    status: "Completed"
  },
  {
    id: "c4isr-secure-cyber-defense-center",
    title: "Sovereign Defense Cyber Operations Center (SOC/NOC)",
    category: "consultancy",
    sectorName: "ICT & Cybersecurity",
    client: "National Strategic Infrastructure Authority",
    location: "Dhaka, Bangladesh",
    year: "2024 - 2025",
    image: "/assets/hero/hero-cyber-BQaYidYs.jpg",
    summary: "Turnkey consultancy, architectural design, and deployment of a hardened 24/7 Security Operations Center with zero-trust sovereign network architecture.",
    description: `Protecting critical national infrastructure against sophisticated advanced persistent threats (APTs).
    Novas delivered complete consultancy, hardware rack procurement, electromagnetic pulse (EMP) shielding guidance, and next-generation SIEM integration.
    The project encompasses unified threat intelligence dashboards, air-gapped forensic malware analysis workstations, and biometric access control perimeters.`,
    features: [
      "Tier-III resilient server infrastructure with high-availability clustering",
      "Next-generation enterprise SIEM with automated threat containment",
      "Hardened cryptographic hardware security modules (HSM)",
      "Air-gapped digital forensics investigation laboratory",
      "High-density ergonomic video wall display array for command bridge operators",
      "ISO 27001 & NIST 800-53 compliance auditing and protocol drafting"
    ],
    specs: [
      { label: "Facility Standard", value: "Tier III Data Center Topology" },
      { label: "Throughput Capacity", value: "100 Gbps Core Switching Fabrics" },
      { label: "Security Architecture", value: "Zero-Trust Military Architecture" },
      { label: "SLA Uptime", value: "99.982% Mission Availability" },
      { label: "Compliance", value: "ISO 27001:2022 / NIST Cybersecurity Framework" },
      { label: "Engineering Support", value: "24/7 Tier-1/2/3 Response Desk" }
    ],
    status: "Active"
  },
  {
    id: "tactical-uav-coastal-reconnaissance",
    title: "Tactical Border & Maritime Reconnaissance UAV Fleet",
    category: "geospatial",
    sectorName: "Aerospace & Geospatial",
    client: "Maritime Security & Environmental Surveillance Authority",
    location: "Bay of Bengal Littoral Zone & Sundarbans Reserve",
    year: "2024",
    image: "/assets/hero/hero-aerospace-CdirWyJV.jpg",
    summary: "Supply of long-endurance vertical takeoff (VTOL) surveillance drones equipped with high-resolution multispectral and thermal sensors for coastal policing.",
    description: `Integrating unmanned aerial systems for coastal surveillance, illegal maritime traffic interdiction, and environmental disaster monitoring.
    The VTOL fixed-wing UAV platforms combine the takeoff convenience of multi-rotors with the high-speed transit and multi-hour endurance of fixed wings.
    Equipped with gyro-stabilized optical/thermal sensor gimbals and encrypted satellite/COFDM communication datalinks, the fleet provides live real-time situational awareness.`,
    features: [
      "Vertical Takeoff and Landing (VTOL) capability with zero runway requirement",
      "Over 3.5 hours continuous flight endurance per mission",
      "Triple-sensor gyro-stabilized gimbal: 4K daylight, 640x512 thermal, laser rangefinder",
      "Encrypted COFDM datalink with 80+ km line-of-sight transmission",
      "Automated waypoint navigation with failsafe return-to-base protocols",
      "Ruggedized ground control station (GCS) laptops with dual sunlight-readable displays"
    ],
    specs: [
      { label: "Wingspan", value: "3.20 Meters" },
      { label: "Endurance", value: "210 Minutes Continuous" },
      { label: "Cruising Speed", value: "75 km/h (Max 120 km/h)" },
      { label: "Operating Radius", value: "80+ km Direct Telemetry" },
      { label: "Wind Resistance", value: "Beaufort Scale 6 (Up to 45 km/h)" },
      { label: "Sensors", value: "EO/IR Dual Payload + Laser Rangefinder" }
    ],
    status: "Active"
  }
];
