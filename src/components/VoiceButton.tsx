import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Mic, MicOff } from 'lucide-react';

export const VoiceButton = () => {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    setIsListening(!isListening);
    // In production, this would integrate with Web Speech API
  };

  return (
    <button
      onClick={toggleListening}
      className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-button transition-all duration-300 ${
        isListening
          ? 'bg-destructive voice-pulse'
          : 'bg-secondary hover:scale-110'
      }`}
      aria-label={t.talkToAssistant}
    >
      {isListening ? (
        <MicOff className="w-7 h-7 text-destructive-foreground relative z-10" />
      ) : (
        <Mic className="w-7 h-7 text-secondary-foreground" />
      )}
    </button>
  );
};
