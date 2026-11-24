import { useEffect } from 'react';

export interface BreadcrumbSchemaItem {
  name: string;
  path: string;
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  url: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  breadcrumbs?: BreadcrumbSchemaItem[];
  articleSchema?: ArticleSchemaInput;
}

function upsertMetaTag(attrName: 'name' | 'property', attrValue: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(url: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export function SeoHead({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage,
  breadcrumbs,
  articleSchema,
}: SeoHeadProps) {
  useEffect(() => {
    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : 'https://sarkarijobtarget.in';
    const fullUrl = `${origin}${canonicalPath}`;
    const resolvedImage = ogImage
      ? ogImage.startsWith('http')
        ? ogImage
        : `${origin}${ogImage}`
      : `${origin}/src/assets/images/article_current_affairs_1795516955434.jpg`;

    document.title = title;
    upsertMetaTag('name', 'description', description);
    upsertCanonical(fullUrl);

    upsertMetaTag('property', 'og:type', ogType);
    upsertMetaTag('property', 'og:site_name', 'Sarkari Job Target');
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:url', fullUrl);
    upsertMetaTag('property', 'og:image', resolvedImage);

    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', resolvedImage);

    const schemas: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Sarkari Job Target',
        url: origin,
        description:
          'प्रतियोगी परीक्षाओं की तैयारी के लिए विश्वसनीय हिंदी शैक्षणिक ब्लॉग और स्टडी मटेरियल प्लेटफॉर्म।',
      },
    ];

    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: item.name,
          item: `${origin}${item.path}`,
        })),
      });
    }

    if (articleSchema) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: articleSchema.headline,
        description: articleSchema.description,
        image: resolvedImage,
        datePublished: articleSchema.datePublished,
        dateModified: articleSchema.dateModified,
        author: {
          '@type': 'Person',
          name: articleSchema.authorName,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Sarkari Job Target',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl,
        },
        inLanguage: 'hi-IN',
      });
    }

    const existingScript = document.getElementById('sjt-structured-data');
    if (existingScript) {
      existingScript.remove();
    }
    const script = document.createElement('script');
    script.id = 'sjt-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemas);
    document.head.appendChild(script);
  }, [title, description, canonicalPath, ogType, ogImage, breadcrumbs, articleSchema]);

  return null;
}
