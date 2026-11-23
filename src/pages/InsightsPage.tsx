import React, { useState } from 'react';
import { PageId, InsightArticle } from '../types';
import { insightsArticles } from '../data/insightsData';
import { Search, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { trackContentView } from '../utils/analytics';

interface InsightsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: () => void;
  onSelectArticle: (article: InsightArticle) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onSelectArticle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [articlesList, setArticlesList] = useState<InsightArticle[]>(insightsArticles);

  React.useEffect(() => {
    fetch('/api/public/data')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.blog && Array.isArray(data.blog) && data.blog.length > 0) {
          setArticlesList(data.blog);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    'All',
    'Digital Marketing Basics',
    'Paid Advertising',
    'Social Media Marketing',
    'Creative & Content',
    'Email Marketing',
    'AI & Automation',
    'Business Growth'
  ];

  const filteredArticles = articlesList.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(art.content) && art.content.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      
      {/* Header */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="text-[#356DFF]">Educational Resources</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Marketing Without Jargon</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101B35] tracking-tight">
              Insights &amp; Executive Guides.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We write practical, straightforward guides to help non-technical business owners understand modern digital marketing, avoid common pitfalls, and make better growth decisions.
            </p>
          </AnimatedSection>

          {/* Search & Category Filter */}
          <AnimatedSection delay={0.1} direction="up" className="mt-8 space-y-4">
            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides (e.g. ad spend, n8n, targeting, email)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#356DFF] text-slate-800 shadow-sm"
              />
            </div>

            {/* Filter Buttons (§1.A allowed functional button tabs) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#101B35] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredArticles.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <StaggerItem key={article.id}>
                <article
                  onClick={() => {
                    trackContentView('Insight Article', article.title, { category: article.category });
                    onSelectArticle(article);
                  }}
                  className="h-full bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group"
                >
                  <div className="space-y-4">
                    {/* Clean unboxed metadata with separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-[#356DFF]">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-[#101B35] group-hover:text-[#356DFF] transition-colors leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#101B35] group-hover:text-[#356DFF] transition-colors inline-flex items-center gap-1.5">
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {article.publishedDate}
                    </span>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <AnimatedSection className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-[#101B35]">No Guides Match Your Search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or clearing the category filter to view all articles.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-slate-100 text-xs font-semibold rounded-lg hover:bg-slate-200 text-slate-800"
            >
              Reset Filters
            </button>
          </AnimatedSection>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="bg-[#101B35] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold tracking-tight">
              Need Personalized Marketing Clarity?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every business has distinct customer unit economics. Let&apos;s analyze yours in a free 30-minute strategic consultation.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#356DFF] hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shadow-md shrink-0"
          >
            <span>Book a Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </AnimatedSection>
      </section>

    </div>
  );
};
