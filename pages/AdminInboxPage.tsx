
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { InquiryMessage } from '../types';

const ADMIN_PASS = 'odreg2024admin';
const SESSION_KEY = 'odreg_admin_session';

const AdminInboxPage: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [messages, setMessages] = useState<InquiryMessage[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'booking' | 'inquiry'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = useCallback(() => {
    const saved = localStorage.getItem('odreg_messages');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (authenticated) load();
  }, [authenticated, load]);

  const handleAuth = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
    setPassword('');
    setMessages([]);
    setSelectedId(null);
  };

  const markRead = (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, status: 'read' as const } : m);
    setMessages(updated);
    localStorage.setItem('odreg_messages', JSON.stringify(updated));
  };

  const deleteMsg = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('odreg_messages', JSON.stringify(updated));
    if (selectedId === id) setSelectedId(null);
  };

  const filtered = messages.filter(m => {
    const statusMatch = filter === 'all' ? true : m.status === filter;
    const typeMatch = typeFilter === 'all' ? true : m.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const newBookings = messages.filter(m => m.type === 'booking' && m.status === 'new').length;
  const newInquiries = messages.filter(m => m.type === 'inquiry' && m.status === 'new').length;
  const subscribers = JSON.parse(localStorage.getItem('odreg_subscribers') || '[]');
  const selected = messages.find(m => m.id === selectedId);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--noir)' }}>
        <div className="bg-white p-12 w-full max-w-sm shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(212,180,131,0.1)', border: '1px solid rgba(212,180,131,0.3)' }}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} style={{ color: 'var(--gold)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-2" style={{ color: 'var(--gold)' }}>Restricted Access</p>
            <h1 className="font-serif text-2xl" style={{ color: 'var(--charcoal)' }}>Admin Dashboard</h1>
            <p className="text-xs mt-1" style={{ color: 'var(--warm-gray)' }}>ODREG Internal Systems</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--warm-gray)' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
                placeholder="Enter admin password"
                className="w-full px-4 py-3 text-sm outline-none transition-colors"
                style={{ border: '1px solid var(--sand)', background: 'var(--cream)', color: 'var(--charcoal)' }}
              />
              {authError && <p className="text-red-500 text-xs mt-1.5">{authError}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3.5 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300"
              style={{ background: 'var(--noir)' }}
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/" className="text-xs transition-colors" style={{ color: 'var(--warm-gray)' }}>← Return to site</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Header */}
      <div className="pt-28 pb-10 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--noir)' }}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-2" style={{ color: 'var(--gold)' }}>Internal Systems</p>
            <h1 className="font-serif text-3xl text-white">Admin <span className="italic" style={{ color: 'var(--gold)' }}>Dashboard</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs transition-colors" style={{ color: 'var(--warm-gray)' }}>← Return to Site</Link>
            <button
              onClick={logout}
              className="px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all"
              style={{ border: '1px solid rgba(212,180,131,0.3)', color: 'var(--gold)' }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Submissions', value: messages.length, color: 'var(--charcoal)' },
            { label: 'New Bookings', value: newBookings, color: 'var(--gold)' },
            { label: 'New Inquiries', value: newInquiries, color: '#16a34a' },
            { label: 'Subscribers', value: subscribers.length, color: '#2563eb' },
          ].map((stat, i) => (
            <div key={i} className="p-6" style={{ background: 'white', border: '1px solid var(--sand)' }}>
              <p className="font-serif text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--warm-gray)' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inbox list */}
          <div className="lg:col-span-1">
            <div style={{ background: 'white', border: '1px solid var(--sand)' }}>
              {/* Filters */}
              <div className="p-4" style={{ borderBottom: '1px solid var(--sand)' }}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--charcoal)' }}>Inbox</h2>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5" style={{ background: 'rgba(212,180,131,0.1)', color: 'var(--gold)' }}>
                    {filtered.length} item{filtered.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {/* Type filter */}
                <div className="flex gap-1 mb-2">
                  {(['all', 'booking', 'inquiry'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTypeFilter(t)}
                      className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold transition-colors"
                      style={typeFilter === t ? { background: 'var(--gold)', color: 'var(--noir)' } : { color: 'var(--warm-gray)' }}
                    >
                      {t === 'booking' ? '📋 Bookings' : t === 'inquiry' ? '✉️ Inquiries' : 'All'}
                    </button>
                  ))}
                </div>
                {/* Status filter */}
                <div className="flex gap-1">
                  {(['all', 'new', 'read'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold transition-colors"
                      style={filter === f ? { background: 'var(--noir)', color: 'white' } : { color: 'var(--warm-gray)' }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-sm italic" style={{ color: 'var(--warm-gray)' }}>No messages found.</p>
                </div>
              ) : (
                <ul className="divide-y" style={{ borderColor: 'var(--sand)', maxHeight: '600px', overflowY: 'auto' }}>
                  {filtered.map(msg => (
                    <li key={msg.id}>
                      <button
                        onClick={() => { setSelectedId(msg.id); markRead(msg.id); }}
                        className="w-full text-left p-4 transition-colors"
                        style={selectedId === msg.id ? { background: 'rgba(212,180,131,0.06)', borderLeft: '2px solid var(--gold)' } : {}}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="font-semibold text-sm line-clamp-1" style={{ color: 'var(--charcoal)' }}>{msg.name}</span>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {msg.status === 'new' && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5" style={msg.type === 'booking' ? { background: 'rgba(212,180,131,0.12)', color: 'var(--gold)' } : { background: '#f0fdf4', color: '#16a34a' }}>
                            {msg.type === 'booking' ? 'Booking' : 'Inquiry'}
                          </span>
                          <p className="text-xs line-clamp-1 flex-1" style={{ color: 'var(--warm-gray)' }}>{msg.service}</p>
                        </div>
                        <p className="text-[9px]" style={{ color: 'var(--taupe)' }}>{msg.date}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-2">
            {selected ? (
              <div style={{ background: 'white', border: '1px solid var(--sand)' }}>
                {/* Detail header */}
                <div className="p-6 flex items-start justify-between gap-4" style={{ borderBottom: '1px solid var(--sand)' }}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5" style={selected.type === 'booking' ? { background: 'rgba(212,180,131,0.12)', color: 'var(--gold)' } : { background: '#f0fdf4', color: '#16a34a' }}>
                        {selected.type === 'booking' ? '📋 Consultation Booking' : '✉️ Contact Inquiry'}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl mt-2" style={{ color: 'var(--charcoal)' }}>{selected.name}</h3>
                    <a href={`mailto:${selected.email}`} className="text-sm" style={{ color: 'var(--gold)' }}>{selected.email}</a>
                    {selected.phone && <p className="text-sm mt-0.5" style={{ color: 'var(--warm-gray)' }}>{selected.phone}</p>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <a
                      href={`mailto:${selected.email}?subject=Re:%20Your%20ODREG%20Enquiry%20(${selected.id})&body=Dear%20${selected.name},%0A%0AThank%20you%20for%20reaching%20out%20to%20ODREG.%0A%0A`}
                      className="px-4 py-2 text-white text-xs font-bold uppercase tracking-wider transition-all"
                      style={{ background: 'var(--noir)' }}
                    >
                      Reply
                    </a>
                    <button
                      onClick={() => deleteMsg(selected.id)}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all"
                      style={{ border: '1px solid #fca5a5', color: '#ef4444' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Reference + date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--warm-gray)' }}>Reference</p>
                      <p className="text-xs font-mono font-bold px-3 py-2" style={{ background: 'var(--beige)', color: 'var(--gold)' }}>{selected.id}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--warm-gray)' }}>Received</p>
                      <p className="text-xs" style={{ color: 'var(--charcoal)' }}>{selected.date}</p>
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <p className="text-[9px] uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--warm-gray)' }}>Service / Event Type</p>
                    <span className="inline-block text-xs font-semibold px-3 py-1" style={{ background: 'rgba(212,180,131,0.1)', color: 'var(--gold)' }}>{selected.service}</span>
                  </div>

                  {/* Booking-specific fields */}
                  {selected.type === 'booking' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4" style={{ background: 'var(--beige)', border: '1px solid var(--sand)' }}>
                      {[
                        { label: 'Event Date', value: selected.eventDate },
                        { label: 'Guest Count', value: selected.guestCount },
                        { label: 'Budget', value: selected.budget },
                        { label: 'Location', value: selected.location },
                        { label: 'Heard Via', value: selected.hearAboutUs },
                      ].filter(f => f.value).map(f => (
                        <div key={f.label}>
                          <p className="text-[9px] uppercase tracking-widest font-bold mb-0.5" style={{ color: 'var(--warm-gray)' }}>{f.label}</p>
                          <p className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>{f.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <p className="text-[9px] uppercase tracking-widest font-bold mb-3" style={{ color: 'var(--warm-gray)' }}>Message</p>
                    <blockquote className="py-2 pl-6 italic leading-relaxed" style={{ borderLeft: '3px solid var(--gold)', color: 'var(--charcoal)' }}>
                      "{selected.message}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-16 text-center" style={{ background: 'white', border: '1px solid var(--sand)', minHeight: '300px' }}>
                <div>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--beige)' }}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1} style={{ color: 'var(--warm-gray)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <p className="font-serif text-xl mb-2" style={{ color: 'var(--charcoal)' }}>Select a submission</p>
                  <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>Click any item on the left to view full details.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Subscribers */}
        {subscribers.length > 0 && (
          <div className="mt-10" style={{ background: 'white', border: '1px solid var(--sand)' }}>
            <div className="p-4" style={{ borderBottom: '1px solid var(--sand)' }}>
              <h2 className="font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--charcoal)' }}>
                Newsletter Subscribers ({subscribers.length})
              </h2>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {subscribers.map((sub: { email: string; date: string }, i: number) => (
                <div key={i} className="text-xs px-3 py-2 line-clamp-1" style={{ background: 'var(--cream)', color: 'var(--charcoal)' }}>
                  {sub.email}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInboxPage;
