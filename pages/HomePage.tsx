
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TESTIMONIALS, SERVICES, EVENT_TYPES, FEATURED_BLOG_POSTS, PORTFOLIO } from '../constants';

const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const useIntersection = (threshold = 0.1) => {
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

const useCounter = (target: number, duration = 2000, start: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

const CounterStat: React.FC<{ target: number; suffix: string; label: string; start: boolean }> = ({ target, suffix, label, start }) => {
  const count = useCounter(target, 2000, start);
  return (
    <div className="text-center group">
      <p className="font-serif text-5xl md:text-6xl font-bold mb-3" style={{ color: 'var(--gold)' }}>{count}{suffix}</p>
      <div className="w-8 h-px mx-auto mb-3" style={{ background: 'var(--gold)' }} />
      <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">{label}</p>
    </div>
  );
};

const HomePage: React.FC = () => {
  const eventTypesSection = useIntersection();
  const statsSection = useIntersection();
  const servicesSection = useIntersection();
  const portfolioSection = useIntersection();
  const processSection = useIntersection();
  const testimonialsSection = useIntersection();
  const blogSection = useIntersection();
  const awardsSection = useIntersection();

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const heroImages = [
    '/images/The Blue & Gold Royal Union .jpg',
    '/images/International Awards Night2 .jpg',
    '/images/Traditional marriage Rites3.jpg',
    '/images/TORGAG Heritage Experience .jpg',
    '/images/coupledance.jpg',
    '/images/nicedeco.jpg',
    '/images/weddinganniversary1.jpg',
    '/images/halldeco.jpg',
    '/images/walldeco.jpg',
  ];
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 6000);
    return () => clearInterval(t);
  }, []);

  const processSteps = [
    { step: '01', title: 'Consultation', desc: 'A complimentary discovery call to understand your vision, requirements, and budget.' },
    { step: '02', title: 'Proposal', desc: 'A fully bespoke event concept, mood board, and detailed quote within 48 hours.' },
    { step: '03', title: 'Planning', desc: 'End-to-end coordination of all suppliers, logistics, and creative direction.' },
    { step: '04', title: 'Execution', desc: 'Flawless on-day delivery — you arrive as a guest to your own extraordinary event.' },
  ];

  const marqueeItems = [
    'Luxury Weddings',
    'Corporate Events',
    'Traditional Ceremonies',
    'UK & Ghana',
    'Royal Scaping',
    'Heritage Tours',
    'VIP Experiences',
    'Bespoke Decor',
  ];

  const featuredPortfolio = PORTFOLIO.slice(0, 4);

  return (
    <div style={{ backgroundColor: 'var(--cream)' }}>

      {/* ─── CINEMATIC HERO ─────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden bg-noir">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 z-0"
            style={{ opacity: i === heroIndex ? 1 : 0, transition: 'opacity 1.5s ease-in-out' }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover animate-slow-zoom"
              fetchPriority={i === 0 ? 'high' : 'low'}
              loading={i === 0 ? 'eager' : 'lazy'}
              onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/70 via-transparent to-transparent z-1" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 md:pb-40 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
              <span className="w-12 h-px" style={{ background: 'var(--gold)' }} />
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold" style={{ color: 'var(--gold)' }}>
                Luxury Event Management · UK & Ghana
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[88px] text-white leading-[0.95] mb-6 animate-fade-up stagger-2">
              From Concept<br />
              to <span className="italic" style={{ color: 'var(--gold)' }}>Celebration.</span>
            </h1>

            <p className="text-white/60 text-base sm:text-lg font-light leading-relaxed max-w-lg mb-4 animate-fade-up stagger-3 font-display italic text-xl">
              "Delivered with Precision."
            </p>

            <p className="text-white/60 text-sm leading-relaxed max-w-xl mb-12 animate-fade-up stagger-3">
              Royal-inspired weddings, high-profile corporate galas, and bespoke cultural celebrations — crafted with precision across the United Kingdom and Ghana.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up stagger-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-3 px-8 py-4 font-bold text-xs uppercase tracking-widest btn-luxury btn-press transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 60%, var(--gold) 100%)', color: 'var(--navy-dark)' }}
              >
                Book Free Consultation <ArrowRight />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-all duration-300 backdrop-blur-sm"
                style={{ '--hover-border': 'var(--gold)' } as React.CSSProperties}
              >
                View Our Work <ArrowRight />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className="h-1 rounded-full transition-all duration-500"
              style={{ width: i === heroIndex ? '2rem' : '0.5rem', background: i === heroIndex ? 'var(--gold)' : 'rgba(255,255,255,0.3)' }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 right-0 z-10 hidden lg:flex">
          {[
            { value: '15+', label: 'Years Experience' },
            { value: '500+', label: 'Events Curated' },
            { value: '2K+', label: 'Happy Clients' },
          ].map((stat, i) => (
            <div key={i} className="px-8 py-6 bg-noir/80 backdrop-blur-md border-l text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <p className="font-serif text-2xl font-bold mb-1" style={{ color: 'var(--gold)' }}>{stat.value}</p>
              <p className="text-[9px] uppercase tracking-widest text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-14 left-8 z-10 hidden md:flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/60" />
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        </div>
      </section>

      {/* ─── MARQUEE ─────────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden py-3.5" style={{ background: 'var(--gold)' }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-10 text-[10px] uppercase tracking-[0.5em] font-bold flex-shrink-0" style={{ color: 'var(--noir)' }}>
              {item} <span className="opacity-40 mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── BRAND STATEMENT ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--beige)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="luxury-line mb-8">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold" style={{ color: 'var(--gold)' }}>Odreg Decor & Eventx Services</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl italic leading-tight mb-8" style={{ color: 'var(--charcoal)' }}>
            "A professional and creative team of event management specialists with over a decade of combined experience delivering high-quality events of every type and scale — locally and internationally."
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {['Results Oriented', 'Client Focused', 'Timely', 'Integrity'].map((val, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--warm-gray)' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EVENT TYPES ─────────────────────────────────────────────────────────── */}
      <section ref={eventTypesSection.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className={`transition-all duration-700 ${eventTypesSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold mb-4" style={{ color: 'var(--gold)' }}>What We Do</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: 'var(--charcoal)' }}>
                Every Occasion.<br />
                <span className="italic" style={{ color: 'var(--gold)' }}>Perfected.</span>
              </h2>
            </div>
            <Link
              to="/services"
              className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all hover-underline ${eventTypesSection.visible ? 'opacity-100' : 'opacity-0'}`}
              style={{ color: 'var(--charcoal)' }}
            >
              All Services <ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EVENT_TYPES.map((ev, i) => (
              <Link
                key={ev.id}
                to={ev.link}
                className={`group relative overflow-hidden bg-beige transition-all duration-700 ${eventTypesSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms`, aspectRatio: i === 0 ? '3/4' : '4/3' }}
              >
                <img
                  src={ev.image}
                  alt={ev.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/20 to-transparent" />
                {ev.tag && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-[9px] font-bold uppercase tracking-widest" style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', color: 'var(--navy-dark)' }}>
                    {ev.tag}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-serif text-white text-xl font-bold mb-2">{ev.name}</h3>
                  <p className="text-white/60 text-xs leading-relaxed line-clamp-2 mb-4">{ev.description}</p>
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:gap-3 transition-all" style={{ color: 'var(--gold)' }}>
                    Explore <ArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ──────────────────────────────────────────────────────────────── */}
      <section ref={statsSection.ref} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: 'var(--noir)' }}>
        <div className="absolute inset-0 opacity-5">
          <img src="/images/The Blue & Gold Royal Union .jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold mb-4" style={{ color: 'var(--gold)' }}>By the Numbers</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">A Decade of <span className="italic" style={{ color: 'var(--gold)' }}>Excellence</span>.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            <CounterStat target={15} suffix="+" label="Years of Excellence" start={statsSection.visible} />
            <CounterStat target={500} suffix="+" label="Events Curated" start={statsSection.visible} />
            <CounterStat target={2000} suffix="+" label="Happy Clients" start={statsSection.visible} />
            <CounterStat target={2} suffix=" Nations" label="UK & Ghana" start={statsSection.visible} />
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────────────────────────── */}
      <section ref={servicesSection.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--beige)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className={`text-[10px] uppercase tracking-[0.5em] font-bold mb-4 transition-all duration-700 ${servicesSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ color: 'var(--gold)' }}>
              Our Expertise
            </p>
            <h2 className={`font-serif text-4xl md:text-5xl transition-all duration-700 delay-100 ${servicesSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ color: 'var(--charcoal)' }}>
              Luxury Services,<br />
              <span className="italic" style={{ color: 'var(--gold)' }}>Flawlessly Delivered.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.slice(0, 6).map((service, i) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className={`group p-8 transition-all duration-500 service-card card-luxury ${servicesSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms`, background: 'var(--ivory)' }}
              >
                <div className="text-3xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">{service.icon}</div>
                <h3 className="font-serif text-lg font-bold mb-3 group-hover:text-gold transition-colors" style={{ color: 'var(--charcoal)' }}>{service.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--warm-gray)' }}>{service.description}</p>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:gap-3 transition-all" style={{ color: 'var(--gold)' }}>
                  Discover <ArrowRight />
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-3 px-10 py-4 text-xs font-bold uppercase tracking-widest btn-luxury btn-press transition-all duration-300"
              style={{ border: '1.5px solid var(--navy)', color: 'var(--navy)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--navy)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ivory)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--navy)'; }}
            >
              View All Services <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO HIGHLIGHTS ─────────────────────────────────────────────────── */}
      <section ref={portfolioSection.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className={`transition-all duration-700 ${portfolioSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold mb-4" style={{ color: 'var(--gold)' }}>Case Studies</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: 'var(--charcoal)' }}>
                Our <span className="italic" style={{ color: 'var(--gold)' }}>Legacy</span>.
              </h2>
            </div>
            <Link
              to="/portfolio"
              className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all hover-underline ${portfolioSection.visible ? 'opacity-100' : 'opacity-0'}`}
              style={{ color: 'var(--charcoal)' }}
            >
              Full Portfolio <ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredPortfolio.map((item, i) => (
              <Link
                key={item.id}
                to={`/portfolio/${item.id}`}
                className={`group relative overflow-hidden event-card transition-all duration-700 ${portfolioSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms`, aspectRatio: i % 3 === 0 ? '3/4' : '16/9' }}
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/20 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest" style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', color: 'var(--navy-dark)' }}>{item.category}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[9px] uppercase tracking-widest font-bold mb-2 opacity-70 text-white">{item.location} · {item.year}</p>
                  <h3 className="font-serif text-2xl text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-white/60 text-xs line-clamp-2 mb-4">{item.description}</p>
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'var(--gold)' }}>
                    View Case Study <ArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR PROCESS ──────────────────────────────────────────────────────────── */}
      <section ref={processSection.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--noir)' }}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-700 ${processSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold mb-4" style={{ color: 'var(--gold)' }}>How We Work</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              From Vision to <span className="italic" style={{ color: 'var(--gold)' }}>Reality.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className={`p-10 transition-all duration-700 group cursor-default ${processSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 120}ms`, background: 'rgba(36,59,83,0.5)' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(58,85,117,0.5)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(36,59,83,0.5)'}
              >
                <p className="font-serif text-6xl font-bold mb-6 transition-colors" style={{ color: 'rgba(212,180,131,0.15)' }}
                   onMouseEnter={e => (e.currentTarget as HTMLParagraphElement).style.color = 'rgba(212,180,131,0.4)'}
                   onMouseLeave={e => (e.currentTarget as HTMLParagraphElement).style.color = 'rgba(212,180,131,0.15)'}>{step.step}</p>
                <h3 className="font-serif text-xl text-white font-bold mb-4">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-gray)' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/book"
              className="inline-flex items-center gap-3 px-10 py-4 font-bold text-xs uppercase tracking-widest btn-luxury btn-press transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', color: 'var(--navy-dark)' }}
            >
              Start the Conversation <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────────────────────────── */}
      <section ref={testimonialsSection.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--beige)' }}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${testimonialsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold mb-4" style={{ color: 'var(--gold)' }}>Client Voices</p>
            <h2 className="font-serif text-4xl md:text-5xl" style={{ color: 'var(--charcoal)' }}>
              Trusted by <span className="italic">Hundreds</span>.
            </h2>
          </div>

          <div className={`transition-all duration-700 delay-200 ${testimonialsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white p-10 md:p-16 shadow-sm overflow-hidden relative">
              <svg className="absolute top-8 left-8 w-20 h-20 opacity-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--gold)' }}>
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>

              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" style={{ fill: 'var(--gold)', color: 'var(--gold)' }}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="font-serif text-xl md:text-2xl italic leading-relaxed mb-8 transition-all duration-500" style={{ color: 'var(--charcoal)' }}>
                  "{TESTIMONIALS[activeTestimonial].comment}"
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-serif font-bold text-lg" style={{ background: 'rgba(212,180,131,0.1)', color: 'var(--gold)' }}>
                      {TESTIMONIALS[activeTestimonial].name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold" style={{ color: 'var(--charcoal)' }}>{TESTIMONIALS[activeTestimonial].name}</p>
                      <p className="text-xs" style={{ color: 'var(--warm-gray)' }}>
                        {TESTIMONIALS[activeTestimonial].role} · {TESTIMONIALS[activeTestimonial].location}
                      </p>
                    </div>
                  </div>
                  {TESTIMONIALS[activeTestimonial].event && (
                    <span className="px-3 py-1 border text-[10px] font-bold uppercase tracking-widest" style={{ background: 'var(--cream)', color: 'var(--gold)', borderColor: 'rgba(212,180,131,0.2)' }}>
                      {TESTIMONIALS[activeTestimonial].event}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-8">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{ width: i === activeTestimonial ? '2rem' : '0.5rem', background: i === activeTestimonial ? 'var(--gold)' : 'var(--sand)' }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={`text-center mt-10 transition-all duration-700 delay-300 ${testimonialsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover-underline transition-colors"
              style={{ color: 'var(--charcoal)' }}
            >
              Join Our Happy Clients <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── AWARDS & RECOGNITION ──────────────────────────────────────────────────── */}
      <section ref={awardsSection.ref} className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--noir)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🏆', title: 'Premium Events', desc: 'Recognised for delivering world-class event experiences across two continents.' },
              { icon: '🌍', title: 'International Reach', desc: 'Operating seamlessly across UK and Ghana with dedicated teams in each location.' },
              { icon: '💎', title: 'Luxury Standard', desc: 'Every event we touch reflects our uncompromising commitment to elegance and precision.' },
            ].map((item, i) => (
              <div
                key={i}
                className={`text-center p-10 transition-all duration-700 hover-glow ${awardsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms`, border: '1px solid rgba(212,180,131,0.15)', background: 'rgba(255,255,255,0.04)' }}
              >
                <span className="text-4xl block mb-5">{item.icon}</span>
                <h3 className="font-serif text-xl text-white font-bold mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-gray)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOG PREVIEW ──────────────────────────────────────────────────────────── */}
      <section ref={blogSection.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className={`transition-all duration-700 ${blogSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold mb-4" style={{ color: 'var(--gold)' }}>Ideas & Inspiration</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: 'var(--charcoal)' }}>
                From the <span className="italic">Journal</span>.
              </h2>
            </div>
            <Link
              to="/blog"
              className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover-underline transition-all ${blogSection.visible ? 'opacity-100' : 'opacity-0'}`}
              style={{ color: 'var(--charcoal)' }}
            >
              All Articles <ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED_BLOG_POSTS.slice(0, 2).map((post, i) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className={`group block transition-all duration-700 ${blogSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="aspect-[16/9] overflow-hidden bg-beige mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
                  />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest" style={{ background: 'rgba(212,180,131,0.1)', color: 'var(--gold)' }}>
                    {post.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--warm-gray)' }}>{post.readTime} min read</span>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-gold transition-colors leading-tight" style={{ color: 'var(--charcoal)' }}>
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--warm-gray)' }}>{post.excerpt}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:gap-3 transition-all" style={{ color: 'var(--gold)' }}>
                  Read Article <ArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-36 overflow-hidden text-center px-4" style={{ background: 'var(--noir)' }}>
        <img
          src="/images/coupledance.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(28,52,80,0.88) 0%, rgba(36,59,83,0.78) 100%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="luxury-line mb-8">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold" style={{ color: 'var(--gold)' }}>Begin Your Journey</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-8">
            Your Vision.<br />
            <span className="italic" style={{ color: 'var(--gold)' }}>Our Precision.</span>
          </h2>
          <p className="text-white/55 text-lg mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Whether you're planning a landmark wedding, a high-profile corporate event, or a bespoke celebration — we're here to make it extraordinary.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center gap-3 px-10 py-4 font-bold text-xs uppercase tracking-widest btn-luxury btn-press transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', color: 'var(--navy-dark)' }}
            >
              Book Free Consultation <ArrowRight />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:border-gold/70 hover:text-gold transition-all duration-300 backdrop-blur-sm"
            >
              View Portfolio <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
