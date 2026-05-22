
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CONTACT_INFO, SERVICES, WHATSAPP_LINK, INSTAGRAM_URL, FACEBOOK_URL, TIKTOK_URL } from '../constants';
import { getEventAdvice } from '../services/geminiService';
import { InquiryMessage } from '../types';

const GETFORM_ENDPOINT = '';

const ContactPage: React.FC = () => {
  const location = useLocation();
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const [showPreFilledNotice, setShowPreFilledNotice] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: SERVICES[0]?.title || '',
    message: ''
  });

  useEffect(() => {
    if (location.state?.selectedService) {
      setFormData(prev => ({ ...prev, service: location.state.selectedService }));
      setShowPreFilledNotice(true);
      const t = setTimeout(() => setShowPreFilledNotice(false), 5000);
      return () => clearTimeout(t);
    }
  }, [location]);

  const handleChat = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setIsLoading(true);
    setChatResponse(null);
    const res = await getEventAdvice(chatInput);
    setChatResponse(res ?? null);
    setIsLoading(false);
  };

  const handleFormSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const inquiryId = `ODR-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
    const newInquiry: InquiryMessage = {
      id: inquiryId,
      ...formData,
      date: new Date().toLocaleString(),
      status: 'new',
      type: 'inquiry',
    };
    try {
      const existing = JSON.parse(localStorage.getItem('odreg_messages') || '[]');
      localStorage.setItem('odreg_messages', JSON.stringify([newInquiry, ...existing]));
      if (GETFORM_ENDPOINT) {
        const r = await fetch(GETFORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...formData, reference_id: inquiryId, submitted_at: newInquiry.date })
        });
        if (!r.ok) throw new Error('Getform error');
      }
      setRefId(inquiryId);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Email service temporarily unavailable, but your message has been saved securely.');
      setRefId(inquiryId);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { name: 'Instagram', url: INSTAGRAM_URL },
    { name: 'Facebook', url: FACEBOOK_URL },
    { name: 'TikTok', url: TIKTOK_URL },
    { name: 'WhatsApp', url: WHATSAPP_LINK },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-32" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="max-w-lg w-full bg-white p-12 text-center border-t-4 border-gold shadow-xl">
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
          </div>
          <h2 className="font-serif text-4xl text-charcoal mb-4">Inquiry Received</h2>
          {error && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded">
              {error}
            </div>
          )}
          <p className="text-warm-gray mb-8 leading-relaxed">
            Thank you for reaching out to ODREG. Our consultants will review your request and respond within 24 hours.
          </p>
          <div className="bg-beige p-5 mb-8">
            <p className="text-[10px] uppercase tracking-widest text-warm-gray mb-1">Reference Number</p>
            <p className="font-serif text-2xl text-gold font-bold">{refId}</p>
          </div>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-10 py-4 bg-noir text-white font-bold text-xs uppercase tracking-widest hover:bg-gold transition-all duration-300 btn-press"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">
      {/* Header */}
      <div className="bg-beige border-b border-sand pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4">Get in Touch</p>
          <h1 className="font-serif text-5xl md:text-7xl text-charcoal leading-none">
            Let's Talk<br /><span className="italic text-gold">Elegance</span>.
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Form + Info */}
          <div className="lg:col-span-7 space-y-16">
            {/* Contact details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  region: 'United Kingdom',
                  address: CONTACT_INFO.address,
                  phone: '+44 7442 852 562',
                  email: CONTACT_INFO.email,
                },
                {
                  region: 'Ghana',
                  address: 'Greater Accra Operations HQ',
                  phone: '+233 202 350 250',
                  email: '',
                },
              ].map((office, i) => (
                <div key={i} className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-warm-gray font-bold">{office.region}</p>
                  <p className="font-serif text-xl text-charcoal">{office.address}</p>
                  <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="block text-gold hover:text-gold-dark transition-colors text-sm font-semibold">{office.phone}</a>
                  {office.email && <a href={`mailto:${office.email}`} className="block text-warm-gray hover:text-gold transition-colors text-sm">{office.email}</a>}
                </div>
              ))}
            </div>

            {/* Inquiry form */}
            <form onSubmit={handleFormSubmit} className="bg-white p-10 md:p-14 border border-sand">
              <h3 className="font-serif text-3xl text-charcoal mb-10">Formal Inquiry</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-warm-gray">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                    className="w-full px-4 py-3 border-b-2 border-sand bg-transparent text-charcoal outline-none transition-all text-sm"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-warm-gray">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                    className="w-full px-4 py-3 border-b-2 border-sand bg-transparent text-charcoal outline-none transition-all text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className={`space-y-2 mb-8 p-3 -m-3 rounded transition-all ${showPreFilledNotice ? 'bg-gold/5 ring-1 ring-gold' : ''}`}>
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-warm-gray">Service / Enquiry Type</label>
                  {showPreFilledNotice && <span className="text-[9px] text-gold font-bold uppercase tracking-wider animate-pulse">✨ Pre-selected</span>}
                </div>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={e => setFormData(d => ({ ...d, service: e.target.value }))}
                    className="w-full px-4 py-3 border-b-2 border-sand bg-transparent text-charcoal outline-none text-sm cursor-pointer appearance-none pr-8"
                  >
                    {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                    <option value="Decor Purchase Enquiry">Decor Purchase Enquiry</option>
                    <option value="Bespoke Consultation">Bespoke Consultation</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                  </svg>
                </div>
              </div>

              <div className="space-y-2 mb-10">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-warm-gray">Your Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                  className="w-full px-4 py-3 border-b-2 border-sand bg-transparent text-charcoal outline-none resize-none text-sm"
                  placeholder="Tell us about your project, event or enquiry…"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-noir text-white font-bold text-xs uppercase tracking-widest hover:bg-gold transition-all duration-300 btn-press disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending…' : 'Submit Inquiry'}
              </button>
            </form>

            {/* Socials */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-warm-gray font-bold mb-6">Follow Our Journey</p>
              <div className="flex flex-wrap gap-6">
                {socials.map(s => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-widest text-warm-gray hover:text-gold transition-colors hover-underline"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: WhatsApp + AI */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 self-start">
            {/* WhatsApp */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="border-2 border-[#25D366] p-10 hover:bg-[#25D366] transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-[#25D366] group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                  <svg className="w-8 h-8 text-white group-hover:text-[#25D366] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-charcoal group-hover:text-white transition-colors mb-2">Instant VIP Chat</h3>
                <p className="text-warm-gray group-hover:text-white/80 text-sm transition-colors mb-6">Connect directly with a specialist. No forms, no waiting.</p>
                <span className="inline-block px-8 py-3 border border-[#25D366] text-[#25D366] group-hover:bg-white group-hover:text-[#25D366] text-xs font-bold uppercase tracking-widest transition-all duration-300">
                  Open WhatsApp →
                </span>
              </div>
            </a>

            {/* AI Advisor */}
            <div className="bg-noir text-white p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold font-bold font-serif text-lg">
                  AI
                </div>
                <div>
                  <h3 className="font-serif text-xl text-gold">Golden Advisor</h3>
                  <p className="text-[9px] uppercase tracking-widest text-white/40">AI Event Consultant</p>
                </div>
              </div>
              <form onSubmit={handleChat} className="space-y-4">
                <textarea
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask for instant advice on your event or decor project…"
                  rows={4}
                  className="w-full p-4 bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none resize-none text-sm transition-all"
                />
                <button
                  disabled={isLoading || !chatInput.trim()}
                  className="w-full py-3 bg-gold text-noir font-bold text-xs uppercase tracking-widest hover:bg-gold-light transition-all disabled:opacity-40 disabled:cursor-not-allowed btn-press"
                >
                  {isLoading ? 'Consulting…' : 'Ask the Advisor ✨'}
                </button>
              </form>
              {chatResponse && (
                <div className="mt-6 p-5 bg-white/5 border-l-2 border-gold animate-fade-up">
                  <p className="text-white/80 text-sm leading-relaxed italic whitespace-pre-wrap">{chatResponse}</p>
                </div>
              )}
              <p className="text-[9px] text-white/20 uppercase tracking-wider mt-4 text-center italic">AI advice is conceptual. Contact us for official quotes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
