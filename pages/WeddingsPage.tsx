
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO, TESTIMONIALS, SERVICES } from '../constants';

const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const useIntersection = (threshold = 0.12) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const weddingPackages = [
  {
    name: 'Essentials',
    price: 'From £2,500',
    desc: 'Perfect for intimate ceremonies. Includes consultation, decor styling, and on-day coordination.',
    features: ['Initial consultation', 'Mood board & design plan', 'Decor hire & styling', 'On-day coordination (8 hrs)', 'Supplier recommendations'],
    highlight: false,
  },
  {
    name: 'Royal Scape',
    price: 'From £5,500',
    desc: 'Our signature full-service wedding package with custom Royal Scaping design.',
    features: ['Full planning from proposal to farewell', 'Custom Royal Scaping design', 'Throne & backdrop staging', 'Protocol & ushering team', 'Floristry & table design', 'Photography coordination', 'Catering liaison'],
    highlight: true,
  },
  {
    name: 'Heritage Union',
    price: 'From £8,500',
    desc: 'Complete UK & Ghana dual-ceremony management for diaspora couples.',
    features: ['Everything in Royal Scape', 'Traditional knocking ceremony', 'Ghana-side coordination', 'TORGAG cultural advisory', 'Kente & fabric sourcing', 'Cross-border logistics', 'VIP protocol officers'],
    highlight: false,
  },
];

const weddingPortfolio = PORTFOLIO.filter(p => p.category === 'Wedding');
const weddingTestimonials = TESTIMONIALS.filter(t => t.event);
const weddingService = SERVICES.find(s => s.id === 'wedding-planning');

