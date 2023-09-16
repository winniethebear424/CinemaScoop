import { t } from "i18next";

const AboutPage = () => {
  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-semibold mb-4">{t('head')}</h1>
      <p className="text-gray-600 mb-6">
      {t('head')}Welcome to Movie Scoop, your go-to source for discovering and exploring the world of movies!
      </p>

      <style jsx>{`

          .py-8 {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
          .text-3xl {
            font-size: 1.875rem;
          }
          .info-box {
            border: 1px solid #ccc;
            padding: 1rem;
            margin: 2rem 0;
            background-color: #f5f5f5;
          }

      `}</style>
    </div>
  );
};

export default AboutPage;