import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Layers,
  Search,
} from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';
import { SeoHead } from '../components/SeoHead';
import {
  getArticlesByCategory,
  getCurrentAffairsByPeriod,
  getLatestArticles,
  getPopularArticles,
} from '../data/articles';
import { CATEGORIES, POPULAR_CATEGORIES } from '../data/categories';
import { CurrentAffairsPeriod } from '../types/blog';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const TARGET_EXAMS = [
  'UPSSSC PET',
  'UP Police',
  'SSC CGL / GD',
  'Railway NTPC',
  'UPPSC / UPSC',
  'CTET / UPTET',
  'Lekhpal / VDO',
  'Banking',
];

const STUDY_MATERIAL_CARDS = [
  {
    type: 'pdf-notes',
    title: 'PDF Notes',
    subtitle: 'विषयवार संक्षिप्त नोट्स',
    desc: 'संविधान, इतिहास, भूगोल व गणित के परीक्षा-उपयोगी प्रिंट करने योग्य अध्ययन नोट्स।',
    icon: FileText,
  },
  {
    type: 'pyq',
    title: 'Previous Year Papers',
    subtitle: 'पिछले वर्षों के प्रश्न-पत्र',
    desc: 'UPSSSC PET, UP Police, SSC और Railway के विगत वर्षों के हल प्रश्न-पत्र।',
    icon: Layers,
  },
  {
    type: 'practice-set',
    title: 'Practice Sets',
    subtitle: 'अध्यायवार प्रैक्टिस सेट',
    desc: 'सामान्य हिंदी, रीजनिंग और सामान्य विज्ञान के नियमित अभ्यास प्रश्न सेट।',
    icon: BookOpen,
  },
  {
    type: 'mock-test',
    title: 'Mock Tests',
    subtitle: 'फुल लेंथ मॉक टेस्ट',
    desc: 'नकारात्मक अंकन के साथ समयबद्ध परीक्षा पैटर्न पर आधारित मॉडल पेपर।',
    icon: ClipboardCheck,
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const [heroSearch, setHeroSearch] = useState('');
  const [caPeriod, setCaPeriod] = useState<CurrentAffairsPeriod>('daily');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const latestArticles = getLatestArticles(6);
  const popularArticles = getPopularArticles(5);
  const currentAffairsList = getCurrentAffairsByPeriod(caPeriod);

  const handleHeroSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = heroSearch.trim();
    if (q) {
      onNavigate(`/search?q=${encodeURIComponent(q)}`);
    } else {
      onNavigate('/search');
    }
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  return (
    <div>
      <SeoHead
        title="Sarkari Job Target – प्रतियोगी परीक्षाओं की तैयारी का हिंदी मंच"
        description="UPSSSC PET, UP Police, SSC, Railway, UPPSC, UPSC, CTET और बैंकिंग परीक्षाओं की तैयारी के लिए हिंदी में करेंट अफेयर्स, सामान्य ज्ञान, PDF नोट्स और मॉक टेस्ट।"
        canonicalPath="/"
      />

      {/* 1. Hero Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/assets/aistudio/Sarkari_Job_Target_02a57cf7.jfif"
              alt="Sarkari Job Target"
              className="w-20 h-20 object-contain rounded-lg bg-white"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight tracking-tight max-w-3xl mx-auto">
            प्रतियोगी परीक्षाओं की तैयारी अब आसान!
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            UPSSSC PET, UP Police, SSC, Railway, UPPSC, UPSC, CTET, Lekhpal और बैंकिंग परीक्षाओं के लिए सरल हिंदी में प्रमाणित नोट्स, दैनिक करेंट अफेयर्स और अभ्यास प्रश्न।
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleHeroSearch}
            role="search"
            className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
          >
            <div className="relative flex-1">
              <Search
                className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <label htmlFor="hero-search-input" className="sr-only">
                यहां टॉपिक या परीक्षा खोजें
              </label>
              <input
                id="hero-search-input"
                type="search"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="यहां टॉपिक या परीक्षा खोजें"
                className="w-full h-12 pl-11 pr-4 rounded-lg border border-slate-300 bg-white text-sm sm:text-base text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#C81E1E]"
              />
            </div>
            <button
              type="submit"
              className="h-12 px-6 rounded-lg bg-[#C81E1E] text-white text-sm sm:text-base font-semibold hover:bg-[#991B1B] transition-colors whitespace-nowrap shrink-0"
            >
              खोजें
            </button>
          </form>

          {/* Target Exams Clean Links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-600">
            <span className="font-semibold text-slate-900">लक्ष्य परीक्षाएँ:</span>
            {TARGET_EXAMS.map((exam) => (
              <a
                key={exam}
                href={`/search?q=${encodeURIComponent(exam.split(' ')[0])}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/search?q=${encodeURIComponent(exam.split(' ')[0])}`);
                }}
                className="hover:text-[#C81E1E] hover:underline transition-colors"
              >
                {exam}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Popular Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">प्रमुख श्रेणियाँ (Popular Categories)</h2>
            <p className="text-sm text-slate-600 mt-1">
              अपने विषय का चयन करें और व्यवस्थित अध्ययन सामग्री पढ़ें
            </p>
          </div>
          <a
            href="/category/general-knowledge"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/category/general-knowledge');
            }}
            className="text-sm font-semibold text-[#C81E1E] hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <span>सभी {CATEGORIES.length} श्रेणियाँ देखें</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {POPULAR_CATEGORIES.map((cat) => {
            const count = getArticlesByCategory(cat.slug).length;
            return (
              <a
                key={cat.id}
                href={`/category/${cat.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/category/${cat.slug}`);
                }}
                className="group p-4 sm:p-5 bg-white border border-slate-200 rounded-lg hover:border-[#C81E1E] transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#C81E1E] transition-colors">
                    {cat.nameHi}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{cat.nameEn}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="tabular-nums">{count} लेख उपलब्ध</span>
                  <ArrowRight
                    className="w-4 h-4 text-slate-400 group-hover:text-[#C81E1E] transition-colors"
                    aria-hidden="true"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* 3. Latest Articles (2-column desktop, 1-column mobile) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">नवीनतम लेख (Latest Articles)</h2>
            <p className="text-sm text-slate-600 mt-1">
              परीक्षा पाठ्यक्रम के अनुसार अद्यतन नोट्स और अभ्यास लेख
            </p>
          </div>
          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/search');
            }}
            className="text-sm font-semibold text-[#C81E1E] hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <span>सभी लेख देखें</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* 4. Important Study Materials */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              महत्वपूर्ण स्टडी मटेरियल (Study Materials)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              त्वरित रिवीजन के लिए PDF नोट्स, पिछले वर्षों के पेपर और मॉक टेस्ट
            </p>
          </div>
          <a
            href="/study-material"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/study-material');
            }}
            className="text-sm font-semibold text-[#C81E1E] hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <span>स्टडी मटेरियल केंद्र खोलें</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STUDY_MATERIAL_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.type}
                href={`/study-material?type=${card.type}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/study-material?type=${card.type}`);
                }}
                className="group p-5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-white hover:border-[#C81E1E] transition-colors flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C81E1E]/10 text-[#C81E1E] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#C81E1E]">
                  {card.title}
                </h3>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">{card.subtitle}</p>
                <p className="text-sm text-slate-600 leading-relaxed mt-2 flex-1">{card.desc}</p>
                <span className="mt-4 text-xs font-semibold text-[#C81E1E] inline-flex items-center gap-1">
                  <span>अभी देखें</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* 5. Current Affairs Section + 6. Popular Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-b border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Current Affairs Section */}
          <div className="lg:col-span-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  करेंट अफेयर्स (Current Affairs)
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  दैनिक, साप्ताहिक और मासिक समसामयिकी संकलन
                </p>
              </div>
              <div
                role="tablist"
                aria-label="करेंट अफेयर्स अवधि"
                className="inline-flex items-center p-1 bg-slate-100 rounded-lg self-start"
              >
                {(
                  [
                    { id: 'daily', label: 'दैनिक' },
                    { id: 'weekly', label: 'साप्ताहिक' },
                    { id: 'monthly', label: 'मासिक' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={caPeriod === tab.id}
                    onClick={() => setCaPeriod(tab.id)}
                    className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      caPeriod === tab.id
                        ? 'bg-white text-[#C81E1E] shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg bg-white">
              {currentAffairsList.map((post) => (
                <article key={post.id} className="p-5 hover:bg-slate-50/70 transition-colors">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-[#C81E1E]">
                      {caPeriod === 'daily'
                        ? 'Daily Current Affairs'
                        : caPeriod === 'weekly'
                          ? 'Weekly Current Affairs'
                          : 'Monthly Current Affairs'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.publishedAt} className="tabular-nums">
                      {post.publishedAtDisplay}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{post.readTimeMinutes} मिनट</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    <a
                      href={`/article/${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/article/${post.slug}`);
                      }}
                      className="hover:text-[#C81E1E] transition-colors"
                    >
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-4">
              <a
                href="/category/current-affairs"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/category/current-affairs');
                }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C81E1E] hover:underline"
              >
                <span>सभी करेंट अफेयर्स लेख पढ़ें</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* 6. Popular Posts */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              लोकप्रिय लेख (Popular Posts)
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              विद्यार्थियों द्वारा सर्वाधिक पढ़े गए अध्ययन लेख
            </p>

            <ol className="divide-y divide-slate-200 border border-slate-200 rounded-lg bg-white">
              {popularArticles.map((post, index) => (
                <li key={post.id} className="p-4 hover:bg-slate-50/70 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <span className="text-lg font-bold text-[#C81E1E] tabular-nums leading-none mt-0.5 shrink-0">
                      0{index + 1}.
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        <a
                          href={`/article/${post.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/article/${post.slug}`);
                          }}
                          className="hover:text-[#C81E1E] transition-colors"
                        >
                          {post.title}
                        </a>
                      </h3>
                      <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
                        <span>{post.publishedAtDisplay}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">
                          {post.views.toLocaleString('en-IN')} पाठक
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 7. Newsletter Subscription */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        <div className="border border-slate-200 rounded-lg bg-slate-50 p-6 sm:p-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            दैनिक परीक्षा अपडेट और फ्री नोट्स ईमेल पर पाएं
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            हर सुबह करेंट अफेयर्स, नए मॉक टेस्ट और परीक्षा तिथियों की जानकारी सीधे अपने इनबॉक्स में प्राप्त करें।
          </p>

          {newsletterStatus === 'success' ? (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" aria-hidden="true" />
              <span>धन्यवाद! आपका ईमेल सफलतापूर्वक पंजीकृत हो गया है।</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-6 max-w-lg mx-auto flex flex-col sm:flex-row gap-2.5"
              noValidate
            >
              <label htmlFor="newsletter-email" className="sr-only">
                ईमेल पता दर्ज करें
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  if (newsletterStatus === 'error') setNewsletterStatus('idle');
                }}
                placeholder="अपना ईमेल पता लिखें (उदा. student@example.com)"
                className="flex-1 h-11 px-4 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#C81E1E]"
                required
              />
              <button
                type="submit"
                className="h-11 px-6 rounded-lg bg-[#111827] text-white text-sm font-semibold hover:bg-[#C81E1E] transition-colors whitespace-nowrap shrink-0"
              >
                सदस्यता लें
              </button>
            </form>
          )}
          {newsletterStatus === 'error' && (
            <p className="mt-2 text-xs font-medium text-rose-700">
              कृपया एक मान्य ईमेल पता दर्ज करें।
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
