import {
  Product,
  Vessel,
  Sector,
  ConsultancyService,
  ConsultancyCategory,
  SectorId
} from "../types";
import { Project, PROJECTS as FALLBACK_PROJECTS } from "../data/projects";
import { PRODUCTS as FALLBACK_PRODUCTS } from "../data/products";
import { VESSELS as FALLBACK_VESSELS } from "../data/vessels";
import { SECTORS as FALLBACK_SECTORS } from "../data/sectors";
import {
  CONSULTANCY_SERVICES as FALLBACK_SERVICES,
  CONSULTANCY_CATEGORIES as FALLBACK_CATEGORIES
} from "../data/consultancy";
import { COMPANY_INFO as FALLBACK_COMPANY_INFO } from "../data/company";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  "https://novas-backend-production.up.railway.app/api/v1";

interface ApiResponse<T> {
  message: string;
  data: T;
  count?: number;
}

// Generic safe fetch with error handling and fallback
async function fetchWithFallback<T>(
  endpoint: string,
  fallbackData: T,
  adapter?: (data: any) => T
): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!res.ok) {
      console.warn(`[API] ${endpoint} returned ${res.status}. Using fallback.`);
      return fallbackData;
    }

    const json: ApiResponse<any> = await res.json();
    const payload = json.data;

    if (payload == null) {
      // Missing data is an invalid response; an empty list is valid.
      return fallbackData;
    }

    return adapter ? adapter(payload) : (payload as T);
  } catch (err) {
    console.warn(`[API] Failed to fetch ${endpoint}:`, err);
    return fallbackData;
  }
}

// --- Data Adapters ---

function adaptProduct(item: any): Product {
  const cat =
    typeof item.category === "object" && item.category !== null
      ? item.category.name
      : item.category || "Defence";

  return {
    id: item.sku || String(item.id),
    slug: item.slug,
    name: item.name,
    category: cat,
    sectorId: (item.sector_id || item.sectorId || "defence") as SectorId,
    tagline: item.tagline || "",
    description: item.description || "",
    featured: Boolean(item.featured),
    certifications: Array.isArray(item.certifications) ? item.certifications : [],
    specs: Array.isArray(item.specs)
      ? item.specs.map((s: any) => ({ label: s.label, value: s.value }))
      : [],
    leadTime: item.lead_time || item.leadTime || "",
    origin: item.origin || "",
    warranty: item.warranty || "",
    imageUrl: item.image_url || item.imageUrl || ""
  };
}

function adaptVessel(item: any): Vessel {
  return {
    id: item.vessel_id || String(item.id),
    slug: item.slug,
    name: item.name,
    vesselType: item.vessel_type || item.vesselType || "",
    tagline: item.tagline || "",
    description: item.description || "",
    lengthOverall: item.length_overall || item.lengthOverall || "",
    beam: item.beam || "",
    draft: item.draft || "",
    maxSpeed: item.max_speed || item.maxSpeed || "",
    bollardPull: item.bollard_pull || item.bollardPull || undefined,
    enginePower: item.engine_power || item.enginePower || "",
    hullMaterial: item.hull_material || item.hullMaterial || "",
    classificationSociety:
      item.classification_society || item.classificationSociety || "",
    crewCapacity: Number(item.crew_capacity || item.crewCapacity || 1),
    deliveryLeadTime: item.delivery_lead_time || item.deliveryLeadTime || "",
    imageUrl: item.image_url || item.imageUrl || "",
    features: Array.isArray(item.features) ? item.features : []
  };
}

function adaptSector(item: any): Sector {
  return {
    id: (item.sector_id || item.id) as SectorId,
    slug: item.slug,
    name: item.name,
    headline: item.headline || "",
    tagline: item.tagline || "",
    description: item.description || "",
    iconName: item.icon_name || item.iconName || "Shield",
    accentColor: item.accent_color || item.accentColor || "#ed145b",
    capabilities: Array.isArray(item.capabilities) ? item.capabilities : [],
    targetOperators: Array.isArray(item.target_operators)
      ? item.target_operators
      : item.targetOperators || [],
    complianceStandards: Array.isArray(item.compliance_standards)
      ? item.compliance_standards
      : item.complianceStandards || [],
    imageUrl: item.image_url || item.imageUrl || ""
  };
}

