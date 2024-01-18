import { useState } from 'react';
import { Breadcrumbs, Flex, Grid, Paper, Stack, Text } from '@mantine/core';
import { Schedule, ScheduleForm } from '@/components/Schedule';

import { AnchorLink } from '@/components/__commons';
import { Event, EventListQuery, useEvents } from '@/core/services/schedule';

export default function SchedulerPage() {
  const [params, setParams] = useState<EventListQuery>();
  const [selected, setSelected] = useState<Event>();
  const { data } = useEvents(params);

  return (
    <Stack>
      <Flex>
        <Breadcrumbs>
          <AnchorLink href="/app">Dashboard</AnchorLink>
          <Text fw="bolder">Agenda</Text>
        </Breadcrumbs>
      </Flex>
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper withBorder shadow="md" p="sm" radius="sm">
            <ScheduleForm
              event={selected}
              onClear={() => setSelected(undefined)}
            />
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper withBorder shadow="md" p="sm" radius="sm">
            <Schedule
              events={data || []}
              onChange={setParams}
              onSelect={setSelected}
            />
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
