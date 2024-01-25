import {
  BackgroundImage,
  Button,
  Container,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { AxiosError } from 'axios';
import { useForm, yupResolver } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import * as yup from 'yup';

import { QueryRequest, useSearch } from '@/core/services/queries';
import { getFormErrors } from '@/core/utils';

import heroBg from '@/assets/hero.jpeg';
import classes from './styles.module.css';

const schema = yup.object().shape({
  plate: yup.string().required('Informe uma placa para consultar'),
});

export function Hero() {
  const searchMutation = useSearch();
  const form = useForm<QueryRequest>({
    validate: yupResolver(schema),
    initialValues: {
      plate: '',
    },
  });

  async function handleSearch(values: QueryRequest) {
    try {
      await searchMutation.mutateAsync(values);
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }

  return (
    <BackgroundImage src={heroBg} h={600}>
      <Container className={classes.container}>
        <Stack>
          <Title className={classes.title}>
            A{' '}
            <Text
              component="span"
              inherit
              variant="gradient"
              gradient={{ from: 'blue.5', to: 'blue.9' }}
            >
              consulta de placa
            </Text>{' '}
            mais completa da internet.
          </Title>
          <form
            onSubmit={form.onSubmit(handleSearch)}
            className={classes.controls}
          >
            <TextInput
              {...form.getInputProps('plate')}
              placeholder="Digite uma placa"
              classNames={{ input: classes.input, root: classes.inputWrapper }}
            />
            <Button
              className={classes.control}
              type="submit"
              loading={searchMutation.isLoading}
            >
              <IconSearch />
            </Button>
          </form>
        </Stack>
      </Container>
    </BackgroundImage>
  );
}