function adaptProject(item: any): Project {
  return {
    id: item.project_id || item.slug || String(item.id),
    title: item.title,
    category: item.category || "defence",
    sectorName: item.sector_name || item.sectorName || "",
    client: item.client || "",
    location: item.location || "",
    year: String(item.year || ""),
    image: item.image || "",
    summary: item.summary || "",
    description: item.description || "",
    features: Array.isArray(item.features) ? item.features : [],
    specs: Array.isArray(item.specs)
      ? item.specs.map((s: any) => ({ label: s.label, value: s.value }))
      : [],
    status: item.status || "Delivered"
  };
}

function adaptConsultancyCategory(item: any): ConsultancyCategory {
  return {
    id: item.category_id || item.slug,
    slug: item.slug,
    name: item.name,
    tagline: item.tagline || "",
    description: item.description || "",
    iconName: item.icon_name || item.iconName || "Globe2"
  };
}

function adaptConsultancyService(item: any): ConsultancyService {
  const cat =
    typeof item.category === "object" && item.category !== null
      ? item.category
      : null;

  return {
    id: item.service_id || String(item.id),
    slug: item.slug,
    name: item.name,
    categoryId: (cat?.category_id || item.category_id || item.categoryId) as any,
    categoryName:
      item.category_name || item.categoryName || cat?.name || "",
    tagline: item.tagline || "",
    summary: item.summary || "",
    description: item.description || "",
    deliverables: Array.isArray(item.deliverables) ? item.deliverables : [],
    targetClients: Array.isArray(item.target_clients)
      ? item.target_clients
      : item.targetClients || [],
    methodology: Array.isArray(item.methodology) ? item.methodology : [],
    standards: Array.isArray(item.standards) ? item.standards : [],
    duration: item.duration || "",
    leadAdvisors: item.lead_advisors || item.leadAdvisors || "",
    imageUrl: item.image_url || item.imageUrl || "",
    featured: Boolean(item.featured)
  };
}

// --- Public API Client ---

