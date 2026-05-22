
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PORTFOLIO } from '../constants';

const PortfolioDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = PORTFOLIO.find(p => p.id === id);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = '/images/eventxdeco.jpg';
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="text-center">
          <h1 className="font-serif text-3xl text-charcoal mb-4">Project Not Found</h1>
          <Link to="/portfolio" className="text-gold font-semibold hover:underline">← Return to Portfolio</Link>
        </div>
      </div>
    );
  }

  const carouselImages = project.images.slice(1);

  const nextSlide = () => setCurrentSlide(prev => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? carouselImages.length - 1 : prev - 1));

  return (
    <div style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen pb-24">
      {/* Hero */}
      <div className="bg-noir pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Case Study · {project.category}</p>
          <h1 className="font-serif text-4xl md:text-7xl text-white font-bold mb-6 leading-tight">{project.title}</h1>
          <div className="flex justify-center items-center gap-6 text-white/40 text-xs uppercase tracking-widest">
            <span>📍 {project.location}</span>
            <span className="w-1 h-1 bg-gold rounded-full" />
            <span>Premium Execution</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Featured image */}
            <div className="overflow-hidden bg-beige aspect-video">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={handleImgError}
              />
            </div>

            {/* Story */}
            <div className="bg-white border border-sand p-10 md:p-14">
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-12 bg-gold" />
                <h2 className="font-serif text-3xl text-charcoal">The Journey</h2>
              </div>
              <p className="text-warm-gray leading-relaxed text-lg font-light">{project.fullStory}</p>
            </div>

            {/* Gallery carousel */}
            {carouselImages.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-charcoal">Gallery Showcase</h3>
                <div className="relative group overflow-hidden bg-noir aspect-video md:aspect-[21/9]">
                  <div
                    className="flex h-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {carouselImages.map((img, idx) => (
                      <div key={idx} className="w-full h-full flex-shrink-0">
                        <img
                          src={img}
                          alt={`${project.title} gallery ${idx + 1}`}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          onError={handleImgError}
                        />
                      </div>
                    ))}
                  </div>

                  {carouselImages.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-noir/60 backdrop-blur-sm text-gold border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-noir transition-all duration-300 -translate-x-16 group-hover:translate-x-0"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-noir/60 backdrop-blur-sm text-gold border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-noir transition-all duration-300 translate-x-16 group-hover:translate-x-0"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {carouselImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-8 bg-gold' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Back link */}
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-gold transition-colors hover-underline"
            >
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
              Back to Portfolio
            </Link>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Event specs */}
              <div className="bg-white border border-sand border-t-4 border-t-gold p-8">
                <h3 className="font-bold text-xs uppercase tracking-widest text-charcoal mb-6">Event Specs</h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-warm-gray font-bold mb-1">Category</p>
                    <p className="font-serif text-charcoal">{project.category}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-warm-gray font-bold mb-1">Location</p>
                    <p className="font-serif text-charcoal">{project.location}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-warm-gray font-bold mb-1">Delivery</p>
                    <p className="font-serif text-gold font-semibold">Premium Execution</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-noir text-white p-10">
                <h3 className="font-serif text-2xl mb-3 text-white">Want something similar?</h3>
                <p className="text-white/50 text-sm mb-8 leading-relaxed">
                  Let's bring your vision to life. Contact our team in Hull or Accra for a bespoke proposal.
                </p>
                <Link
                  to="/contact"
                  state={{ selectedService: project.category }}
                  className="block w-full bg-gold text-noir text-center font-bold py-4 hover:bg-gold-light transition-colors uppercase text-xs tracking-widest btn-press"
                >
                  Start Your Project
                </Link>
                <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-white/60">
                    <span className="text-gold font-bold w-6">UK</span>
                    <a href="tel:+447442852562" className="hover:text-gold transition-colors">+44 7442 852562</a>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/60">
                    <span className="text-gold font-bold w-6">GH</span>
                    <a href="tel:+233202350250" className="hover:text-gold transition-colors">+233 202 350250</a>
                  </div>
                </div>
              </div>

              {/* Also see */}
              <div className="bg-beige border border-sand p-6">
                <p className="text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-4">Also see</p>
                <Link to="/services" className="flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-gold transition-colors">
                  Our Services →
                </Link>
                <Link to="/shop" className="flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-gold transition-colors mt-3">
                  Shop our Decor →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;
