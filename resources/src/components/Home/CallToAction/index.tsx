import { SearchForm } from '@/components/Search/Form';
import { Center, Stack, Text, Title } from '@mantine/core';

export function CallToAction() {
  return (
    <Center p="xl" bg="blue.7" c="white">
      <Stack align="center">
        <Title order={2}>Faça agora uma consulta</Title>
        <Text>Pesquise uma placa e tenha acesso a diversas informações.</Text>
        <SearchForm />
      </Stack>
    </Center>
  );
}
