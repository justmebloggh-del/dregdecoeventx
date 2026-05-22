
import React, { useState, useEffect } from 'react';

const NewsletterPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const dismissed = localStorage.getItem('odreg_newsletter_dismissed');
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem('odreg_newsletter_dismissed', 'true');
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    // Store subscription
    const subs = JSON.parse(localStorage.getItem('odreg_subscribers') || '[]');
    subs.push({ email, date: new Date().toISOString() });
    localStorage.setItem('odreg_subscribers', JSON.stringify(subs));
    setSubmitted(true);
    setTimeout(() => {
      setVisible(false);
      localStorage.setItem('odreg_newsletter_dismissed', 'true');
    }, 3000);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4 popup-overlay"
      style={{ background: 'rgba(36,59,83,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="popup-box w-full max-w-lg overflow-hidden relative" style={{ background: 'var(--ivory)', boxShadow: '0 30px 80px rgba(36,59,83,0.25), 0 0 0 1px rgba(212,180,131,0.2)' }}>
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-warm-gray hover:text-charcoal transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="hidden sm:block relative h-64 sm:h-auto">
            <img
              src="/images/halldeco.jpg"
              alt="Luxury interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-noir/30" />
            <div className="absolute inset-0 flex items-end p-6">
              <p className="font-serif text-white text-2xl italic leading-snug">
                Elevate your space.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            {submitted ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-charcoal mb-2">You're in the circle.</h3>
                <p className="text-sm text-warm-gray">Welcome to the ODREG inner circle. Expect exclusive event insights in your inbox.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-3">Join Our Inner Circle</p>
                  <h3 className="font-serif text-2xl sm:text-3xl text-charcoal mb-3 leading-tight">
                    Event Inspiration.<br className="hidden sm:block" /> First Access.
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed">
                    Get exclusive luxury event trends, styling guides, and first access to our consultation availability.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-4 py-3 text-sm text-charcoal outline-none transition-all"
                      style={{ background: 'var(--beige)', border: '1px solid rgba(212,180,131,0.35)', color: 'var(--charcoal)' }}
                    />
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-bold uppercase tracking-widest btn-luxury btn-press transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)', color: 'var(--ivory)' }}
                  >
                    Join the Inner Circle
                  </button>
                </form>

                <button
                  onClick={dismiss}
                  className="mt-4 text-xs text-warm-gray hover:text-charcoal transition-colors text-center w-full"
                >
                  Maybe later
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
