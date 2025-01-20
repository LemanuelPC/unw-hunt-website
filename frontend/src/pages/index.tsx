import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Header from '@/components/Layout/Header';
import WeeklyTable from '@/components/HuntTracker/WeeklyTable';
import { useHuntData } from '@/hooks/useHuntData';

export default function Home() {
  const { t } = useTranslation('common');
  const { data, isLoading, isError } = useHuntData();

  // Calculate current day (0 = Monday, 6 = Sunday)
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const adjustedCurrentDay = currentDay === 0 ? 6 : currentDay - 1;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {t('errors.fetchFailed')}
          </div>
        </div>
      </div>
    );
  }

  // Default server timing if data is not available yet
  const defaultServerTiming = {
    currentDateTime: new Date().toISOString(),
    nextHuntUpdate: new Date(new Date().setHours(5, 0, 0, 0)).toISOString(),
    latestHuntDate: new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split('T')[0],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header serverTiming={data?.serverTiming || defaultServerTiming} />
      <main className="container mx-auto px-4 py-8">
        {data?.players && (
          <WeeklyTable
            data={data.players}
            currentDay={adjustedCurrentDay}
          />
        )}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};