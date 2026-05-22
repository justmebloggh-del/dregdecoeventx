
import { Service, PortfolioItem, ContactDetails, Testimonial, BlogPost, EventType, TeamMember } from './types';

export const CONTACT_INFO: ContactDetails = {
  address: "15 Manvers Street, Kingston upon Hull, HU3 1BB, UK",
  phones: ["+447442852562", "+233202350250"],
  email: "odregconsult@gmail.com"
};

export const WHATSAPP_LINK = "https://wa.me/447442852562?text=Hello%20ODREG%20DECO%2C%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20decor%20collection.";

export const INSTAGRAM_URL = "https://www.instagram.com/odregdecor_eventx?igsh=MTN2aXcyb2NhZndsaw==";
export const FACEBOOK_URL = "https://www.facebook.com/share/14U53t7HfoY/?mibextid=wwXIfr";
export const TIKTOK_URL = "https://www.tiktok.com/@odregdecor?_r=1&_t=ZS-93z6KDnMD4f";

// ─── Event Types ───────────────────────────────────────────────────────────────
export const EVENT_TYPES: EventType[] = [
  {
    id: "weddings",
    name: "Weddings",
    description: "Royal-inspired ceremonies blending British elegance with Ghanaian tradition. From intimate garden weddings to grand palace-style receptions.",
    image: "/images/The Blue & Gold Royal Union .jpg",
    link: "/weddings",
    tag: "Most Popular"
  },
  {
    id: "corporate",
    name: "Corporate Events",
    description: "Award galas, product launches, and executive summits executed with military precision and luxury staging.",
    image: "/images/International Awards Night2 .jpg",
    link: "/corporate"
  },
  {
    id: "traditional",
    name: "Traditional Ceremonies",
    description: "Authentic Ghanaian Knocking ceremonies, outdoorings, and naming ceremonies honoured with deep cultural respect.",
    image: "/images/Traditional marriage Rites3.jpg",
    link: "/services/event-planning",
    tag: "Heritage"
  },
  {
    id: "birthday",
    name: "Milestone Celebrations",
    description: "Landmark birthdays, anniversaries, and life achievements celebrated in unforgettable luxury.",
    image: "/images/weddinganniversary1.jpg",
    link: "/services/decoration"
  },
  {
    id: "private-dining",
    name: "Private Dining",
    description: "Intimate supper clubs and bespoke dining experiences with artisan table design and immersive cultural menus.",
    image: "/images/halldeco.jpg",
    link: "/services/decoration"
  },
  {
    id: "tours",
    name: "Heritage Tours",
    description: "Curated cultural journeys through Ghana's most significant heritage sites in partnership with TORGAG.",
    image: "/images/TORGAG Heritage Experience .jpg",
    link: "/services/tour-management",
    tag: "Ghana"
  }
];

