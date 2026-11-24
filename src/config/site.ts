export const SITE_CONFIG = {
  name: 'Sarkari Job Target',
  defaultUrl: 'https://sarkarijobtarget.in',
  social: {
    facebook: 'https://www.facebook.com/sarkarijobtarget.in/',
    instagram: 'https://www.instagram.com/sarkarijobtarget.in/',
  },
  getOrigin(): string {
    const envUrl = import.meta.env.VITE_SITE_URL;
    if (typeof envUrl === 'string' && envUrl.trim().startsWith('http')) {
      return envUrl.trim().replace(/\/+$/, '');
    }
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin;
    }
    return this.defaultUrl;
  },
} as const;
