
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NewsletterPopup from './components/NewsletterPopup';
import HomePage from './pages/HomePage';
import ServicesListPage from './pages/ServicesListPage';
import ServiceDetail from './pages/ServiceDetail';
import PortfolioListPage from './pages/PortfolioListPage';
import PortfolioDetail from './pages/PortfolioDetail';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ConsultPage from './pages/ConsultPage';
import AdminInboxPage from './pages/AdminInboxPage';
import WeddingsPage from './pages/WeddingsPage';
import CorporatePage from './pages/CorporatePage';
import BookConsultPage from './pages/BookConsultPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-28 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-xl back-to-top"
      style={{ background: 'var(--noir)', border: '1px solid rgba(212,180,131,0.3)', color: 'var(--gold)' }}
      aria-label="Back to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
};

const FloatingBookCTA: React.FC = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const isBookPage = location.pathname === '/book';
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible || isBookPage) return null;
  return (
    <Link
      to="/book"
      className="fixed bottom-28 left-8 z-40 hidden lg:flex items-center gap-2 px-5 py-3 shadow-xl btn-press"
      style={{ background: 'var(--gold)', color: 'var(--noir)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', animation: 'fadeUp 0.4s ease forwards' }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
      Book Consultation
    </Link>
  );
};

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)', color: 'var(--charcoal)' }}>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesListPage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<PortfolioListPage />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/weddings" element={<WeddingsPage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/book" element={<BookConsultPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/consult" element={<ConsultPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminInboxPage />} />
        </Routes>
      </main>
      <Footer />
      <NewsletterPopup />
      <BackToTopButton />
      <FloatingBookCTA />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
};

export default App;
