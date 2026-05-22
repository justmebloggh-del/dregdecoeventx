
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
  location?: string;
  span?: 'normal' | 'wide' | 'tall';
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1',  src: '/images/The Blue & Gold Royal Union .jpg',  alt: 'Royal couple at ceremony',     category: 'Weddings',    title: 'Royal Union Ceremony',          location: 'Accra, Ghana',      span: 'tall' },
  { id: 'g2',  src: '/images/coupledance.jpg',            alt: 'Couple first dance',                 category: 'Weddings',    title: 'The First Dance',               location: 'Accra, Ghana' },
  { id: 'g3',  src: '/images/couplekiss.jpg',             alt: 'Wedding couple',                     category: 'Weddings',    title: 'A Perfect Moment',              location: 'Accra, Ghana' },
  { id: 'g4',  src: '/images/International Awards Night2 .jpg', alt: 'International awards night gala', category: 'Corporate',   title: 'International Awards Gala',     location: 'Hull, UK',          span: 'wide' },
  { id: 'g5',  src: '/images/couplekiss2.jpg',            alt: 'Wedding kiss',                       category: 'Weddings',    title: 'Sealed with a Kiss',            location: 'Accra, Ghana' },
  { id: 'g6',  src: '/images/Traditional marriage Rites3.jpg',  alt: 'Royal throne traditional ceremony', category: 'Traditional', title: 'Royal Throne Ceremony',         location: 'Accra, Ghana',      span: 'tall' },
  { id: 'g7',  src: '/images/halldeco.jpg',               alt: 'Decorated event hall',               category: 'Decor',       title: 'Grand Hall Transformation',     location: 'Hull, UK' },
  { id: 'g8',  src: '/images/coupleslfie.jpg',            alt: 'Wedding couple selfie',              category: 'Weddings',    title: 'Love on the Lens',              location: 'Leeds, UK' },
  { id: 'g9',  src: '/images/eventxdeco.jpg',             alt: 'Event decor setup',                  category: 'Decor',       title: 'ODREG Signature Setup',         location: 'Accra, Ghana',      span: 'wide' },
  { id: 'g10', src: '/images/tabledeco.jpg',              alt: 'Luxury table decoration',            category: 'Decor',       title: 'Presidential Table Setting',    location: 'Hull, UK' },
  { id: 'g11', src: '/images/couplewalk.jpg',             alt: 'Couple walking at wedding',          category: 'Weddings',    title: 'Together We Walk',              location: 'Leeds, UK' },
  { id: 'g12', src: '/images/walldeco.jpg',               alt: 'Wall decoration',                    category: 'Decor',       title: 'Feature Wall Design',           location: 'Hull, UK',          span: 'tall' },
  { id: 'g13', src: '/images/TORGAG Heritage Experience .jpg',   alt: 'TORGAG cultural heritage tour',  category: 'Heritage',    title: 'TORGAG Heritage Experience',    location: 'Ghana',             span: 'wide' },
  { id: 'g14', src: '/images/couplewalkin.jpg',           alt: 'Couple walking in',                  category: 'Weddings',    title: 'Grand Entrance',                location: 'Accra, Ghana' },
  { id: 'g15', src: '/images/eventdeco.jpg',              alt: 'Event decoration',                   category: 'Decor',       title: 'Gold & Ivory Styling',          location: 'Leeds, UK' },
  { id: 'g16', src: '/images/eventmangement.jpg',         alt: 'Event management team',              category: 'Corporate',   title: 'ODREG Team in Action',          location: 'Hull, UK' },
  { id: 'g17', src: '/images/weddinganniversary1.jpg',    alt: 'Wedding anniversary celebration',    category: 'Celebrations', title: 'Diamond Anniversary Gala',     location: 'Hull, UK',          span: 'tall' },
  { id: 'g18', src: '/images/nicedeco.jpg',               alt: 'Luxury event decor',                 category: 'Decor',       title: 'Champagne & Gold Centrepiece',  location: 'Leeds, UK' },
  { id: 'g19', src: '/images/Traditional Rites .jpg',      alt: 'Traditional rites ceremony',         category: 'Traditional', title: 'Sacred Traditional Rites',      location: 'Accra, Ghana' },
  { id: 'g20', src: '/images/tabledeco3.jpg',             alt: 'Table centrepiece decor',            category: 'Decor',       title: 'Bespoke Centrepiece',           location: 'Hull, UK',          span: 'wide' },
  { id: 'g21', src: '/images/beachdeco.jpg',              alt: 'Beach event decoration',             category: 'Decor',       title: 'Beach Ceremony Styling',        location: 'Ghana' },
  { id: 'g22', src: '/images/walkwaydeco.jpg',            alt: 'Decorated walkway',                  category: 'Decor',       title: 'Royal Walkway Installation',    location: 'Accra, Ghana' },
  { id: 'g23', src: '/images/TORGAG Heritage Experience 3.jpg', alt: 'ODREG Ghana heritage operations',  category: 'Heritage',    title: 'Our Ghana Operations',          location: 'Accra, Ghana' },
  { id: 'g24', src: '/images/grassdeco.jpg',              alt: 'Outdoor grass decoration',           category: 'Decor',       title: 'Garden Grounds Styling',        location: 'Leeds, UK' },
  { id: 'g25', src: '/images/glassimage.jpg',             alt: 'Event glass decor detail',           category: 'Decor',       title: 'Crystal Table Details',         location: 'Hull, UK' },
  { id: 'g26', src: '/images/groundsdeco.jpg',            alt: 'Grounds decoration',                 category: 'Decor',       title: 'Outdoor Event Grounds',         location: 'Leeds, UK',         span: 'wide' },
  { id: 'g27', src: '/images/Our UK Operations .jpg',      alt: 'ODREG UK operations team',           category: 'Heritage',    title: 'Our UK Operations',             location: 'Hull, UK' },
];

