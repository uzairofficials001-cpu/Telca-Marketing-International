import React, { useState } from 'react';
import { PageId, CaseStudy } from '../types';
import { caseStudiesData } from '../data/caseStudiesData';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import { ArrowRight, Check, X, ShieldAlert } from 'lucide-react';
import { trackContentView } from '../utils/analytics';
import { resolveMediaUrl } from '../utils/mediaAssets';

interface WorkPageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (serviceName?: string) => void;
  selectedCaseStudyId?: string | null;
  onClearSelectedCaseStudy?: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  onNavigate,
  onOpenConsultation,
  selectedCaseStudyId,
  onClearSelectedCaseStudy
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [projectsList, setProjectsList] = useState<CaseStudy[]>(caseStudiesData);
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(() => {
    if (selectedCaseStudyId) {
      return caseStudiesData.find(c => c.id === selectedCaseStudyId) || null;
    }
    return null;
  });

  React.useEffect(() => {
    fetch('/api/public/data')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.portfolio && Array.isArray(data.portfolio) && data.portfolio.length > 0) {
          setProjectsList(data.portfolio);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    'All',
    'Paid Advertising',
    'Graphic Design',
    'Video Editing',
    'Social Media',
    'Email Marketing',
    'AI Automation'
  ];

  const filteredProjects = activeFilter === 'All'
    ? projectsList
    : projectsList.filter(p => p.category === activeFilter);

  const handleOpenStudy = (study: CaseStudy) => {
    setActiveModalStudy(study);
    trackContentView('Case Study', study.title, { category: study.category, studyId: study.id });
  };

  const handleCloseStudy = () => {
    setActiveModalStudy(null);
    if (onClearSelectedCaseStudy) {
      onClearSelectedCaseStudy();
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      
      {/* Header */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20">
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="text-[#356DFF]">Agency Portfolio</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Project Frameworks &amp; Case Studies</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101B35] tracking-tight">
              Our Work &amp; Execution Frameworks.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore how we design and deploy performance marketing campaigns, visual brand assets, video edits, and intelligent automations across global business verticals.
            </p>

            {/* Transparent Policy Notice */}
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-[#356DFF] shrink-0 mt-0.5" />
              <span>
                <strong>Authentic Representation Policy:</strong> In accordance with our brand standards, all projects below are transparently labeled as <em>Concept Work / Framework Projects</em> to demonstrate our strategic capabilities without fabricating client identities.
              </span>
            </div>
          </div>

          {/* Interactive Filter Controls */}
          <div className="pt-8 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeFilter === cat
                    ? 'bg-[#101B35] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Projects Grid with Staggered Entrance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer key={activeFilter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <div
                onClick={() => handleOpenStudy(project)}
                className="h-full bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Visual */}
                  <div className="relative h-52 bg-slate-100 overflow-hidden">
                    <img
                      src={resolveMediaUrl(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Category & Concept Badges */}
                    <div className="absolute top-3 left-3 bg-[#101B35]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded backdrop-blur-sm">
                      {project.isConceptWork ? 'Concept Work' : 'Client Project'}
                    </div>

                    <div className="absolute bottom-3 left-3 bg-white/95 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded shadow-sm">
                      {project.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="text-[11px] text-slate-500 font-medium">
                      Industry: <span className="text-slate-800 font-semibold">{project.industry}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#101B35] group-hover:text-[#356DFF] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Target Milestone:
                      </div>
                      <div className="text-xs font-semibold text-slate-800">
                        {project.measurableResult}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#356DFF] group-hover:underline">
                    View Framework Details &rarr;
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {project.servicesProvided.length} Services Included
                  </span>
                </div>

              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-[#101B35] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold tracking-tight">
              Have a Project in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Let&apos;s build a customized performance campaign, creative suite, or business automation tailored specifically for your brand.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation()}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#356DFF] hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shadow-md shrink-0"
          >
            <span>Discuss Your Campaign</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </AnimatedSection>
      </section>

      {/* Deep-Dive Case Study Modal */}
      {activeModalStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative h-48 sm:h-56 bg-slate-100">
              <img
                src={resolveMediaUrl(activeModalStudy.image)}
                alt={activeModalStudy.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <button
                onClick={handleCloseStudy}
                className="absolute top-4 right-4 p-2 bg-slate-900/60 hover:bg-slate-900 text-white rounded-lg transition-colors backdrop-blur-sm"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-blue-300">
                  <span>{activeModalStudy.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeModalStudy.industry}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mt-1 leading-snug">
                  {activeModalStudy.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Client & Scope Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl text-xs border border-slate-200/80">
                <div>
                  <span className="text-slate-400">Client Framework:</span>{' '}
                  <span className="font-semibold text-slate-800">{activeModalStudy.clientPlaceholder}</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Concept Work
                </div>
              </div>

              {/* Challenge & Strategy */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Business Challenge
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-red-50/40 border border-red-100 p-3.5 rounded-xl">
                  {activeModalStudy.challenge}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Strategy Implemented
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeModalStudy.strategy}
                </p>
              </div>

              {/* Services Provided */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Services Provided
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalStudy.servicesProvided.map((svc, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-800 px-3 py-1 rounded-md font-medium">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Deliverables &amp; System Outputs
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeModalStudy.keyOutputs.map((out, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#356DFF] shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Results */}
              <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl space-y-1">
                <div className="text-xs font-bold text-[#356DFF] uppercase tracking-wider">
                  Target Outcome
                </div>
                <div className="text-xs text-slate-800 font-medium">
                  {activeModalStudy.measurableResult}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/60">
              <button
                onClick={handleCloseStudy}
                className="text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  handleCloseStudy();
                  onOpenConsultation(activeModalStudy.category);
                }}
                className="px-5 py-2.5 bg-[#101B35] hover:bg-[#356DFF] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Inquire About Similar Solution
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