// ─── Services ──────────────────────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id: "event-planning",
    title: "Eventx Planning & Consulting",
    description: "Bridging UK strategy with Ghanaian heritage for unforgettable unions.",
    fullContent: "Our planning service focuses on the intricate details of traditional and modern unions. From the custom-tailored Kente selection to the coordination of outdoor ceremonies in Hull or Accra, we honour heritage with modern technical precision. We manage venue sourcing, supplier negotiation, timeline creation, and full on-day coordination — so you simply arrive and experience.",
    image: "/images/couplekiss.jpg",
    icon: "📜",
    features: ["Venue sourcing & negotiation", "Supplier management", "Timeline creation", "Budget planning", "On-day coordination", "Post-event review"]
  },
  {
    id: "decoration",
    title: "Bespoke Decoration & Design",
    description: "Majestic stage designs featuring royal thrones and custom lighting.",
    fullContent: "We specialise in 'Royal Scaping'. Our signature setups include golden sunburst crowns, ornate velvet-lined thrones, and colour-coordinated backdrops that transform a ceremony into a majestic royal experience. Every element is selected and arranged by our in-house design team to create spaces that photograph beautifully and feel extraordinary in person.",
    image: "/images/walldeco.jpg",
    icon: "✨",
    features: ["Royal throne staging", "Custom floral design", "Backdrop & draping", "Lighting design", "Table centrepieces", "Decor hire & styling"]
  },
  {
    id: "coordination",
    title: "On-Day Coordination",
    description: "High-pressure stage management for corporate galas and elite weddings.",
    fullContent: "We ensure your programme is flawless. We manage everything from lighting transitions to the professional flow of VIP speakers, ensuring every minute counts. Our coordination team uses military-grade timeline management and direct radio communication between all departments.",
    image: "/images/eventmangement.jpg",
    icon: "⏱️",
    features: ["Military-grade timelines", "Radio communication team", "Supplier management", "Guest flow management", "Emergency contingency", "Post-event debrief"]
  },
  {
    id: "protocol",
    title: "Professional Protocol & Ushering",
    description: "Elite guest management for dignitaries and high-society circles.",
    fullContent: "Our protocol officers provide a level of service that matches the elegance of your guests. We manage VIP seating, hospitality, and diplomatic etiquette with absolute discretion and grace. Our team has experience managing heads of state, traditional royalty, and corporate leaders across both the UK and Ghana.",
    image: "/images/couplewalk.jpg",
    icon: "🤝",
    features: ["VIP seating & management", "Diplomatic etiquette", "Guest welcome & hosting", "Discretion guarantee", "Multilingual officers", "Post-event reporting"]
  },
  {
    id: "tour-management",
    title: "Cultural & Corporate Tour Management",
    description: "Immersive heritage journeys in partnership with TORGAG Ghana.",
    fullContent: "In collaboration with TORGAG, we offer immersive cultural experiences for corporate groups, diaspora communities and individuals. Explore the vibrant Kente markets of Bonwire, visit the Cape Coast Castle, or experience a traditional Durbar ceremony with professional local guides and seamless logistics.",
    image: "/images/TORGAG Heritage Experience 2.jpg",
    icon: "🌍",
    features: ["TORGAG-certified guides", "Heritage site visits", "Cultural immersion", "Group logistics", "Custom itineraries", "Corporate packages"]
  },
  {
    id: "wedding-planning",
    title: "Wedding Planning & Design",
    description: "Full-service luxury wedding planning from proposal to final dance.",
    fullContent: "From your first vision meeting to the final farewell, our dedicated wedding team manages every detail of your special day. We specialise in bridging cultural traditions — Ghanaian traditional rites, church ceremonies, and modern reception formats — with seamless logistics across UK and Ghana venues.",
    image: "/images/eventdeco.jpg",
    icon: "💍",
    features: ["Full planning & design", "Cultural ceremony expertise", "Vendor curation", "Bridal styling liaison", "Day-of management", "UK & Ghana venues"]
  },
  {
    id: "corporate-events",
    title: "Corporate Event Management",
    description: "Award ceremonies, product launches, and executive retreats at the highest standard.",
    fullContent: "Our corporate team delivers events that strengthen brand reputation and leave lasting impressions. From intimate boardroom dinners to 500-person gala evenings, we bring the same precision and luxury aesthetic that defines ODREG to the corporate world.",
    image: "/images/International Awards Night.jpg",
    icon: "🏆",
    features: ["Awards & gala management", "Product launches", "Executive retreats", "Brand-aligned staging", "AV & tech coordination", "Catering partnerships"]
  },
  {
    id: "floristry",
    title: "Luxury Floristry & Styling",
    description: "Statement floral installations and bespoke table arrangements for every occasion.",
    fullContent: "Our floristry team creates immersive floral environments — from towering ceremony arches draped in tropical blooms to intimate table settings that carry through your colour story. We source fresh and dried botanicals from UK and Ghanaian growers, and can incorporate traditional elements such as kente ribbons and adinkra motifs into arrangements.",
    image: "/images/nicedeco.jpg",
    icon: "🌸",
    features: ["Ceremony arches & installations", "Table arrangements", "Tropical & exotic blooms", "Dried floral designs", "Kente ribbon styling", "Bridal bouquets"]
  },
  {
    id: "catering-liaison",
    title: "Catering & Dining Curation",
    description: "Curated menus blending West African cuisine with international fine dining.",
    fullContent: "We partner with top-tier caterers across the UK and Ghana to deliver menus that are as memorable as the events themselves. From traditional Ghanaian dishes served banquet-style to contemporary fusion tasting menus, we handle all coordination, tastings, dietary requirements, and service training to ensure your guests experience exceptional dining.",
    image: "/images/tabledeco3.jpg",
    icon: "🍽️",
    features: ["Menu design & tastings", "Ghanaian cuisine specialists", "Dietary requirement management", "Beverage curation", "Service staff training", "Hire equipment coordination"]
  },
  {
    id: "photography-liaison",
    title: "Photography & Videography Liaison",
    description: "Connecting clients with award-winning photographers and cinematographers.",
    fullContent: "A great event deserves extraordinary documentation. Through our curated network of photographers and videographers across the UK and Ghana, we match clients with creatives whose style aligns with their vision. We handle all briefing, coordination, and post-production oversight so you receive a final product that truly captures the magic.",
    image: "/images/coupleslfie.jpg",
    icon: "📸",
    features: ["Photographer matching", "Cinematography coordination", "Drone footage", "Photo booth setups", "Social media packages", "Album & highlight reels"]
  }
];

