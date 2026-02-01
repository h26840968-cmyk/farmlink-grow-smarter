import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage';
import { Language, languageNames } from '@/lib/translations';
import { Globe } from 'lucide-react';

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
      <SelectTrigger className="w-auto min-w-[140px] bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card transition-colors">
        <Globe className="w-4 h-4 mr-2 text-primary" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] bg-card border-border">
        {(Object.entries(languageNames) as [Language, string][]).map(([code, name]) => (
          <SelectItem key={code} value={code} className="cursor-pointer hover:bg-muted">
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