const WeddingsPage: React.FC = () => {
  const intro = useIntersection();
  const packages = useIntersection();
  const gallery = useIntersection();
  const testi = useIntersection();
  const faq = useIntersection();

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'How far in advance should I book?', a: 'We recommend booking at least 12 months in advance for a full Royal Scape wedding, particularly for summer and holiday dates. For smaller packages, 6 months is generally sufficient. Contact us to check our availability.' },
    { q: 'Do you manage both the traditional and white wedding?', a: 'Yes — our Heritage Union package is specifically designed to manage both ceremonies seamlessly, whether they occur in the same location or across the UK and Ghana.' },
    { q: 'Can you source authentic Kente fabric?', a: 'Absolutely. Through our direct artisan partnerships in Bonwire, Ghana, we can source bespoke Kente for the bridal party, groom\'s party, and family members, woven to your specific colour story.' },
    { q: 'What is your cancellation policy?', a: 'We understand life is unpredictable. Our contracts include a staged deposit structure with clear refund terms at each milestone. Full details are provided at the point of booking.' },
    { q: 'Do you work outside the UK and Ghana?', a: 'We have managed events in several European and West African countries. Please contact us to discuss international commissions — each is assessed individually.' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--cream)' }}>

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[560px] flex items-end overflow-hidden bg-noir">
        <img
          src="/images/The Blue & Gold Royal Union .jpg"
          alt="Luxury wedding by ODREG"
          className="absolute inset-0 w-full h-full object-cover opacity-55 animate-slow-zoom"
          fetchPriority="high"
        onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
          />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full">
          <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4 animate-fade-in">Luxury Wedding Services</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-none mb-6 animate-fade-up">
            Weddings That<br />
            <span className="italic text-gold">Become Legend.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mb-10 font-light animate-fade-up stagger-2">
            Royal-inspired ceremonies honouring the beauty of two cultures. From Hull to Accra, we create unions that are as extraordinary as the love they celebrate.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up stagger-3">
            <Link to="/book" className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-noir font-bold text-xs uppercase tracking-widest hover:bg-gold-light transition-all btn-press">
              Book Consultation <ArrowRight />
            </Link>
            <Link to="/portfolio" className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-all">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Intro / Philosophy */}
      <section ref={intro.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className={`transition-all duration-1000 ${intro.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6">Our Wedding Philosophy</p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-8 leading-tight">
                Two Worlds.<br />
                One <span className="italic text-gold">Extraordinary Day.</span>
              </h2>
              <div className="space-y-5 text-warm-gray leading-relaxed">
                <p>
                  A wedding is the most significant event most people will ever commission. It demands a team who will protect your vision with as much passion as you have for it — and deliver it with the technical precision that turns vision into reality.
                </p>
                <p>
                  At ODREG, we specialise in weddings that honour two cultural identities simultaneously. Our Royal Scaping design philosophy fuses British elegance with Ghanaian ceremonial grandeur — creating spaces that feel like no wedding you have ever attended.
                </p>
                <p>
                  From the first conversation to the final dance, you will have a dedicated team who knows your names, knows your story, and will not rest until your day is extraordinary.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-sand">
                {[
                  { v: '200+', l: 'Weddings Delivered' },
                  { v: '100%', l: 'Client Satisfaction' },
                  { v: 'UK + GH', l: 'Dual Presence' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="font-serif text-2xl text-gold font-bold">{s.v}</p>
                    <p className="text-[10px] uppercase tracking-widest text-warm-gray mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-200 ${intro.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src="/images/coupledance.jpg" alt="Wedding ceremony" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="bg-noir p-5 text-center">
                    <p className="text-gold text-[10px] uppercase tracking-widest font-bold">White Wedding</p>
                  </div>
                </div>
                <div className="space-y-4 pt-10">
                  <div className="bg-gold p-5 text-center">
                    <p className="text-noir text-[10px] uppercase tracking-widest font-bold">Traditional Rites</p>
                  </div>
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src="/images/Traditional marriage Rites3.jpg" alt="Traditional ceremony" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-beige px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {weddingService?.features?.map((f, i) => (
              <div key={i} className="bg-white p-6 border border-sand">
                <div className="w-8 h-px bg-gold mx-auto mb-4" />
                <p className="text-xs font-semibold text-charcoal uppercase tracking-widest">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section ref={packages.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${packages.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4">Wedding Packages</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
              Find Your <span className="italic text-gold">Perfect Package</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {weddingPackages.map((pkg, i) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col p-10 transition-all duration-700 ${pkg.highlight ? 'bg-noir text-white' : 'bg-white border border-sand text-charcoal'} ${packages.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-noir text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <p className={`text-[10px] uppercase tracking-[0.4em] font-bold mb-2 ${pkg.highlight ? 'text-gold' : 'text-gold'}`}>{pkg.name}</p>
                <p className={`font-serif text-3xl font-bold mb-4 ${pkg.highlight ? 'text-white' : 'text-charcoal'}`}>{pkg.price}</p>
                <p className={`text-sm leading-relaxed mb-8 ${pkg.highlight ? 'text-white/60' : 'text-warm-gray'}`}>{pkg.desc}</p>
                <ul className="space-y-3 flex-grow mb-10">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className={`text-sm ${pkg.highlight ? 'text-white/80' : 'text-charcoal'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book"
                  className={`text-center py-4 text-xs font-bold uppercase tracking-widest transition-all btn-press ${pkg.highlight ? 'bg-gold text-noir hover:bg-gold-light' : 'border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white'}`}
                >
                  Enquire Now
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-warm-gray mt-8">All packages are fully customisable. Prices vary by event scale, location, and requirements. Contact us for a bespoke quote.</p>
        </div>
      </section>

      {/* Portfolio gallery */}
      <section ref={gallery.ref} className="py-24 md:py-32 bg-beige px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`flex justify-between items-end mb-16 transition-all duration-700 ${gallery.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4">Our Work</p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Wedding <span className="italic">Gallery</span>.</h2>
            </div>
            <Link to="/portfolio" className="text-xs font-bold uppercase tracking-widest text-charcoal hover:text-gold transition-colors hover-underline hidden sm:block">
              Full Portfolio <ArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weddingPortfolio.map((item, i) => (
              <Link
                key={item.id}
                to={`/portfolio/${item.id}`}
                className={`group relative overflow-hidden aspect-[4/3] bg-noir transition-all duration-700 ${gallery.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <img src={item.images[0]} alt={item.title} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="text-gold text-[10px] uppercase tracking-widest font-bold mb-2">{item.location} · {item.year}</p>
                  <h3 className="font-serif text-2xl text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.guestCount} guests</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testi.ref} className="py-24 md:py-32 bg-noir px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${testi.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4">Love Stories</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">What Couples <span className="italic text-gold">Say</span>.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weddingTestimonials.slice(0, 2).map((t, i) => (
              <div
                key={t.id}
                className={`bg-white/5 border border-white/5 p-10 transition-all duration-700 ${testi.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 fill-gold" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-serif text-lg text-white italic leading-relaxed mb-6">"{t.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold font-serif">{t.name.charAt(0)}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role} · {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faq.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${faq.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4">FAQs</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Common <span className="italic">Questions</span>.</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((item, i) => (
              <div
                key={i}
                className={`border border-sand transition-all duration-700 ${faq.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left group"
                >
                  <span className="font-semibold text-charcoal group-hover:text-gold transition-colors">{item.q}</span>
                  <span className={`text-gold transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6">
                    <p className="text-warm-gray text-sm leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-beige text-center px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6">Let's Begin</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-8">
            Ready to plan your<br />
            <span className="italic">extraordinary day?</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/book" className="inline-flex items-center gap-3 px-10 py-4 bg-noir text-white font-bold text-xs uppercase tracking-widest hover:bg-gold hover:text-noir transition-all duration-300 btn-press">
              Book Free Consultation <ArrowRight />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-4 border-2 border-charcoal text-charcoal font-bold text-xs uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all duration-300">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeddingsPage;
