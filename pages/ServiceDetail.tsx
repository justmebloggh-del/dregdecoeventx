
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES } from '../constants';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = '/images/eventdeco.jpg';
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="text-center">
          <h1 className="font-serif text-3xl text-charcoal mb-4">Service Not Found</h1>
          <Link to="/services" className="text-gold font-semibold hover:underline">← Return to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--cream)' }}>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden bg-noir">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 animate-slow-zoom"
          onError={handleImgError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
          <span className="text-5xl block mb-6">{service.icon}</span>
          <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-3">ODREG Signature Service</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight max-w-3xl">{service.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-gold" />
                <h2 className="font-serif text-2xl text-charcoal">Overview</h2>
              </div>
              <p className="text-lg text-warm-gray leading-relaxed">{service.fullContent}</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-beige p-8 border-l-4 border-gold">
                <h3 className="font-bold text-sm uppercase tracking-widest text-charcoal mb-6">Our Process</h3>
                <ul className="space-y-4">
                  {[
                    'Initial Consultation & Vision Discovery',
                    'Strategic Planning & Budget Allocation',
                    'Vendor Management & Design Execution',
                    'Final Delivery & On-Site Management',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-serif text-gold font-bold flex-shrink-0">0{i + 1}.</span>
                      <p className="text-warm-gray text-sm">{step}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-noir p-8 text-white">
                <h3 className="font-bold text-sm uppercase tracking-widest text-gold mb-6">The ODREG Edge</h3>
                <ul className="space-y-3 text-sm text-white/60">
                  {[
                    'UK-Ghana Integrated Workflow',
                    'Multi-Currency Budgeting',
                    'Cultural Sensitivity Experts',
                    '24/7 Support for Premium Clients',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Other services */}
            <section>
              <h3 className="font-serif text-2xl text-charcoal mb-6">Explore Other Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.filter(s => s.id !== id).slice(0, 4).map(s => (
                  <Link
                    key={s.id}
                    to={`/services/${s.id}`}
                    className="flex items-center gap-4 p-4 bg-white border border-sand hover:border-gold transition-all group"
                  >
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <p className="font-semibold text-sm text-charcoal group-hover:text-gold transition-colors">{s.title}</p>
                      <p className="text-xs text-warm-gray line-clamp-1">{s.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-noir text-white p-10">
                <h3 className="font-serif text-2xl mb-4 text-white">Enquire Today</h3>
                <p className="text-white/60 mb-8 text-sm leading-relaxed">
                  Ready to bring this service to your next event? Contact our consultants in Hull or Accra for a bespoke proposal.
                </p>
                <Link
                  to="/contact"
                  state={{ selectedService: service.title }}
                  className="block w-full bg-gold text-noir text-center font-bold py-4 hover:bg-gold-light transition-colors uppercase text-xs tracking-widest btn-press"
                >
                  Book "{service.title}"
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

              <div className="bg-beige p-6 border border-sand">
                <p className="text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-4">Also see</p>
                <Link to="/portfolio" className="flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-gold transition-colors">
                  View our Portfolio →
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

export default ServiceDetail;
