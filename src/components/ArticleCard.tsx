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
    <article className="group flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition-colors duration-150">
      <a
        href={articlePath}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(articlePath);
        }}
        className="block aspect-[4/3] w-full overflow-hidden bg-slate-100"
      >
        <ImageWithFallback
          src={article.featuredImage}
          alt={article.featuredImageAlt}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
        />
      </a>

      <div className="flex-1 p-5 flex flex-col">
        {/* Clean Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-2.5">
          {category && (
            <a
              href={`/category/${category.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/category/${category.slug}`);
              }}
              className="font-semibold text-[#174EA6] hover:underline"
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

        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-[#174EA6] transition-colors">
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

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-1">
          {article.excerpt}
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <a
            href={articlePath}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(articlePath);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#174EA6] hover:text-[#123D85] transition-colors"
          >
            <span>पूरा पढ़ें</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          {article.pdfAvailable && (
            <span className="text-xs font-medium text-[#B45309]">PDF उपलब्ध</span>
          )}
        </div>
      </div>
    </article>
  );
}
