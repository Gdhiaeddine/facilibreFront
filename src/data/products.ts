
import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Laptop Pro X15",
    price: 1299.99,
    description: "High-performance laptop with 16GB RAM, 512GB SSD, and a stunning 15-inch display. Perfect for professionals and gamers alike.",
    features: [
      "Intel Core i7 processor",
      "16GB DDR4 RAM",
      "512GB NVMe SSD",
      "15.6\" Full HD IPS Display",
      "NVIDIA GeForce RTX Graphics",
      "Backlit Keyboard",
      "Thunderbolt 4 ports"
    ],
    stock: 15,
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3"],
    category: "Electronics",
    installmentPlans: [
      { months: 6, monthlyPayment: 229.99 },
      { months: 12, monthlyPayment: 119.99 },
      { months: 24, monthlyPayment: 62.99 }
    ]
  },
  {
    id: "2",
    name: "Ultra HD Smart TV 55\"",
    price: 899.99,
    description: "Crystal clear 4K Ultra HD smart TV with built-in streaming services, voice control, and immersive sound experience.",
    features: [
      "55\" 4K UHD Display",
      "HDR Technology",
      "Smart TV functionality",
      "Voice Assistant Compatible",
      "Dolby Digital Sound",
      "Slim Design",
      "Multiple HDMI ports"
    ],
    stock: 8,
    images: ["https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"],
    category: "Electronics",
    installmentPlans: [
      { months: 6, monthlyPayment: 159.99 },
      { months: 12, monthlyPayment: 82.99 },
      { months: 24, monthlyPayment: 43.99 }
    ]
  },
  {
    id: "3",
    name: "Modern Sectional Sofa",
    price: 1499.99,
    description: "Stylish and comfortable L-shaped sectional sofa. Perfect for modern living rooms with ample seating for family and guests.",
    features: [
      "High-quality fabric upholstery",
      "L-shaped design",
      "Extra deep seats",
      "Removable and washable covers",
      "Sturdy hardwood frame",
      "Stylish chrome legs",
      "Includes decorative pillows"
    ],
    stock: 5,
    images: ["https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"],
    category: "Furniture",
    installmentPlans: [
      { months: 6, monthlyPayment: 266.66 },
      { months: 12, monthlyPayment: 138.88 },
      { months: 24, monthlyPayment: 72.91 }
    ]
  },
  {
    id: "4",
    name: "Professional DSLR Camera Kit",
    price: 2499.99,
    description: "Complete professional photography kit including a high-end DSLR camera, multiple lenses, and accessories for all your photography needs.",
    features: [
      "24.1 Megapixel Full-Frame Sensor",
      "4K Video Recording",
      "3 Premium Lenses Included",
      "Professional Camera Bag",
      "Advanced Autofocus System",
      "Weather-Sealed Body",
      "Extended Battery Life"
    ],
    stock: 3,
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3"],
    category: "Electronics",
    installmentPlans: [
      { months: 12, monthlyPayment: 224.99 },
      { months: 24, monthlyPayment: 119.99 },
      { months: 36, monthlyPayment: 83.33 }
    ]
  },
  {
    id: "5",
    name: "Luxury Queen Mattress",
    price: 999.99,
    description: "Premium memory foam mattress with cooling technology for the most comfortable sleep experience. Queen size with 10-year warranty.",
    features: [
      "Memory foam construction",
      "Cooling gel technology",
      "Queen size dimensions",
      "Hypoallergenic cover",
      "Edge support system",
      "Motion isolation",
      "10-year warranty"
    ],
    stock: 10,
    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"],
    category: "Bedroom",
    installmentPlans: [
      { months: 6, monthlyPayment: 179.99 },
      { months: 12, monthlyPayment: 92.99 },
      { months: 24, monthlyPayment: 48.99 }
    ]
  },
  {
    id: "6",
    name: "Smart Home Security System",
    price: 699.99,
    description: "Complete home security system with cameras, motion sensors, and smartphone integration for monitoring your home from anywhere.",
    features: [
      "4 HD Security Cameras",
      "Motion Detection",
      "Smartphone App Control",
      "Night Vision",
      "Cloud Storage Option",
      "Two-Way Audio",
      "Easy DIY Installation"
    ],
    stock: 0,
    images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"],
    category: "Smart Home",
    installmentPlans: [
      { months: 6, monthlyPayment: 124.99 },
      { months: 12, monthlyPayment: 64.99 },
      { months: 24, monthlyPayment: 33.99 }
    ]
  },
  {
    id: "7",
    name: "Professional Kitchen Mixer",
    price: 449.99,
    description: "High-quality stand mixer for all your baking and cooking needs. Multiple attachments included for versatile food preparation.",
    features: [
      "Powerful 600W motor",
      "10 speed settings",
      "5.7L stainless steel bowl",
      "Includes dough hook, whisk, and beater",
      "Additional attachments available",
      "Tilt-head design",
      "Available in multiple colors"
    ],
    stock: 12,
    images: ["https://images.unsplash.com/photo-1594623274910-354d25c92147?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"],
    category: "Kitchen",
    installmentPlans: [
      { months: 6, monthlyPayment: 79.99 },
      { months: 12, monthlyPayment: 41.66 }
    ]
  },
  {
    id: "8",
    name: "Electric Mountain Bike",
    price: 1899.99,
    description: "High-performance electric mountain bike with long-range battery, front suspension, and premium components for the ultimate trail experience.",
    features: [
      "500W electric motor",
      "Removable 48V battery",
      "50-mile range per charge",
      "Front suspension fork",
      "21-speed gear system",
      "Hydraulic disc brakes",
      "Integrated LED lights"
    ],
    stock: 4,
    images: ["https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3"],
    category: "Sports",
    installmentPlans: [
      { months: 12, monthlyPayment: 169.99 },
      { months: 24, monthlyPayment: 88.99 },
      { months: 36, monthlyPayment: 61.99 }
    ]
  }
];
