import { Table } from '@mantine/core';
import { ResultInfoProps, showInfo } from '..';

interface Props extends ResultInfoProps {
  onScroll: VoidFunction;
}

export function ResultsRightInfo({ data, premium, onScroll }: Props) {
  if (!data) return null;

  return (
    <Table>
      <Table.Tbody>
        <Table.Tr>
          <Table.Th>Nacionalidade</Table.Th>
          <Table.Td>{data.extra.nacionalidade}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Nº de Passageiros</Table.Th>
          <Table.Td>{data.extra.quantidade_passageiro}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Segmento</Table.Th>
          <Table.Td>{data.extra.segmento}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Sub Segmento</Table.Th>
          <Table.Td>{data.extra.sub_segmento}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Tipo de Carroçeria</Table.Th>
          <Table.Td>{data.extra.tipo_carroceria}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Tipo do documento faturado</Table.Th>
          <Table.Td>
            {showInfo({
              info: data.extra.tipo_doc_faturado,
              premium,
              onScroll,
            })}
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Estado (UF) faturado</Table.Th>
          <Table.Td>
            {showInfo({ info: data.extra.uf_faturado, premium, onScroll })}
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Município</Table.Th>
          <Table.Td>
            {showInfo({ info: data.extra.municipio, premium, onScroll })}
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Origem</Table.Th>
          <Table.Td>{data.origem}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Placa</Table.Th>
          <Table.Td>{data.placa}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Placa Alternativa</Table.Th>
          <Table.Td>{data.placa_alternativa}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Situação</Table.Th>
          <Table.Td>
            {showInfo({ info: data.situacao, premium, onScroll })}
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Estado (UF)</Table.Th>
          <Table.Td>{showInfo({ info: data.uf, premium, onScroll })}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Renavam</Table.Th>
          <Table.Td>
            {showInfo({ info: data.extra.renavam, premium, onScroll })}
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Tipo de proprietário</Table.Th>
          <Table.Td>
            {showInfo({ info: data.extra.tipo_doc_prop, premium, onScroll })}
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}