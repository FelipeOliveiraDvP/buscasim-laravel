import { useNavigate } from 'react-router-dom';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import classes from './styles.module.css';

export default function ResultsPage() {
  const navigate = useNavigate();

  return (
    <Container className={classes.container}>
      <Group justify="space-between" align="center">
        <Title order={1}>Resultados da consulta</Title>
        <Text fw={600} size="lg">
          INT-0808
        </Text>
      </Group>
      <Button onClick={() => navigate('/pagamento')}>
        Liberar informações
      </Button>
    </Container>
  );
}
