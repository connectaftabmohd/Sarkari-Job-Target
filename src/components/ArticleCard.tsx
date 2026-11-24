import { ArrowRight } from 'lucide-react';
import { getCategoryBySlug } from '../data/categories';
import { Article } from '../types/blog';
import { ImageWithFallback } from './ImageWithFallback';

interface ArticleCardProps {
  article: Article;
  onNavigate: (path: string) => void;
}

export function ArticleCard({ article, onNavigate }: ArticleCardProps) {
  const category = getCategoryBySlug(article.categorySlug);
  const articlePath = `/article/${article.slug}`;

  return (
    <article className="group flex flex-col lg:flex-row bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition-colors duration-150">
      <a
        href={articlePath}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(articlePath);
        }}
        className="block h-44 md:h-40 lg:h-auto lg:w-48 xl:w-52 w-full overflow-hidden bg-slate-100 shrink-0"
      >
        <ImageWithFallback
          src={article.featuredImage}
          alt={article.featuredImageAlt}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
        />
      </a>

      <div className="flex-1 min-w-0 p-4 sm:p-5 flex flex-col">
        {/* Clean Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-2">
          {category && (
            <a
              href={`/category/${category.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/category/${category.slug}`);
              }}
              className="font-semibold text-[#C81E1E] hover:underline"
            >
              {category.nameHi}
            </a>
          )}
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt} className="tabular-nums">
            {article.publishedAtDisplay}
          </time>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{article.readTimeMinutes} मिनट पठन</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-[#C81E1E] transition-colors">
          <a
            href={articlePath}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(articlePath);
            }}
          >
            {article.title}
          </a>
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4 flex-1">
          {article.excerpt}
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <a
            href={articlePath}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(articlePath);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C81E1E] hover:text-[#991B1B] transition-colors"
          >
            <span>पूरा पढ़ें</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          {article.pdfAvailable && (
            <span className="text-xs font-medium text-slate-700">PDF उपलब्ध</span>
          )}
        </div>
      </div>
    </article>
  );
}
