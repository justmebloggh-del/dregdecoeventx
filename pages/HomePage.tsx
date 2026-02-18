
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, PORTFOLIO, WHATSAPP_LINK } from '../constants.tsx';

const HomePage: React.FC = () => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    // Premium fallback if image fails
    target.src = "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1920";
  };

  return (
    <div className="bg-[#050505] text-white">
      {/* Floating WhatsApp Concierge */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[60] group flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-[#D4AF37]/30 p-2 rounded-full hover:border-[#D4AF37] transition-all shadow-2xl"
      >
        <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-black shadow-inner gold-shimmer group-hover:scale-110 transition-transform">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>
        <div className="pr-6 overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">
           <p className="text-[10px] uppercase tracking-widest font-black text-white">Direct Consultation</p>
           <p className="text-[9px] text-[#D4AF37] font-bold">Chat with a Specialist</p>
        </div>
      </a>

      {/* Immersive Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1738225734899-30852be7e396?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Luxury Event Atmosphere" 
            className="w-full h-full object-cover brightness-[0.35] scale-105 animate-slow-zoom"
            onError={handleImgError}
          />
        </div>
        
        {/* LIFTED CONTENT TO Z-20 */}
        <div className="relative z-20 text-center px-4 max-w-6xl">
          <div className="mb-10 inline-flex items-center gap-4 py-2 px-6 border border-[#D4AF37]/30 rounded-full bg-black/40 backdrop-blur-xl animate-fade-in">
             <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
             <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold">UK & Ghana Dual Presence</span>
          </div>
          <h1 className="text-7xl md:text-[11rem] font-serif mb-10 leading-none animate-fade-in" style={{ animationDelay: '0.2s' }}>
             Bespoke <br/>
             <span className="gold-gradient italic">Elegance</span>.
          </h1>
          <p className="text-xl md:text-3xl text-zinc-400 mb-16 font-light max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            We architect cultural experiences and corporate excellence across continents. Precise coordination. Bespoke decoration. Elite protocol.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/contact" className="inline-block px-20 py-8 gold-bg text-black font-black uppercase tracking-[0.5em] text-xs hover:scale-105 transition-all shadow-2xl">
              Request Consultation
           </Link>


            <Link to="/portfolio" className="px-12 py-6 border border-white/20 hover:bg-white hover:text-black transition-all backdrop-blur-sm uppercase text-xs tracking-[0.3em] font-bold">
              View Our Legacy
            </Link>
          </div>
        </div>
        
        {/* Decorative elements - kept at z-10 */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* Operational Mastery Section */}
      <section className="py-40 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border border-[#D4AF37]/20 -z-10 group-hover:scale-105 transition-transform duration-700"></div>
            <img 
              src="https://images.unsplash.com/flagged/photo-1620830102229-9db5c00d4afc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              className="w-full h-[650px] object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-1000" 
              alt="Elite Event Setup" 
              onError={handleImgError}
            />
            <div className="absolute -bottom-12 -right-12 p-12 glass-panel hidden md:block">
               <p className="text-7xl font-serif text-[#D4AF37] font-bold">15+</p>
               <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold">Years of Excellence</p>
            </div>
          </div>
          
          <div className="space-y-12">
            <div>
              <p className="text-[#D4AF37] font-black tracking-[0.5em] uppercase text-xs mb-6">Our Philosophy</p>
              <h2 className="text-6xl md:text-8xl font-serif leading-tight">Bridging <span className="italic">Continents</span> with Precision.</h2>
            </div>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
              ODREG DECO & EVENTX SERVICES is more than a planning firm. We are the strategic bridge between the structured logistics of the United Kingdom and the vibrant heart of West African heritage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
               <div className="p-8 glass-panel border-l-2 border-l-[#D4AF37]">
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-4">Kingston upon Hull</h4>
                  <p className="text-xs text-zinc-500 leading-loose">Managing corporate logistics and premium private consultations for our UK and Diaspora clientele.</p>
               </div>
               <div className="p-8 glass-panel border-l-2 border-l-[#D4AF37]">
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-4">Greater Accra</h4>
                  <p className="text-xs text-zinc-500 leading-loose">Specialized in Royal decoration, TORGAG heritage tours, and high-level protocol services.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - High Fashion Layout */}
      <section className="py-40 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32">
            <div className="max-w-2xl">
              <p className="text-[#D4AF37] font-black tracking-[0.5em] uppercase text-xs mb-6">The ODREG Signature</p>
              <h2 className="text-6xl font-serif">A Suite of <span className="italic">Standard</span>.</h2>
            </div>
            <Link to="/services" className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] border-b border-[#D4AF37] pb-2 hover:text-white hover:border-white transition-all mt-8 md:mt-0">
              Explore All Services →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {SERVICES.slice(0, 3).map((service, idx) => (
              <Link key={service.id} to={`/services/${service.id}`} className="group space-y-8">
                <div className="aspect-[4/5] overflow-hidden relative">
                   <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000" onError={handleImgError}/>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                </div>
                <div>
                   <h3 className="text-3xl font-serif mb-4 group-hover:text-[#D4AF37] transition-colors">{service.title}</h3>
                   <p className="text-sm text-zinc-500 leading-relaxed font-light">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
           <h2 className="text-5xl md:text-7xl font-serif italic mb-12">Your Vision. Our Precision.</h2>
           <Link to="/contact" className="inline-block px-20 py-8 gold-bg text-black font-black uppercase tracking-[0.5em] text-xs hover:scale-105 transition-all shadow-2xl">
              Begin Planning
           </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;