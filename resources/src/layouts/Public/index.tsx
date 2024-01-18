import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { PageLoader } from '@/components/__commons';
import { PublicHeader } from './Header';
import { PublicFooter } from './Footer';
import { useAuth } from '@/core/providers';

export function PublicLayout() {
  const { user, authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated || user !== null) {
      navigate(-1);
    }
  }, [user, authenticated, navigate]);

  return (
    <>
      <PublicHeader />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <PublicFooter />
    </>
  );
}
