import { FormEvent, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';
import { SeoHead } from '../components/SeoHead';
import { searchArticles } from '../data/articles';

interface SearchPageProps {
  initialQuery: string;
  onNavigate: (path: string) => void;
}

const SUGGESTED_QUERIES = [
  'UPSSSC PET',
  'संविधान',
  'संधि',
  'प्रतिशत',
  'करेंट अफेयर्स',
  'SSC',
  'Railway',
];

export function SearchPage({ initialQuery, onNavigate }: SearchPageProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const results = searchArticles(query);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    onNavigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <SeoHead
        title={
          initialQuery
            ? `"${initialQuery}" खोज परिणाम – Sarkari Job Target`
            : 'लेख एवं परीक्षा टॉपिक खोजें – Sarkari Job Target'
        }
        description="Sarkari Job Target पर हिंदी में करेंट अफेयर्स, सामान्य ज्ञान, हिंदी व्याकरण, गणित और परीक्षा तैयारी नोट्स खोजें।"
        canonicalPath="/search"
      />

      <header className="pb-8 border-b border-slate-200 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          टॉपिक या परीक्षा खोजें
        </h1>
        <form onSubmit={handleSubmit} className="mt-5 max-w-2xl flex gap-2.5" role="search">
          <div className="relative flex-1">
            <Search
              className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <label htmlFor="page-search-input" className="sr-only">
              यहां टॉपिक या परीक्षा खोजें
            </label>
            <input
              id="page-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="यहां टॉपिक या परीक्षा खोजें"
              className="w-full h-11 pl-11 pr-4 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#C81E1E]"
            />
          </div>
          <button
            type="submit"
            className="h-11 px-5 rounded-lg bg-[#C81E1E] text-white text-sm font-semibold hover:bg-[#991B1B] transition-colors whitespace-nowrap shrink-0"
          >
            खोजें
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-700">त्वरित खोज:</span>
          {SUGGESTED_QUERIES.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setQuery(tag);
                onNavigate(`/search?q=${encodeURIComponent(tag)}`);
              }}
              className="px-2.5 py-1 rounded border border-slate-200 bg-slate-50 hover:border-[#C81E1E] hover:text-[#C81E1E] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      <div className="mb-6 text-sm text-slate-600 tabular-nums">
        {query.trim()
          ? `"${query.trim()}" के लिए ${results.length} लेख मिले`
          : `कुल ${results.length} प्रकाशित लेख`}
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((article) => (
            <ArticleCard key={article.id} article={article} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="p-8 border border-slate-200 rounded-lg text-center bg-slate-50">
          <p className="text-base font-semibold text-slate-900">
            आपकी खोज से मेल खाने वाला कोई लेख नहीं मिला।
          </p>
          <p className="mt-1.5 text-sm text-slate-600">
            कृपया दूसरा शब्द प्रयास करें या ऊपर दिए गए त्वरित खोज विकल्पों में से चुनें।
          </p>
        </div>
      )}
    </div>
  );
}
