
import PageLayout from "@/components/layout/PageLayout";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <PageLayout>
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">{t('about')}</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-center text-muted-foreground mb-12">
              {t("BrandDescription")}
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t('ourStory')}</h2>
            <p className="text-muted-foreground">{t('storyContent')}</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t('ourMission')}</h2>
            <p className="text-muted-foreground">{t('missionContent')}</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t('ourTeam')}</h2>
            <p className="text-muted-foreground">{t('teamContent')}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="container">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" 
              alt="Our Office" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <p className="text-white text-xl md:text-3xl font-bold max-w-lg text-center">
                Making quality products accessible to everyone through flexible payment solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