// ─── Portfolio ─────────────────────────────────────────────────────────────────
export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "royal-throne-union",
    title: "The Blue & Gold Royal Union",
    location: "Accra, Ghana",
    description: "A masterclass in throne-room decoration and regal attire.",
    fullStory: "This event redefined traditional luxury. We designed a central stage featuring blue-and-gold hand-woven Kente that matched the couple's coronation-style crowns. The setup included gold-leafed thrones and sunburst halo backdrops, creating a truly divine atmosphere. Over 400 guests attended, including members of the Asantehene's court.",
    images: [
      "/images/The Blue & Gold Royal Union .jpg",
      "/images/The Blue & Gold Royal Union1.jpg"
    ],
    category: "Wedding",
    guestCount: "400+",
    year: "2025"
  },
  {
    id: "corporate-excellence-gala",
    title: "International Awards Night",
    location: "Kingston upon Hull, UK",
    description: "Professional stage management for the business community.",
    fullStory: "A celebration of industry leaders. ODREG managed the entire stage protocol, ensuring that the presentation of awards was handled with the utmost professionalism and perfect timing. The event was attended by 320 business leaders from across the UK and West Africa.",
    images: [
      "/images/International Awards Night2 .jpg",
      "/images/Our UK Operations.jpg"
    ],
    category: "Corporate",
    guestCount: "320",
    year: "2025"
  },
  {
    id: "ivory-gold-wedding",
    title: "Ivory & Gold Garden Wedding",
    location: "Leeds, UK",
    description: "An ethereal outdoor wedding with cascading floral arches and candlelit dining.",
    fullStory: "Set in the grounds of a historic Leeds manor, this wedding blended English garden aesthetics with West African vibrancy. Our team created a 4-metre floral arch at the ceremony entrance, adorned with tropical blooms, gold ribbons, and hanging lanterns. The reception featured long banquet tables draped in ivory linen with towering gold candelabras and Kente-wrapped centrepieces.",
    images: [
      "/images/couplekiss2.jpg",
      "/images/coupledance.jpg"
    ],
    category: "Wedding",
    guestCount: "180",
    year: "2024"
  },
  {
    id: "tech-summit-ghana",
    title: "West Africa Tech Summit",
    location: "Accra, Ghana",
    description: "A landmark technology conference for 500 executives and innovators.",
    fullStory: "ODREG delivered end-to-end event management for one of Ghana's most prestigious annual technology conferences. Our team coordinated staging, AV, protocol, catering, and decor across a three-day event attended by ministers, CEOs, and international delegates. The staging design referenced Ghana's digital future through a visual language of gold circuit patterns and kente motifs.",
    images: [
      "/images/Corporate Event Management1 .jpg",
      "/images/glassimage.jpg"
    ],
    category: "Corporate",
    guestCount: "500",
    year: "2024"
  },
  {
    id: "royal-naming-ceremony",
    title: "Royal Outdooring & Naming Ceremony",
    location: "Kumasi, Ghana",
    description: "A traditional outdooring ceremony for a family of significance, blending Ashanti rites with modern luxury.",
    fullStory: "This was one of our most deeply meaningful commissions — coordinating an outdooring ceremony for a prominent Kumasi family, with over 250 guests including several traditional chiefs. Every element honoured Ashanti customs: the positioning of elders, the order of libation, the presentation of the child, and the progression of the feast. ODREG provided full decoration, protocol, catering liaison, and photography coordination.",
    images: [
      "/images/Traditional Rites .jpg",
      "/images/groundsdeco.jpg"
    ],
    category: "Traditional",
    guestCount: "250",
    year: "2024"
  },
  {
    id: "anniversary-gala-hull",
    title: "Diamond Anniversary Celebration",
    location: "Kingston upon Hull, UK",
    description: "A 60th anniversary gala for a prominent Hull family — intimate, opulent, unforgettable.",
    fullStory: "Sixty years of love deserved sixty moments of magic. For this extraordinary milestone, we transformed a Hull venue into a candlelit palace of ivory and platinum. The couple's love story was woven through the evening in floral installations, bespoke table décor, and a photo retrospective projected onto custom-built panels. The menu was curated in collaboration with the family's favourite chef, and the evening concluded with a private performance.",
    images: [
      "/images/weddinganniversary1.jpg",
      "/images/tabledeco3.jpg"
    ],
    category: "Milestone",
    guestCount: "90",
    year: "2025"
  }
];

// ─── Testimonials ──────────────────────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Abena Osei-Bonsu",
    location: "Accra, Ghana",
    role: "Bride",
    comment: "ODREG transformed our traditional ceremony into something from a fairytale. The throne stage was breathtaking — every guest was speechless. The team's attention to detail is unrivalled. I cannot imagine our day without them.",
    rating: 5,
    event: "Royal Union Wedding"
  },
  {
    id: "t2",
    name: "Marcus Williams",
    location: "Leeds, UK",
    role: "Corporate Events Director",
    comment: "I've worked with many event companies across the UK. ODREG stands apart because they deliver on every promise with military precision and do it with extraordinary style. Our awards gala was the best we've ever held.",
    rating: 5,
    event: "International Awards Night"
  },
  {
    id: "t3",
    name: "Sophia Antwi",
    location: "London, UK",
    role: "Interior Designer",
    comment: "The Ashanti Gold Vase and Kente throw I ordered are stunning — the quality far exceeded my expectations. These are heirloom pieces. My clients keep asking where I sourced them. ODREG's decor collection is genuinely world-class.",
    rating: 5
  },
  {
    id: "t4",
    name: "Dr. James Owusu",
    location: "Hull, UK",
    role: "Customer",
    comment: "Bought the candle set as a gift and the recipient called it the best present they'd ever received. The fragrances are sophisticated and transport you entirely. Will absolutely be ordering again.",
    rating: 5
  },
  {
    id: "t5",
    name: "Nana Akua Mensah",
    location: "Kumasi, Ghana",
    role: "Mother of the Bride",
    comment: "Every detail of my daughter's wedding was handled with such care and professionalism. ODREG understood our culture deeply and elevated it with such elegance. Our whole family was moved to tears by the beauty of it all.",
    rating: 5,
    event: "Ivory & Gold Garden Wedding"
  },
  {
    id: "t6",
    name: "Daniel Osei",
    location: "Birmingham, UK",
    role: "CEO, Osei Group",
    comment: "ODREG delivered a launch event that defined our brand from day one. The staging was impeccable, the protocol flawless, and our guests are still talking about it months later. An essential partner for any serious event.",
    rating: 5,
    event: "West Africa Tech Summit"
  }
];

