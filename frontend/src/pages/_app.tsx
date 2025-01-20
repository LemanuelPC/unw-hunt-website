import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { SWRConfig } from 'swr';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Import global styles
import '@/styles/globals.css';

// Import components
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Handle route change loading states
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <SWRConfig
      value={{
        // Configure global SWR options
        revalidateOnFocus: false,
        refreshInterval: 30000, // Refresh data every 30 seconds
        shouldRetryOnError: true,
        dedupingInterval: 2000,
      }}
    >
      <div className="min-h-screen flex flex-col">
        {/* Loading indicator */}
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse" />
        )}

        {/* Layout structure */}
        <Header serverTiming={pageProps.serverTiming} />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </SWRConfig>
  );
}

// Wrap the app with translation support
export default appWithTranslation(App);