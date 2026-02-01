import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CropAnalysis } from '@/components/CropAnalysis';
import { Features } from '@/components/Features';
import { VoiceButton } from '@/components/VoiceButton';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CropAnalysis />
      <Features />
      <Footer />
      <VoiceButton />
    </div>
  );
};

export default Index;
