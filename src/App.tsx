import { Component, ErrorInfo, ReactNode, useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { CmsArchitecturePage } from './pages/CmsArchitecturePage';
import { ExamUpdatesPage } from './pages/ExamUpdatesPage';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { StaticInfoPage } from './pages/StaticInfoPage';
import { StudyMaterialPage } from './pages/StudyMaterialPage';

interface ErrorBoundaryProps {
  children: ReactNode;
  onReset: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Handled gracefully via fallback UI
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <h1 className="text-xl font-bold text-slate-900">
            पृष्ठ लोड करने में अस्थायी समस्या आई
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            कृपया होमपेज पर वापस जाएं या पृष्ठ को पुनः लोड करें।
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false });
              this.props.onReset();
            }}
            className="mt-5 px-5 py-2.5 rounded-lg bg-[#C81E1E] text-white text-sm font-semibold hover:bg-[#991B1B] transition-colors"
          >
            होमपेज पर जाएं
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function getCurrentLocation(): { pathname: string; search: string } {
  if (typeof window === 'undefined') {
    return { pathname: '/', search: '' };
  }
  return {
    pathname: window.location.pathname || '/',
    search: window.location.search || '',
  };
}

export default function App() {
  const [location, setLocation] = useState(getCurrentLocation);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.origin);
    const nextPath = url.pathname;
    const nextSearch = url.search;

    if (nextPath !== window.location.pathname || nextSearch !== window.location.search) {
      window.history.pushState({}, '', `${nextPath}${nextSearch}`);
    }
    setLocation({ pathname: nextPath, search: nextSearch });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setLocation(getCurrentLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    const params = new URLSearchParams(location.search);

    if (path === '/') {
      return <HomePage onNavigate={navigate} />;
    }

    if (path.startsWith('/category/')) {
      const slug = path.slice('/category/'.length);
      return <CategoryPage slug={slug} onNavigate={navigate} />;
    }

    if (path.startsWith('/article/')) {
      const slug = path.slice('/article/'.length);
      return <ArticlePage slug={slug} onNavigate={navigate} />;
    }

    if (path === '/study-material') {
      return (
        <StudyMaterialPage
          initialType={params.get('type') || undefined}
          onNavigate={navigate}
        />
      );
    }

    if (path === '/exam-updates') {
      return <ExamUpdatesPage onNavigate={navigate} />;
    }

    if (path === '/search') {
      return <SearchPage initialQuery={params.get('q') || ''} onNavigate={navigate} />;
    }

    if (path === '/about') {
      return <StaticInfoPage pageType="about" onNavigate={navigate} />;
    }
    if (path === '/contact') {
      return <StaticInfoPage pageType="contact" onNavigate={navigate} />;
    }
    if (path === '/privacy-policy') {
      return <StaticInfoPage pageType="privacy" onNavigate={navigate} />;
    }
    if (path === '/disclaimer') {
      return <StaticInfoPage pageType="disclaimer" onNavigate={navigate} />;
    }
    if (path === '/terms') {
      return <StaticInfoPage pageType="terms" onNavigate={navigate} />;
    }
    if (path === '/editorial-cms-architecture') {
      return <CmsArchitecturePage onNavigate={navigate} />;
    }

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">पृष्ठ नहीं मिला (404)</h1>
        <p className="mt-2 text-sm text-slate-600">
          आपके द्वारा खोजा गया पृष्ठ उपलब्ध नहीं है।
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-6 px-5 py-2.5 rounded-lg bg-[#C81E1E] text-white text-sm font-semibold hover:bg-[#991B1B] transition-colors"
        >
          होमपेज पर जाएं
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header currentPath={location.pathname} onNavigate={navigate} />
      <main className="flex-1">
        <AppErrorBoundary onReset={() => navigate('/')}>{renderPage()}</AppErrorBoundary>
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
