import polyglotI18nProvider from 'ra-i18n-polyglot';
import portugueseMessages from '../i18n/pt';

export default polyglotI18nProvider(
  // @ts-ignore
    locale => {
        // Always fallback on english
        return portugueseMessages;
    },
    'pt',
    [
        { locale: 'pt', name: 'Português' },
    ]
);
