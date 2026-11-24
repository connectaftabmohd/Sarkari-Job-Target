export type CurrentAffairsPeriod = 'daily' | 'weekly' | 'monthly';

export type PostStatus = 'published' | 'draft';

export interface Category {
  id: string;
  slug: string;
  nameHi: string;
  nameEn: string;
  descriptionHi: string;
  seoTitle: string;
  seoDescription: string;
  isPopular?: boolean;
}

export interface ArticleTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface ArticleSection {
  id: string;
  level: 'h2' | 'h3';
  heading: string;
  paragraphs: string[];
  bulletPoints?: string[];
  infoBox?: {
    title: string;
    content: string;
  };
  table?: ArticleTable;
}

export interface McqQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Article {
  id: string;
  slug: string;
  status: PostStatus;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  categorySlug: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  publishedAtDisplay: string;
  updatedAt: string;
  updatedAtDisplay: string;
  readTimeMinutes: number;
  views: number;
  featuredImage: string;
  featuredImageAlt: string;
  examTags: string[];
  currentAffairsPeriod?: CurrentAffairsPeriod;
  pdfAvailable?: boolean;
  pdfTitle?: string;
  sections: ArticleSection[];
  mcqs: McqQuestion[];
  relatedSlugs: string[];
}

export type StudyMaterialType = 'pdf-notes' | 'pyq' | 'practice-set' | 'mock-test';

export interface StudyMaterialItem {
  id: string;
  title: string;
  type: StudyMaterialType;
  typeLabelHi: string;
  examName: string;
  subjectHi: string;
  pagesOrQuestions: string;
  updatedDisplay: string;
  description: string;
  summaryContent: string[];
  linkedArticleSlug?: string;
}

export interface ExamUpdateItem {
  id: string;
  title: string;
  organization: string;
  categoryLabel: string;
  dateDisplay: string;
  lastDateDisplay?: string;
  summary: string;
  details: string[];
  linkedArticleSlug?: string;
}

export interface CmsSchemaField {
  field: string;
  type: string;
  description: string;
}
