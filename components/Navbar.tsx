
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenuIcon = () => (
  <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const CloseIcon = () => (
  <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const ChevronDown = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const servicesDropdown = [
  { label: 'Weddings', to: '/weddings', icon: '💍' },
  { label: 'Corporate Events', to: '/corporate', icon: '🏆' },
  { label: 'All Services', to: '/services', icon: '✨' },
  { label: 'Gallery', to: '/gallery', icon: '🖼️' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesTimer, setServicesTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const openServices = () => {
    if (servicesTimer) clearTimeout(servicesTimer);
    setServicesOpen(true);
  };
  const closeServicesDelayed = () => {
    const t = setTimeout(() => setServicesOpen(false), 200);
    setServicesTimer(t);
  };

  const navLinks = [
    { name: 'About', to: '/about' },
    { name: 'Blog', to: '/blog' },
    { name: 'Contact', to: '/contact' },
    { name: 'Portfolio', to: '/portfolio' },
  ];

  const isTransparent = isHomePage && !scrolled;
  const navBg = isTransparent
    ? 'bg-transparent'
    : 'backdrop-blur-2xl shadow-luxury-sm border-b';
  const navStyle = isTransparent
    ? {}
    : { backgroundColor: 'rgba(255,253,248,0.96)', borderColor: 'rgba(212,180,131,0.18)' };
  const textColor = isTransparent ? 'text-white' : 'text-charcoal';

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${navBg} ${scrolled ? 'py-3' : 'py-5'}`} style={navStyle}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link to="/" className="logo-link flex-shrink-0 group" aria-label="ODREG Home">
              <div className="logo-entrance logo-img-wrap rounded-sm transition-all duration-500 bg-transparent">
                <img
                  src="/images/odc_logo_transparent.png"
                  alt="ODREG Deco & Eventx"
                  className="h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.05]"
                  fetchPriority="high"
                  onError={e => { (e.target as HTMLImageElement).src = '/images/logo.jpeg'; }}
                />
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-7">
              {/* Home link */}
              <Link
                to="/"
                className={`relative text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors hover-underline ${textColor} hover:text-gold`}
              >
                Home
              </Link>

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={closeServicesDelayed}
              >
                <button
                  onClick={() => setServicesOpen(o => !o)}
                  className={`flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors ${textColor} hover:text-gold`}
                >
                  Services <ChevronDown />
                </button>
                {servicesOpen && (
                  <div
                    onMouseEnter={openServices}
                    onMouseLeave={closeServicesDelayed}
                    className="absolute left-0 top-full mt-3 w-56 overflow-hidden animate-fade-up z-50"
                    style={{ background: 'rgba(255,253,248,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(212,180,131,0.25)', boxShadow: '0 20px 60px rgba(36,59,83,0.15)' }}
                  >
                    {servicesDropdown.map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 px-5 py-3.5 text-charcoal transition-all duration-200 group/item"
                        style={{ borderBottom: '1px solid rgba(212,180,131,0.12)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(212,180,131,0.1)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--navy)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = ''; (e.currentTarget as HTMLAnchorElement).style.color = ''; }}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span className="font-semibold uppercase tracking-widest text-[10px]">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`relative text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors hover-underline ${textColor} hover:text-gold`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/447442852562?text=Hello%20ODREG%2C%20I%27d%20like%20to%20inquire%20about%20your%20event%20services."
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${textColor} hover:text-gold`}
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat
              </a>

              {/* Book Consultation CTA */}
              <Link
                to="/book"
                className="hidden md:block ml-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest btn-luxury btn-press transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', color: 'var(--navy-dark)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)'; }}
              >
                Book Consultation
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(o => !o)}
                className={`lg:hidden p-2 ${textColor} hover:text-gold transition-colors`}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 z-40 mobile-menu ${menuOpen ? 'open' : ''}`}
          style={{ pointerEvents: menuOpen ? 'all' : 'none' }}
        >
          <div className="absolute inset-0 bg-noir/97 backdrop-blur-2xl flex flex-col pt-28 px-8 pb-12">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-gold transition-colors p-2"
            >
              <CloseIcon />
            </button>

            {/* Mobile logo */}
            <div className="absolute top-5 left-6 bg-transparent">
              <img
                src="/images/odc_logo_transparent.png"
                alt="ODREG"
                className="h-8 w-auto object-contain"
                onError={e => { (e.target as HTMLImageElement).src = '/images/logo.jpeg'; }}
              />
            </div>

            <nav className="flex flex-col gap-0 overflow-y-auto flex-1">
              {[
                { name: 'Home', to: '/', tag: '🏠' },
                { name: 'Weddings', to: '/weddings', tag: '💍' },
                { name: 'Corporate Events', to: '/corporate', tag: '🏆' },
                { name: 'All Services', to: '/services', tag: '✨' },
                { name: 'Gallery', to: '/gallery', tag: '🖼️' },
                { name: 'Blog', to: '/blog', tag: '📝' },
                { name: 'About', to: '/about', tag: 'ℹ️' },
                { name: 'Contact', to: '/contact', tag: '📧' },
                { name: 'Portfolio', to: '/portfolio', tag: '📸' },
              ].map((link, i) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-4 border-b text-white hover:text-gold transition-colors"
                  style={{
                    borderColor: 'rgba(255,255,255,0.06)',
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  <span className="font-serif text-2xl">{link.name}</span>
                  <span className="text-xl opacity-40">{link.tag}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-3 pt-6">
              <Link
                to="/book"
                onClick={() => setMenuOpen(false)}
                className="block text-center py-4 font-bold uppercase tracking-widest text-sm btn-press transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', color: 'var(--navy-dark)' }}
              >
                Book Free Consultation
              </Link>
              <a
                href="https://wa.me/447442852562?text=Hello%20ODREG%2C%20I%27d%20like%20to%20inquire%20about%20your%20event%20services."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-3 py-3 border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" style={{ color: '#25D366' }} viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Social links */}
            <div className="mt-4 flex items-center justify-center gap-6">
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/odregdecor_eventx' },
                { name: 'Facebook', url: 'https://www.facebook.com/share/14U53t7HfoY/' },
                { name: 'TikTok', url: 'https://www.tiktok.com/@odregdecor' },
              ].map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                   className="text-[9px] uppercase tracking-widest text-white/30 hover:text-gold transition-colors">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/447442852562?text=Hello%20ODREG%20DECO%2C%20I%20would%20like%20to%20inquire%20about%20your%20event%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl wa-btn"
        style={{ background: '#25D366' }}
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </>
  );
};

export default Navbar;
