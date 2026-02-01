import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';
import { Leaf } from 'lucide-react';

export const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">{t.appName}</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">{t.tagline}</p>
          </div>
        </div>
        <LanguageSelector />
      </div>
    </header>
  );
};
