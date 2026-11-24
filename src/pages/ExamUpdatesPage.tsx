import { ArrowRight, Calendar, ChevronRight } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { EXAM_UPDATES } from '../data/studyMaterials';

interface ExamUpdatesPageProps {
  onNavigate: (path: string) => void;
}

export function ExamUpdatesPage({ onNavigate }: ExamUpdatesPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <SeoHead
        title="परीक्षा अपडेट एवं भर्ती मार्गदर्शन (Exam Updates) – Sarkari Job Target"
        description="UPSSSC PET, SSC GD, CHSL, Railway NTPC, Group D और UP Police परीक्षा पैटर्न, पाठ्यक्रम अपडेट व तैयारी कैलेंडर हिंदी में पढ़ें।"
        canonicalPath="/exam-updates"
        breadcrumbs={[
          { name: 'होम', path: '/' },
          { name: 'परीक्षा अपडेट', path: '/exam-updates' },
        ]}
      />

      <nav aria-label="ब्रेडक्रम्ब" className="mb-6 text-xs sm:text-sm text-slate-600">
        <ol className="flex items-center gap-1.5">
          <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="hover:text-[#C81E1E] hover:underline"
            >
              होम
            </a>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </li>
          <li aria-current="page" className="font-semibold text-slate-900">
            परीक्षा अपडेट
          </li>
        </ol>
      </nav>

      <header className="pb-6 border-b border-slate-200 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          परीक्षा अपडेट, पाठ्यक्रम एवं महत्वपूर्ण सूचनाएँ
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          प्रमुख भर्ती बोर्डों की परीक्षा योजना, पात्रता मानदंड और आगामी तैयारी कैलेंडर की अद्यतन जानकारी।
        </p>
      </header>

      <div className="space-y-6">
        {EXAM_UPDATES.map((upd) => (
          <article
            key={upd.id}
            className="p-5 sm:p-6 border border-slate-200 rounded-lg bg-white"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="font-semibold text-[#C81E1E]">{upd.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{upd.organization}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {upd.dateDisplay}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {upd.title}
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
              {upd.summary}
            </p>

            <ul className="mt-4 space-y-1.5 pl-5 list-disc text-sm text-slate-700">
              {upd.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>

            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              {upd.lastDateDisplay ? (
                <span className="text-xs font-semibold text-[#C81E1E]">
                  {upd.lastDateDisplay}
                </span>
              ) : (
                <span className="text-xs text-slate-500">आधिकारिक वेबसाइट के माध्यम से सत्यापित करें</span>
              )}

              {upd.linkedArticleSlug && (
                <a
                  href={`/article/${upd.linkedArticleSlug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/article/${upd.linkedArticleSlug}`);
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C81E1E] hover:underline"
                >
                  <span>संपूर्ण तैयारी लेख पढ़ें</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