const GALLERY_CATEGORIES = ['All', 'Weddings', 'Corporate', 'Decor', 'Traditional', 'Celebrations', 'Heritage'];

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const ChevronLeft = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);
const ChevronRight = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(g => g.category === activeCategory);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setImageLoaded(false);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setImageLoaded(false);
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setImageLoaded(false);
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, closeLightbox, prev, next]);

  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  const currentItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ background: 'var(--noir)', minHeight: '55vh' }}>
        <img
          src="/images/Traditional marriage Rites3.jpg"
          alt="ODREG Event Gallery"
          className="absolute inset-0 w-full h-full object-cover opacity-35 animate-slow-zoom"
          fetchPriority="high"
        onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
          />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--noir) 30%, transparent)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-40 w-full">
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <span className="w-10 h-px" style={{ background: 'var(--gold)' }} />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold" style={{ color: 'var(--gold)' }}>Event Photography</span>
          </div>
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl text-white leading-none mb-5 animate-fade-up">
            Event <span className="italic" style={{ color: 'var(--gold)' }}>Gallery</span>.
          </h1>
          <p className="text-white/50 text-lg max-w-xl font-light leading-relaxed animate-fade-up stagger-2">
            A visual celebration of our finest events — from intimate ceremonies to grand galas across UK and Ghana.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[68px] z-30 border-b" style={{ background: 'var(--cream)', borderColor: 'var(--sand)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {GALLERY_CATEGORIES.map(cat => (
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
              </button>
            ))}
            <span className="ml-auto text-[10px] uppercase tracking-widest flex-shrink-0 pl-6" style={{ color: 'var(--warm-gray)' }}>
              {filtered.length} photos
            </span>
          </div>
        </div>
      </div>

      {/* Masonry grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gridAutoRows: '280px',
            gridAutoFlow: 'dense',
          }}
        >
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              className="group relative overflow-hidden cursor-pointer img-zoom-container"
              onClick={() => openLightbox(idx)}
              style={{
                gridColumn: item.span === 'wide' ? 'span 2' : 'span 1',
                gridRow: item.span === 'tall' ? 'span 2' : 'span 1',
                background: 'var(--beige)',
                animation: 'fadeIn 0.5s ease forwards',
                animationDelay: `${idx * 30}ms`,
                opacity: 0,
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Category pill */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest backdrop-blur-sm" style={{ background: 'rgba(212,180,131,0.9)', color: 'var(--noir)' }}>
                  {item.category}
                </span>
              </div>

              {/* Expand icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-400 opacity-0 group-hover:opacity-100">
                <p className="font-serif text-white text-sm font-bold leading-tight">{item.title}</p>
                {item.location && <p className="text-white/60 text-[10px] uppercase tracking-wider mt-1">{item.location}</p>}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-32">
            <p className="font-serif text-3xl mb-4" style={{ color: 'var(--charcoal)' }}>No photos found.</p>
            <button onClick={() => setActiveCategory('All')} className="text-xs font-bold uppercase tracking-widest hover:underline" style={{ color: 'var(--gold)' }}>
              Show All Photos
            </button>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="py-24 text-center px-4" style={{ background: 'var(--beige)' }}>
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-4" style={{ color: 'var(--gold)' }}>Create Your Story</p>
        <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight" style={{ color: 'var(--charcoal)' }}>
          Your Event Could Be<br />
          <span className="italic" style={{ color: 'var(--gold)' }}>Next on This Wall</span>.
        </h2>
        <p className="max-w-xl mx-auto text-sm leading-relaxed mb-10" style={{ color: 'var(--warm-gray)' }}>
          Let us create an event experience so beautiful it deserves to be remembered. Book your free consultation today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/book"
            className="inline-flex items-center gap-3 px-10 py-4 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all btn-press"
            style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', color: 'var(--navy-dark)' }}
          >
            Book Consultation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-3 px-10 py-4 border-2 font-bold text-xs uppercase tracking-widest transition-all"
            style={{ borderColor: 'var(--charcoal)', color: 'var(--charcoal)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--charcoal)'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--charcoal)'; }}
          >
            View Case Studies
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && currentItem && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(36,59,83,0.97)', backdropFilter: 'blur(20px)' }}
          onClick={e => { if (e.target === lightboxRef.current) closeLightbox(); }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full text-white/60 hover:text-white transition-colors z-10"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            aria-label="Close"
          >
            <CloseIcon />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 text-white/40 text-sm font-mono z-10">
            {lightboxIndex + 1} / {filtered.length}
          </div>

          {/* Keyboard hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/25 text-[10px] uppercase tracking-widest z-10">
            ← → Arrow keys to navigate · Esc to close
          </div>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 p-3 rounded-full text-white/50 hover:text-white transition-colors z-10"
            style={{ background: 'rgba(255,255,255,0.08)' }}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>

          {/* Image */}
          <div className="relative max-w-5xl w-full mx-16 flex flex-col items-center">
            <div className="relative w-full" style={{ maxHeight: '75vh' }}>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-t-gold rounded-full animate-spin" style={{ borderColor: 'rgba(255,255,255,0.15)', borderTopColor: 'var(--gold)' }} />
                </div>
              )}
              <img
                key={currentItem.id}
                src={currentItem.src}
                alt={currentItem.alt}
                onLoad={() => setImageLoaded(true)}
                className="w-full h-full object-contain transition-opacity duration-300"
                style={{ maxHeight: '75vh', opacity: imageLoaded ? 1 : 0 }}
              />
            </div>
            <div className="mt-5 text-center">
              <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest mb-3 inline-block" style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', color: 'var(--navy-dark)' }}>
                {currentItem.category}
              </span>
              <h3 className="font-serif text-xl text-white font-bold mt-2">{currentItem.title}</h3>
              {currentItem.location && <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{currentItem.location}</p>}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-4 md:right-8 p-3 rounded-full text-white/50 hover:text-white transition-colors z-10"
            style={{ background: 'rgba(255,255,255,0.08)' }}
            aria-label="Next"
          >
            <ChevronRight />
          </button>

          {/* Thumbnails strip */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-md px-4">
            {filtered.slice(Math.max(0, lightboxIndex - 3), lightboxIndex + 4).map((item, i) => {
              const globalIdx = Math.max(0, lightboxIndex - 3) + i;
              return (
                <button
                  key={item.id}
                  onClick={() => { setImageLoaded(false); setLightboxIndex(globalIdx); }}
                  className="flex-shrink-0 w-12 h-12 overflow-hidden transition-all duration-200"
                  style={{ opacity: globalIdx === lightboxIndex ? 1 : 0.4, outline: globalIdx === lightboxIndex ? '2px solid var(--gold)' : 'none', outlineOffset: '2px' }}
                >
                  <img src={item.src} alt="" className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
