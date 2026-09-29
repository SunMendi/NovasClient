import { Vessel } from '../types';

export const VESSELS: Vessel[] = [
  {
    id: 'patrol-boat-fpb24',
    slug: 'patrol-boat-fpb24',
    name: 'Fast Patrol Interceptor FPB-24',
    vesselType: 'Coastal Patrol & Interception',
    tagline: 'High-speed deep-V aluminum tactical interceptor.',
    description: 'Engineered for littoral surveillance, anti-smuggling, and maritime border protection. High-grade marine 5083-H111 aluminum hull with ballistic cabin protection up to NIJ Level III. Powered by twin marine diesels driving waterjets for exceptional shallow-water maneuverability.',
    lengthOverall: '24.50 m',
    beam: '5.80 m',
    draft: '1.20 m',
    maxSpeed: '38.5 Knots',
    enginePower: '2x 1,600 BHP (MTU / MAN)',
    hullMaterial: 'Marine Grade 5083-H111 Aluminum',
    classificationSociety: 'Bureau Veritas / DNV',
    crewCapacity: 8,
    deliveryLeadTime: '8–10 Months',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Twin Hamilton Waterjets with vector thrust',
      'Flir Gyro-stabilized thermal camera system',
      'Remotely operated weapon station (RCWS) ready',
      'Aft stern ramp for 5.5m RHIB launch & recovery'
    ]
  },
  {
    id: 'terminal-tugboat-tb3200',
    slug: 'terminal-tugboat-tb3200',
    name: 'Harbor Escort Tugboat TB-3200',
    vesselType: 'ASD Escort & Harbor Tug',
    tagline: '65-tonne bollard pull Azimuth Stern Drive tug.',
    description: 'Heavy-duty steel tugboat designed for ship assist, offshore escort, and harbor emergency response. Equipped with dual 360-degree rotatable Azimuth thrusters, heavy rubber fendering, and FiFi 1 firefighting monitors.',
    lengthOverall: '32.00 m',
    beam: '11.20 m',
    draft: '4.80 m',
    maxSpeed: '13.5 Knots',
    bollardPull: '65.0 Tonnes Ahead',
    enginePower: '2x 2,400 BHP @ 1000 RPM (Caterpillar)',
    hullMaterial: 'Grade A Shipbuilding Structural Steel',
    classificationSociety: 'Lloyds Register ✠ 100A1 Tug',
    crewCapacity: 10,
    deliveryLeadTime: '12–14 Months',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Rolls-Royce / Kongsberg ASD Thrusters',
      'Hydraulic split-drum towing winch (150T brake)',
      'FiFi 1 Water Cannon: 2,400 m³/h capacity',
      'Oil dispersant spray boom system'
    ]
  },
  {
    id: 'offshore-support-osv48',
    slug: 'offshore-support-osv48',
    name: 'Offshore Supply Vessel OSV-48',
    vesselType: 'Offshore Platform Supply & Towing',
    tagline: 'Versatile 48m dynamic positioning support vessel.',
    description: 'Designed for deep-sea platform logistics, liquid cargo transport, and subsea inspection support. Features large 250m² open aft deck, dynamic positioning (DP-1), and heavy deck crane.',
    lengthOverall: '48.00 m',
    beam: '12.50 m',
    draft: '3.60 m',
    maxSpeed: '14.0 Knots',
    bollardPull: '45.0 Tonnes',
    enginePower: '2x 2,000 BHP (Yanmar / Cummins)',
    hullMaterial: 'All-Welded High Tensile Marine Steel',
    classificationSociety: 'Bureau Veritas ✠ HULL ✠ MACH',
    crewCapacity: 24,
    deliveryLeadTime: '14–16 Months',
    imageUrl: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1000&q=80',
    features: [
      '250 m² Deck cargo capacity (5 tonnes/m² load)',
      'Kongsberg DP-1 Dynamic Positioning System',
      'Hydraulic deck knuckle-boom crane (15T @ 12m)',
      'Fuel oil and potable water bulk transfer manifolds'
    ]
  },
  {
    id: 'fire-boat-rfb18',
    slug: 'fire-boat-rfb18',
    name: 'Port Firefighting Vessel RFB-18',
    vesselType: 'Emergency Port Fire & Rescue',
    tagline: 'Rapid response high-output firefighting vessel.',
    description: 'Rapid-intervention catamaran fire boat equipped with twin dual-monitor water/foam canons pumping 6,000 liters per minute, patient triage bay, and shallow draft for inner-harbor and canal operations.',
    lengthOverall: '18.20 m',
    beam: '5.20 m',
    draft: '0.95 m',
    maxSpeed: '28.0 Knots',
    enginePower: '2x 800 BHP Marine Turbo-Diesel',
    hullMaterial: 'Aluminum 5083-H111',
    classificationSociety: 'RINA / Bureau Veritas',
    crewCapacity: 4,
    deliveryLeadTime: '6–8 Months',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Dual remote-controlled roof monitors (6,000 L/min)',
      '1,000 Liter integrated AFFF foam tank',
      'Full perimeter water-curtain protection',
      'Emergency medical response treatment bay'
    ]
  }
];
