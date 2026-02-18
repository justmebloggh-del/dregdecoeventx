
import { Service, PortfolioItem, ContactDetails } from './types';

export const CONTACT_INFO: ContactDetails = {
  address: "15 Manvers Street, Kingston upon Hull, HU3 1BB, UK",
  phones: ["+447442852562", "+4474468855270", "+233202350250"],
  email: "odregconsult@gmail.com"
};

export const WHATSAPP_LINK = "https://wa.me/44744852561?text=Hello%20ODREG%2C%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20eventx%20services.";

export const SERVICES: Service[] = [
  {
    id: "event-planning",
    title: "Eventx Planning & Consulting",
    description: "Bridging UK strategy with Ghanaian heritage for unforgettable unions.",
    fullContent: "Our planning service focuses on the intricate details of traditional and modern unions. From the custom-tailored Kente selection to the coordination of outdoor ceremonies in Hull or Accra, we honor heritage with modern technical precision.",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: ''
  },
  {
    id: "decoration",
    title: "Bespoke Decoration & Design",
    description: "Majestic stage designs featuring royal thrones and custom lighting.",
    fullContent: "We specialize in 'Royal Scaping'. Our signature setups include golden sunburst crowns, ornate velvet-lined thrones, and color-coordinated backdrops that turn a ceremony into a majestic royal experience.",
    image: "https://images.unsplash.com/photo-1670529776180-60e4132ab90c?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: ''
  },
  {
    id: "coordination",
    title: "On-Day Coordination",
    description: "High-pressure stage management for corporate galas and elite weddings.",
    fullContent: "We ensure your stage program is flawless. We manage everything from lighting transitions to the professional flow of VIP speakers, ensuring every minute counts.",
    image: "https://images.unsplash.com/photo-1607861884586-c7cfaed16290?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: ''
  },
  {
    id: "protocol",
    title: "Professional Protocol & Ushering",
    description: "Elite guest management for dignitaries and high-society circles.",
    fullContent: "Our protocol officers provide a level of service that matches the elegance of your guests. We manage VIP seating and hospitality with absolute discretion and grace.",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1600",
    icon: ''
  },
  {
    id: "tour-management",
    title: "Cultural & Corporate Tour Management",
    description: "Immersive heritage journeys in partnership with TORGAG Ghana.",
    fullContent: "In collaboration with TORGAG, we offer immersive cultural experiences. Explore the vibrant kente markets or visit historical heritage sites with professional local guides.",
    image: "https://plus.unsplash.com/premium_photo-1718146019127-ebfb31a4af15?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: ''
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "royal-throne-union",
    title: "The Blue & Gold Royal Union",
    location: "Accra, Ghana",
    description: "A masterclass in throne-room decoration and regal attire.",
    fullStory: "This eventx redefined traditional luxury. We designed a central stage featuring blue-and-gold hand-woven Kente that matched the couple's coronation-style crowns. The setup included gold-leafed thrones and sunburst halo backdrops, creating a truly divine atmosphere.",
    images: [
      "https://images.unsplash.com/photo-1648328414427-fc902f51808c?q=80&w=723&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1515715709530-858f7bfa1b10?q=80&w=2403&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "Wedding"
  },
  {
    id: "corporate-excellence-gala",
    title: "International Awards Night",
    location: "Kingston upon Hull, UK",
    description: "Professional stage management for the business community.",
    fullStory: "A celebration of industry leaders. ODREG managed the entire stage protocol, ensuring that the presentation of awards was handled with the utmost professionalism and perfect timing.",
    images: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1625038032515-308ab14d10b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: "Corporate"
  }
];
