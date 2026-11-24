import { FormEvent, useState } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';

export type StaticPageType = 'about' | 'contact' | 'privacy' | 'disclaimer' | 'terms';

interface StaticInfoPageProps {
  pageType: StaticPageType;
  onNavigate: (path: string) => void;
}

const PAGE_META: Record<
  StaticPageType,
  {
    path: string;
    heading: string;
    seoTitle: string;
    seoDescription: string;
  }
> = {
  about: {
    path: '/about',
    heading: 'हमारे बारे में (About Us)',
    seoTitle: 'हमारे बारे में (About Us) – Sarkari Job Target',
    seoDescription: 'Sarkari Job Target हिंदी माध्यम के विद्यार्थियों को UPSSSC, SSC, Railway और UPPSC परीक्षाओं के लिए निशुल्क व सटीक अध्ययन सामग्री प्रदान करने वाला शैक्षणिक मंच है।',
  },
  contact: {
    path: '/contact',
    heading: 'संपर्क करें (Contact Us)',
    seoTitle: 'संपर्क करें (Contact Us) – Sarkari Job Target',
    seoDescription: 'Sarkari Job Target के संपादकीय दल से सुझाव, त्रुटि सुधार या अध्ययन सामग्री के अनुरोध के लिए संपर्क करें।',
  },
  privacy: {
    path: '/privacy-policy',
    heading: 'गोपनीयता नीति (Privacy Policy)',
    seoTitle: 'गोपनीयता नीति (Privacy Policy) – Sarkari Job Target',
    seoDescription: 'Sarkari Job Target की गोपनीयता नीति, कुकी उपयोग और पाठक डेटा सुरक्षा से संबंधित दिशा-निर्देश।',
  },
  disclaimer: {
    path: '/disclaimer',
    heading: 'अस्वीकरण (Disclaimer)',
    seoTitle: 'अस्वीकरण (Disclaimer) – Sarkari Job Target',
    seoDescription: 'Sarkari Job Target एक स्वतंत्र शैक्षणिक प्रकाशन है, इसका किसी सरकारी संस्था या आयोग से आधिकारिक संबंध नहीं है।',
  },
  terms: {
    path: '/terms',
    heading: 'नियम एवं शर्तें (Terms and Conditions)',
    seoTitle: 'नियम एवं शर्तें (Terms & Conditions) – Sarkari Job Target',
    seoDescription: 'Sarkari Job Target वेबसाइट और इसके शैक्षणिक लेखों व PDF नोट्स के उपयोग से संबंधित नियम एवं शर्तें।',
  },
};