// ─── Blog Posts ────────────────────────────────────────────────────────────────
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "planning-ghanaian-wedding-uk",
    slug: "planning-a-ghanaian-wedding-in-the-uk",
    title: "Planning a Ghanaian Wedding in the UK: The Complete Guide",
    excerpt: "From finding the right fabric vendors to navigating two sets of cultural expectations, here is everything you need to know about planning an authentic Ghanaian wedding on British soil.",
    content: `Planning a Ghanaian wedding in the United Kingdom is one of the most rewarding — and complex — events you will ever coordinate. You are not just planning a wedding; you are orchestrating a cultural bridge.\n\n## The Two Ceremonies\n\nMost UK-based Ghanaian families navigate two distinct ceremonies: the traditional knocking (a formal introduction and bride price presentation) and the white wedding (church or civil ceremony with Western traditions). Each has its own requirements, timelines, and stakeholders.\n\nThe key to success is treating both ceremonies with equal reverence — not as a compromise, but as a celebration of both worlds.\n\n## Finding Authentic Kente\n\nKente is the lifeblood of the Ghanaian celebration. For UK weddings, we recommend sourcing directly from verified Bonwire weavers or through established UK-based Ghanaian fabric houses. Avoid market imitations — authentic Kente has a distinctive weight and hand-feel that shows in photographs and means everything to elders.\n\nAt ODREG, we can connect you with our verified artisan partners in Bonwire.\n\n## Venue Considerations\n\nNot all UK venues understand the requirements of a Ghanaian celebration — the space needed for traditional dances, the acoustics for live drumming, or the catering arrangements for Jollof rice and fufu served at scale. Work with a venue coordinator who has experience with multicultural events.\n\n## Building Your Supplier Team\n\nAssemble a team that includes at minimum: a cultural protocol officer, a photographer experienced with traditional ceremonies, a caterer who can deliver both Ghanaian cuisine and Western reception dining, and a decorator who understands Royal Scaping.\n\nThe investment in the right supplier team is the most important decision you will make.`,
    category: "weddings",
    author: "Odelia Mensah",
    authorRole: "Lead Wedding Planner, ODREG",
    date: "2026-04-15",
    readTime: 8,
    image: "/images/beachdeco.jpg",
    tags: ["wedding", "Ghana", "UK", "planning", "Kente"],
    featured: true
  },
  {
    id: "corporate-event-trends-2026",
    slug: "corporate-event-trends-2026",
    title: "Corporate Event Trends That Will Define 2026",
    excerpt: "From immersive cultural narratives to sustainable luxury staging, the events industry is evolving fast. Here are the trends our corporate clients are already requesting.",
    content: `The corporate events landscape has shifted dramatically. Clients no longer want a room with chairs and a stage — they want an experience that communicates brand values, honours guests, and leaves a lasting impression.\n\n## 1. Cultural Storytelling as Brand Identity\n\nThe most memorable corporate events of 2025 wove a cultural narrative through every touchpoint — from the catering to the decor to the entertainment. For diaspora-owned brands and international businesses operating across Africa and the UK, this means celebrating your roots rather than neutralising them.\n\n## 2. Luxury Minimalism in Staging\n\nGone are the days of loud, busy event design. The trend is towards restraint — monochromatic palettes with a single metallic accent, architectural floral installations, and clean sightlines that let the space breathe. This is the ODREG aesthetic: every element intentional, every detail considered.\n\n## 3. Immersive Pre-Event Experiences\n\nLeading brands are investing in the arrival experience — from curated music to fragrance to branded refreshments before guests even enter the main event space. First impressions now start at the car park.\n\n## 4. Sustainable Staging\n\nSingle-use decor is rapidly falling out of favour. Our clients are increasingly requesting decor that can be rehired, replanted, or repurposed. We've partnered with several UK florists and prop houses to offer a fully circular event design service.\n\n## 5. Hybrid Cultural Menus\n\nWest African-European fusion menus are having a major moment. Our catering partners are creating menus that introduce guests to the depths of Ghanaian cuisine through the familiar language of fine dining.`,
    category: "corporate",
    author: "Reginald Acheampong",
    authorRole: "Corporate Events Director, ODREG",
    date: "2026-03-22",
    readTime: 6,
    image: "/images/Corporate Event Management .jpg",
    tags: ["corporate", "trends", "2026", "events", "design"]
  },
  {
    id: "royal-scaping-guide",
    slug: "what-is-royal-scaping",
    title: "What is Royal Scaping? Inside ODREG's Signature Design Philosophy",
    excerpt: "Royal Scaping is the design language that defines every ODREG event — a fusion of Ghanaian royalty aesthetics and modern luxury staging. Here's what it means and how it's created.",
    content: `Royal Scaping is not a style. It is a conviction.\n\nWhen we founded ODREG, we observed that luxury event design in the UK and Ghana existed in parallel worlds. British luxury staging was restrained, elegant, architectural. Ghanaian ceremonial design was bold, symbolic, richly layered. We refused to choose between them.\n\n## The Principles of Royal Scaping\n\n**Hierarchy of Focus**: Every Royal Scape has a single dominant focal point — typically the throne stage or head table. All other elements exist in service of this centrepiece, directing the eye and reinforcing the honour of the person being celebrated.\n\n**The Gold Standard**: Gold is the thread that runs through every Royal Scape. Not garish gold, but considered gold — 23k leaf on carved wood, brushed brass fittings, warm amber lighting. Gold signals royalty, warmth, and permanence.\n\n**Symbolic Layers**: Each decorative element carries meaning. Adinkra motifs on table runners. Kente colours chosen to reference the family's heritage. Floral choices that carry cultural significance. A Royal Scape tells the story of the people being celebrated.\n\n**The Power of Restraint**: For all its richness, a Royal Scape knows when to stop. Negative space is as important as decoration. The eye needs somewhere to rest.\n\n## How We Create a Royal Scape\n\nEvery commission begins with a three-hour design consultation. We learn about the family, the heritage, the colour stories, the guests of honour. From this, we build a mood board, a colour palette, and a spatial plan before a single item is sourced.\n\nThe result is an event that feels inevitable — as if it could not have looked any other way.`,
    category: "inspiration",
    author: "Odelia Mensah",
    authorRole: "Lead Wedding Planner, ODREG",
    date: "2026-02-10",
    readTime: 7,
    image: "/images/Traditional Rites .jpg",
    tags: ["design", "royal scaping", "inspiration", "decor"],
    featured: true
  },
  {
    id: "ghana-heritage-tours",
    slug: "ghana-heritage-tours-guide",
    title: "Ghana Heritage Tours: What to Expect from a TORGAG Cultural Journey",
    excerpt: "What does a premium ODREG × TORGAG heritage tour of Ghana actually involve? From Kente markets to royal palaces, here is your insider guide.",
    content: `Ghana is one of the world's most extraordinary destinations for cultural heritage tourism. From the ancient royal courts of Kumasi to the haunting beauty of Cape Coast, every kilometre tells a story.\n\nODREG has partnered exclusively with TORGAG — the Tourism Research and Guide Association of Ghana — to offer heritage tours that go far beyond the typical tourist experience.\n\n## Day 1: Accra — History, Art, and Contemporary Life\n\nYour journey begins in Accra. The morning takes you through the National Museum, where artefacts from across Ghana's civilisations are beautifully presented. After lunch at a premier Accra restaurant, the afternoon is dedicated to Jamestown — the historic colonial quarter — and a curated visit to one of Accra's premier contemporary art galleries.\n\n## Day 2: Kumasi — The Ashanti Capital\n\nKumasi is the cultural heart of Ghana. Your TORGAG guide will take you to the Manhyia Palace Museum, the home of the Asantehene, before exploring the Kejetia Market — the largest traditional market in West Africa. The highlight is Bonwire village, home of Kente weaving, where you will meet master weavers and have the opportunity to commission a bespoke piece.\n\n## Day 3: Cape Coast — History and Reflection\n\nThe third day is one of profound significance. Cape Coast Castle and Elmina Castle are UNESCO World Heritage Sites that bear witness to the transatlantic slave trade. Your TORGAG guide navigates these spaces with expertise, context, and sensitivity.\n\n## Booking Your Tour\n\nODREG × TORGAG heritage tours are available for individuals, families, and corporate groups. All tours are fully customisable. Please contact us to discuss your requirements.`,
    category: "culture",
    author: "Kwame Asante",
    authorRole: "TORGAG Partnership Director",
    date: "2026-01-28",
    readTime: 9,
    image: "/images/TORGAG Heritage Experience 2.jpg",
    tags: ["Ghana", "tours", "heritage", "TORGAG", "culture"]
  },
  {
    id: "wedding-budget-tips",
    slug: "luxury-wedding-budget-tips",
    title: "How to Achieve a Luxury Wedding Aesthetic on a Realistic Budget",
    excerpt: "Luxury is not about spending the most money — it is about spending it in the right places. Here are the ODREG principles for creating a high-end wedding aesthetic without overspending.",
    content: `The first thing we tell every couple is this: a luxury wedding is not a question of budget. It is a question of choices.\n\nWe have created Royal Scapes for events with budgets of £5,000 and events with budgets of £150,000. In both cases, the principles are the same.\n\n## Invest Where It Shows\n\nThe three areas guests notice most are: the focal point (the stage or arch), the table settings, and the lighting. These three areas deserve the lion's share of your decor budget. Everything else is secondary.\n\nConversely, guests rarely notice ceiling draping if the head table is stunning. Flowers out of sightlines are money wasted.\n\n## The Power of Greenery\n\nProfessional florists know that greenery is the great equaliser. A simple arrangement of eucalyptus, ferns, and a single hero bloom reads as expensive and considered. Masses of mid-range flowers often read as busy and cheap.\n\n## Hire, Don't Buy\n\nFor decor items you will never use again — thrones, large candelabras, statement centrepieces — hire rather than buy. The hire cost is typically 15–25% of purchase price, and the quality of professional hire stock is often superior to what a limited budget can purchase outright.\n\n## Lighting is the Hidden Luxury\n\nA venue transformed by warm amber uplighting and candles looks infinitely more luxurious than the same venue under harsh overhead lighting with expensive flowers. Lighting budget is almost always the best-value investment in a wedding decor plan.\n\n## The ODREG Budget Consultation\n\nEvery ODREG commission begins with a complimentary budget consultation. We help you identify where to invest, where to save, and how to achieve the visual story you have in mind.`,
    category: "tips",
    author: "Odelia Mensah",
    authorRole: "Lead Wedding Planner, ODREG",
    date: "2026-01-05",
    readTime: 6,
    image: "/images/eventxdeco.jpg",
    tags: ["wedding", "budget", "tips", "luxury", "planning"]
  },
  {
    id: "african-decor-home",
    slug: "african-decor-modern-home",
    title: "How to Incorporate African Heritage Decor into the Modern Home",
    excerpt: "The art of bringing West African craftsmanship into a contemporary interior — without it feeling like a museum. A guide to thoughtful cultural curation.",
    content: `The modern luxury home is defined not by brand names and trend-following, but by a strong, personal point of view. West African heritage decor offers some of the world's richest material culture — and when curated with intention, it creates interiors of extraordinary depth and character.\n\n## The Principle of the Anchor Piece\n\nBegin with one significant anchor piece — a large vase, a statement mirror, a piece of art — that carries the cultural weight. Everything else can be more restrained. The anchor piece earns its space through its scale, quality, or symbolic power.\n\nOur Adinkra Symbol Statement Mirror or Handcrafted Tribal Relief Wall Art are both designed to serve this function.\n\n## Textiles as Story-Tellers\n\nTextiles are perhaps the most accessible way to bring African heritage into a contemporary home. A single Kente-inspired throw on a neutral sofa transforms the entire atmosphere of a room. The key is quality — genuine Kente or its derivative textiles have a weight and lustre that cheap imitations simply cannot replicate.\n\n## Fragrance as Cultural Dimension\n\nScent is the most direct path to memory and emotion. West African botanical fragrances — shea, amber, oud, wild sage — carry a distinctive warmth and earthiness that reads as genuinely exotic without being overwhelming. A well-chosen candle can shift the feel of an entire room.\n\n## Layering with Restraint\n\nThe most common mistake when styling with heritage decor is doing too much. One significant vase. One beautiful throw. One strong piece of art. Allow each piece the space it needs to be seen properly. \n\nAt ODREG, our interior styling service helps clients identify exactly the right pieces for their specific spaces.`,
    category: "inspiration",
    author: "Adwoa Sarpong",
    authorRole: "Interior Styling Consultant, ODREG",
    date: "2025-12-18",
    readTime: 7,
    image: "/images/halldeco.jpg",
    tags: ["decor", "interior", "African heritage", "home styling", "inspiration"]
  },
  {
    id: "walkway-decor-inspiration",
    slug: "wedding-walkway-decor-ideas",
    title: "Walkway & Aisle Decor: Creating the Perfect Grand Entrance",
    excerpt: "The aisle is the most photographed moment of any wedding. Here is how ODREG designs walkways that make every step feel like royalty.",
    content: `The walkway is the first impression guests have of your ceremony space — and the backdrop to the most iconic photographs of the day. Yet it is one of the most frequently under-invested areas of wedding decor.\n\n## Setting the Scene\n\nA great walkway creates a sense of journey. From the moment your guests enter the ceremony space, the aisle should tell them they are entering somewhere extraordinary. The design choices here — floral arrangements, lighting, fabric draping, petals — set the emotional tone for everything that follows.\n\n## Floral Arches vs Floral Lines\n\nTwo approaches dominate: the statement arch at the altar end, or continuous floral lines running the full length of the aisle. Both are beautiful; the choice depends on your venue proportions and your visual priority.\n\nFor grand spaces, continuous floral lines work best — they draw the eye down the full length of the aisle and create a sense of ceremony. For intimate venues, a single dramatic arch is more impactful.\n\n## Petal Carpets\n\nA petal carpet is one of the most luxurious and photogenic elements in any ceremony. We source fresh petals in your chosen colour palette and lay them on the morning of the event. The fragrance, the texture, and the photography are all extraordinary.\n\n## Lighting the Aisle\n\nFor evening ceremonies, candle lanterns lining the aisle create warmth and romance that no artificial lighting can replicate. We use a combination of tall standing lanterns and lower cluster candles for depth and dimension.\n\n## The ODREG Signature Touch\n\nAt ODREG, every walkway we design is unique to the couple. We consider the height of the ceiling, the colour of the floor, the time of day, and the heritage of the family. The result is always unmistakably personal.`,
    category: "weddings",
    author: "Adwoa Sarpong",
    authorRole: "Head of Design & Styling, ODREG",
    date: "2026-03-05",
    readTime: 5,
    image: "/images/walkwaydeco.jpg",
    tags: ["wedding", "aisle", "walkway", "decor", "styling"]
  },
  {
    id: "table-setting-luxury",
    slug: "luxury-table-setting-guide",
    title: "The Art of the Luxury Table Setting: From Linen to Centrepiece",
    excerpt: "A perfectly set table communicates luxury before a single course is served. Here is the ODREG guide to creating dining tables that are works of art.",
    content: `At any seated event, the table is where your guests spend most of their time. It is the canvas on which the experience of the evening unfolds — and the most intimate expression of your event's visual identity.\n\n## The Foundation: Linen\n\nEverything begins with linen. Quality tablecloths in the right weight and colour set the tone immediately. We work exclusively with premium linen suppliers who offer textures ranging from crisp white damask to richly-hued velvet for winter events.\n\nFor ODREG events, we often layer linens — a floor-length base cloth with a shorter decorative runner in a contrasting texture. The layered effect adds depth and richness without additional height.\n\n## Centrepiece Principles\n\nThe centrepiece must be proportional to the table and the room. In a venue with high ceilings, tall candelabra centrepieces create drama and verticality. In lower-ceilinged spaces, wide, low floral arrangements are more fitting.\n\nThe centrepiece should never obstruct conversation across the table — this is one of the most common mistakes we see in event decor.\n\n## Crockery, Glassware and Cutlery\n\nAt a luxury event, every piece of tableware is a design decision. We work with our clients to curate table settings that are both beautiful and coherent — from charger plates to champagne flutes. Gold-rimmed crockery on ivory linen is a classic for good reason.\n\n## The Ghanaian Table\n\nFor traditional Ghanaian events, we incorporate heritage textiles as runners, clay or brass serving vessels, and locally-crafted centrepieces alongside the formal table setting. The result is a table that honours both cultures with equal elegance.`,
    category: "tips",
    author: "Adwoa Sarpong",
    authorRole: "Head of Design & Styling, ODREG",
    date: "2025-11-20",
    readTime: 6,
    image: "/images/tabledeco.jpg",
    tags: ["table setting", "decor", "luxury", "wedding", "dining"]
  },
  {
    id: "couple-photography-guide",
    slug: "wedding-couple-photography-tips",
    title: "Getting the Most from Your Wedding Photography: A Couple's Guide",
    excerpt: "Your wedding photographs are the only thing you will keep from your day. Here is how to prepare, pose, and work with your photographer to capture memories that last a lifetime.",
    content: `Wedding photography is the one element of your wedding that will outlast everything else. The flowers fade, the cake is eaten, the music stops — but the photographs remain. It is worth investing real thought in how to make them extraordinary.\n\n## Choosing Your Photographer\n\nBefore anything else, choose a photographer whose existing work moves you. Not every good photographer is right for every couple. Some excel in romantic portraiture; others in documentary storytelling; others in the visual drama of cultural ceremonies.\n\nAt ODREG, we maintain a curated network of photographers who specialise in multicultural weddings and who understand the visual complexity of Ghanaian-British ceremonies.\n\n## The Golden Hour\n\nIf your schedule allows, build in time for a 20-minute couple portrait session during golden hour — the hour before sunset. The quality of light at this time is unlike any other, and the photographs taken during golden hour tend to be the ones couples treasure most.\n\n## Cultural Ceremonies and Photography\n\nTraditional Ghanaian ceremonies present unique photographic opportunities and challenges. The richness of Kente, the weight of royal regalia, the emotion of libation — all of these are extraordinary subjects. But they also require a photographer with experience: one who knows not to use flash during certain rites, who understands the significance of certain moments, and who moves through the ceremony with sensitivity.\n\n## Before the Day\n\nA pre-wedding engagement shoot with your photographer serves two purposes: it gives you beautiful images for save-the-dates, and it acclimatises you to being in front of the camera. Couples who feel comfortable with their photographer produce dramatically better wedding photographs.\n\n## The ODREG Photography Brief\n\nWhen you book ODREG for photography coordination, we create a detailed brief for your photographer that includes: key family groupings, significant cultural moments, timeline of the day, and the overall aesthetic vision. This ensures nothing important is missed.`,
    category: "tips",
    author: "Reginald Acheampong",
    authorRole: "Corporate Events Director, ODREG",
    date: "2025-10-14",
    readTime: 7,
    image: "/images/couplewalkin.jpg",
    tags: ["photography", "wedding", "tips", "couple", "planning"]
  },
  {
    id: "outdoor-event-decor",
    slug: "outdoor-event-decor-guide",
    title: "Outdoor Event Decor: Designing Beautiful Open-Air Celebrations",
    excerpt: "From beach ceremonies to garden receptions, outdoor events offer a canvas that indoor venues cannot match. Here is how to design for the open air with confidence.",
    content: `Outdoor events possess a quality that no indoor venue can manufacture — natural light, open sky, and the sense of space that comes from being surrounded by the natural world. When designed thoughtfully, an outdoor event is unmatched in its beauty.\n\n## Working With the Setting\n\nThe greatest mistake in outdoor event design is fighting the natural environment rather than complementing it. A beachside ceremony should honour the coastal aesthetic — driftwood, sea grass, salt-white linens. A garden celebration should amplify what the garden does naturally — lush floral arrangements, candlelight, and the scent of living flowers.\n\nAt ODREG, we begin every outdoor commission with a site visit to understand what the location offers and what it needs.\n\n## Weather Contingency Planning\n\nEvery outdoor event must have a detailed weather contingency plan. This is not pessimism — it is professionalism. At minimum, this means clear tent or marquee options, a communication plan for the day, and decor that is weighted, secured, and weather-resistant.\n\nWe have extensive experience running events in both the UK climate and the seasonal patterns of Ghana. Preparedness is part of our service.\n\n## Lighting in the Open Air\n\nOutdoor lighting requires a different approach to indoor. Without walls to reflect light, you need more sources, more warmth, and more intention. String lights, lanterns, and candles create the most magical atmospheres — but they must be considered in relation to the natural light levels at the time of your event.\n\n## The Ground as Canvas\n\nIn an outdoor setting, the ground is as much a design surface as any wall. Petal arrangements, rugs, and decorative pathways can transform even a simple grass space into something extraordinary. Our team creates ground-level styling that photographs beautifully from above.\n\n## Embracing the Natural Light\n\nFor daytime outdoor events, shade is as important as decoration. Beautiful tensile structures, parasols, and natural canopy create comfort while adding visual interest. We design shade structures that are functional and elegant.`,
    category: "inspiration",
    author: "Adwoa Sarpong",
    authorRole: "Head of Design & Styling, ODREG",
    date: "2025-09-08",
    readTime: 6,
    image: "/images/grassdeco.jpg",
    tags: ["outdoor", "events", "decor", "garden", "inspiration"]
  }
];

