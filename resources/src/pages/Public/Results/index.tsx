import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Accordion,
  Button,
  Center,
  Container,
  Grid,
  Image,
  Paper,
  Portal,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCar, IconLockOpen } from '@tabler/icons-react';

import { PageLoader } from '@/components/__commons';
import {
  ResultsFreeInfo,
  ResultsOverview,
  ResultsPremiumInfo,
} from '@/components/Results';
import { CheckoutModal } from '@/components/Checkout';

import { useSearchResults } from '@/core/providers';
import { useSearchInfo } from '@/core/services/search';
import { moneyFormat } from '@/core/utils';

import classes from './styles.module.css';

export default function ResultsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const { results, premium } = useSearchResults();
  const { data, isLoading } = useSearchInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!results) navigate('/');
  }, [results]);

  if (!results) return <PageLoader />;

  return (
    <Container className={classes.container}>
      <Stack>
        <Title className={classes.title}>
          <Text
            component="span"
            inherit
            variant="gradient"
            gradient={{ from: 'blue.5', to: 'blue.9' }}
          >
            Resultado da consulta
          </Text>
        </Title>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Paper withBorder p="md">
              <Stack align="center">
                <Image src={results.logo} maw={150} />
                {results.marcaModelo}
              </Stack>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
            <Paper withBorder p="md" h="100%">
              <ResultsOverview data={results} />
            </Paper>
          </Grid.Col>
          <Grid.Col>
            <Paper withBorder p="md">
              <Stack align="center">
                <Grid w="100%">
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <ResultsFreeInfo data={results} />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <ResultsPremiumInfo data={results} show={premium} />
                  </Grid.Col>
                  {!premium && (
                    <Grid.Col>
                      <Button
                        component={Link}
                        to="/pagamento"
                        loading={isLoading}
                        leftSection={<IconLockOpen />}
                        variant="outline"
                        fullWidth
                        size="lg"
                      >
                        Liberar Informações por apenas{' '}
                        {moneyFormat(data?.price || 0)}
                      </Button>
                    </Grid.Col>
                  )}
                </Grid>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
        <Title className={classes.title}>
          <Text
            component="span"
            inherit
            variant="gradient"
            gradient={{ from: 'blue.5', to: 'blue.9' }}
          >
            Tabela FIPE
          </Text>
        </Title>

        <Paper>
          <Accordion variant="contained" defaultValue="item-0">
            {results.fipe.dados.map((item, index) => (
              <Accordion.Item key={`item-${index}`} value={`item-${index}`}>
                <Accordion.Control
                  icon={<IconCar />}
                  className={classes.accordionItem}
                >
                  {item.texto_modelo}
                </Accordion.Control>
                <Accordion.Panel>
                  <Text className={classes.price}>{item.texto_valor}</Text>
                  <Table>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Th>Código da FIPE</Table.Th>
                        <Table.Td>{item.codigo_fipe}</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Th>Combustível</Table.Th>
                        <Table.Td>{item.combustivel}</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Th>Marca</Table.Th>
                        <Table.Td>{item.texto_marca}</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Th>Modelo</Table.Th>
                        <Table.Td>{item.texto_modelo}</Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Paper>
        {!premium && (
          <Center p="xl" bg="blue.7" c="white">
            <Stack align="center">
              <IconLockOpen size={48} />
              <Title order={3}>
                Quer saber todas as informações que estão bloqueadas?
              </Title>
              <Text>
                Adquira o relatório Premium e tenha acesso a essa e outras
                informações.
              </Text>
              <Text size="xs">Você acessar seus relatórios quando quiser.</Text>
              <Button
                component={Link}
                to="/pagamento"
                leftSection={<IconLockOpen />}
                variant="outline"
                color="white"
                size="lg"
              >
                Liberar Informações por apenas {moneyFormat(data?.price || 0)}
              </Button>
            </Stack>
          </Center>
        )}
      </Stack>
      <Portal>
        <CheckoutModal opened={opened} onClose={close} plate={results.placa} />
      </Portal>
    </Container>
  );
}
