
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEventAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'advisor';
  content: string;
}

const ConsultPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setInput('');
    setIsLoading(true);

    const res = await getEventAdvice(query);
    setMessages(prev => [...prev, { role: 'advisor', content: res ?? 'Please contact our consultants directly for assistance.' }]);
    setIsLoading(false);
  };

  const prompts = [
    'Help me plan a Ghanaian traditional wedding in Accra',
    'What décor would suit a corporate gala in Hull?',
    'How much does event coordination typically cost?',
    'Can you suggest luxury centrepieces for a royal ceremony?',
  ];

  return (
    <div style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-noir pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center border border-gold/30">
              <span className="font-serif text-gold font-bold text-lg">AI</span>
            </div>
            <div className="text-left">
              <p className="text-gold font-bold font-serif text-xl">Golden Advisor</p>
              <p className="text-[9px] uppercase tracking-widest text-white/40">ODREG AI Consultant · Always Available</p>
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">
            Your Virtual <span className="italic text-gold">Concierge</span>
          </h1>
          <p className="text-white/50 font-light max-w-2xl mx-auto">
            Ask anything about event planning, luxury decor, Ghanaian cultural rites, UK logistics, budgets, or venue selection. I'm here to help.
          </p>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-6">
        {/* Quick prompts */}
        {messages.length === 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-warm-gray font-bold mb-4">Suggested questions</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {prompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInput(prompt)}
                  className="text-left p-4 bg-white border border-sand text-sm text-warm-gray hover:border-gold hover:text-charcoal transition-all duration-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-6 flex-1">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'advisor' && (
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold font-serif mr-3 flex-shrink-0 mt-1">
                  AI
                </div>
              )}
              <div className={`max-w-[80%] p-5 ${
                msg.role === 'user'
                  ? 'bg-noir text-white rounded-none rounded-tl-2xl rounded-bl-2xl rounded-tr-sm'
                  : 'bg-white border border-sand border-l-2 border-l-gold text-charcoal'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-noir text-xs font-bold ml-3 flex-shrink-0 mt-1">
                  You
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold font-serif mr-3 flex-shrink-0">
                AI
              </div>
              <div className="bg-white border border-sand border-l-2 border-l-gold p-5">
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-gold rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                  <span className="text-xs text-warm-gray ml-2 italic">Consulting…</span>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input form */}
        <div className="sticky bottom-0 bg-cream pt-4 pb-2">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about events, décor, budgets, cultural traditions…"
              className="flex-1 px-5 py-4 bg-white border border-sand text-sm text-charcoal placeholder-taupe outline-none transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-8 py-4 bg-noir text-white font-bold text-xs uppercase tracking-widest hover:bg-gold transition-all duration-300 btn-press disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              {isLoading ? '…' : 'Ask'}
            </button>
          </form>
          <div className="flex items-center justify-between mt-3">
            <p className="text-[9px] text-warm-gray uppercase tracking-wider italic">AI advice is conceptual — contact us for official proposals.</p>
            <Link to="/contact" className="text-[9px] text-gold uppercase tracking-wider font-bold hover:underline">
              Human Consultant →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultPage;
