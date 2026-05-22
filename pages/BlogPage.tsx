
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, FEATURED_BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';

const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const useIntersection = (threshold = 0.08) => {
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

const categoryLabels: Record<BlogPost['category'], string> = {
  weddings: 'Weddings',
  corporate: 'Corporate',
  inspiration: 'Inspiration',
  tips: 'Tips & Guides',
  culture: 'Culture',
};

const categoryColors: Record<BlogPost['category'], string> = {
  weddings: 'bg-pink-50 text-pink-700',
  corporate: 'bg-blue-50 text-blue-700',
  inspiration: 'bg-amber-50 text-amber-700',
  tips: 'bg-green-50 text-green-700',
  culture: 'bg-purple-50 text-purple-700',
};

const BlogCard: React.FC<{ post: BlogPost; featured?: boolean }> = ({ post, featured }) => (
  <Link
    to={`/blog/${post.slug}`}
    className={`group block ${featured ? 'md:grid md:grid-cols-2 gap-0' : ''} bg-white border border-sand hover:border-gold/20 hover:shadow-lg transition-all duration-500`}
  >
    <div className={`overflow-hidden bg-beige ${featured ? 'aspect-auto min-h-[320px]' : 'aspect-[16/9]'}`}>
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
      />
    </div>
    <div className={`p-8 flex flex-col justify-center ${featured ? '' : ''}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full ${categoryColors[post.category]}`}>
          {categoryLabels[post.category]}
        </span>
        <span className="text-[10px] text-warm-gray">{post.readTime} min read</span>
        {post.featured && (
          <span className="px-2 py-0.5 bg-gold/10 text-gold text-[9px] font-bold uppercase tracking-widest">Featured</span>
        )}
      </div>
      <h3 className={`font-serif text-charcoal font-bold mb-3 group-hover:text-gold transition-colors leading-tight ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
        {post.title}
      </h3>
      <p className="text-warm-gray text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
      <div className="flex items-center justify-between mt-auto">
        <div>
          <p className="text-xs font-semibold text-charcoal">{post.author}</p>
          <p className="text-[10px] text-warm-gray">{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold group-hover:gap-3 transition-all">
          Read <ArrowRight />
        </span>
      </div>
    </div>
  </Link>
);

const BlogPage: React.FC = () => {
  const grid = useIntersection();
  const [activeCategory, setActiveCategory] = useState<BlogPost['category'] | 'all'>('all');

  const categories: Array<BlogPost['category'] | 'all'> = ['all', 'weddings', 'corporate', 'inspiration', 'tips', 'culture'];

  const filtered = activeCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  const featuredPost = FEATURED_BLOG_POSTS[0];
  const otherPosts = filtered.filter(p => p.id !== featuredPost?.id);

  return (
    <div style={{ backgroundColor: 'var(--cream)' }}>

      {/* Hero */}
      <section className="relative h-[45vh] min-h-[380px] flex items-end overflow-hidden bg-noir">
        <img
          src="/images/nicedeco.jpg"
          alt="ODREG Blog"
          className="absolute inset-0 w-full h-full object-cover opacity-40 animate-slow-zoom"
          fetchPriority="high"
        onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
          />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
          <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4 animate-fade-in">Ideas & Inspiration</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white leading-none animate-fade-up">
            The ODREG <span className="italic text-gold">Journal</span>.
          </h1>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-8">Featured Article</p>
            <BlogCard post={featuredPost} featured />
          </div>
        </section>
      )}

      {/* Filter + grid */}
      <section ref={grid.ref} className="py-8 pb-24 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-noir text-gold'
                    : 'bg-white border border-sand text-charcoal hover:border-gold hover:text-gold'
                }`}
              >
                {cat === 'all' ? 'All Articles' : categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {otherPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-charcoal mb-4">No articles in this category yet.</p>
              <button onClick={() => setActiveCategory('all')} className="text-gold text-sm font-bold uppercase tracking-widest hover:underline">
                View all articles →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-noir text-center px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4">Stay Inspired</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            Get the latest articles<br />
            <span className="italic text-gold">in your inbox.</span>
          </h2>
          <p className="text-white/60 text-sm mb-8">Wedding inspiration, event trends, styling guides, and cultural insights — delivered directly to you.</p>
          <form
            onSubmit={e => { e.preventDefault(); }}
            className="flex gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-4 bg-white/5 border border-white/10 text-white placeholder-warm-gray text-sm outline-none focus:border-gold transition-colors"
              required
            />
            <button
              type="submit"
              className="px-6 py-4 bg-gold text-noir font-bold text-xs uppercase tracking-widest hover:bg-gold-light transition-colors flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default BlogPage;
