import { useState, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, Loader2, Sparkles, Leaf, Droplets, Sun, TrendingUp } from 'lucide-react';
import { stateToLanguage } from '@/lib/translations';

const crops = [
  'Rice/Paddy', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 
  'Soybean', 'Groundnut', 'Mustard', 'Potato', 'Onion',
  'Tomato', 'Chilli', 'Turmeric', 'Ginger', 'Banana',
  'Mango', 'Coconut', 'Tea', 'Coffee', 'Rubber'
];

interface AnalysisResult {
  disease: string;
  confidence: number;
  alternativeCrop: string;
  yieldImprovement: string;
  fertilizer: string;
  irrigation: string;
  additionalTips: string[];
}

export const CropAnalysis = () => {
  const { t, setLanguageByState } = useLanguage();
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [selectedSoil, setSelectedSoil] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);
    setLanguageByState(stateId);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedImage || !selectedState || !selectedSeason || !selectedSoil || !selectedCrop) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in production, this would call an actual API)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setAnalysisResult({
      disease: 'Bacterial Leaf Blight',
      confidence: 75,
      alternativeCrop: 'Millets',
      yieldImprovement: '+30%',
      fertilizer: '20-10-10 NPK',
      irrigation: 'Every 4 days',
      additionalTips: [
        'Apply neem oil spray for pest control',
        'Consider crop rotation next season',
        'Monitor for early signs of yellowing'
      ]
    });
    
    setIsAnalyzing(false);
  };

  const stateKeys = Object.keys(stateToLanguage);

  return (
    <section id="crop-analysis" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t.cropAnalysis}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.analyze}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.cropAnalysisDesc}
          </p>
        </div>

        <Card className="card-elevated overflow-hidden">
          <CardContent className="p-6 md:p-8">
            {/* Image Upload */}
            <div className="mb-8">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              {uploadedImage ? (
                <div className="relative group">
                  <img
                    src={uploadedImage}
                    alt="Uploaded crop"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center"
                  >
                    <span className="text-background font-medium">{t.uploadPhoto}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-64 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground">{t.uploadPhoto}</p>
                    <p className="text-sm text-muted-foreground">Click or tap to upload</p>
                  </div>
                </button>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Select value={selectedState} onValueChange={handleStateChange}>
                <SelectTrigger className="h-12 bg-background">
                  <SelectValue placeholder={t.selectState} />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {stateKeys.map((stateId) => (
                    <SelectItem key={stateId} value={stateId}>
                      {t.states[stateId] || stateId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger className="h-12 bg-background">
                  <SelectValue placeholder={t.selectSeason} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kharif">{t.seasons.kharif}</SelectItem>
                  <SelectItem value="rabi">{t.seasons.rabi}</SelectItem>
                  <SelectItem value="zaid">{t.seasons.zaid}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSoil} onValueChange={setSelectedSoil}>
                <SelectTrigger className="h-12 bg-background">
                  <SelectValue placeholder={t.selectSoilType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alluvial">{t.soilTypes.alluvial}</SelectItem>
                  <SelectItem value="black">{t.soilTypes.black}</SelectItem>
                  <SelectItem value="red">{t.soilTypes.red}</SelectItem>
                  <SelectItem value="laterite">{t.soilTypes.laterite}</SelectItem>
                  <SelectItem value="desert">{t.soilTypes.desert}</SelectItem>
                  <SelectItem value="mountain">{t.soilTypes.mountain}</SelectItem>
                  <SelectItem value="forest">{t.soilTypes.forest}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="h-12 bg-background">
                  <SelectValue placeholder={t.selectCrop} />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop.toLowerCase()}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={!uploadedImage || !selectedState || !selectedSeason || !selectedSoil || !selectedCrop || isAnalyzing}
              className="w-full btn-primary-gradient h-14 text-lg disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t.analyzing}
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  {t.analyze}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="mt-8 animate-fade-in">
            <Card className="card-elevated overflow-hidden border-l-4 border-l-primary">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-5 h-5" />
                  {t.results}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Disease Detection */}
                <div className="mb-6 p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-destructive">Disease Detected</span>
                    <span className="text-sm bg-destructive/20 text-destructive px-2 py-1 rounded-full">
                      {analysisResult.confidence}% Confidence
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{analysisResult.disease}</p>
                </div>

                {/* Recommendations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-5 h-5 text-accent-foreground" />
                      <span className="font-medium">Alternative Crop</span>
                    </div>
                    <p className="text-lg font-semibold">{analysisResult.alternativeCrop}</p>
                    <p className="text-sm text-muted-foreground">{analysisResult.yieldImprovement} yield improvement</p>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="font-medium">{t.expectedYield}</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">{analysisResult.yieldImprovement}</p>
                  </div>

                  <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="w-5 h-5 text-secondary" />
                      <span className="font-medium">Fertilizer</span>
                    </div>
                    <p className="text-lg font-semibold">{analysisResult.fertilizer}</p>
                  </div>

                  <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Irrigation</span>
                    </div>
                    <p className="text-lg font-semibold">{analysisResult.irrigation}</p>
                  </div>
                </div>

                {/* Additional Tips */}
                <div className="p-4 bg-muted rounded-xl">
                  <h4 className="font-medium mb-3">Additional Tips</h4>
                  <ul className="space-y-2">
                    {analysisResult.additionalTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};
