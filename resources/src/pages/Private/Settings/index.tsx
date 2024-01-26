import { Breadcrumbs, Grid, Group, Stack, Text } from '@mantine/core';
import { APIPlacasForm } from '@/components/Settings';
import { PriceForm } from '@/components/Settings/Price';
import { AnchorLink } from '@/components/__commons';

export default function SettingsPage() {
  return (
    <Stack>
      <Group justify="space-between">
        <Breadcrumbs>
          <AnchorLink href="/app">Dashboard</AnchorLink>
          <Text fw="bolder">Configurações</Text>
        </Breadcrumbs>
      </Group>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <APIPlacasForm />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <PriceForm />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
