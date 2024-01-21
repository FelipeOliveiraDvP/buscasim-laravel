import { Table } from '@mantine/core';
import { ResultInfoProps } from '..';

export function ResultsOverview({ data }: ResultInfoProps) {
  return (
    <Table>
      <Table.Tbody>
        <Table.Tr>
          <Table.Th>Placa</Table.Th>
          <Table.Td>{data.placa}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Placa Alternativa</Table.Th>
          <Table.Td>{data.placa_alternativa}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Marca/Modelo</Table.Th>
          <Table.Td>{data.marcaModelo}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Ano</Table.Th>
          <Table.Td>{data.ano}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Cor</Table.Th>
          <Table.Td>{data.cor}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
