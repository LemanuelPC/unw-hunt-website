import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600">
            {t('footer.copyright', { year: currentYear })}
          </div>

          <div className="mt-4 md:mt-0">
            <div className="text-sm text-gray-600">
              {t('footer.huntPoints')}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {t('footer.pointsBreakdown')}
            </div>
          </div>

          <div className="mt-4 md:mt-0 text-sm text-gray-600">
            <a
              href="https://github.com/yourusername/guild-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              {t('footer.sourceCode')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}