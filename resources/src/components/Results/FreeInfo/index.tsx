import { Table } from '@mantine/core';
import { ResultInfoProps } from '..';

export function ResultsFreeInfo({ data }: ResultInfoProps) {
  return (
    <Table>
      <Table.Tbody>
        <Table.Tr>
          <Table.Th>Marca</Table.Th>
          <Table.Td>{data.marca}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Modelo</Table.Th>
          <Table.Td>{data.modelo}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Submodelo</Table.Th>
          <Table.Td>{data.SUBMODELO}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Versão</Table.Th>
          <Table.Td>{data.VERSAO}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Ano de fabricação</Table.Th>
          <Table.Td>{data.anoModelo}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Cor</Table.Th>
          <Table.Td>{data.cor}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Combustível</Table.Th>
          <Table.Td>{data.extra.combustivel}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Eixos</Table.Th>
          <Table.Td>{data.extra.eixos}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Espécie</Table.Th>
          <Table.Td>{data.extra.especie}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Quantidade de passageiros</Table.Th>
          <Table.Td>{data.extra.quantidade_passageiro}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Seguimento</Table.Th>
          <Table.Td>{data.extra.segmento}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Sub Seguimento</Table.Th>
          <Table.Td>{data.extra.sub_segmento}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
