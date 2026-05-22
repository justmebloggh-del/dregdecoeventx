
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';

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

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  budget: string;
  location: string;
  hearAboutUs: string;
  message: string;
}

const eventTypes = [
  'Wedding — White/Civil',
  'Wedding — Traditional Ceremony',
  'Wedding — Full Package (Both)',
  'Corporate Awards Gala',
  'Corporate Product Launch',
  'Corporate Conference',
  'Milestone Celebration (Birthday/Anniversary)',
  'Private Dining / Supper Club',
  'Heritage / Cultural Tour',
  'Other — please describe below',
];

const budgetRanges = [
  'Under £2,500',
  '£2,500 – £5,000',
  '£5,000 – £10,000',
  '£10,000 – £25,000',
  '£25,000 – £50,000',
  '£50,000+',
  'Not sure yet',
];

const whyChooseUs = [
  { icon: '⚡', title: '48hr Response', desc: 'All consultation requests receive a personal response within 48 hours.' },
  { icon: '🎯', title: 'Bespoke Proposals', desc: 'Every proposal is custom-built for your specific event, vision, and budget.' },
  { icon: '🔒', title: 'No Obligation', desc: 'Your initial consultation is completely free with no commitment required.' },
  { icon: '🌍', title: 'UK & Ghana', desc: 'We manage events across both countries with dedicated teams in each location.' },
];

