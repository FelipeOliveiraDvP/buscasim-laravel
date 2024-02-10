import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Title, Text, Button, Container, Group } from '@mantine/core';

import { useSearchResults } from '@/core/providers';
import { gaPageView } from '@/core/utils';

import classes from './styles.module.css';

export default function ThankYouPage() {
  const { payment } = useSearchResults();
  const navigate = useNavigate();

  useEffect(() => {
    if (!payment) {
      navigate('/');
    } else {
      gaPageView(window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>Obrigado!</div>
        <Title className={classes.title}>
          Parabéns! Você acabou de adquir o seu relatório Premium.
        </Title>
        <Text size="lg" ta="center" className={classes.description}>
          Você vai poder consultar esse relatório quando quiser no menu{' '}
          <strong>Minhas Consultas</strong>.
        </Text>
        <Group justify="center">
          <Button component={Link} to="/resultados" variant="primary" size="md">
            Ver meu relatório
          </Button>
        </Group>
      </Container>
    </div>
  );
}
