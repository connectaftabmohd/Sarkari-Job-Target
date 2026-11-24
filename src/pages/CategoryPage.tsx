import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';
import { SeoHead } from '../components/SeoHead';
import { getArticlesByCategory, getLatestArticles } from '../data/articles';
import { CATEGORIES, getCategoryBySlug } from '../data/categories';

interface CategoryPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

const ITEMS_PER_PAGE = 4;

export function CategoryPage({ slug, onNavigate }: CategoryPageProps) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [slug]);

  const category = getCategoryBySlug(slug);

  if (!category) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <SeoHead
          title="श्रेणी उपलब्ध नहीं है – Sarkari Job Target"
          description="आपके द्वारा खोजी गई श्रेणी उपलब्ध नहीं है।"
          canonicalPath={`/category/${slug}`}
        />
        <h1 className="text-2xl font-bold text-slate-900">श्रेणी नहीं मिली</h1>
        <p className="mt-2 text-sm text-slate-600">
          कृपया उपलब्ध श्रेणियों में से किसी एक का चयन करें।
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="mt-6 px-5 py-2.5 rounded-lg bg-[#C81E1E] text-white text-sm font-semibold hover:bg-[#991B1B] transition-colors"
        >
          होमपेज पर जाएं
        </button>
      </div>
    );
  }

  const categoryArticles = getArticlesByCategory(category.slug);
  const totalPages = Math.max(1, Math.ceil(categoryArticles.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginatedArticles = categoryArticles.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const recommendedArticles =
    categoryArticles.length < 2
      ? getLatestArticles(4).filter((a) => a.categorySlug !== category.slug).slice(0, 2)
      : [];

  const canonicalPath = `/category/${category.slug}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <SeoHead
        title={category.seoTitle}
        description={category.seoDescription}
        canonicalPath={canonicalPath}
        breadcrumbs={[
          { name: 'होम', path: '/' },
          { name: category.nameHi, path: canonicalPath },
        ]}
      />

      {/* Breadcrumb */}
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
            {category.nameHi} ({category.nameEn})
          </li>
        </ol>
      </nav>

      {/* Category Header */}
      <header className="pb-8 border-b border-slate-200 mb-8">
        <div className="text-xs font-semibold text-[#C81E1E] mb-1.5">{category.nameEn}</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{category.nameHi}</h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {category.descriptionHi}
        </p>

        {/* All 12 Categories Switcher */}
        <div className="mt-6 flex flex-wrap gap-2" aria-label="सभी 12 परीक्षा श्रेणियाँ">
          {CATEGORIES.map((cat) => {
            const active = cat.slug === category.slug;
            return (
              <a
                key={cat.id}
                href={`/category/${cat.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/category/${cat.slug}`);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#C81E1E] border-[#C81E1E] text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-[#C81E1E] hover:text-[#C81E1E]'
                }`}
              >
                {cat.nameHi}
              </a>
            );
          })}
        </div>
      </header>

      {/* Articles Grid */}
      {paginatedArticles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} onNavigate={onNavigate} />
            ))}
          </div>

          {/* Pagination */}
          <nav
            aria-label="पृष्ठ नेविगेशन"
            className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-xs sm:text-sm text-slate-600 tabular-nums">
              पृष्ठ {safePage} / {totalPages} (कुल {categoryArticles.length} लेख)
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 hover:border-[#C81E1E] disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>पिछला</span>
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPage(num)}
                  aria-current={num === safePage ? 'page' : undefined}
                  className={`w-9 h-9 rounded-lg text-xs sm:text-sm font-semibold tabular-nums border transition-colors ${
                    num === safePage
                      ? 'bg-[#C81E1E] border-[#C81E1E] text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-[#C81E1E]'
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 hover:border-[#C81E1E] disabled:opacity-40 disabled:pointer-events-none"
              >
                <span>अगला</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </nav>
        </>
      ) : (
        <div className="p-8 border border-slate-200 rounded-lg text-center bg-slate-50">
          <p className="text-base font-semibold text-slate-800">
            इस श्रेणी में शीघ्र ही नए लेख प्रकाशित किए जाएंगे।
          </p>
        </div>
      )}

      {recommendedArticles.length > 0 && (
        <section className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-5">अन्य उपयोगी परीक्षा लेख</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedArticles.map((art) => (
              <ArticleCard key={art.id} article={art} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
