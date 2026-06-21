import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";
import prop4 from "@/assets/prop-4.jpg";
import prop5 from "@/assets/prop-5.jpg";
import prop6 from "@/assets/prop-6.jpg";

export type ListingType = "long-term" | "shortlet";
export type PropertyType =
  | "Self-contained"
  | "Mini flat"
  | "1 bedroom"
  | "2 bedroom"
  | "3 bedroom"
  | "Duplex";
export type ListedBy = "landlord" | "agent";
export type Status = "Available" | "Under Negotiation" | "Rented";

export interface Listing {
  id: string;
  title: string;
  type: ListingType;
  propertyType: PropertyType;
  price: number;
  state: string;
  area: string;     // LGA / neighbourhood
  address: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  image: string;
  gallery: string[];
  listedBy: ListedBy;
  verified: boolean;
  agencyFee?: number;
  cautionFee?: number;
  status: Status;
  hostName: string;
}

const IMGS = [prop1, prop2, prop3, prop4, prop5, prop6];
const pick = (i: number) => IMGS[i % IMGS.length];
const gallery = (i: number) => [pick(i), pick(i + 2), pick(i + 4)];

interface Seed {
  id: string;
  title: string;
  type: ListingType;
  propertyType: PropertyType;
  price: number;
  state: string;
  area: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  listedBy: ListedBy;
  verified: boolean;
  agencyFee?: number;
  cautionFee?: number;
  hostName: string;
}

