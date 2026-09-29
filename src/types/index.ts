export type SectorId = 
  | 'defence' 
  | 'maritime' 
  | 'industry' 
  | 'geospatial' 
  | 'ict' 
  | 'logistics-supply';

export interface Sector {
  id: SectorId;
  slug: string;
  name: string;
  headline: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  capabilities: string[];
  targetOperators: string[];
  complianceStandards: string[];
  imageUrl: string;
}

export type ProductCategory = 
  | 'Defence' 
  | 'Tactical' 
  | 'Maritime' 
  | 'Medical' 
  | 'Agri'
  | 'Vessels';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  sectorId: SectorId;
  tagline: string;
  description: string;
  featured: boolean;
  certifications: string[];
  specs: ProductSpec[];
  leadTime: string;
  origin: string;
  warranty: string;
  imageUrl: string;
}

export interface Vessel {
  id: string;
  slug: string;
  name: string;
  vesselType: string;
  tagline: string;
  description: string;
  lengthOverall: string;
  beam: string;
  draft: string;
  maxSpeed: string;
  bollardPull?: string;
  enginePower: string;
  hullMaterial: string;
  classificationSociety: string;
  crewCapacity: number;
  deliveryLeadTime: string;
  imageUrl: string;
  features: string[];
}

export interface RfqItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
}

export interface RfqFormData {
  organizationName: string;
  department: string;
  contactName: string;
  email: string;
  phone: string;
  tenderRefNumber?: string;
  deliveryPort: string;
  timeframe: string;
  endUserConfirmed: boolean;
  notes?: string;
  items: RfqItem[];
}