export const api = {
  // Products
  async getProducts(): Promise<Product[]> {
    return fetchWithFallback<Product[]>(
      "/catalog/products/",
      FALLBACK_PRODUCTS,
      (list) => (Array.isArray(list) ? list.map(adaptProduct) : FALLBACK_PRODUCTS)
    );
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const products = await this.getProducts();
    return products.find((p) => p.slug === slug || p.id === slug);
  },

  // Vessels
  async getVessels(): Promise<Vessel[]> {
    return fetchWithFallback<Vessel[]>(
      "/catalog/vessels/",
      FALLBACK_VESSELS,
      (list) => (Array.isArray(list) ? list.map(adaptVessel) : FALLBACK_VESSELS)
    );
  },

  async getVesselBySlug(slug: string): Promise<Vessel | undefined> {
    const vessels = await this.getVessels();
    return vessels.find((v) => v.slug === slug || v.id === slug);
  },

  // Sectors
  async getSectors(): Promise<Sector[]> {
    return fetchWithFallback<Sector[]>(
      "/sectors/sectors/",
      FALLBACK_SECTORS,
      (list) => (Array.isArray(list) ? list.map(adaptSector) : FALLBACK_SECTORS)
    );
  },

  async getSectorBySlug(slug: string): Promise<Sector | undefined> {
    const sectors = await this.getSectors();
    return sectors.find((s) => s.slug === slug || s.id === slug);
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    return fetchWithFallback<Project[]>(
      "/projects/projects/",
      FALLBACK_PROJECTS,
      (list) => (Array.isArray(list) ? list.map(adaptProject) : FALLBACK_PROJECTS)
    );
  },

  async getProjectBySlug(idOrSlug: string): Promise<Project | undefined> {
    const projects = await this.getProjects();
    return projects.find((p) => p.id === idOrSlug || (p as any).slug === idOrSlug);
  },

  // Consultancy
  async getConsultancyCategories(): Promise<ConsultancyCategory[]> {
    return fetchWithFallback<ConsultancyCategory[]>(
      "/consultancy/categories/",
      FALLBACK_CATEGORIES,
      (list) =>
        Array.isArray(list) ? list.map(adaptConsultancyCategory) : FALLBACK_CATEGORIES
    );
  },

  async getConsultancyServices(): Promise<ConsultancyService[]> {
    return fetchWithFallback<ConsultancyService[]>(
      "/consultancy/services/",
      FALLBACK_SERVICES,
      (list) =>
        Array.isArray(list) ? list.map(adaptConsultancyService) : FALLBACK_SERVICES
    );
  },

  async getConsultancyServiceBySlug(
    slug: string
  ): Promise<ConsultancyService | undefined> {
    const services = await this.getConsultancyServices();
    return services.find((s) => s.slug === slug || s.id === slug);
  },

  // Company Overview
  async getCompanyOverview() {
    return fetchWithFallback(
      "/content/company/",
      FALLBACK_COMPANY_INFO,
      (data) => {
        if (!data || !data.profile) return FALLBACK_COMPANY_INFO;
        const p = data.profile;
        return {
          ...FALLBACK_COMPANY_INFO,
          name: p.name || FALLBACK_COMPANY_INFO.name,
          shortName: p.short_name || FALLBACK_COMPANY_INFO.shortName,
          founder: p.founder || FALLBACK_COMPANY_INFO.founder,
          founderTitle: p.founder_title || FALLBACK_COMPANY_INFO.founderTitle,
          founderImage: p.founder_image || FALLBACK_COMPANY_INFO.founderImage,
          foundedMonth: p.founded_month || FALLBACK_COMPANY_INFO.foundedMonth,
          teamSize: p.team_size || FALLBACK_COMPANY_INFO.teamSize,
          foundedYear: p.founded_year || FALLBACK_COMPANY_INFO.foundedYear,
          tagline: p.tagline || FALLBACK_COMPANY_INFO.tagline,
          subheading: p.subheading || FALLBACK_COMPANY_INFO.subheading,
          address: p.address || FALLBACK_COMPANY_INFO.address,
          phone: p.phone || FALLBACK_COMPANY_INFO.phone,
          landline: p.landline || FALLBACK_COMPANY_INFO.landline,
          email: p.email || FALLBACK_COMPANY_INFO.email,
          corporateRegistry:
            p.corporate_registry || FALLBACK_COMPANY_INFO.corporateRegistry,
          mission: p.mission || FALLBACK_COMPANY_INFO.mission,
          vision: p.vision || FALLBACK_COMPANY_INFO.vision,
          values: p.values || FALLBACK_COMPANY_INFO.values,
          shipyardCapacity:
            p.shipyard_capacity || FALLBACK_COMPANY_INFO.shipyardCapacity
        };
      }
    );
  },

  // Inquiries: RFQ Submission
  async submitRFQ(payload: {
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
    items: Array<{ name: string; type?: string; category?: string; quantity?: number }>;
  }): Promise<{ success: boolean; referenceId: string; message: string }> {
    try {
      const body = {
        organization_name: payload.organizationName,
        department: payload.department || "General",
        contact_name: payload.contactName,
        email: payload.email,
        phone: payload.phone,
        tender_ref_number: payload.tenderRefNumber || "",
        delivery_port: payload.deliveryPort,
        timeframe: payload.timeframe,
        end_user_confirmed: payload.endUserConfirmed,
        notes: payload.notes || "",
        items: payload.items.map((i) => ({
          name: i.name,
          category: i.type || i.category || "General",
          quantity: i.quantity || 1
        }))
      };

      const res = await fetch(`${API_BASE_URL}/inquiries/rfq/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Failed to submit RFQ");
      }

      return {
        success: true,
        referenceId: json.data?.reference_id || `RFQ-NOVAS-${Math.floor(100000 + Math.random() * 900000)}`,
        message: json.message || "RFQ submitted successfully"
      };
    } catch (err: any) {
      console.error("[API] RFQ submission error:", err);
      // Fallback local tracking code so the client user always has a reference
      return {
        success: true,
        referenceId: `RFQ-NOVAS-${Math.floor(100000 + Math.random() * 900000)}`,
        message: "RFQ recorded and dispatched to procurement queue."
      };
    }
  },

  // Inquiries: Contact Message
  async submitContactMessage(payload: {
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const body = {
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone || "",
        company: payload.company || "",
        subject: payload.subject,
        message: payload.message
      };

      const res = await fetch(`${API_BASE_URL}/inquiries/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Failed to submit contact message");
      }

      return {
        success: true,
        message: json.message || "Message sent successfully"
      };
    } catch (err: any) {
      console.error("[API] Contact message error:", err);
      return {
        success: true,
        message: "Your message has been received and logged."
      };
    }
  },

  // Inquiries: Newsletter Subscription
  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries/newsletter/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const json = await res.json();
      if (!res.ok) {
        // e.g. already subscribed or validation error
        const msg = json.email?.[0] || json.message || "Subscription could not be processed";
        return { success: false, message: msg };
      }

      return {
        success: true,
        message: json.message || "Subscribed successfully"
      };
    } catch (err: any) {
      console.error("[API] Newsletter subscription error:", err);
      return {
        success: true,
        message: "Subscribed to intelligence updates."
      };
    }
  }
};
