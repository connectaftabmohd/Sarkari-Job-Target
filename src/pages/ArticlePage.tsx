import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  Download,
  List,
  Share2,
} from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { McqBlock } from '../components/McqBlock';
import { SeoHead } from '../components/SeoHead';
import {
  getArticleBySlug,
  getPublishedArticles,
  getRelatedArticles,
} from '../data/articles';
import { getCategoryBySlug } from '../data/categories';
import { downloadArticleStudyNotes } from '../utils/pdfDownload';

interface ArticlePageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function ArticlePage({ slug, onNavigate }: ArticlePageProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadedNote, setDownloadedNote] = useState(false);

  const article = getArticleBySlug(slug);
  const allArticles = getPublishedArticles();

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <SeoHead
          title="लेख उपलब्ध नहीं है – Sarkari Job Target"
          description="क्षमा करें, आपके द्वारा खोजा गया लेख उपलब्ध नहीं है।"
          canonicalPath={`/article/${slug}`}
        />
        <h1 className="text-2xl font-bold text-slate-900">क्षमा करें, यह लेख उपलब्ध नहीं है</h1>
        <p className="mt-3 text-sm text-slate-600">
          हो सकता है कि यह लेख हटा दिया गया हो या इसका लिंक बदल गया हो।
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="mt-6 px-5 py-2.5 rounded-lg bg-[#174EA6] text-white text-sm font-semibold hover:bg-[#123D85] transition-colors"
        >
          होमपेज पर वापस जाएं
        </button>
      </div>
    );
  }

  const category = getCategoryBySlug(article.categorySlug);
  const relatedArticles = getRelatedArticles(article, 2);

  const currentIdx = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIdx < allArticles.length - 1 ? allArticles[currentIdx + 1] : null;
  const nextArticle = currentIdx > 0 ? allArticles[currentIdx - 1] : null;

  const canonicalPath = `/article/${article.slug}`;
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${canonicalPath}`
      : `https://sarkarijobtarget.in${canonicalPath}`;

  const handleTocClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(false);
    }
  };

  const handlePdfDownload = () => {
    downloadArticleStudyNotes(article);
    setDownloadedNote(true);
    setTimeout(() => setDownloadedNote(false), 3000);
  };

  const breadcrumbs = [
    { name: 'होम', path: '/' },
    ...(category ? [{ name: category.nameHi, path: `/category/${category.slug}` }] : []),
    { name: article.title, path: canonicalPath },
  ];

  return (
    <div className="bg-white">
      <SeoHead
        title={article.seoTitle}
        description={article.seoDescription}
        canonicalPath={canonicalPath}
        ogType="article"
        ogImage={article.featuredImage}
        breadcrumbs={breadcrumbs}
        articleSchema={{
          headline: article.title,
          description: article.seoDescription,
          image: article.featuredImage,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          authorName: article.author.name,
          url: canonicalPath,
        }}
      />

      <article className="max-w-[750px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="ब्रेडक्रम्ब" className="mb-6 text-xs sm:text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
                className="hover:text-[#174EA6] hover:underline"
              >
                होम
              </a>
            </li>
            {category && (
              <>
                <li aria-hidden="true">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </li>
                <li>
                  <a
                    href={`/category/${category.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/category/${category.slug}`);
                    }}
                    className="hover:text-[#174EA6] hover:underline font-medium text-[#174EA6]"
                  >
                    {category.nameHi}
                  </a>
                </li>
              </>
            )}
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </li>
            <li aria-current="page" className="text-slate-500 truncate max-w-[260px] sm:max-w-sm">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-7">
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 leading-snug">
            {article.title}
          </h1>

          {/* Unboxed Metadata */}
          <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-slate-600">
            <span className="font-semibold text-slate-800">{article.author.name}</span>
            <span aria-hidden="true">·</span>
            <span>{article.author.role}</span>
            <span aria-hidden="true">·</span>
            <span>
              प्रकाशन: <time dateTime={article.publishedAt}>{article.publishedAtDisplay}</time>
            </span>
            {article.updatedAt !== article.publishedAt && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  अपडेट: <time dateTime={article.updatedAt}>{article.updatedAtDisplay}</time>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.readTimeMinutes} मिनट पठन</span>
          </div>

          <div className="mt-2.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-700 mr-1.5">उपयोगी परीक्षाएँ:</span>
            {article.examTags.join(' · ')}
          </div>
        </header>

        {/* Featured Image */}
        <figure className="mb-8">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            <ImageWithFallback
              src={article.featuredImage}
              alt={article.featuredImageAlt}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="mt-2 text-xs text-slate-500">
            {article.featuredImageAlt}
          </figcaption>
        </figure>

        {/* PDF Download Callout (when available) */}
        {article.pdfAvailable && (
          <div className="mb-8 p-4 sm:p-5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                {article.pdfTitle || 'इस लेख के अध्ययन नोट्स डाउनलोड करें'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                ऑफलाइन रिवीजन और प्रिंट करने के लिए संपूर्ण नोट्स व अभ्यास प्रश्न सहेजें।
              </p>
            </div>
            <button
              type="button"
              onClick={handlePdfDownload}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#174EA6] text-white text-sm font-semibold hover:bg-[#123D85] transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>{downloadedNote ? 'डाउनलोड पूर्ण' : 'नोट्स डाउनलोड करें'}</span>
            </button>
          </div>
        )}

        {/* Table of Contents */}
        {article.sections.length > 0 && (
          <nav
            aria-label="विषय-सूची"
            className="mb-8 p-5 rounded-lg border border-slate-200 bg-white"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
              <List className="w-4 h-4 text-[#174EA6]" aria-hidden="true" />
              <span>विषय-सूची (Table of Contents)</span>
            </div>
            <ol className="space-y-2 text-sm">
              {article.sections.map((sec, idx) => (
                <li key={sec.id} className={sec.level === 'h3' ? 'pl-5' : ''}>
                  <button
                    type="button"
                    onClick={() => handleTocClick(sec.id)}
                    className="text-left text-[#174EA6] hover:underline font-medium"
                  >
                    <span className="tabular-nums mr-1.5 text-slate-500">{idx + 1}.</span>
                    {sec.heading}
                  </button>
                </li>
              ))}
              {article.mcqs.length > 0 && (
                <li>
                  <button
                    type="button"
                    onClick={() => handleTocClick('mcq-practice-heading')}
                    className="text-left text-[#174EA6] hover:underline font-medium"
                  >
                    <span className="tabular-nums mr-1.5 text-slate-500">
                      {article.sections.length + 1}.
                    </span>
                    अभ्यास प्रश्न (MCQs)
                  </button>
                </li>
              )}
            </ol>
          </nav>
        )}

        {/* Main Body Content */}
        <div className="space-y-8 text-slate-800">
          {article.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-24">
              {sec.level === 'h2' ? (
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3.5">
                  {sec.heading}
                </h2>
              ) : (
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
                  {sec.heading}
                </h3>
              )}

              <div className="space-y-4 text-base sm:text-[17px] leading-[1.85] text-slate-800">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                <ul className="mt-4 space-y-2.5 pl-5 list-disc text-base sm:text-[17px] leading-[1.8] text-slate-800">
                  {sec.bulletPoints.map((point, bIdx) => (
                    <li key={bIdx}>{point}</li>
                  ))}
                </ul>
              )}

              {sec.infoBox && (
                <div className="mt-5 p-4 sm:p-5 rounded-lg border border-[#174EA6]/25 bg-[#174EA6]/[0.04]">
                  <p className="text-sm font-bold text-[#174EA6] mb-1">{sec.infoBox.title}</p>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {sec.infoBox.content}
                  </p>
                </div>
              )}

              {sec.table && (
                <div className="mt-5 overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-sm">
                    {sec.table.caption && (
                      <caption className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 bg-slate-50 border-b border-slate-200">
                        {sec.table.caption}
                      </caption>
                    )}
                    <thead className="bg-slate-50 text-slate-900">
                      <tr>
                        {sec.table.headers.map((header, hIdx) => (
                          <th
                            key={hIdx}
                            scope="col"
                            className="px-4 py-3 font-bold border-b border-slate-200 whitespace-nowrap"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {sec.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/60">
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className="px-4 py-3 text-slate-700 leading-relaxed tabular-nums"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Interactive MCQ Section */}
        <McqBlock questions={article.mcqs} />

        {/* Social Sharing Buttons */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Share2 className="w-4 h-4 text-[#174EA6]" aria-hidden="true" />
            <span>यह लेख अपने सहपाठियों के साथ साझा करें:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${article.title} - ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#174EA6] hover:text-[#174EA6] transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#174EA6] hover:text-[#174EA6] transition-colors"
            >
              Telegram
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#174EA6] hover:text-[#174EA6] transition-colors"
            >
              X (Twitter)
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#174EA6] hover:text-[#174EA6] transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                  <span>लिंक कॉपी हुआ</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>लिंक कॉपी करें</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Previous and Next Article Navigation */}
        <nav
          aria-label="पिछला एवं अगला लेख"
          className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {prevArticle ? (
            <a
              href={`/article/${prevArticle.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/article/${prevArticle.slug}`);
              }}
              className="p-4 rounded-lg border border-slate-200 hover:border-[#174EA6] transition-colors flex flex-col justify-between"
            >
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 mb-1.5">
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                पिछला लेख
              </span>
              <span className="text-sm font-bold text-slate-900 line-clamp-2">
                {prevArticle.title}
              </span>
            </a>
          ) : (
            <div />
          )}

          {nextArticle && (
            <a
              href={`/article/${nextArticle.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/article/${nextArticle.slug}`);
              }}
              className="p-4 rounded-lg border border-slate-200 hover:border-[#174EA6] transition-colors flex flex-col justify-between sm:text-right"
            >
              <span className="inline-flex items-center sm:justify-end gap-1 text-xs font-semibold text-slate-500 mb-1.5">
                अगला लेख
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold text-slate-900 line-clamp-2">
                {nextArticle.title}
              </span>
            </a>
          )}
        </nav>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section aria-labelledby="related-articles-heading" className="mt-12 pt-8 border-t border-slate-200">
            <h2 id="related-articles-heading" className="text-xl font-bold text-slate-900 mb-5">
              संबंधित लेख (Related Articles)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} onNavigate={onNavigate} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
