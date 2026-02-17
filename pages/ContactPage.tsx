
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CONTACT_INFO, SERVICES, WHATSAPP_LINK } from '../constants';
import { getEventAdvice } from '../services/geminiService';
import { InquiryMessage } from '../types';

/**
 * GETFORM INTEGRATION:
 * 1. Create a free account at https://getform.io
 * 2. Create a new form and copy your unique Endpoint URL.
 */
const GETFORM_ENDPOINT = ""; // Paste your Getform URL here for production

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

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Event Planning & Consulting',
    message: ''
  });

  // Handle pre-filled service from navigation state
  useEffect(() => {
    if (location.state && location.state.selectedService) {
      setFormData(prev => ({
        ...prev,
        service: location.state.selectedService
      }));
      setShowPreFilledNotice(true);
      
      const timer = setTimeout(() => setShowPreFilledNotice(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput) return;
    setIsLoading(true);
    const res = await getEventAdvice(chatInput);
    setChatResponse(res);
    setIsLoading(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const inquiryId = `ODR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const newInquiry: InquiryMessage = {
      id: inquiryId,
      ...formData,
      date: new Date().toLocaleString(),
      status: 'new'
    };

    try {
      // 1. Log to local storage for Admin Page functionality
      const existingMessages = JSON.parse(localStorage.getItem('odreg_messages') || '[]');
      localStorage.setItem('odreg_messages', JSON.stringify([newInquiry, ...existingMessages]));

      // 2. Submit to Getform
      if (GETFORM_ENDPOINT) {
        const response = await fetch(GETFORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            reference_id: inquiryId,
            submitted_at: newInquiry.date,
            _subject: `New Event Inquiry: ${formData.service} from ${formData.name}`
          })
        });

        if (!response.ok) {
          throw new Error('Getform service error');
        }
      }

      // Success State
      setRefId(inquiryId);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission Error:", err);
      setError("Email notification service is temporarily unavailable, but your message has been logged in our secure local database.");
      setRefId(inquiryId);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { name: 'Instagram', url: 'https://www.instagram.com/odregdecor_eventx?igsh=MTN2aXcyb2NhZndsaw==', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058-1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    )},
    { name: 'Facebook', url: 'https://www.facebook.com/share/14U53t7HfoY/?mibextid=wwXIfr', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
    )},
    { name: 'TikTok', url: 'https://www.tiktok.com/@odregdecor?_r=1&_t=ZS-93z6KDnMD4f', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.05.58-.02 1.15.11 1.71.21.72.7 1.35 1.34 1.73.68.42 1.5.55 2.29.42 1.05-.12 2.01-.84 2.44-1.79.16-.39.24-.81.24-1.23.01-3.65-.02-7.3.03-10.95z"/></svg>
    )}
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-40 bg-zinc-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white p-12 md:p-20 shadow-2xl text-center border-t-8 border-[#D4AF37]">
          <div className="w-24 h-24 gold-gradient rounded-full mx-auto flex items-center justify-center text-black text-4xl mb-8 shadow-xl">✓</div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-6">Inquiry Received</h2>
          {error ? (
             <div className="mb-8 p-4 bg-amber-50 border border-amber-200 text-amber-800 text-sm italic rounded-sm">
               {error}
             </div>
          ) : (
            <p className="text-zinc-500 mb-8 font-light leading-relaxed text-lg">
              Thank you for reaching out to ODREG. Our consultants will review your request and respond via email within 24 hours.
            </p>
          )}
          <div className="bg-zinc-50 p-6 rounded-sm mb-10 border border-zinc-100">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">Reference Number</p>
             <p className="text-2xl font-serif font-bold text-[#D4AF37]">{refId}</p>
          </div>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-12 py-5 bg-black text-[#D4AF37] font-black uppercase tracking-widest text-xs hover:bg-[#D4AF37] hover:text-black transition-all"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 bg-zinc-50 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
           <div className="max-w-2xl">
              <p className="text-[#D4AF37] font-black tracking-[0.4em] uppercase text-[10px] mb-4">Connectivity</p>
              <h1 className="text-7xl md:text-9xl font-serif font-bold text-black leading-none">Reach <br/><span className="text-[#D4AF37] italic">Out</span>.</h1>
           </div>
           <p className="text-xl text-zinc-500 max-w-sm leading-relaxed font-light mb-4">
             Offices in Kingston upon Hull and Accra. We are globally accessible, locally focused.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* Right Column: AI & WhatsApp */}
          <div className="lg:col-span-5 lg:order-2 space-y-8 sticky top-32">
            {/* VIP WhatsApp Access */}
            <div className="bg-[#D4AF37] p-1 shadow-2xl">
               <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-black p-10 hover:bg-zinc-900 transition-colors group text-center"
               >
                 <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-black shadow-xl gold-shimmer">
                       <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    </div>
                 </div>
                 <h3 className="text-3xl font-serif font-bold text-[#D4AF37] mb-2">Instant VIP Chat</h3>
                 <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-black mb-8">Skip the formalities</p>
                 <span className="inline-block border border-[#D4AF37] text-[#D4AF37] px-8 py-3 text-[10px] font-black uppercase tracking-widest group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                    Start WhatsApp Chat
                 </span>
               </a>
            </div>

            {/* AI Advisor Card */}
            <div className="bg-black text-white p-12 shadow-2xl border-t-8 border-zinc-800">
              <div className="flex items-center gap-6 mb-12">
                 <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center text-black font-black text-xl shadow-inner animate-pulse">
                    AI
                 </div>
                 <div>
                   <h3 className="text-2xl font-serif font-bold text-[#D4AF37]">Golden Advisor</h3>
                   <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-black">AI Strategist</p>
                 </div>
              </div>
              
              <form onSubmit={handleChat} className="space-y-6">
                <textarea 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask for instant event advice..."
                  className="w-full p-6 bg-zinc-900 border border-zinc-800 focus:border-[#D4AF37] text-white outline-none min-h-[140px] transition-all rounded-sm font-light text-sm"
                />
                <button 
                  disabled={isLoading}
                  className="w-full gold-gradient text-black font-black py-4 shadow-lg hover:brightness-110 disabled:opacity-50 uppercase tracking-[0.2em] text-[10px] transition-all"
                >
                  {isLoading ? 'Consulting...' : 'Seek Advice ✨'}
                </button>
              </form>

              {chatResponse && (
                <div className="mt-10 p-8 bg-[#D4AF37]/5 border-l-4 border-[#D4AF37] animate-fade-in">
                  <div className="text-zinc-300 italic whitespace-pre-wrap leading-relaxed font-light text-sm">
                    {chatResponse}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 lg:order-1 space-y-24">
            {/* Address Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
               <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Hull, United Kingdom</h3>
                  <div className="space-y-2">
                    <p className="text-2xl font-serif text-black">{CONTACT_INFO.address}</p>
                    <p className="text-zinc-500 font-light text-sm">Email: odregconsult@gmail.com</p>
                    <p className="text-zinc-500 font-light text-sm">+44 7442 852562</p>
                  </div>
               </div>
               <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Accra, Ghana</h3>
                  <div className="space-y-2">
                    <p className="text-2xl font-serif text-black">Accra Operations HQ</p>
                    <p className="text-zinc-500 font-light text-sm">+233 2023 50250</p>
                  </div>
               </div>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="bg-white p-12 md:p-20 shadow-2xl border border-zinc-100 relative">
              <h3 className="text-4xl font-serif font-bold mb-12 text-black">Formal Inquiry</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400">Full Name</label>
                  <input 
                    required
                    name="name"
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 border-b-2 border-zinc-100 focus:border-black outline-none font-light" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400">Email Address</label>
                  <input 
                    required
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 border-b-2 border-zinc-100 focus:border-black outline-none font-light" 
                  />
                </div>
              </div>
              <div className={`space-y-3 mb-10 transition-all duration-1000 p-4 rounded-sm ${showPreFilledNotice ? 'bg-[#D4AF37]/10 ring-1 ring-[#D4AF37]' : ''}`}>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400">Nature of Event / Service</label>
                    {showPreFilledNotice && (
                      <span className="text-[9px] font-black uppercase text-[#D4AF37] animate-pulse flex items-center gap-1">
                        ✨ Pre-selected
                      </span>
                    )}
                  </div>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full p-4 border-b-2 border-zinc-100 focus:border-black outline-none bg-white font-light cursor-pointer"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Bespoke Consultation">Bespoke Consultation</option>
                  </select>
              </div>
              <div className="space-y-3 mb-12">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400">Your Message</label>
                <textarea 
                  required
                  name="message"
                  rows={5} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-4 border-b-2 border-zinc-100 focus:border-black outline-none font-light resize-none" 
                  placeholder="Tell us about your dream event..."
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-[#D4AF37] font-black py-6 hover:bg-[#D4AF37] hover:text-black transition-all uppercase tracking-[0.4em] text-[10px] disabled:opacity-50 shadow-xl"
              >
                {isSubmitting ? 'Recording Inquiry...' : 'Submit Inquiry'}
              </button>
            </form>

            {/* Footer Socials in Contact */}
            <div className="flex flex-wrap gap-12 pt-12 border-t border-zinc-100">
               {socials.map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-zinc-400 hover:text-black transition-colors group">
                    {social.icon}
                    <span className="text-[10px] font-black uppercase tracking-widest">{social.name}</span>
                  </a>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
