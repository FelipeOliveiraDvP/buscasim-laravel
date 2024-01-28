import { BackgroundImage, Container, Stack, Text, Title } from '@mantine/core';

import { SearchForm } from '@/components/Search/Form';

import heroBg from '@/assets/hero.jpeg';
import classes from './styles.module.css';

export function Hero() {
  return (
    <BackgroundImage src={heroBg} h={600}>
      <Container className={classes.container}>
        <Stack>
          <Title className={classes.title}>
            A{' '}
            <Text
              component="span"
              inherit
              variant="gradient"
              gradient={{ from: 'blue.5', to: 'blue.9' }}
            >
              consulta de placa
            </Text>{' '}
            mais completa da internet.
          </Title>
          <SearchForm />
        </Stack>
      </Container>
    </BackgroundImage>
  );
}
