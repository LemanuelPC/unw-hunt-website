import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ServerTiming } from '@/types';
import { formatDateTime, getNextHuntTime } from '@/utils/date';

interface HeaderProps {
  serverTiming: ServerTiming;
}

export default function Header({ serverTiming }: HeaderProps) {
  const { t } = useTranslation('common');
  const router = useRouter();

  // Only initialize the state with null to avoid hydration mismatch
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Set the initial time after first render to avoid hydration issues
  useEffect(() => {
    setCurrentTime(new Date(serverTiming?.currentDateTime || Date.now()));
  }, [serverTiming?.currentDateTime]);

  // Update the server time every second, but only after initial mount
  useEffect(() => {
    if (!currentTime) return;

    const timer = setInterval(() => {
      setCurrentTime(prev => prev ? new Date(prev.getTime() + 1000) : new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTime]);

  const changeLanguage = async (lng: string) => {
    await router.push(router.pathname, router.asPath, { locale: lng });
  };

  /**
   * Determines and formats the next hunt update time message
   * Returns a loading state if currentTime isn't initialized yet
   */
  const getNextUpdateMessage = (): string => {
    if (!currentTime) return '...';

    try {
      if (currentTime.getHours() < 5) {
        return formatDateTime(getNextHuntTime(currentTime), router.locale);
      }

      const yesterdayDate = new Date(currentTime);
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterdayString = yesterdayDate.toISOString().split('T')[0];

      if (!serverTiming?.latestHuntDate || serverTiming.latestHuntDate !== yesterdayString) {
        return t('serverTime.delayed');
      }

      return formatDateTime(getNextHuntTime(currentTime), router.locale);
    } catch (error) {
      console.warn('Error calculating next update time:', error);
      return t('serverTime.error') || 'Error calculating next update time';
    }
  };

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('header.title')}</h1>
            <h2 className="text-xl">{t('header.subtitle')}</h2>
          </div>

          {/* Language Selection */}
          <div className="flex gap-2">
            {['en', 'pt', 'es'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`p-2 rounded transition-colors ${
                  router.locale === lang ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              >
                <Image
                  src={`/images/flag-${lang}.svg`}
                  alt={t(`languages.${lang}`)}
                  width={30}
                  height={20}
                  className="w-auto h-auto"
                  priority={lang === 'en'} // Add priority to the first image
                />
              </button>
            ))}
          </div>
        </div>

        {/* Server Time Information */}
        <div className="mt-4 text-sm space-y-1">
          <p>
            {t('serverTime.current')}: {currentTime ? formatDateTime(currentTime, router.locale) : '...'}
          </p>
          <p>
            {t('serverTime.nextUpdate')}: {getNextUpdateMessage()}
          </p>
        </div>
      </div>
    </header>
  );
}