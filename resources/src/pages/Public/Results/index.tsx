import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  Affix,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Table,
  Text,
  Title,
  Transition,
  rem,
} from '@mantine/core';
import { IconCar, IconLockOpen } from '@tabler/icons-react';

import { QueryResult } from '@/core/services/query';
import classes from './styles.module.css';

export default function ResultsPage() {
  const navigate = useNavigate();

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
                <Image src={mock.logo} maw={150} />
                {mock.marcaModelo}
              </Stack>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
            <Paper withBorder p="md" h="100%">
              <Table>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Th>Placa</Table.Th>
                    <Table.Td>{mock.placa}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th>Placa Alternativa</Table.Th>
                    <Table.Td>{mock.placa_alternativa}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th>Marca/Modelo</Table.Th>
                    <Table.Td>{mock.marcaModelo}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th>Ano</Table.Th>
                    <Table.Td>{mock.ano}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th>Cor</Table.Th>
                    <Table.Td>{mock.cor}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </Paper>
          </Grid.Col>
          <Grid.Col>
            <Paper withBorder p="md">
              <Stack align="center">
                <Grid w="100%">
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Table>
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Th>Marca</Table.Th>
                          <Table.Td>{mock.marca}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Modelo</Table.Th>
                          <Table.Td>{mock.modelo}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Submodelo</Table.Th>
                          <Table.Td>{mock.SUBMODELO}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Versão</Table.Th>
                          <Table.Td>{mock.VERSAO}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Ano de fabricação</Table.Th>
                          <Table.Td>{mock.anoModelo}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Cor</Table.Th>
                          <Table.Td>{mock.cor}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Combustível</Table.Th>
                          <Table.Td>{mock.extra.combustivel}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Eixos</Table.Th>
                          <Table.Td>{mock.extra.eixos}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Espécie</Table.Th>
                          <Table.Td>{mock.extra.especie}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Quantidade de passageiros</Table.Th>
                          <Table.Td>
                            {mock.extra.quantidade_passageiro}
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Seguimento</Table.Th>
                          <Table.Td>{mock.extra.segmento}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Sub Seguimento</Table.Th>
                          <Table.Td>{mock.extra.sub_segmento}</Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Table>
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Th>N° do chassi</Table.Th>
                          <Table.Td>{mock.chassi}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Capacidade máxima de tração</Table.Th>
                          <Table.Td>{mock.extra.cap_maxima_tracao}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Cilindradas</Table.Th>
                          <Table.Td>{mock.extra.cilindradas}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>N° do motor</Table.Th>
                          <Table.Td>{mock.extra.motor}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Tipo de documento faturado</Table.Th>
                          <Table.Td>{mock.extra.tipo_doc_faturado}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Estado do faturamento</Table.Th>
                          <Table.Td>{mock.extra.uf_faturado}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Roubo ou furto</Table.Th>
                          <Table.Td>{mock.situacao}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Estado</Table.Th>
                          <Table.Td>{mock.uf}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Renavam</Table.Th>
                          <Table.Td>{mock.extra.renavam}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Nome do proprietário</Table.Th>
                          <Table.Td></Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th>Tipo de documento</Table.Th>
                          <Table.Td>{mock.extra.tipo_doc_prop}</Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
        {/* <Button onClick={() => navigate('/pagamento')}>
          Liberar informações
        </Button> */}
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
            {mock.fipe.dados.map((item, index) => (
              <Accordion.Item value={`item-${index}`}>
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
      </Stack>
      <Affix position={{ bottom: 120, right: 20 }}>
        <Button
          size="lg"
          leftSection={
            <IconLockOpen style={{ width: rem(16), height: rem(16) }} />
          }
          onClick={() => navigate('/pagamento')}
        >
          Liberar informações
        </Button>
      </Affix>
    </Container>
  );
}

const mock: QueryResult = {
  MARCA: 'VW',
  MODELO: 'CROSSFOX',
  SUBMODELO: 'CROSSFOX',
  VERSAO: 'CROSSFOX',
  ano: '2007',
  anoModelo: '2007',
  chassi: '*****10137',
  codigoSituacao: '0',
  cor: 'Prata',
  data: '20/07/2022 15:10:09',
  extra: {
    ano_fabricacao: '2007',
    ano_modelo: '2007',
    caixa_cambio: '',
    cap_maxima_tracao: '198',
    carroceria: '',
    chassi: '9BWKB05Z174110137',
    cilindradas: '1599',
    combustivel: 'Alcool / Gasolina',
    di: '0',
    eixo_traseiro_dif: '',
    eixos: '2',
    especie: 'Passageiro',
    faturado: '92749647000139',
    grupo: 'CROSS FOX',
    limite_restricao_trib: '',
    linha: '55140805',
    media_preco: null,
    modelo: 'VW/CROSSFOX',
    motor: 'BPA160984',
    municipio: 'SAO LEOPOLDO',
    nacionalidade: 'Nacional',
    peso_bruto_total: '158',
    placa: 'INT8236',
    placa_modelo_antigo: 'INT8236',
    placa_modelo_novo: 'INT8C36',
    quantidade_passageiro: '5',
    registro_di: '',
    renavam: null,
    restricao_1: 'SEM RESTRICAO',
    restricao_2: 'SEM RESTRICAO',
    restricao_3: 'SEM RESTRICAO',
    restricao_4: 'SEM RESTRICAO',
    's.especie': 'Passageiro',
    segmento: 'Auto',
    situacao_chassi: 'N',
    situacao_veiculo: 'S',
    sub_segmento: 'AU - HATCH PEQUENO',
    terceiro_eixo: '',
    tipo_carroceria: 'NAO APLICAVEL',
    tipo_doc_faturado: 'Juridica',
    tipo_doc_importadora: 'Outros',
    tipo_doc_prop: 'Fisica',
    tipo_montagem: '1',
    tipo_veiculo: 'Automovel',
    uf: 'RS',
    uf_faturado: 'RS',
    uf_placa: 'RS',
    unidade_local_srf: '0000000',
  },
  fipe: {
    dados: [
      {
        ano_modelo: '2007',
        codigo_fipe: '005225-6',
        codigo_marca: 59,
        codigo_modelo: '2368',
        combustivel: 'Gasolina',
        id_valor: 77250,
        mes_referencia: 'maio de 2022 ',
        referencia_fipe: 285,
        score: 101,
        sigla_combustivel: 'G',
        texto_marca: 'VW - VolksWagen',
        texto_modelo: 'CROSSFOX 1.6 Mi Total Flex 8V 5p',
        texto_valor: 'R$ 28.799,00',
        tipo_modelo: 1,
      },
    ],
  },
  listamodelo: ['CROSSFOX'],
  logo: 'https://apiplacas.com.br/logos/logosMarcas/vw.png',
  marca: 'VW',
  marcaModelo: 'VW/CROSSFOX',
  mensagemRetorno: 'Sem erros.',
  modelo: 'CROSSFOX',
  municipio: 'S\u00e3o Leopoldo',
  origem: 'NACIONAL',
  placa: 'INT8C36',
  placa_alternativa: 'INT8236',
  situacao: 'Sem restri\u00e7\u00e3o',
  token: '',
  uf: 'RS',
};
