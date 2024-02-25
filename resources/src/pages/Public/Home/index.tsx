import { useEffect } from 'react';
import { CallToAction, Features, Hero } from '@/components/Home';
import { gaPageView } from '@/core/utils';

export default function HomePage() {
  useEffect(() => {
    const path = window.location.pathname + window.location.search;

    gaPageView('Home', path);
  }, []);

  return (
    <main>
      <Hero />
      <Features />
      <CallToAction />
    </main>
  );
}
