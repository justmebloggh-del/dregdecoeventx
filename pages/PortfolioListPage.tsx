
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO } from '../constants';

const useIntersection = (threshold = 0.08) => {
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

const categories = ['All', 'Wedding', 'Corporate', 'Traditional', 'Milestone'];

const PortfolioListPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const gridSection = useIntersection();

  const filtered = activeCategory === 'All'
    ? PORTFOLIO
    : PORTFOLIO.filter(p => p.category === activeCategory);

  return (
    <div style={{ backgroundColor: 'var(--cream)' }}>

      {/* Hero */}
      <section className="relative overflow-hidden flex items-end" style={{ background: 'var(--noir)', minHeight: '60vh' }}>
        <img
          src="/images/eventxdeco.jpg"
          alt="ODREG Portfolio"
          className="absolute inset-0 w-full h-full object-cover opacity-30 animate-slow-zoom"
          fetchPriority="high"
        onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
          />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--noir) 30%, transparent)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(36,59,83,0.6), transparent)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-40 w-full">
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <span className="w-10 h-px" style={{ background: 'var(--gold)' }} />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold" style={{ color: 'var(--gold)' }}>Case Studies</span>
          </div>
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl text-white leading-none mb-6 animate-fade-up">
            Our <span className="italic" style={{ color: 'var(--gold)' }}>Legacy</span>.
          </h1>
          <p className="text-white/50 text-lg max-w-xl font-light leading-relaxed animate-fade-up stagger-2">
            A curated showcase of events that define luxury, precision, and cultural mastery.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[68px] z-30 border-b" style={{ background: 'var(--cream)', borderColor: 'var(--sand)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
                style={{
                  background: activeCategory === cat ? 'var(--gold)' : 'transparent',
                  color: activeCategory === cat ? 'var(--noir)' : 'var(--warm-gray)',
                  border: activeCategory === cat ? 'none' : '1px solid var(--sand)',
                }}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="ml-2 opacity-60">
                    ({PORTFOLIO.filter(p => p.category === cat).length})
                  </span>
                )}
              </button>
            ))}
            <span className="ml-auto text-[10px] uppercase tracking-widest flex-shrink-0 pl-4" style={{ color: 'var(--warm-gray)' }}>
              {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
            </span>
          </div>
        </div>
      </div>

      {/* Portfolio grid */}
      <div ref={gridSection.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-serif text-3xl mb-4" style={{ color: 'var(--charcoal)' }}>No projects found.</p>
            <button onClick={() => setActiveCategory('All')} className="text-xs font-bold uppercase tracking-widest hover:underline" style={{ color: 'var(--gold)' }}>
              View All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item, idx) => (
              <Link
                key={item.id}
                to={`/portfolio/${item.id}`}
                className={`group relative block overflow-hidden event-card transition-all duration-700 ${gridSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  transitionDelay: `${idx * 80}ms`,
                  aspectRatio: idx % 3 === 0 ? '3/4' : '4/3',
                  background: 'var(--beige)',
                }}
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  loading="lazy"
                  onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/95 via-noir/20 to-transparent" />

                {/* Index badge */}
                <div className="absolute top-5 left-5 px-3 py-1" style={{ background: 'var(--gold)' }}>
                  <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--noir)' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Category badge */}
                <div className="absolute top-5 right-5 px-3 py-1 backdrop-blur-sm" style={{ background: 'rgba(36,59,83,0.7)', border: '1px solid rgba(212,180,131,0.2)' }}>
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--gold)' }}>
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[9px] uppercase tracking-widest font-bold opacity-60 text-white">{item.location}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-[9px] uppercase tracking-widest font-bold opacity-60 text-white">{item.year}</span>
                    {item.guestCount && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                        <span className="text-[9px] uppercase tracking-widest font-bold opacity-60 text-white">{item.guestCount} guests</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-white font-bold leading-tight mb-3">{item.title}</h3>
                  <p className="text-white/55 text-sm line-clamp-2 mb-5">{item.description}</p>
                  <span
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: 'var(--gold)' }}
                  >
                    Read Case Study
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 py-20 text-center px-4" style={{ background: 'var(--noir)' }}>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-4" style={{ color: 'var(--gold)' }}>Begin Your Story</p>
          <h3 className="font-serif text-4xl text-white mb-8 italic">
            Ready to create your own legacy?
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center gap-3 px-12 py-5 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all duration-300 btn-press"
              style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', color: 'var(--navy-dark)' }}
            >
              Book a Consultation
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-3 px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:border-gold hover:text-gold transition-all duration-300"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioListPage;
