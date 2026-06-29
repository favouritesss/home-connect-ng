export type ServiceCategory = "Plumbing" | "Cleaning" | "Painting" | "Electrical" | "Carpentry" | "Maintenance";

export interface ServiceProvider {
  id: string;
  name: string;
  category: ServiceCategory;
  priceRange: string;
  rating: number;
  reviewsCount: number;
  state: string;
  area: string;
  phone: string;
  description: string;
  image: string;
  verified: boolean;
  completedJobs: number;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Plumbing",
  "Cleaning",
  "Painting",
  "Electrical",
  "Carpentry",
  "Maintenance"
];

export const SERVICE_PROVIDERS: ServiceProvider[] = [
  {
    id: "sp-001",
    name: "Tunde Repairs & Plumbing",
    category: "Plumbing",
    priceRange: "₦5,000 - ₦25,000",
    rating: 4.9,
    reviewsCount: 38,
    state: "Lagos",
    area: "Eti Osa",
    phone: "+234 803 123 4567",
    description: "Professional plumbing installations, leak repairs, and water heater servicing. Over 7 years of experience in Lekki and Ajah.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&auto=format&fit=crop&q=60",
    verified: true,
    completedJobs: 142
  },
  {
    id: "sp-002",
    name: "SparkClean Premium Services",
    category: "Cleaning",
    priceRange: "₦15,000 - ₦50,000",
    rating: 4.8,
    reviewsCount: 64,
    state: "Lagos",
    area: "Ikeja",
    phone: "+234 812 345 6789",
    description: "Post-construction cleaning, deep move-in cleaning, and fumigation services. Spotless guarantee with eco-friendly products.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&auto=format&fit=crop&q=60",
    verified: true,
    completedJobs: 215
  },
  {
    id: "sp-003",
    name: "BrightLife Painting & Decor",
    category: "Painting",
    priceRange: "₦30,000 - ₦150,000",
    rating: 4.7,
    reviewsCount: 22,
    state: "FCT - Abuja",
    area: "Municipal Area Council",
    phone: "+234 905 555 1234",
    description: "Professional interior and exterior house painting, screeding, wall decoration, and 3D wallpaper installations in Abuja.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200&auto=format&fit=crop&q=60",
    verified: true,
    completedJobs: 89
  },
  {
    id: "sp-004",
    name: "Wazobia Electricals Ltd",
    category: "Electrical",
    priceRange: "₦8,000 - ₦40,000",
    rating: 4.9,
    reviewsCount: 51,
    state: "Lagos",
    area: "Surulere",
    phone: "+234 703 999 8888",
    description: "Inverter and solar installations, house wiring, smart switch setups, and emergency electrical troubleshooting.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=60",
    verified: true,
    completedJobs: 180
  },
  {
    id: "sp-005",
    name: "WoodCraft Carpentry & Joinery",
    category: "Carpentry",
    priceRange: "₦10,000 - ₦80,000",
    rating: 4.6,
    reviewsCount: 19,
    state: "Rivers",
    area: "Port Harcourt",
    phone: "+234 802 888 7777",
    description: "Cabinet installations, door fitting, bed frame repairs, and custom wooden furniture crafting. Reliable and timely delivery.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=200&auto=format&fit=crop&q=60",
    verified: false,
    completedJobs: 45
  },
  {
    id: "sp-006",
    name: "FixIt All Home Maintenance",
    category: "Maintenance",
    priceRange: "₦5,000 - ₦30,000",
    rating: 4.8,
    reviewsCount: 29,
    state: "Oyo",
    area: "Ibadan North",
    phone: "+234 815 111 2222",
    description: "Your go-to handyman service for door lock repairs, mounting TVs, minor tiling fixes, and general pre-move-in touchups.",
    image: "https://images.unsplash.com/photo-1426927308491-6380b6a9936f?w=200&auto=format&fit=crop&q=60",
    verified: true,
    completedJobs: 73
  }
];