export function StaticInfoPage({ pageType, onNavigate }: StaticInfoPageProps) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const meta = PAGE_META[pageType];

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setSubmitted(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  return (
    <div className="max-w-[750px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <SeoHead
        title={meta.seoTitle}
        description={meta.seoDescription}
        canonicalPath={meta.path}
        breadcrumbs={[
          { name: 'होम', path: '/' },
          { name: meta.heading, path: meta.path },
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
            {meta.heading}
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 pb-5 border-b border-slate-200 mb-6">
        {meta.heading}
      </h1>

      {pageType === 'about' && (
        <div className="space-y-5 text-base leading-[1.85] text-slate-800">
          <p>
            <strong>Sarkari Job Target</strong> एक स्वतंत्र हिंदी शैक्षणिक प्रकाशन है, जिसकी स्थापना भारत के हिंदी भाषी क्षेत्रों के प्रतियोगी परीक्षा अभ्यर्थियों को सरल, प्रमाणित और परीक्षा-केंद्रित अध्ययन सामग्री उपलब्ध कराने के उद्देश्य से की गई है।
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-2">हमारा लक्ष्य एवं विषय क्षेत्र</h2>
          <p>
            हम UPSSSC PET, UP Police Constable / SI, SSC GD / CGL / CHSL, Railway NTPC / Group D, UPPSC, UPSC, CTET / UPTET, Lekhpal, VDO और बैंकिंग परीक्षाओं के पाठ्यक्रम के अनुसार दैनिक करेंट अफेयर्स, सामान्य ज्ञान, हिंदी व्याकरण, गणित, रीजनिंग और पिछले वर्षों के प्रश्न-पत्र प्रकाशित करते हैं।
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-2">संपादकीय मानक</h2>
          <p>
            हमारे सभी लेख विषय विशेषज्ञों द्वारा NCERT, मानक पाठ्यपुस्तकों और आधिकारिक परीक्षा अधिसूचनाओं के आधार पर तैयार किए जाते हैं, ताकि विद्यार्थियों को भ्रम रहित व अद्यतन जानकारी प्राप्त हो।
          </p>
        </div>
      )}

      {pageType === 'contact' && (
        <div className="space-y-6 text-base leading-[1.85] text-slate-800">
          <p>
            यदि आपको किसी लेख में तथ्यात्मक सुधार का सुझाव देना है, किसी विषय के नोट्स का अनुरोध करना है या कोई प्रश्न पूछना है, तो आप नीचे दिए गए संदेश फॉर्म या ईमेल के माध्यम से हमारे संपादकीय दल से संपर्क कर सकते हैं।
          </p>
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700">
            <p>
              <strong>संपादकीय ईमेल:</strong> contact@sarkarijobtarget.in
            </p>
            <p className="mt-1">
              <strong>कार्य समय:</strong> सोमवार से शनिवार, प्रातः 10:00 बजे से सायं 6:00 बजे तक
            </p>
          </div>

          {submitted ? (
            <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50 text-sm text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" aria-hidden="true" />
              <span>आपका संदेश प्राप्त हो गया है। हमारी टीम शीघ्र ही उत्तर देगी।</span>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-800 mb-1">
                  आपका नाम
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#174EA6]"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-800 mb-1">
                  ईमेल पता
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#174EA6]"
                />
              </div>
              <div>
                <label htmlFor="contact-msg" className="block text-sm font-semibold text-slate-800 mb-1">
                  संदेश / सुझाव
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full p-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#174EA6]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#174EA6] text-white text-sm font-semibold hover:bg-[#123D85] transition-colors"
              >
                संदेश भेजें
              </button>
            </form>
          )}
        </div>
      )}

      {pageType === 'privacy' && (
        <div className="space-y-5 text-base leading-[1.85] text-slate-800">
          <p>
            Sarkari Job Target अपने पाठकों की गोपनीयता का सम्मान करता है। यह पृष्ठ बताता है कि हम कौन-सी जानकारी एकत्र करते हैं और उसका उपयोग किस प्रकार किया जाता है।
          </p>
          <h2 className="text-xl font-bold text-slate-900">1. एकत्र की जाने वाली जानकारी</h2>
          <p>
            हमारी वेबसाइट पर बिना किसी पंजीकरण के सभी अध्ययन लेख पढ़े जा सकते हैं। यदि आप न्यूज़लेटर या संपर्क फॉर्म का उपयोग करते हैं, तो केवल आपका नाम व ईमेल पता संवाद के उद्देश्य से उपयोग किया जाता है।
          </p>
          <h2 className="text-xl font-bold text-slate-900">2. बाहरी लिंक एवं सुरक्षा</h2>
          <p>
            पाठकों की सुविधा के लिए आधिकारिक परीक्षा पोर्टल या अध्ययन संसाधनों के बाहरी लिंक दिए जा सकते हैं। किसी भी तीसरे पक्ष की वेबसाइट की गोपनीयता नीति के लिए हम उत्तरदायी नहीं हैं।
          </p>
        </div>
      )}

      {pageType === 'disclaimer' && (
        <div className="space-y-5 text-base leading-[1.85] text-slate-800">
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800">
            <strong>महत्वपूर्ण सूचना:</strong> Sarkari Job Target एक स्वतंत्र शैक्षणिक ब्लॉग और अध्ययन मंच है। यह किसी भी भारत सरकार या राज्य सरकार के मंत्रालय, UPSSSC, SSC, RRB, UPPSC अथवा UPSC से संबद्ध आधिकारिक वेबसाइट नहीं है।
          </div>
          <p>
            वेबसाइट पर प्रकाशित सभी परीक्षा नोट्स, सामान्य ज्ञान, अभ्यास प्रश्न और परीक्षा पैटर्न जानकारी विद्यार्थियों की सहायता के लिए तैयार किए गए हैं। यद्यपि हम तथ्यों की पूर्ण सटीकता का ध्यान रखते हैं, फिर भी किसी भी भर्ती, आवेदन तिथि, शुल्क या पात्रता की अंतिम पुष्टि के लिए संबंधित आयोग की आधिकारिक वेबसाइट अवश्य देखें।
          </p>
        </div>
      )}

      {pageType === 'terms' && (
        <div className="space-y-5 text-base leading-[1.85] text-slate-800">
          <p>
            Sarkari Job Target वेबसाइट का उपयोग करके आप निम्नलिखित शर्तों से सहमत होते हैं:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>वेबसाइट पर उपलब्ध सभी हिंदी लेख और अध्ययन नोट्स केवल व्यक्तिगत शैक्षणिक एवं परीक्षा तैयारी उपयोग के लिए हैं।</li>
            <li>बिना लिखित अनुमति के संपूर्ण सामग्री का व्यावसायिक पुनःप्रकाशन वर्जित है।</li>
            <li>परीक्षा से जुड़े किसी भी निर्णय से पूर्व आधिकारिक विज्ञप्ति का सत्यापन करना पाठक की स्वयं की जिम्मेदारी होगी।</li>
          </ul>
        </div>
      )}
    </div>
  );
}
