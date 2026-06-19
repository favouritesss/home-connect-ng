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
  price: number; // yearly for long-term, per night for shortlet
  area: string;
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

export const LISTINGS: Listing[] = [
  {
    id: "lkk-2b-001",
    title: "Modern 2 Bedroom Apartment with Balcony",
    type: "long-term",
    propertyType: "2 bedroom",
    price: 1800000,
    area: "Lekki Phase 1",
    address: "Off Admiralty Way, Lekki Phase 1, Lagos",
    bedrooms: 2,
    bathrooms: 2,
    description:
      "Bright and airy 2-bedroom apartment in a serene Lekki estate. Open-plan living, fitted kitchen, and a private balcony overlooking landscaped grounds. 24/7 power and water.",
    image: prop1,
    gallery: [prop1, prop4, prop6],
    listedBy: "agent",
    verified: true,
    agencyFee: 540000,
    cautionFee: 200000,
    status: "Available",
    hostName: "Ada Realty",
  },
  {
    id: "yab-sc-002",
    title: "Neat Self-Contained Studio near UNILAG",
    type: "long-term",
    propertyType: "Self-contained",
    price: 450000,
    area: "Yaba",
    address: "Akoka Road, Yaba, Lagos",
    bedrooms: 1,
    bathrooms: 1,
    description:
      "Perfect for students — a compact self-contained with kitchenette, en-suite bathroom, prepaid meter, and tiled floors. Walking distance to UNILAG.",
    image: prop2,
    gallery: [prop2, prop5],
    listedBy: "landlord",
    verified: true,
    cautionFee: 50000,
    status: "Available",
    hostName: "Mr. Tunde O.",
  },
  {
    id: "lkk-dup-003",
    title: "Spacious 4 Bedroom Duplex in Lekki",
    type: "long-term",
    propertyType: "Duplex",
    price: 6500000,
    area: "Ikate, Lekki",
    address: "Ikate Elegushi, Lekki, Lagos",
    bedrooms: 4,
    bathrooms: 5,
    description:
      "Fully detached modern duplex with BQ, private compound, and ample parking. Premium finishing throughout. Suitable for families.",
    image: prop3,
    gallery: [prop3, prop1, prop6],
    listedBy: "agent",
    verified: true,
    agencyFee: 650000,
    cautionFee: 500000,
    status: "Available",
    hostName: "Skylink Properties",
  },
  {
    id: "vi-short-004",
    title: "Luxury Shortlet — Victoria Island",
    type: "shortlet",
    propertyType: "2 bedroom",
    price: 65000,
    area: "Victoria Island",
    address: "Adetokunbo Ademola, VI, Lagos",
    bedrooms: 2,
    bathrooms: 2,
    description:
      "Beautifully furnished 2-bedroom shortlet with city views, smart TV, WiFi, fully stocked kitchen and dedicated workspace. Cleaning included.",
    image: prop4,
    gallery: [prop4, prop1, prop6],
    listedBy: "agent",
    verified: true,
    status: "Available",
    hostName: "StayLagos",
  },
  {
    id: "sur-mini-005",
    title: "Cozy Mini Flat in Surulere",
    type: "long-term",
    propertyType: "Mini flat",
    price: 750000,
    area: "Surulere",
    address: "Ogunlana Drive, Surulere, Lagos",
    bedrooms: 1,
    bathrooms: 1,
    description:
      "Bright mini flat with separate living area, kitchen, and bathroom. Quiet neighbourhood with good road access.",
    image: prop5,
    gallery: [prop5, prop2],
    listedBy: "landlord",
    verified: true,
    cautionFee: 80000,
    status: "Available",
    hostName: "Mrs. Adesanya",
  },
  {
    id: "ikj-3b-006",
    title: "Elegant 3 Bedroom Flat in Ikeja GRA",
    type: "long-term",
    propertyType: "3 bedroom",
    price: 3200000,
    area: "Ikeja GRA",
    address: "Sobo Arobiodu, Ikeja GRA, Lagos",
    bedrooms: 3,
    bathrooms: 3,
    description:
      "Tastefully finished 3-bedroom apartment in a secure compound. Inverter backup, borehole, and visitor parking.",
    image: prop6,
    gallery: [prop6, prop1, prop4],
    listedBy: "agent",
    verified: true,
    agencyFee: 480000,
    cautionFee: 300000,
    status: "Available",
    hostName: "GreenHouse Realty",
  },
  {
    id: "ikoyi-short-007",
    title: "Boutique Ikoyi Shortlet Studio",
    type: "shortlet",
    propertyType: "Self-contained",
    price: 28000,
    area: "Ikoyi",
    address: "Bourdillon, Ikoyi, Lagos",
    bedrooms: 1,
    bathrooms: 1,
    description:
      "Stylish self-contained shortlet — perfect for solo travellers or short business trips. Netflix, WiFi, and concierge.",
    image: prop4,
    gallery: [prop4, prop2],
    listedBy: "landlord",
    verified: true,
    status: "Available",
    hostName: "Ms. Bisola",
  },
  {
    id: "ajah-1b-008",
    title: "Affordable 1 Bedroom Flat in Ajah",
    type: "long-term",
    propertyType: "1 bedroom",
    price: 850000,
    area: "Ajah",
    address: "Sangotedo, Ajah, Lagos",
    bedrooms: 1,
    bathrooms: 1,
    description:
      "Brand new 1-bedroom apartment in a small estate. Tiled, POP ceiling, and 24-hour security.",
    image: prop1,
    gallery: [prop1, prop5],
    listedBy: "agent",
    verified: false,
    agencyFee: 170000,
    cautionFee: 100000,
    status: "Available",
    hostName: "PrimeKey Agents",
  },
];

export const LAGOS_AREAS = Array.from(new Set(LISTINGS.map((l) => l.area))).sort();
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