const BookConsultPage: React.FC = () => {
  const formSection = useIntersection();
  const whySection = useIntersection();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    location: '',
    hearAboutUs: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const id = `ODR-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
    const entry = {
      id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.eventType,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      guestCount: formData.guestCount,
      budget: formData.budget,
      location: formData.location,
      hearAboutUs: formData.hearAboutUs,
      message: formData.message,
      date: new Date().toLocaleString(),
      status: 'new' as const,
      type: 'booking' as const,
    };
    const existing = JSON.parse(localStorage.getItem('odreg_messages') || '[]');
    localStorage.setItem('odreg_messages', JSON.stringify([entry, ...existing]));
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const inputClass = "w-full px-4 py-3.5 text-charcoal text-sm outline-none transition-all placeholder-slate";
  const labelClass = "block text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal mb-2";

  return (
    <div style={{ backgroundColor: 'var(--cream)' }}>

      {/* Hero */}
      <section className="relative h-[45vh] min-h-[380px] flex items-end overflow-hidden bg-noir">
        <img
          src="/images/couplewalk.jpg"
          alt="ODREG consultation"
          className="absolute inset-0 w-full h-full object-cover opacity-40 animate-slow-zoom"
          fetchPriority="high"
        onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
          />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
          <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4 animate-fade-in">Free Consultation</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white leading-none animate-fade-up">
            Book Your<br />
            <span className="italic text-gold">Consultation.</span>
          </h1>
        </div>
      </section>

      {/* Why choose us strip */}
      <div className="bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyChooseUs.map(w => (
              <div key={w.title} className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{w.icon}</span>
                <div>
                  <p className="font-bold text-noir text-xs uppercase tracking-wider">{w.title}</p>
                  <p className="text-noir/60 text-xs leading-relaxed mt-0.5 hidden md:block">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form + sidebar */}
      <section ref={formSection.ref} className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Form */}
            <div className={`lg:col-span-2 transition-all duration-700 ${formSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {submitted ? (
                <div className="bg-white border border-gold/30 p-12 text-center shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-3xl text-charcoal mb-4">Request Received.</h2>
                  <p className="text-warm-gray leading-relaxed mb-2">
                    Thank you, <strong>{formData.name}</strong>. Your consultation request has been submitted successfully.
                  </p>
                  <p className="text-warm-gray text-sm mb-8">
                    A member of our team will contact you at <strong>{formData.email}</strong> within 48 hours to arrange your complimentary consultation.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/" className="px-8 py-3 bg-noir text-white text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-noir transition-all">
                      Return Home
                    </Link>
                    <Link to="/portfolio" className="px-8 py-3 border border-charcoal text-charcoal text-xs font-bold uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all">
                      View Our Work
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-2">Step 1</p>
                    <h2 className="font-serif text-3xl text-charcoal mb-8">Your Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Email Address *</label>
                        <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Phone Number *</label>
                        <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="+44 or +233..." className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>How did you hear about us?</label>
                        <select name="hearAboutUs" value={formData.hearAboutUs} onChange={handleChange} className={inputClass}>
                          <option value="">Please select</option>
                          <option>Instagram</option>
                          <option>Facebook</option>
                          <option>TikTok</option>
                          <option>Word of mouth</option>
                          <option>Google search</option>
                          <option>Previous client</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-sand pt-8">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-2">Step 2</p>
                    <h2 className="font-serif text-3xl text-charcoal mb-8">Your Event</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Event Type *</label>
                        <select name="eventType" required value={formData.eventType} onChange={handleChange} className={inputClass}>
                          <option value="">Select event type</option>
                          {eventTypes.map(t => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Preferred Event Date</label>
                        <input name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Expected Guest Count</label>
                        <input name="guestCount" type="text" value={formData.guestCount} onChange={handleChange} placeholder="e.g. 150–200" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Budget Range</label>
                        <select name="budget" value={formData.budget} onChange={handleChange} className={inputClass}>
                          <option value="">Select budget range</option>
                          {budgetRanges.map(b => <option key={b}>{b}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Event Location</label>
                        <input name="location" type="text" value={formData.location} onChange={handleChange} placeholder="City / Country" className={inputClass} />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-sand pt-8">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-2">Step 3</p>
                    <h2 className="font-serif text-3xl text-charcoal mb-8">Tell Us More</h2>
                    <div>
                      <label className={labelClass}>Your Vision & Any Additional Details</label>
                      <textarea
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your dream event — the atmosphere, the style, any specific requirements, cultural elements you wish to incorporate..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-5 bg-gold text-noir font-bold text-xs uppercase tracking-[0.3em] hover:bg-gold-light transition-all duration-300 btn-press disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Submit Consultation Request'}
                  </button>
                  <p className="text-xs text-center text-warm-gray">
                    By submitting this form you agree that ODREG may contact you regarding your enquiry. We never share your data with third parties.
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className={`space-y-8 transition-all duration-700 delay-200 ${formSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-noir p-8 text-white">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4">What Happens Next</p>
                <ol className="space-y-5">
                  {[
                    'We review your request within 24 hours.',
                    'A dedicated consultant contacts you to arrange a call.',
                    'We conduct a free 60-minute discovery consultation.',
                    'You receive a bespoke proposal within 48 hours.',
                  ].map((s, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="font-serif text-gold text-lg font-bold flex-shrink-0 leading-none">{i + 1}</span>
                      <p className="text-white/70 text-sm leading-relaxed">{s}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-8 card-luxury" style={{ background: "var(--ivory)" }}>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4">Contact Directly</p>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-charcoal text-xs uppercase tracking-wider mb-1">United Kingdom</p>
                    <a href="tel:+447442852562" className="text-gold hover:text-gold-dark transition-colors">+44 7442 852 562</a>
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-xs uppercase tracking-wider mb-1">Ghana</p>
                    <a href="tel:+233202350250" className="text-gold hover:text-gold-dark transition-colors">+233 202 350 250</a>
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-xs uppercase tracking-wider mb-1">Email</p>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-gold hover:text-gold-dark transition-colors break-all">{CONTACT_INFO.email}</a>
                  </div>
                </div>
              </div>

              <div className="bg-gold p-8">
                <p className="font-serif text-2xl text-noir font-bold mb-3">100% Free.</p>
                <p className="text-noir/70 text-sm leading-relaxed">
                  Your initial consultation is entirely complimentary and places you under no obligation whatsoever. We want to understand your vision before we talk about anything else.
                </p>
              </div>

              <div className="p-8" style={{ background: "var(--beige)", border: "1px solid rgba(212,180,131,0.2)" }}>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4">Quick Links</p>
                <div className="space-y-2">
                  {[
                    { label: 'Weddings', to: '/weddings' },
                    { label: 'Corporate Events', to: '/corporate' },
                    { label: 'Portfolio', to: '/portfolio' },
                    { label: 'About ODREG', to: '/about' },
                  ].map(l => (
                    <Link key={l.to} to={l.to} className="flex items-center justify-between py-2 border-b border-sand text-sm text-charcoal hover:text-gold transition-colors group">
                      {l.label}
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance section */}
      <section ref={whySection.ref} className="py-20 bg-noir px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {whyChooseUs.map((w, i) => (
              <div
                key={w.title}
                className={`text-center transition-all duration-700 ${whySection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-4xl block mb-4">{w.icon}</span>
                <p className="font-serif text-lg text-white font-bold mb-2">{w.title}</p>
                <p className="text-warm-gray text-xs leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default BookConsultPage;
