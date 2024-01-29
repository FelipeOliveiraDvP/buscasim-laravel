import Pusher from 'pusher-js';
import { Features, Hero } from '@/components/Home';
import { useEffect } from 'react';

export default function HomePage() {
  function listenEvents() {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe('payment-confirmed');

    channel.bind('payment-event', (data: unknown) => {
      console.log(data);
    });
  }

  useEffect(() => {
    listenEvents();
  }, []);

  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}
