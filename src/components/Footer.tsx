interface FooterProps {
  onNavigate: (path: string) => void;
}

const FOOTER_LINKS = [
  { label: 'About Us (हमारे बारे में)', path: '/about' },
  { label: 'Contact Us (संपर्क करें)', path: '/contact' },
  { label: 'Privacy Policy (गोपनीयता नीति)', path: '/privacy-policy' },
  { label: 'Disclaimer (अस्वीकरण)', path: '/disclaimer' },
  { label: 'Terms and Conditions (नियम एवं शर्तें)', path: '/terms' },
];

const EXAM_LINKS = [
  { label: 'करेंट अफेयर्स', path: '/category/current-affairs' },
  { label: 'सामान्य ज्ञान', path: '/category/general-knowledge' },
  { label: 'भारतीय संविधान', path: '/category/indian-constitution' },
  { label: 'सामान्य हिंदी', path: '/category/general-hindi' },
  { label: 'स्टडी मटेरियल', path: '/study-material' },
  { label: 'परीक्षा अपडेट', path: '/exam-updates' },
];

export function Footer({ onNavigate }: FooterProps) {
  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-700 mt-16">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-flex items-center gap-2.5 text-lg font-bold text-slate-900"
            >
              <img
                src="/assets/aistudio/Sarkari_Job_Target_02a57cf7.jfif"
                alt="Sarkari Job Target Logo"
                className="w-9 h-9 object-contain rounded bg-white border border-slate-200 shrink-0"
              />
              <span>
                Sarkari Job <span className="text-[#C81E1E]">Target</span>
              </span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 max-w-md">
              UPSSSC PET, UP Police, SSC, Railway, UPPSC, UPSC, CTET, Lekhpal और बैंकिंग परीक्षाओं की तैयारी करने वाले विद्यार्थियों के लिए सरल हिंदी में प्रमाणित अध्ययन सामग्री एवं परीक्षा मार्गदर्शन।
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C81E1E] transition-colors"
              >
                YouTube
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C81E1E] transition-colors"
              >
                Telegram
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C81E1E] transition-colors"
              >
                X (Twitter)
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C81E1E] transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Study Links */}
          <div className="md:col-span-3">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">
              प्रमुख अध्ययन अनुभाग
            </h2>
            <ul className="space-y-2 text-sm">
              {EXAM_LINKS.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => handleLink(e, item.path)}
                    className="text-slate-600 hover:text-[#C81E1E] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Institutional Links */}
          <div className="md:col-span-4">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">
              महत्वपूर्ण पृष्ठ एवं नीतियाँ
            </h2>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => handleLink(e, item.path)}
                    className="text-slate-600 hover:text-[#C81E1E] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/editorial-cms-architecture"
                  onClick={(e) => handleLink(e, '/editorial-cms-architecture')}
                  className="text-slate-600 hover:text-[#C81E1E] transition-colors"
                >
                  CMS व एडमिन आर्किटेक्चर (डेमो व्यू)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 Sarkari Job Target. सर्वाधिकार सुरक्षित। यह एक स्वतंत्र शैक्षणिक प्रकाशन है।</p>
          <div className="flex items-center gap-4">
            <a href="/sitemap.xml" className="hover:text-[#C81E1E]">
              XML Sitemap
            </a>
            <span aria-hidden="true">·</span>
            <a href="/robots.txt" className="hover:text-[#C81E1E]">
              Robots.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
