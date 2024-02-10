import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Accordion,
  Button,
  Container,
  Grid,
  Image,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { IconCar, IconLockOpen } from '@tabler/icons-react';

import { PageLoader } from '@/components/__commons';
import {
  ResultsFreeInfo,
  ResultsOverview,
  ResultsPremiumInfo,
} from '@/components/Results';

import { useSearchResults } from '@/core/providers';
import { useSearchInfo } from '@/core/services/search';
import { gaPageView, moneyFormat } from '@/core/utils';

import classes from './styles.module.css';
import { useScrollIntoView } from '@mantine/hooks';

export default function ResultsPage() {
  const { results, premium } = useSearchResults();
  const { data, isLoading } = useSearchInfo();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!results) navigate('/');

    if (results && !premium) {
      gaPageView(window.location.pathname + window.location.search);
    }
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
                    <ResultsPremiumInfo
                      data={results}
                      show={premium}
                      onScroll={scrollIntoView}
                    />
                  </Grid.Col>
                  {!premium && (
                    <Grid.Col>
                      <Button
                        loading={isLoading}
                        leftSection={<IconLockOpen />}
                        variant="outline"
                        fullWidth
                        size="lg"
                        onClick={() => scrollIntoView()}
                      >
                        Liberar Informações
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
          <Container bg="blue.7" py="lg" c="white" ref={targetRef}>
            <Stack align="center">
              <IconLockOpen size={48} />
              <Title order={3} ta="center">
                Quer saber todas as informações que estão bloqueadas?
              </Title>
              <Text ta="center">
                Adquira o relatório Premium e tenha acesso a essa e outras
                informações por apenas
              </Text>
              <div className={classes.searchPrice}>
                {moneyFormat(data?.price || 0)}
              </div>
              <Button
                component={Link}
                to="/pagamento"
                leftSection={<IconLockOpen />}
                variant="outline"
                color="white"
                size="lg"
              >
                Liberar Informações
              </Button>
            </Stack>
          </Container>
        )}
      </Stack>
    </Container>
  );
}
