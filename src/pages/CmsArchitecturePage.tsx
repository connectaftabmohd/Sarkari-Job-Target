import { ChevronRight, Database, FileCode2, Info } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { ARTICLES } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { CmsSchemaField } from '../types/blog';

interface CmsArchitecturePageProps {
  onNavigate: (path: string) => void;
}

const POST_SCHEMA_FIELDS: CmsSchemaField[] = [
  { field: 'slug', type: 'string (unique)', description: 'SEO-friendly English URL slug' },
  { field: 'status', type: "'published' | 'draft'", description: 'Publish / Unpublish workflow state' },
  { field: 'title', type: 'string', description: 'Hindi article H1 headline' },
  { field: 'seoTitle', type: 'string', description: 'Unique meta <title> & og:title' },
  { field: 'seoDescription', type: 'string', description: 'Unique meta description (120–160 chars)' },
  { field: 'categorySlug', type: 'string (FK)', description: 'Links to Category.slug' },
  { field: 'featuredImage', type: 'string (URL/Asset)', description: 'Featured image path + featuredImageAlt' },
  { field: 'pdfAvailable / pdfTitle', type: 'boolean / string', description: 'Controls PDF notes download button' },
  { field: 'sections / mcqs', type: 'JSON[]', description: 'Structured H2/H3 sections, tables, info boxes, and MCQs' },
];

export function CmsArchitecturePage({ onNavigate }: CmsArchitecturePageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <SeoHead
        title="CMS एवं एडमिन आर्किटेक्चर (Demo Blueprint) – Sarkari Job Target"
        description="Sarkari Job Target के भविष्य के CMS व डेटाबेस एकीकरण के लिए डेटा मॉडल और सामग्री प्रबंधन संरचना।"
        canonicalPath="/editorial-cms-architecture"
        breadcrumbs={[
          { name: 'होम', path: '/' },
          { name: 'CMS आर्किटेक्चर', path: '/editorial-cms-architecture' },
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
              className="hover:text-[#174EA6] hover:underline"
            >
              होम
            </a>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </li>
          <li aria-current="page" className="font-semibold text-slate-900">
            CMS व एडमिन आर्किटेक्चर
          </li>
        </ol>
      </nav>

      <header className="pb-6 border-b border-slate-200 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          CMS एवं एडमिन डेटा आर्किटेक्चर (Read-Only Blueprint)
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          भविष्य में हेडलेस CMS या डेटाबेस जोड़ने के लिए तैयार किया गया टाइप-सेफ डेटा स्कीमा और कंटेंट मॉडल।
        </p>
      </header>

      {/* Explicit Demo-Only Notice */}
      <div className="mb-8 p-5 rounded-lg border border-[#FF9800]/40 bg-amber-50/70 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-sm text-slate-800 leading-relaxed">
          <p className="font-bold text-slate-900">
            स्पष्टीकरण: केवल संरचनात्मक पूर्वावलोकन (Demo-Only / Backend Not Connected)
          </p>
          <p className="mt-1">
            यह वेबसाइट वर्तमान में स्थानीय JSON/TypeScript डेटा (<code className="text-xs bg-white px-1.5 py-0.5 rounded border border-slate-200">src/data/articles.ts</code>) से संचालित है। बैकएंड डेटाबेस या प्रमाणीकरण अभी जुड़ा नहीं है, इसलिए लेख बनाना/संपादित करना, श्रेणी प्रबंधन, SEO मेटा संपादन, पब्लिश/अनपब्लिश टॉगल और PDF अपलोड प्रबंधन यहाँ केवल भविष्य के CMS एकीकरण के ब्लूप्रिंट के रूप में दर्शाए गए हैं।
          </p>
        </div>
      </div>

      {/* Planned Admin Capabilities */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-[#174EA6]" aria-hidden="true" />
          <span>भविष्य के CMS / एडमिन मॉड्यूल की रूपरेखा</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'लेख निर्माण एवं संपादन',
              desc: 'रिच टेक्स्ट, H2/H3 अनुभाग, परीक्षा तालिका, इन्फो बॉक्स और MCQ जोड़ने के लिए संरचित संपादक।',
              status: 'Demo-Only (डेटाबेस लंबित)',
            },
            {
              title: 'फ़ीचर्ड इमेज एवं Alt टेक्स्ट',
              desc: '4:3 / 16:9 अनुकूलित छवि अपलोड और SEO के लिए अनिवार्य हिंदी alt विवरण।',
              status: 'Demo-Only (स्टोरेज लंबित)',
            },
            {
              title: 'श्रेणी प्रबंधन (12 श्रेणियाँ)',
              desc: 'अंग्रेजी स्लग, हिंदी नाम और श्रेणी-स्तरीय SEO मेटाडेटा का केंद्रीकृत प्रबंधन।',
              status: 'Demo-Only (स्थानीय डेटा सक्रिय)',
            },
            {
              title: 'SEO शीर्षक एवं मेटा विवरण',
              desc: 'प्रत्येक लेख के लिए अद्वितीय seoTitle, seoDescription, Canonical URL और JSON-LD स्कीमा।',
              status: 'स्कीमा सक्रिय · संपादन लंबित',
            },
            {
              title: 'Publish / Unpublish स्थिति',
              desc: "status: 'published' | 'draft' फ़ील्ड के माध्यम से ड्राफ्ट और प्रकाशित लेखों का नियंत्रण।",
              status: 'Demo-Only (API लंबित)',
            },
            {
              title: 'PDF डाउनलोड प्रबंधन',
              desc: 'स्टडी नोट्स, PYQ पेपर और मॉक टेस्ट फाइलों को लेखों व स्टडी मटेरियल से जोड़ना।',
              status: 'Demo-Only (ऑब्जेक्ट स्टोरेज लंबित)',
            },
          ].map((item) => (
            <div key={item.title} className="p-4 border border-slate-200 rounded-lg bg-white">
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              <p className="mt-3 pt-2.5 border-t border-slate-100 text-xs font-semibold text-[#B45309]">
                स्थिति: {item.status}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Schema Table */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FileCode2 className="w-5 h-5 text-[#174EA6]" aria-hidden="true" />
          <span>Article डेटा मॉडल (CMS-Ready TypeScript Schema)</span>
        </h2>
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="px-4 py-3 font-bold border-b border-slate-200">फ़ील्ड नाम</th>
                <th className="px-4 py-3 font-bold border-b border-slate-200">डेटा प्रकार</th>
                <th className="px-4 py-3 font-bold border-b border-slate-200">विवरण</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {POST_SCHEMA_FIELDS.map((row) => (
                <tr key={row.field}>
                  <td className="px-4 py-3 font-semibold text-[#174EA6]">{row.field}</td>
                  <td className="px-4 py-3 text-slate-700 font-mono text-xs">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Current Local Inventory Summary */}
      <section className="p-5 border border-slate-200 rounded-lg bg-slate-50">
        <h2 className="text-base font-bold text-slate-900 mb-2">वर्तमान स्थानीय डेटा सारांश</h2>
        <p className="text-sm text-slate-600 tabular-nums">
          सक्रिय श्रेणियाँ: <strong>{CATEGORIES.length}</strong> · प्रकाशित लेख:{' '}
          <strong>{ARTICLES.length}</strong> · XML Sitemap व Robots.txt रूट पर उपलब्ध।
        </p>
      </section>
    </div>
  );
}
