import { FormEvent, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const NAV_ITEMS = [
  { label: 'होम', path: '/' },
  { label: 'करेंट अफेयर्स', path: '/category/current-affairs' },
  { label: 'सामान्य ज्ञान', path: '/category/general-knowledge' },
  { label: 'हिंदी', path: '/category/general-hindi' },
  { label: 'गणित', path: '/category/mathematics' },
  { label: 'रीजनिंग', path: '/category/reasoning' },
  { label: 'स्टडी मटेरियल', path: '/study-material' },
  { label: 'परीक्षा अपडेट', path: '/exam-updates' },
];

export function Header({ currentPath, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setSearchOpen(false);
    onNavigate(path);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    setSearchOpen(false);
    setMobileMenuOpen(false);
    if (trimmed) {
      onNavigate(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      onNavigate('/search');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-20 lg:h-24 flex items-center justify-between gap-4 lg:gap-8">
        {/* Brand Zone */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C81E1E] rounded"
        >
          <img
            src="/assets/aistudio/Sarkari_Job_Target_02a57cf7.jfif"
            alt="Sarkari Job Target Logo"
            className="w-12 h-12 lg:w-16 lg:h-16 object-contain rounded bg-white shrink-0"
          />
          <span className="text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight text-slate-900">
            Sarkari Job <span className="text-[#C81E1E]">Target</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="मुख्य नेविगेशन"
          className="hidden xl:flex items-center gap-6 text-[15px] font-semibold text-slate-700"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.path === '/'
                ? currentPath === '/'
                : currentPath.startsWith(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                className={`whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#C81E1E] border-[#C81E1E]'
                    : 'border-transparent hover:text-[#C81E1E] hover:border-slate-300'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Actions: Search & Mobile Menu */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label={searchOpen ? 'खोज बंद करें' : 'टॉपिक या परीक्षा खोजें'}
            aria-expanded={searchOpen}
            className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:bg-red-50 hover:text-[#C81E1E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C81E1E]"
          >
            {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
            aria-expanded={mobileMenuOpen}
            className="xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:bg-red-50 hover:text-[#C81E1E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C81E1E]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-slate-200 bg-slate-50 px-4 sm:px-8 lg:px-12 xl:px-16 py-4">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-4xl mx-auto flex items-center gap-2.5"
            role="search"
          >
            <label htmlFor="header-search-input" className="sr-only">
              यहां टॉपिक या परीक्षा खोजें
            </label>
            <input
              id="header-search-input"
              type="search"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="यहां टॉपिक या परीक्षा खोजें (जैसे UPSSSC PET, संधि, मौलिक अधिकार)"
              className="flex-1 h-11 px-4 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#C81E1E]"
            />
            <button
              type="submit"
              className="h-11 px-5 rounded-lg bg-[#C81E1E] text-white text-sm font-semibold hover:bg-[#991B1B] transition-colors whitespace-nowrap shrink-0"
            >
              खोजें
            </button>
          </form>
        </div>
      )}

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="मोबाइल नेविगेशन"
          className="xl:hidden border-t border-slate-200 bg-white px-4 sm:px-8 py-3"
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.path);
              return (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#C81E1E]/10 text-[#C81E1E] font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
