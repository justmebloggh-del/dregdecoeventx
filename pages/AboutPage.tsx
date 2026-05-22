
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TEAM } from '../constants';

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

const AboutPage: React.FC = () => {
  const story = useIntersection();
  const stats = useIntersection();
  const values = useIntersection();
  const team = useIntersection();
  const partnership = useIntersection();

  const coreValues = [
    { icon: '⚖️', title: 'Integrity', text: 'Transparent sourcing, honest pricing and clear vendor relationships. We believe in business that builds trust, not just transactions.' },
    { icon: '🎭', title: 'Cultural Mastery', text: 'Deep expertise in both British etiquette and Ghanaian traditional rites. We honour both with equal pride and precision.' },
    { icon: '🎯', title: 'Precision', text: 'Timeline-driven coordination, meticulous attention to detail, and an uncompromising standard of finish in every piece and every event.' },
    { icon: '🌱', title: 'Sustainability', text: 'Ethically sourced from artisan cooperatives. We ensure fair wages, sustainable materials and positive impact in every community we work with.' },
    { icon: '✨', title: 'Craftsmanship', text: 'Every product is handmade by skilled artisans. We celebrate the imperfection that comes from the human hand — it is what makes each piece unique.' },
    { icon: '🤝', title: 'Community', text: 'We are proudly rooted in the UK-Ghana diaspora community. Our business is a bridge — cultural, economic and social.' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--cream)' }}>

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden bg-noir">
        <img
          src="/images/philosophy.jpg"
          alt="ODREG luxury interior"
          className="absolute inset-0 w-full h-full object-cover opacity-55 animate-slow-zoom"
          fetchPriority="high"
        onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
          />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
          <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4 animate-fade-in">Est. Premium Services</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-none animate-fade-up">
            Our <span className="italic text-gold">Story</span>.
          </h1>
        </div>
      </section>

      {/* Company story */}
      <section ref={story.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className={`transition-all duration-1000 ${story.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6">Who We Are</p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-8 leading-tight">
                Our <span className="italic text-gold">Story</span>.
              </h2>
              <div className="space-y-5 text-warm-gray leading-relaxed text-justify">
                <p>
                  Odreg Decor &amp; Eventx Services is a professional and creative team of event management specialists. We have a combined experience of over a decade producing high-quality events of every type and scale. Our passion lies in managing both the behind-the-scenes and on-the-scenes details to deliver a superior event experience for your audience. We thrive on delighting you — our valued customer — by helping you host events that meet or exceed your goals.
                </p>
                <p>
                  Our services extend both locally and internationally.
                </p>
                <p>
                  Our clients are our cherished hallmark; hence, providing intriguing, innovative, and remarkable service remains our focus. We are well-positioned to deliver services aligned with the expectations of our clients while creating a memorable and lasting working relationship.
                </p>
                <p>
                  Over the years, combined with best event management practices and strong human resource capabilities, we have assisted numerous individuals, professional associations, organizations, and non-governmental institutions with our outstanding services.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 mt-10 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-gold transition-colors hover-underline"
              >
                Get in Touch →
              </Link>
            </div>

            <div className={`transition-all duration-1000 delay-200 ${story.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] overflow-hidden bg-beige">
                    <img
                      src="/images/Our UK Operations.jpg"
                      alt="UK operations"
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="bg-noir p-5 text-center">
                    <p className="text-gold text-[10px] uppercase tracking-widest font-bold">United Kingdom</p>
                    <p className="text-white/60 text-xs mt-1">Kingston upon Hull</p>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="bg-gold p-5 text-center">
                    <p className="text-noir text-[10px] uppercase tracking-widest font-bold">Ghana</p>
                    <p className="text-noir/60 text-xs mt-1">Greater Accra</p>
                  </div>
                  <div className="aspect-[3/4] overflow-hidden bg-beige">
                    <img
                      src="/images/TORGAG Heritage Experience 3.jpg"
                      alt="Ghana heritage"
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section ref={stats.ref} className="py-20 bg-beige px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '15+', label: 'Years of Excellence' },
              { value: '500+', label: 'Events Curated' },
              { value: '2,000+', label: 'Happy Clients' },
              { value: '10', label: 'Core Services' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`text-center p-8 bg-white border border-sand transition-all duration-700 ${stats.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="font-serif text-4xl text-gold font-bold mb-2">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-warm-gray">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={values.ref} className="py-24 md:py-32 bg-noir px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-700 ${values.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4">What We Stand For</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">The ODREG <span className="italic text-gold">Pillars</span>.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {coreValues.map((val, i) => (
              <div
                key={i}
                className={`bg-noir p-10 group hover:bg-white/5 transition-all duration-500 ${values.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-4xl block mb-6 group-hover:scale-110 transition-transform duration-300">{val.icon}</span>
                <h3 className="font-serif text-xl text-white mb-4">{val.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={team.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${team.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4">The People Behind ODREG</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Meet the <span className="italic text-gold">Team</span>.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <div
                key={member.id}
                className={`group bg-white border border-sand hover:border-gold/20 hover:shadow-lg transition-all duration-500 ${team.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-beige">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif text-lg font-bold text-charcoal">{member.name}</h3>
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 ${member.country === 'Both' ? 'bg-gold/10 text-gold' : member.country === 'UK' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-700'}`}>
                      {member.country === 'Both' ? 'UK & GH' : member.country}
                    </span>
                  </div>
                  <p className="text-[10px] text-gold font-bold uppercase tracking-wider mb-3">{member.role}</p>
                  <p className="text-warm-gray text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TORGAG Partnership */}
      <section ref={partnership.ref} className="py-24 md:py-32 bg-beige px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${partnership.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="aspect-[4/3] overflow-hidden bg-beige">
              <img
                src="/images/TORGAG Heritage Experience .jpg"
                alt="TORGAG partnership"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6">Strategic Partnership</p>
              <h2 className="font-serif text-4xl text-charcoal mb-6 leading-tight">
                In Partnership with<br />
                <span className="italic text-gold">TORGAG Ghana</span>.
              </h2>
              <p className="text-warm-gray leading-relaxed mb-5">
                Our exclusive collaboration with TORGAG — the Tourism Research and Guide Association of Ghana — allows us to offer unparalleled cultural and heritage tour experiences alongside our decor and event services.
              </p>
              <p className="text-warm-gray leading-relaxed mb-8">
                Through TORGAG, we connect clients with certified local guides, authentic cultural immersion, and heritage sites across Ghana — from the Kente weaving villages of Bonwire to the Cape Coast Castle and beyond.
              </p>
              <Link
                to="/services/tour-management"
                className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-gold transition-colors hover-underline"
              >
                Explore Tour Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-noir text-center px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6">Begin the Conversation</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">
            Ready to work<br />
            <span className="italic text-gold">together?</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/book" className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-noir font-bold text-xs uppercase tracking-widest hover:bg-gold-light transition-all duration-300 btn-press">
              Book Consultation
            </Link>
            <Link to="/services" className="inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:border-gold hover:text-gold transition-all duration-300">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