// ─── Team Members ──────────────────────────────────────────────────────────────
export const TEAM: TeamMember[] = [
  {
    id: "odelia-mensah",
    name: "Odelia Mensah",
    role: "Founder & Lead Wedding Planner",
    bio: "With 15 years of experience across UK and Ghanaian ceremonies, Odelia founded ODREG from a deep conviction that cultural heritage and modern luxury belong together. She personally oversees every wedding commission.",
    image: "/images/Our UK Operations .jpg",
    country: "Both"
  },
  {
    id: "reginald-acheampong",
    name: "Reginald Acheampong",
    role: "Corporate Events Director",
    bio: "Reginald brings 12 years of corporate events expertise from London and Accra, having managed galas, summits, and product launches for international brands and government bodies.",
    image: "/images/eventmangement.jpg",
    country: "Both"
  },
  {
    id: "adwoa-sarpong",
    name: "Adwoa Sarpong",
    role: "Head of Design & Styling",
    bio: "Adwoa is the creative force behind ODREG's Royal Scaping philosophy. Trained at the London College of Fashion and in traditional Ghanaian craft, she leads all decor and styling commissions.",
    image: "/images/nicedeco.jpg",
    country: "UK"
  },
  {
    id: "Larry Dakes",
    name: "Kwame Asante",
    role: "Ghana Operations & TORGAG Liaison",
    bio: "Based in Accra, Kwame coordinates all Ghana-side operations and manages ODREG's strategic partnership with TORGAG. He is a certified cultural heritage guide with expertise across all Ghanaian regions.",
    image: "/images/TORGAG Heritage Experience 3.jpg",
    country: "UK"
  }
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
export const FEATURED_BLOG_POSTS = BLOG_POSTS.filter(p => p.featured);

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find(p => p.slug === slug);

export const getBlogPostsByCategory = (category: BlogPost['category']): BlogPost[] =>
  BLOG_POSTS.filter(p => p.category === category);
