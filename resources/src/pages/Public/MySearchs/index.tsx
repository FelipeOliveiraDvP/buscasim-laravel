import { Center } from '@mantine/core';

export default function MySearchsPage() {
  const showForm = false;

  /**
   * TODO: Endpoint de login somente para administrador
   *
   */
  return (
    <Center h="calc(100% - 180px)">
      {showForm ? (
        <div>form email e cpf</div>
      ) : (
        <div>tabela minhas consultas</div>
      )}
    </Center>
  );
}
