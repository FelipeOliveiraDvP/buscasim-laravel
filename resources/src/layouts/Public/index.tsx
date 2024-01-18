import { Suspense, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/core/providers';
import { PageLoader } from '@/components/__commons';
import { BackgroundImage, Center, Grid, Image } from '@mantine/core';

import background from '@/assets/background.jpeg';
import logo from '@/assets/logo.png';

export function PublicLayout() {
  const { user, authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated || user !== null) {
      navigate(-1);
    }
  }, [user, authenticated, navigate]);

  return (
    <Grid
      gutter={0}
      styles={{
        root: {
          height: '100%',
        },
        inner: {
          height: '100%',
          margin: 0,
        },
      }}
    >
      <Grid.Col span={{ base: 12, md: 6 }} bg="primary" p={0}>
        <BackgroundImage h="100%" src={background}>
          <Center h="100%">
            <Image src={logo} w={250} />
          </Center>
        </BackgroundImage>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Grid.Col>
    </Grid>
  );
}
