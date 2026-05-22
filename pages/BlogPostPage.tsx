
import React, { useRef, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BLOG_POSTS, getBlogPostBySlug } from '../constants';
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

const categoryLabel: Record<BlogPost['category'], string> = {
  weddings: 'Weddings',
  corporate: 'Corporate',
  inspiration: 'Inspiration',
  tips: 'Tips & Guides',
  culture: 'Culture',
};

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const related = useIntersection();

  const post = getBlogPostBySlug(id || '');

  useEffect(() => {
    if (!post) navigate('/blog', { replace: true });
  }, [post, navigate]);

  if (!post) return null;

  const relatedPosts = BLOG_POSTS
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const otherPosts = relatedPosts.length < 3
    ? [...relatedPosts, ...BLOG_POSTS.filter(p => p.id !== post.id && p.category !== post.category).slice(0, 3 - relatedPosts.length)]
    : relatedPosts;

  const contentParagraphs = post.content.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return <h2 key={i} className="font-serif text-2xl md:text-3xl text-charcoal mt-12 mb-6 leading-tight">{block.slice(3)}</h2>;
    }
    if (block.startsWith('**') && block.endsWith('**')) {
      return <p key={i} className="font-semibold text-charcoal text-base leading-relaxed mb-4">{block.slice(2, -2)}</p>;
    }
    return <p key={i} className="text-warm-gray leading-relaxed mb-6 text-base">{block}</p>;
  });

  return (
    <div style={{ backgroundColor: 'var(--cream)' }}>

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[460px] flex items-end overflow-hidden bg-noir">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover opacity-55 animate-slow-zoom"
          fetchPriority="high"
          onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
          <div className="flex items-center gap-4 mb-6 animate-fade-in">
            <Link to="/blog" className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-gold transition-colors">
              ← Journal
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
              {categoryLabel[post.category]}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight animate-fade-up">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Meta bar */}
      <div className="bg-white border-b border-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center gap-6 text-xs text-warm-gray">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-sm font-serif flex-shrink-0">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-charcoal">{post.author}</p>
              <p className="text-[10px] text-warm-gray">{post.authorRole}</p>
            </div>
          </div>
          <span className="w-px h-8 bg-sand hidden sm:block" />
          <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span className="w-px h-4 bg-sand hidden sm:block" />
          <span>{post.readTime} min read</span>
          <span className="w-px h-4 bg-sand hidden sm:block" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-cream text-charcoal text-[9px] font-semibold uppercase tracking-wider border border-sand">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Article content */}
      <article className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Excerpt lead */}
          <p className="font-serif text-xl md:text-2xl text-charcoal italic leading-relaxed mb-12 pb-12 border-b border-sand">
            {post.excerpt}
          </p>

          {/* Article body */}
          <div className="prose-content">
            {contentParagraphs}
          </div>

          {/* CTA within article */}
          <div className="mt-16 bg-noir p-10 md:p-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4">Ready to begin?</p>
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-6">
              Let us bring your vision to life.
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/book" className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-noir font-bold text-xs uppercase tracking-widest hover:bg-gold-light transition-all btn-press">
                Book Consultation <ArrowRight />
              </Link>
              <Link to="/portfolio" className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-all">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {otherPosts.length > 0 && (
        <section ref={related.ref} className="py-16 md:py-24 bg-beige px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className={`flex justify-between items-end mb-12 transition-all duration-700 ${related.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                More from the <span className="italic">Journal</span>.
              </h2>
              <Link to="/blog" className="text-xs font-bold uppercase tracking-widest text-charcoal hover:text-gold transition-colors hover-underline hidden sm:flex items-center gap-2">
                All Articles <ArrowRight />
              </Link>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-100 ${related.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {otherPosts.map(p => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group bg-white border border-sand hover:border-gold/20 hover:shadow-lg transition-all duration-500 block"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={e => { (e.target as HTMLImageElement).src = '/images/eventdeco.jpg'; }} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-0.5 bg-gold/10 text-gold text-[9px] font-bold uppercase tracking-widest">{categoryLabel[p.category]}</span>
                      <span className="text-[10px] text-warm-gray">{p.readTime} min</span>
                    </div>
                    <h3 className="font-serif text-lg text-charcoal font-bold mb-2 group-hover:text-gold transition-colors line-clamp-2 leading-snug">{p.title}</h3>
                    <p className="text-warm-gray text-sm line-clamp-2 leading-relaxed">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default BlogPostPage;
