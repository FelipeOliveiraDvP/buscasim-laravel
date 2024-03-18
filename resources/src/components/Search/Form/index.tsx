import { AxiosError } from 'axios';
import { useForm, yupResolver } from '@mantine/form';
import { Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import * as Yup from 'yup';

import { SearchRequest, useSearch } from '@/core/services/search';
import { getFormErrors } from '@/core/utils';

import classes from './styles.module.css';
import { MaskedInput } from '@/components/__commons';
import { SearchLoader } from '..';

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
    <>
      <form onSubmit={form.onSubmit(handleSearch)} className={classes.controls}>
        <MaskedInput
          {...form.getInputProps('plate')}
          mask="plate"
          name="plate"
          autoComplete="on"
          placeholder="Ex: HUF-8282"
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
      <SearchLoader loading={mutation.isLoading} />
    </>
  );
}
