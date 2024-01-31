import Pusher from 'pusher-js';

import { Features, Hero } from '@/components/Home';
import { PaymentConfirmed } from '@/core/services/orders';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  function listenEvents() {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe('payment-confirmed');

    // TODO: Fix redirect on confirm payment.
    channel.bind('payment-event', (data: PaymentConfirmed) => {
      const { payment_id } = data.payment;
      console.log('Home: ', payment_id);
      // navigate('/contato');
      // const { payment_id, data: results } = data.payment;
      // const isCurrentPayment =
      //   String(payment_id) === String(payment?.payment_id);

      // if (isCurrentPayment) {
      //   setResults(results);
      //   navigate('/resultados');
      // }
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
