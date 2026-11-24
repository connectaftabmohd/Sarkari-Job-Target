import { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, Download, FileText } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { STUDY_MATERIALS } from '../data/studyMaterials';
import { StudyMaterialType } from '../types/blog';
import { downloadStudyMaterialSheet } from '../utils/pdfDownload';

interface StudyMaterialPageProps {
  initialType?: string;
  onNavigate: (path: string) => void;
}

const MATERIAL_FILTERS: { id: 'all' | StudyMaterialType; label: string }[] = [
  { id: 'all', label: 'सभी सामग्री' },
  { id: 'pdf-notes', label: 'PDF Notes' },
  { id: 'pyq', label: 'Previous Year Papers' },
  { id: 'practice-set', label: 'Practice Sets' },
  { id: 'mock-test', label: 'Mock Tests' },
];

export function StudyMaterialPage({ initialType, onNavigate }: StudyMaterialPageProps) {
  const [filter, setFilter] = useState<'all' | StudyMaterialType>('all');
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  useEffect(() => {
    if (
      initialType === 'pdf-notes' ||
      initialType === 'pyq' ||
      initialType === 'practice-set' ||
      initialType === 'mock-test'
    ) {
      setFilter(initialType);
    } else {
      setFilter('all');
    }
  }, [initialType]);

  const items =
    filter === 'all'
      ? STUDY_MATERIALS
      : STUDY_MATERIALS.filter((item) => item.type === filter);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      <SeoHead
        title="स्टडी मटेरियल: PDF Notes, PYQ, Practice Sets एवं Mock Tests – Sarkari Job Target"
        description="UPSSSC PET, UP Police, SSC, Railway और UPPSC के लिए हिंदी में PDF नोट्स, पिछले वर्षों के प्रश्न-पत्र, प्रैक्टिस सेट और मॉक टेस्ट डाउनलोड करें।"
        canonicalPath="/study-material"
        breadcrumbs={[
          { name: 'होम', path: '/' },
          { name: 'स्टडी मटेरियल', path: '/study-material' },
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
            स्टडी मटेरियल
          </li>
        </ol>
      </nav>

      <header className="pb-6 border-b border-slate-200 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          महत्वपूर्ण स्टडी मटेरियल एवं प्रैक्टिस संसाधन
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          सभी प्रमुख सरकारी भर्ती परीक्षाओं के लिए संक्षिप्त PDF नोट्स, पिछले वर्षों के हल प्रश्न-पत्र और अभ्यास सेट यहाँ उपलब्ध हैं।
        </p>

        {/* Filter Controls */}
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="सामग्री प्रकार फ़िल्टर">
          {MATERIAL_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-colors whitespace-nowrap shrink-0 ${
                filter === f.id
                  ? 'bg-[#C81E1E] border-[#C81E1E] text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-[#C81E1E]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <article
            key={item.id}
            className="p-5 sm:p-6 border border-slate-200 rounded-lg bg-white flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-semibold text-[#C81E1E]">{item.typeLabelHi}</span>
                <span aria-hidden="true">·</span>
                <span>{item.subjectHi}</span>
                <span aria-hidden="true">·</span>
                <span>{item.updatedDisplay}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 leading-snug">{item.title}</h2>
              <p className="mt-1.5 text-xs font-medium text-slate-700">
                लक्ष्य परीक्षा: {item.examName} · {item.pagesOrQuestions}
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.description}</p>

              <ul className="mt-4 space-y-1.5 text-xs sm:text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                {item.summaryContent.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <FileText
                      className="w-4 h-4 text-[#C81E1E] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  downloadStudyMaterialSheet(item);
                  setDownloadedId(item.id);
                  setTimeout(() => setDownloadedId(null), 2500);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C81E1E] text-white text-xs sm:text-sm font-semibold hover:bg-[#991B1B] transition-colors"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>{downloadedId === item.id ? 'डाउनलोड पूर्ण' : 'नोट्स डाउनलोड करें'}</span>
              </button>

              {item.linkedArticleSlug && (
                <a
                  href={`/article/${item.linkedArticleSlug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/article/${item.linkedArticleSlug}`);
                  }}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#C81E1E] hover:underline"
                >
                  <span>विस्तृत लेख पढ़ें</span>
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
