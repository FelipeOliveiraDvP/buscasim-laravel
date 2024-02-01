import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

import { PageLoader, WhatsAppButton } from '@/components/__commons';
import { PublicHeader } from './Header';
import { PublicFooter } from './Footer';
import { useAuth } from '@/core/providers';

export function PublicLayout() {
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { user, authenticated } = useAuth();

  useEffect(() => {
    if (authenticated || user !== null) {
      navigate(-1);
    }
    close();
    window.scrollTo(0, 0);
  }, [user, authenticated, navigate]);

  return (
    <>
      <PublicHeader opened={opened} toggle={toggle} />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <PublicFooter />
      <WhatsAppButton />
    </>
  );
}
