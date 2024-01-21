import { Badge, Table } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import { ResultInfoProps } from '..';
import classes from './styles.module.css';

export function ResultsPremiumInfo({ data, show }: ResultInfoProps) {
  function showInfo(info: string | null, show?: boolean) {
    if (show) return info;

    return (
      <Badge className={classes.premium} leftSection={<IconLock size={18} />}>
        Bloqueada
      </Badge>
    );
  }

  return (
    <Table>
      <Table.Tbody>
        <Table.Tr>
          <Table.Th>N° do chassi</Table.Th>
          <Table.Td>{showInfo(data.chassi, show)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Capacidade máxima de tração</Table.Th>
          <Table.Td>{showInfo(data.extra.cap_maxima_tracao, show)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Cilindradas</Table.Th>
          <Table.Td>{showInfo(data.extra.cilindradas, show)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>N° do motor</Table.Th>
          <Table.Td>{showInfo(data.extra.motor, show)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Tipo de documento faturado</Table.Th>
          <Table.Td>{showInfo(data.extra.tipo_doc_faturado, show)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Estado do faturamento</Table.Th>
          <Table.Td>{showInfo(data.extra.uf_faturado, show)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Roubo ou furto</Table.Th>
          <Table.Td>{showInfo(data.situacao, show)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Estado</Table.Th>
          <Table.Td>{showInfo(data.uf, show)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Renavam</Table.Th>
          <Table.Td>{showInfo(data.extra.renavam, show)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Nome do proprietário</Table.Th>
          <Table.Td>{showInfo('', show)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Tipo de documento</Table.Th>
          <Table.Td>{showInfo(data.extra.tipo_doc_prop, show)}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
