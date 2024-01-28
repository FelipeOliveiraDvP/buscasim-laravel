import { AxiosError } from 'axios';
import { useForm, yupResolver } from '@mantine/form';
import { Button, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import * as Yup from 'yup';

import { SearchRequest, useSearch } from '@/core/services/search';
import { getFormErrors } from '@/core/utils';

import classes from './styles.module.css';

const schema = Yup.object().shape({
  plate: Yup.string().required('Informe uma placa para consultar'),
});

export function SearchForm() {
  const mutation = useSearch();
  const form = useForm<SearchRequest>({
    validate: yupResolver(schema),
    initialValues: {
      plate: '',
    },
  });

  async function handleSearch(values: SearchRequest) {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSearch)} className={classes.controls}>
      <TextInput
        {...form.getInputProps('plate')}
        placeholder="Digite uma placa"
        classNames={{ input: classes.input, root: classes.inputWrapper }}
      />
      <Button
        type="submit"
        className={classes.control}
        loading={mutation.isLoading}
      >
        <IconSearch />
      </Button>
    </form>
  );
}
