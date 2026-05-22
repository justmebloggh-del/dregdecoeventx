
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO, INSTAGRAM_URL, FACEBOOK_URL, TIKTOK_URL, WHATSAPP_LINK } from '../constants';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    const subs = JSON.parse(localStorage.getItem('odreg_subscribers') || '[]');
    subs.push({ email, date: new Date().toISOString() });
    localStorage.setItem('odreg_subscribers', JSON.stringify(subs));
    setSubscribed(true);
    setEmail('');
  };

  const eventLinks = [
    { label: 'Weddings', to: '/weddings' },
    { label: 'Corporate Events', to: '/corporate' },
    { label: 'Traditional Ceremonies', to: '/services/event-planning' },
    { label: 'Milestone Celebrations', to: '/services/decoration' },
    { label: 'Heritage Tours', to: '/services/tour-management' },
    { label: 'All Services', to: '/services' },
  ];

  const companyLinks = [
    { label: 'About ODREG', to: '/about' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Event Gallery', to: '/gallery' },
    { label: 'Blog & Inspiration', to: '/blog' },
    { label: 'Book Consultation', to: '/book' },
    { label: 'Contact Us', to: '/contact' },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      url: INSTAGRAM_URL,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: FACEBOOK_URL,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: TIKTOK_URL,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.05.58-.02 1.15.11 1.71.21.72.7 1.35 1.34 1.73.68.42 1.5.55 2.29.42 1.05-.12 2.01-.84 2.44-1.79.16-.39.24-.81.24-1.23.01-3.65-.02-7.3.03-10.95z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: WHATSAPP_LINK,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      )
    }
  ];

  return (
    <footer style={{ background: 'var(--noir)' }} className="text-white">

      {/* CTA band */}
      <div style={{ background: 'var(--gold)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-1" style={{ color: 'rgba(36,59,83,0.55)' }}>Ready to Begin?</p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold" style={{ color: 'var(--noir)' }}>
                Your extraordinary event starts here.
              </h3>
            </div>
            <Link
              to="/book"
              className="flex-shrink-0 px-8 py-4 font-bold text-xs uppercase tracking-widest btn-luxury btn-press transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)', color: 'var(--gold)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)'; }}
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-3" style={{ color: 'var(--gold)' }}>Join Our Inner Circle</p>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-3">
                Elevate your inbox.<br />
                <span className="italic" style={{ color: 'var(--gold)' }}>Event inspiration, first.</span>
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
                Exclusive event trends, luxury styling guides, cultural insights, and first-access to our availability — delivered directly to you.
              </p>
            </div>
            <div>
              {subscribed ? (
                <div className="flex items-center gap-4 p-6 border" style={{ borderColor: 'rgba(212,180,131,0.2)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212,180,131,0.1)' }}>
                    <svg className="w-5 h-5" style={{ color: 'var(--gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">You're in the inner circle.</p>
                    <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>Expect exclusive insights in your inbox.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-5 py-4 text-white placeholder-warm-gray text-sm outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--gold)'}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-4 font-bold text-xs uppercase tracking-widest flex-shrink-0 btn-press hover:bg-gold-light transition-colors"
                    style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', color: 'var(--navy-dark)' }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-6 logo-img-wrap group" aria-label="ODREG Home">
              <img
                src="/images/odc_logo_transparent.png"
                alt="ODREG Deco & Eventx"
                className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.05]"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--warm-gray)' }}>
              Premier luxury event management and decoration company. Bridging the United Kingdom and Ghana with elegance and precision since 2010.
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>
              "From Concept to Celebration, Delivered with Precision."
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--warm-gray)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--noir)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--warm-gray)'; }}
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6" style={{ color: 'var(--gold)' }}>Events</h4>
            <ul className="space-y-3">
              {eventLinks.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm hover:text-white transition-colors hover-underline" style={{ color: 'var(--warm-gray)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6" style={{ color: 'var(--gold)' }}>Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm hover:text-white transition-colors hover-underline" style={{ color: 'var(--warm-gray)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6" style={{ color: 'var(--gold)' }}>Contact</h4>
            <div className="space-y-5 text-sm" style={{ color: 'var(--warm-gray)' }}>
              <div>
                <p className="font-semibold text-xs uppercase tracking-wider mb-1 text-white">United Kingdom</p>
                <p className="leading-relaxed text-xs mb-1">{CONTACT_INFO.address}</p>
                <a href="tel:+447442852562" className="transition-colors hover:text-gold-light" style={{ color: 'var(--gold)' }}>+44 7442 852 562</a>
              </div>
              <div>
                <p className="font-semibold text-xs uppercase tracking-wider mb-1 text-white">Ghana</p>
                <p className="text-xs mb-1">Greater Accra Operations HQ</p>
                <a href="tel:+233202350250" className="transition-colors hover:text-gold-light" style={{ color: 'var(--gold)' }}>+233 202 350 250</a>
              </div>
              <div>
                <p className="font-semibold text-xs uppercase tracking-wider mb-1 text-white">Email</p>
                <a href={`mailto:${CONTACT_INFO.email}`} className="transition-colors hover:text-gold-light break-all" style={{ color: 'var(--gold)' }}>
                  {CONTACT_INFO.email}
                </a>
              </div>
              <Link
                to="/book"
                className="inline-block px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 mt-2"
                style={{ border: '1px solid rgba(212,180,131,0.4)', color: 'var(--gold)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--gold)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--noir)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'; }}
              >
                Book Consultation →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications / trust bar */}
      <div className="border-t border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              '15+ Years Experience',
              '500+ Events Delivered',
              'UK & Ghana Operations',
              'TORGAG Certified Partner',
              'Licensed Event Company',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full" style={{ background: 'var(--gold)' }} />
                <span className="text-[9px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--warm-gray)' }}>
            © {new Date().getFullYear()} ODREG DECO & EVENTX SERVICES. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs" style={{ color: 'var(--warm-gray)' }}>
            <Link to="/admin" className="hover:text-white transition-colors">Admin</Link>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-gold transition-colors">
              ↑ Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
