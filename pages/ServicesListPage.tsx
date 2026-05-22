
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

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

const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const ServicesListPage: React.FC = () => {
  const introSection = useIntersection();
  const gridSection = useIntersection();
  const featuredSection = useIntersection();

  return (
    <div style={{ backgroundColor: 'var(--cream)' }}>

      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ background: 'var(--noir)', minHeight: '55vh' }}>
        <img
          src="/images/eventdeco.jpg"
          alt="ODREG Services"
          className="absolute inset-0 w-full h-full object-cover opacity-35 animate-slow-zoom"
          fetchPriority="high"
        onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
          />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--noir) 35%, transparent)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(36,59,83,0.7), transparent)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-40 w-full">
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <span className="w-10 h-px" style={{ background: 'var(--gold)' }} />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold" style={{ color: 'var(--gold)' }}>What We Offer</span>
          </div>
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl text-white leading-none mb-5 animate-fade-up">
            Our <span className="italic" style={{ color: 'var(--gold)' }}>Services</span>.
          </h1>
          <p className="text-white/50 text-lg max-w-xl font-light leading-relaxed animate-fade-up stagger-2">
            A comprehensive suite of luxury event solutions — from meticulous planning to elite protocol — crafted for the discerning client.
          </p>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden py-3" style={{ background: 'var(--gold)' }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {['Event Planning', 'Wedding Design', 'Corporate Events', 'Protocol & Ushering', 'Royal Scaping', 'Floral Design', 'Catering Liaison', 'Cultural Tours', 'Photography Liaison', 'On-Day Coordination'].flatMap(item => [item, item, item, item]).map((item, i) => (
            <span key={i} className="mx-10 text-[10px] uppercase tracking-[0.5em] font-bold flex-shrink-0" style={{ color: 'var(--noir)' }}>
              {item} <span className="opacity-40 mx-1">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Intro statement */}
      <section ref={introSection.ref} className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--beige)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className={`transition-all duration-700 ${introSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold mb-6" style={{ color: 'var(--gold)' }}>The ODREG Standard</p>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8" style={{ color: 'var(--charcoal)' }}>
              Every service we offer is delivered with the same<br />
              <span className="italic" style={{ color: 'var(--gold)' }}>uncompromising commitment to excellence</span>.
            </h2>
            <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--warm-gray)' }}>
              From the first consultation to the final farewell, ODREG brings military-grade precision and luxury aesthetics to every commission. We don't just manage events — we craft experiences that endure in memory.
            </p>
          </div>
        </div>
      </section>

      {/* Service cards grid */}
      <section ref={gridSection.ref} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((service, idx) => (
              <div
                key={service.id}
                className={`group flex flex-col lg:flex-row overflow-hidden transition-all duration-700 ${gridSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 70}ms`, background: idx % 4 < 2 ? 'var(--cream)' : 'white', border: '1px solid var(--sand)' }}
              >
                {/* Image */}
                <div className="lg:w-64 flex-shrink-0 img-zoom-container overflow-hidden" style={{ minHeight: '200px', background: 'var(--beige)' }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    style={{ minHeight: '200px' }}
                    onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-8 flex-1">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{service.icon}</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1" style={{ background: 'rgba(212,180,131,0.1)', color: 'var(--gold)' }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl font-bold mb-3 group-hover:text-gold transition-colors leading-tight" style={{ color: 'var(--charcoal)' }}>
                      {service.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--warm-gray)' }}>{service.description}</p>

                    {service.features && (
                      <ul className="space-y-1.5 mb-5">
                        {service.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--warm-gray)' }}>
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                            {f}
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-xs" style={{ color: 'var(--gold)' }}>+{service.features.length - 3} more</li>
                        )}
                      </ul>
                    )}
                  </div>

                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:gap-3 transition-all"
                    style={{ color: 'var(--gold)' }}
                  >
                    View Full Details <ArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured detail — alternating */}
      <section ref={featuredSection.ref} className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--beige)' }}>
        <div className="max-w-7xl mx-auto space-y-24">
          {SERVICES.slice(0, 3).map((service, idx) => (
            <div
              key={service.id}
              className={`flex flex-col lg:flex-row gap-16 items-center transition-all duration-1000 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''} ${featuredSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="w-full lg:w-1/2 relative">
                <div className="aspect-[4/3] overflow-hidden img-zoom-container" style={{ background: 'var(--sand)' }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
                  />
                </div>
                <div className="absolute -bottom-4 px-4 py-2" style={{ left: idx % 2 !== 0 ? 'auto' : '2rem', right: idx % 2 !== 0 ? '2rem' : 'auto', background: 'var(--gold)' }}>
                  <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--noir)' }}>
                    Featured Service
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{service.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--gold)' }}>
                    {String(idx + 1).padStart(2, '0')} / Service
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl mb-5 leading-tight" style={{ color: 'var(--charcoal)' }}>
                  {service.title}
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--warm-gray)' }}>{service.description}</p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--warm-gray)' }}>{service.fullContent}</p>
                <Link
                  to={`/services/${service.id}`}
                  className="inline-flex items-center gap-3 px-8 py-4 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all btn-press"
                  style={{ background: 'var(--noir)', color: 'var(--gold)' }}
                >
                  Explore This Service <ArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center px-4" style={{ background: 'var(--noir)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold mb-4" style={{ color: 'var(--gold)' }}>Begin the Conversation</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">
            Ready to work<br />
            <span className="italic" style={{ color: 'var(--gold)' }}>together?</span>
          </h2>
          <p className="text-white/50 mb-10 max-w-xl mx-auto text-sm leading-relaxed">
            Every extraordinary event begins with a conversation. Book your complimentary consultation and let us bring your vision to life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center gap-3 px-10 py-4 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all btn-press"
              style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', color: 'var(--navy-dark)' }}
            >
              Book Free Consultation <ArrowRight />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:border-gold hover:text-gold transition-all"
            >
              Contact Us <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServicesListPage;
