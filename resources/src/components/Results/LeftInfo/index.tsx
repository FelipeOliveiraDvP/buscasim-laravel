import { Table } from '@mantine/core';
import { ResultInfoProps, showInfo } from '..';

export function ResultsLeftInfo({ data, premium, onScroll }: ResultInfoProps) {
  if (!data) return null;

  return (
    <Table>
      <Table.Tbody>
        <Table.Tr>
          <Table.Th>Marca</Table.Th>
          <Table.Td>{data.marca}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Estado (UF) faturado</Table.Th>
          <Table.Td>
            {showInfo({ info: data.extra.uf_faturado, premium, onScroll })}
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Versão</Table.Th>
          <Table.Td>{data.VERSAO}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Ano de fabricação</Table.Th>
          <Table.Td>{data.extra.ano_fabricacao}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Ano de modelo</Table.Th>
          <Table.Td>{data.extra.ano_modelo}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Estado (UF)</Table.Th>
          <Table.Td>{showInfo({ info: data.uf, premium, onScroll })}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Nº do chassi</Table.Th>
          <Table.Td>{premium ? data.extra.chassi : data.chassi}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Cor</Table.Th>
          <Table.Td>{data.cor}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Capacidade Max. de tração</Table.Th>
          <Table.Td>{data.extra.cap_maxima_tracao}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Cilindradas</Table.Th>
          <Table.Td>
            {showInfo({ info: data.extra.cilindradas, premium, onScroll })}
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Combustível</Table.Th>
          <Table.Td>{data.extra.combustivel}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>DI</Table.Th>
          <Table.Td>{data.extra.di}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Município</Table.Th>
          <Table.Td>
            {showInfo({ info: data.extra.municipio, premium, onScroll })}
          </Table.Td>
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
          <Table.Th>Nº do Motor</Table.Th>
          <Table.Td>
            {showInfo({ info: data.extra.motor, premium, onScroll })}
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