const SEEDS: Seed[] = [
  // Lagos
  { id: "lag-001", title: "Modern 2 Bedroom Apartment with Balcony", type: "long-term", propertyType: "2 bedroom", price: 1800000, state: "Lagos", area: "Eti Osa", address: "Off Admiralty Way, Lekki Phase 1", bedrooms: 2, bathrooms: 2, description: "Bright and airy 2-bedroom apartment in a serene Lekki estate. Open-plan living, fitted kitchen, and a private balcony overlooking landscaped grounds. 24/7 power and water.", listedBy: "agent", verified: true, agencyFee: 540000, cautionFee: 200000, hostName: "Ada Realty" },
  { id: "lag-002", title: "Neat Self-Contained Studio near UNILAG", type: "long-term", propertyType: "Self-contained", price: 450000, state: "Lagos", area: "Lagos Mainland", address: "Akoka Road, Yaba", bedrooms: 1, bathrooms: 1, description: "Perfect for students, a compact self-contained with kitchenette, en-suite bathroom, prepaid meter, and tiled floors. Walking distance to UNILAG.", listedBy: "landlord", verified: true, cautionFee: 50000, hostName: "Mr. Tunde O." },
  { id: "lag-003", title: "Spacious 4 Bedroom Duplex in Lekki", type: "long-term", propertyType: "Duplex", price: 6500000, state: "Lagos", area: "Eti Osa", address: "Ikate Elegushi, Lekki", bedrooms: 4, bathrooms: 5, description: "Fully detached modern duplex with BQ, private compound, and ample parking. Premium finishing throughout.", listedBy: "agent", verified: true, agencyFee: 650000, cautionFee: 500000, hostName: "Skylink Properties" },
  { id: "lag-004", title: "Luxury Shortlet, Victoria Island", type: "shortlet", propertyType: "2 bedroom", price: 65000, state: "Lagos", area: "Eti Osa", address: "Adetokunbo Ademola, VI", bedrooms: 2, bathrooms: 2, description: "Beautifully furnished 2-bedroom shortlet with city views, smart TV, WiFi, fully stocked kitchen and dedicated workspace.", listedBy: "agent", verified: true, hostName: "StayLagos" },
  { id: "lag-005", title: "Cozy Mini Flat in Surulere", type: "long-term", propertyType: "Mini flat", price: 750000, state: "Lagos", area: "Surulere", address: "Ogunlana Drive, Surulere", bedrooms: 1, bathrooms: 1, description: "Bright mini flat with separate living area, kitchen, and bathroom. Quiet neighbourhood with good road access.", listedBy: "landlord", verified: true, cautionFee: 80000, hostName: "Mrs. Adesanya" },
  { id: "lag-006", title: "Elegant 3 Bedroom Flat in Ikeja GRA", type: "long-term", propertyType: "3 bedroom", price: 3200000, state: "Lagos", area: "Ikeja", address: "Sobo Arobiodu, Ikeja GRA", bedrooms: 3, bathrooms: 3, description: "Tastefully finished 3-bedroom apartment in a secure compound. Inverter backup, borehole, and visitor parking.", listedBy: "agent", verified: true, agencyFee: 480000, cautionFee: 300000, hostName: "GreenHouse Realty" },
  { id: "lag-007", title: "Boutique Ikoyi Shortlet Studio", type: "shortlet", propertyType: "Self-contained", price: 28000, state: "Lagos", area: "Eti Osa", address: "Bourdillon, Ikoyi", bedrooms: 1, bathrooms: 1, description: "Stylish self-contained shortlet, perfect for solo travellers or short business trips. Netflix, WiFi, and concierge.", listedBy: "landlord", verified: true, hostName: "Ms. Bisola" },
  { id: "lag-008", title: "Affordable 1 Bedroom Flat in Ajah", type: "long-term", propertyType: "1 bedroom", price: 850000, state: "Lagos", area: "Ibeju-Lekki", address: "Sangotedo, Ajah", bedrooms: 1, bathrooms: 1, description: "Brand new 1-bedroom apartment in a small estate. Tiled, POP ceiling, and 24-hour security.", listedBy: "agent", verified: false, agencyFee: 170000, cautionFee: 100000, hostName: "PrimeKey Agents" },

  // FCT - Abuja
  { id: "abj-001", title: "Serviced 3 Bedroom Apartment in Wuse 2", type: "long-term", propertyType: "3 bedroom", price: 4500000, state: "FCT - Abuja", area: "Municipal Area Council", address: "Aminu Kano Crescent, Wuse 2", bedrooms: 3, bathrooms: 3, description: "Fully serviced 3-bedroom flat in the heart of Wuse 2. 24-hour power, water, gym, and concierge.", listedBy: "agent", verified: true, agencyFee: 450000, cautionFee: 400000, hostName: "Capital Homes" },
  { id: "abj-002", title: "Maitama Diplomatic Duplex", type: "long-term", propertyType: "Duplex", price: 12000000, state: "FCT - Abuja", area: "Municipal Area Council", address: "IBB Way, Maitama", bedrooms: 5, bathrooms: 6, description: "Luxury 5-bedroom detached duplex with BQ, swimming pool, and ample parking. Diplomatic neighbourhood.", listedBy: "agent", verified: true, agencyFee: 1200000, cautionFee: 1000000, hostName: "Abuja Elite Realty" },
  { id: "abj-003", title: "Cozy Studio Shortlet, Jabi Lake", type: "shortlet", propertyType: "Self-contained", price: 35000, state: "FCT - Abuja", area: "Municipal Area Council", address: "Jabi Lake View, Jabi", bedrooms: 1, bathrooms: 1, description: "Modern studio shortlet steps from Jabi Lake Mall. WiFi, Netflix, and 24/7 power.", listedBy: "landlord", verified: true, hostName: "Mr. Aliyu" },
  { id: "abj-004", title: "Mini Flat in Gwagwalada near UniAbuja", type: "long-term", propertyType: "Mini flat", price: 380000, state: "FCT - Abuja", area: "Gwagwalada", address: "Phase 2, Gwagwalada", bedrooms: 1, bathrooms: 1, description: "Affordable mini flat suited for university students. Quiet area with constant water supply.", listedBy: "landlord", verified: true, cautionFee: 40000, hostName: "Hajia Salamatu" },

  // Rivers - Port Harcourt
  { id: "phc-001", title: "Modern 2 Bedroom Flat in GRA Phase 2", type: "long-term", propertyType: "2 bedroom", price: 1500000, state: "Rivers", area: "Port Harcourt", address: "Tombia Street, GRA Phase 2", bedrooms: 2, bathrooms: 2, description: "Newly built 2-bedroom flat in a secure estate. Inverter and borehole included.", listedBy: "agent", verified: true, agencyFee: 150000, cautionFee: 150000, hostName: "Garden City Realty" },
  { id: "phc-002", title: "Self-Contained in Choba near UniPort", type: "long-term", propertyType: "Self-contained", price: 250000, state: "Rivers", area: "Obio/Akpor", address: "Choba, near UniPort", bedrooms: 1, bathrooms: 1, description: "Compact self-contained perfect for UniPort students. Prepaid meter and tiled floors.", listedBy: "landlord", verified: true, cautionFee: 30000, hostName: "Mr. Wike" },
  { id: "phc-003", title: "Shortlet Apartment, Old GRA", type: "shortlet", propertyType: "1 bedroom", price: 32000, state: "Rivers", area: "Port Harcourt", address: "Forces Avenue, Old GRA", bedrooms: 1, bathrooms: 1, description: "Furnished 1-bedroom shortlet with smart TV, WiFi, and 24/7 security.", listedBy: "agent", verified: true, hostName: "PH Stays" },

  // Oyo - Ibadan
  { id: "ibd-001", title: "3 Bedroom Bungalow in Bodija", type: "long-term", propertyType: "3 bedroom", price: 1200000, state: "Oyo", area: "Ibadan North", address: "Bodija Estate, Ibadan", bedrooms: 3, bathrooms: 3, description: "Family bungalow with large compound and fruit trees. Quiet residential neighbourhood.", listedBy: "agent", verified: true, agencyFee: 120000, cautionFee: 100000, hostName: "Ibadan Realty" },
  { id: "ibd-002", title: "Self-Contained near UI", type: "long-term", propertyType: "Self-contained", price: 220000, state: "Oyo", area: "Ibadan North", address: "Agbowo, opposite UI", bedrooms: 1, bathrooms: 1, description: "Student-friendly self-con with kitchenette and en-suite. Walking distance to UI gate.", listedBy: "landlord", verified: true, cautionFee: 25000, hostName: "Baba Tunde" },
  { id: "ibd-003", title: "Mini Flat in Ring Road", type: "long-term", propertyType: "Mini flat", price: 500000, state: "Oyo", area: "Ibadan South-West", address: "Ring Road, Ibadan", bedrooms: 1, bathrooms: 1, description: "Spacious mini flat in a calm gated compound. POP ceilings, fitted kitchen.", listedBy: "agent", verified: false, agencyFee: 50000, cautionFee: 50000, hostName: "ProRent Agents" },

  // Kano
  { id: "kan-001", title: "3 Bedroom Apartment in Nasarawa GRA", type: "long-term", propertyType: "3 bedroom", price: 900000, state: "Kano", area: "Nasarawa", address: "Nasarawa GRA, Kano", bedrooms: 3, bathrooms: 3, description: "Spacious flat in a secured estate. Borehole, prepaid meter, and tiled throughout.", listedBy: "agent", verified: true, agencyFee: 90000, cautionFee: 100000, hostName: "Kano Premier Realty" },
  { id: "kan-002", title: "Self-Contained in Bayero University Area", type: "long-term", propertyType: "Self-contained", price: 180000, state: "Kano", area: "Gwale", address: "Old Site, BUK Road", bedrooms: 1, bathrooms: 1, description: "Neat self-con close to Bayero University Kano. Suitable for students.", listedBy: "landlord", verified: true, cautionFee: 20000, hostName: "Alhaji Musa" },

  // Enugu
  { id: "enu-001", title: "Modern 2 Bedroom in Independence Layout", type: "long-term", propertyType: "2 bedroom", price: 800000, state: "Enugu", area: "Enugu North", address: "Independence Layout, Enugu", bedrooms: 2, bathrooms: 2, description: "Lovely 2-bedroom flat in a well-planned neighbourhood. Reliable power and water.", listedBy: "agent", verified: true, agencyFee: 80000, cautionFee: 80000, hostName: "Coal City Realty" },
  { id: "enu-002", title: "Self-Contained near UNN Gate", type: "long-term", propertyType: "Self-contained", price: 200000, state: "Enugu", area: "Nsukka", address: "Behind UNN, Nsukka", bedrooms: 1, bathrooms: 1, description: "Compact self-con perfectly placed for UNN students. Quiet compound.", listedBy: "landlord", verified: true, cautionFee: 20000, hostName: "Mama Chioma" },

  // Edo - Benin
  { id: "ben-001", title: "3 Bedroom Flat in GRA Benin", type: "long-term", propertyType: "3 bedroom", price: 1100000, state: "Edo", area: "Oredo", address: "Ihama Road, GRA, Benin City", bedrooms: 3, bathrooms: 3, description: "Tastefully finished apartment in Benin GRA. Inverter, borehole, secured estate.", listedBy: "agent", verified: true, agencyFee: 110000, cautionFee: 100000, hostName: "Heritage Realty" },
  { id: "ben-002", title: "Mini Flat near UNIBEN", type: "long-term", propertyType: "Mini flat", price: 350000, state: "Edo", area: "Ovia North-East", address: "Ekosodin, near UNIBEN", bedrooms: 1, bathrooms: 1, description: "Affordable mini flat in a student belt. Prepaid meter.", listedBy: "landlord", verified: true, cautionFee: 35000, hostName: "Mr. Osaze" },

  // Kaduna
  { id: "kad-001", title: "Furnished 2 Bedroom Shortlet, Barnawa", type: "shortlet", propertyType: "2 bedroom", price: 28000, state: "Kaduna", area: "Kaduna South", address: "Barnawa, Kaduna", bedrooms: 2, bathrooms: 2, description: "Comfortable furnished shortlet ideal for business trips. WiFi and inverter.", listedBy: "agent", verified: true, hostName: "Northern Stays" },
  { id: "kad-002", title: "Self-Contained near ABU Zaria", type: "long-term", propertyType: "Self-contained", price: 180000, state: "Kaduna", area: "Zaria", address: "Samaru, Zaria", bedrooms: 1, bathrooms: 1, description: "Student-focused self-con close to ABU main gate. Water and light included.", listedBy: "landlord", verified: true, cautionFee: 20000, hostName: "Malam Aliyu" },

  // Ogun
  { id: "ogn-001", title: "2 Bedroom Flat in Abeokuta GRA", type: "long-term", propertyType: "2 bedroom", price: 700000, state: "Ogun", area: "Abeokuta South", address: "Oke Ilewo, Abeokuta", bedrooms: 2, bathrooms: 2, description: "Comfortable family flat with reliable amenities. Secured compound.", listedBy: "agent", verified: true, agencyFee: 70000, cautionFee: 70000, hostName: "Egba Realty" },
  { id: "ogn-002", title: "Self-Contained near FUNAAB", type: "long-term", propertyType: "Self-contained", price: 200000, state: "Ogun", area: "Odeda", address: "Camp area, near FUNAAB", bedrooms: 1, bathrooms: 1, description: "Quiet self-con ideal for FUNAAB students.", listedBy: "landlord", verified: false, cautionFee: 20000, hostName: "Mrs. Adebayo" },

  // Delta
  { id: "del-001", title: "3 Bedroom Flat in Asaba", type: "long-term", propertyType: "3 bedroom", price: 1300000, state: "Delta", area: "Oshimili South", address: "Summit Road, Asaba", bedrooms: 3, bathrooms: 3, description: "Modern 3-bedroom flat in a serene estate. Borehole, inverter backup.", listedBy: "agent", verified: true, agencyFee: 130000, cautionFee: 130000, hostName: "Niger Delta Homes" },

  // Cross River - Calabar
  { id: "cal-001", title: "2 Bedroom Flat in State Housing, Calabar", type: "long-term", propertyType: "2 bedroom", price: 650000, state: "Cross River", area: "Calabar Municipal", address: "State Housing Estate, Calabar", bedrooms: 2, bathrooms: 2, description: "Clean, affordable flat in a peaceful neighbourhood.", listedBy: "agent", verified: true, agencyFee: 65000, cautionFee: 65000, hostName: "Calabar Realty" },

  // Akwa Ibom
  { id: "aki-001", title: "Furnished 1 Bedroom Shortlet, Uyo", type: "shortlet", propertyType: "1 bedroom", price: 22000, state: "Akwa Ibom", area: "Uyo", address: "Ewet Housing Estate, Uyo", bedrooms: 1, bathrooms: 1, description: "Cozy shortlet near city centre. WiFi, smart TV.", listedBy: "landlord", verified: true, hostName: "Ms. Ekaette" },

  // Plateau - Jos
  { id: "jos-001", title: "2 Bedroom Apartment in Rayfield", type: "long-term", propertyType: "2 bedroom", price: 600000, state: "Plateau", area: "Jos South", address: "Rayfield, Jos", bedrooms: 2, bathrooms: 2, description: "Cool-climate apartment in a quiet, scenic part of Jos.", listedBy: "agent", verified: true, agencyFee: 60000, cautionFee: 60000, hostName: "Highland Realty" },

  // Anambra
  { id: "anm-001", title: "Duplex in GRA Awka", type: "long-term", propertyType: "Duplex", price: 2500000, state: "Anambra", area: "Awka South", address: "GRA, Awka", bedrooms: 4, bathrooms: 4, description: "Spacious modern duplex with BQ and ample parking.", listedBy: "agent", verified: true, agencyFee: 250000, cautionFee: 200000, hostName: "Anambra Premier Homes" },

  // Kwara
  { id: "kwa-001", title: "Self-Contained near University of Ilorin", type: "long-term", propertyType: "Self-contained", price: 180000, state: "Kwara", area: "Ilorin South", address: "Tanke, Ilorin", bedrooms: 1, bathrooms: 1, description: "Compact self-con perfect for UNILORIN students.", listedBy: "landlord", verified: true, cautionFee: 20000, hostName: "Alhaji Yusuf" },

  // Osun - Ife
  { id: "osu-001", title: "Mini Flat near OAU", type: "long-term", propertyType: "Mini flat", price: 300000, state: "Osun", area: "Ife Central", address: "Mayfair, Ile-Ife", bedrooms: 1, bathrooms: 1, description: "Quiet mini flat in Ife. 10 minutes to OAU.", listedBy: "landlord", verified: true, cautionFee: 30000, hostName: "Mr. Awolowo" },
];

export const LISTINGS: Listing[] = SEEDS.map((s, i) => ({
  ...s,
  image: pick(i),
  gallery: gallery(i),
  status: "Available",
}));

export const PROPERTY_TYPES: PropertyType[] = [
  "Self-contained",
  "Mini flat",
  "1 bedroom",
  "2 bedroom",
  "3 bedroom",
  "Duplex",
];

export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

export function getListingById(id: string): Listing | undefined {
  return LISTINGS.find((l) => l.id === id);
}
