import { useLanguage } from '@/hooks/useLanguage';
import { Camera, Mic, Globe, WifiOff } from 'lucide-react';

export const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Camera,
      title: t.cropAnalysis,
      description: t.cropAnalysisDesc,
      gradient: 'from-primary to-primary/70',
    },
    {
      icon: Mic,
      title: t.voiceAssistant,
      description: t.voiceAssistantDesc,
      gradient: 'from-secondary to-secondary/70',
    },
    {
      icon: Globe,
      title: t.multiLanguage,
      description: t.multiLanguageDesc,
      gradient: 'from-accent to-accent/70',
    },
    {
      icon: WifiOff,
      title: t.offlineMode,
      description: t.offlineModeDesc,
      gradient: 'from-blue-500 to-blue-500/70',
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.features}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
