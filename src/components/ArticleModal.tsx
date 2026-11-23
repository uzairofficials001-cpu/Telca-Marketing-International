import React from 'react';
import { X, Clock, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { InsightArticle } from '../types';

interface ArticleModalProps {
  article: InsightArticle | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenConsultation
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-[#356DFF]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.publishedDate}</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          <div>
            <h2 id="article-modal-title" className="text-2xl font-extrabold text-[#101B35] tracking-tight leading-snug">
              {article.title}
            </h2>
            <p className="text-sm text-slate-600 mt-3 font-normal leading-relaxed italic border-l-2 border-[#356DFF] pl-3 py-0.5">
              {article.excerpt}
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 sm:p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#356DFF] mb-2">
              Key Strategic Takeaways
            </div>
            <ul className="space-y-2 text-xs text-slate-800">
              {article.takeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#356DFF] shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Bottom CTA block */}
          <div className="p-6 rounded-xl bg-slate-900 text-white mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold">Have Questions About Applying This to Your Business?</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Discuss your marketing strategy with our growth specialists in a free discovery session.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#356DFF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Get Free Advice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
