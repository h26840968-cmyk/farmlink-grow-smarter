import { useLanguage } from '@/hooks/useLanguage';
import { Leaf } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary-foreground">{t.appName}</h3>
              <p className="text-xs text-primary-foreground/70">{t.tagline}</p>
            </div>
          </div>

          <p className="text-sm text-primary-foreground/80 text-center">
            {t.footer}
          </p>
        </div>
      </div>
    </footer>
  );
};
