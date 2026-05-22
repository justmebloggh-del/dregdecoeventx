
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

const corporatePortfolio = PORTFOLIO.filter(p => p.category === 'Corporate');
const corporateTestimonial = TESTIMONIALS.find(t => t.role === 'Corporate Events Director');
const corporateServices = SERVICES.filter(s => ['corporate-events', 'coordination', 'protocol', 'catering-liaison', 'photography-liaison'].includes(s.id));

const eventFormats = [
  { icon: '🏆', title: 'Awards Galas', desc: 'Black-tie ceremonies with flawless stage management, VIP protocol, and premium staging.' },
  { icon: '🚀', title: 'Product Launches', desc: 'Brand-defining launch events that create buzz and leave lasting impressions.' },
  { icon: '🤝', title: 'Executive Summits', desc: 'High-level meetings, retreats, and boardroom dining for senior leadership teams.' },
  { icon: '🎓', title: 'Conferences', desc: 'Multi-session conferences with full AV, staging, catering, and delegate management.' },
  { icon: '🌍', title: 'Cultural Showcases', desc: 'Diaspora business events, cultural celebrations, and international trade events.' },
  { icon: '🍽️', title: 'Gala Dinners', desc: 'Immersive dining experiences with bespoke table design and curated menus.' },
];

const CorporatePage: React.FC = () => {
  const intro = useIntersection();
  const formats = useIntersection();
  const servicesSection = useIntersection();
  const portfolioSection = useIntersection();
  const testiSection = useIntersection();

  return (
    <div style={{ backgroundColor: 'var(--cream)' }}>

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[560px] flex items-end overflow-hidden bg-noir">
        <img
          src="/images/International Awards Night2 .jpg"
          alt="Corporate event by ODREG"
          className="absolute inset-0 w-full h-full object-cover opacity-50 animate-slow-zoom"
          fetchPriority="high"
        onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
          />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full">
          <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4 animate-fade-in">Corporate Event Management</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-none mb-6 animate-fade-up">
            Events That<br />
            <span className="italic text-gold">Define Brands.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mb-10 font-light animate-fade-up stagger-2">
            Award galas, product launches, executive summits, and cultural showcases — delivered with the precision and luxury aesthetic that your brand demands.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up stagger-3">
            <Link to="/book" className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-noir font-bold text-xs uppercase tracking-widest hover:bg-gold-light transition-all btn-press">
              Request a Proposal <ArrowRight />
            </Link>
            <Link to="/portfolio" className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-all">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section ref={intro.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className={`transition-all duration-1000 ${intro.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6">Our Approach</p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-8 leading-tight">
                Precision.<br />
                <span className="italic text-gold">Every Time.</span>
              </h2>
              <div className="space-y-5 text-warm-gray leading-relaxed">
                <p>
                  Corporate events carry the weight of your brand's reputation. Every detail — from the moment guests arrive to the lighting during the keynote — communicates who you are. ODREG delivers events that communicate excellence.
                </p>
                <p>
                  Our corporate team brings military-grade timeline management together with a luxury aesthetic that consistently exceeds client expectations. We have managed events ranging from intimate boardroom dinners to 500-person gala evenings across the UK and Ghana.
                </p>
                <p>
                  We are particularly experienced in events that bridge cultural contexts — international business communities, UK-Ghana trade events, and diaspora corporate celebrations where cultural nuance is as important as logistical precision.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-sand">
                {[
                  { v: '300+', l: 'Corporate Events' },
                  { v: '500+', l: 'Max Guest Count' },
                  { v: '48hr', l: 'Proposal Turnaround' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="font-serif text-2xl text-gold font-bold">{s.v}</p>
                    <p className="text-[10px] uppercase tracking-widest text-warm-gray mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-200 ${intro.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="grid grid-cols-1 gap-4">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src="/images/eventmangement.jpg" alt="Corporate event" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square overflow-hidden">
                    <img src="/images/halldeco.jpg" alt="Awards gala" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-square bg-noir flex items-center justify-center p-6 text-center">
                    <div>
                      <p className="font-serif text-4xl text-gold font-bold">300+</p>
                      <p className="text-[10px] uppercase tracking-widest text-white/50 mt-2">Events Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event formats */}
      <section ref={formats.ref} className="py-24 md:py-32 bg-noir px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${formats.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4">Event Formats</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">We Specialise <span className="italic text-gold">In.</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {eventFormats.map((f, i) => (
              <div
                key={f.title}
                className={`bg-noir p-10 group hover:bg-white/5 transition-all duration-500 ${formats.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-4xl block mb-5 group-hover:scale-110 transition-transform duration-300">{f.icon}</span>
                <h3 className="font-serif text-xl text-white font-bold mb-3">{f.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesSection.ref} className="py-24 md:py-32 bg-beige px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${servicesSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4">Our Services</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Everything <span className="italic">Covered</span>.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corporateServices.map((s, i) => (
              <Link
                key={s.id}
                to={`/services/${s.id}`}
                className={`group bg-white p-8 border border-transparent hover:border-gold/20 hover:shadow-lg transition-all duration-500 ${servicesSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-3xl block mb-5 group-hover:scale-110 transition-transform">{s.icon}</span>
                <h3 className="font-serif text-lg font-bold text-charcoal mb-3 group-hover:text-gold transition-colors">{s.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed mb-5">{s.description}</p>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold">Learn More <ArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section ref={portfolioSection.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`flex justify-between items-end mb-16 transition-all duration-700 ${portfolioSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4">Recent Work</p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Corporate <span className="italic">Portfolio</span>.</h2>
            </div>
            <Link to="/portfolio" className="text-xs font-bold uppercase tracking-widest text-charcoal hover:text-gold transition-colors hover-underline hidden sm:flex items-center gap-2">
              All Projects <ArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {corporatePortfolio.map((item, i) => (
              <Link
                key={item.id}
                to={`/portfolio/${item.id}`}
                className={`group relative overflow-hidden aspect-[4/3] bg-noir transition-all duration-700 ${portfolioSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <img src={item.images[0]} alt={item.title} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="text-gold text-[10px] uppercase tracking-widest font-bold mb-2">{item.location} · {item.year}</p>
                  <h3 className="font-serif text-2xl text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.guestCount} attendees</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {corporateTestimonial && (
        <section ref={testiSection.ref} className="py-24 md:py-32 bg-noir px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className={`bg-white/5 border border-white/5 p-12 md:p-16 transition-all duration-700 ${testiSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-gold" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-serif text-2xl md:text-3xl text-white italic leading-relaxed mb-10">
                "{corporateTestimonial.comment}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold font-serif text-lg">
                  {corporateTestimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{corporateTestimonial.name}</p>
                  <p className="text-white/40 text-sm">{corporateTestimonial.role} · {corporateTestimonial.location}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-beige text-center px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6">Start Planning</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-8">
            Ready to elevate your<br />
            <span className="italic">next event?</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/book" className="inline-flex items-center gap-3 px-10 py-4 bg-noir text-white font-bold text-xs uppercase tracking-widest hover:bg-gold hover:text-noir transition-all duration-300 btn-press">
              Request a Proposal <ArrowRight />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-4 border-2 border-charcoal text-charcoal font-bold text-xs uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all duration-300">
              Contact the Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorporatePage;
