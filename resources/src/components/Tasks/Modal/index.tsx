import { useEffect } from 'react';
import {
  Button,
  Divider,
  Group,
  Modal,
  ModalProps,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { AxiosError } from 'axios';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import {
  Task,
  TaskRequest,
  TaskStatusType,
  useCreateTask,
  useRemoveTask,
  useUpdateTask,
} from '@/core/services/tasks';
import { UserSelect } from '@/components/Users';
import { getFormErrors } from '@/core/utils';
import { modals } from '@mantine/modals';

type Props = ModalProps & {
  task?: Task;
  status?: TaskStatusType;
};

const schema = Yup.object().shape({
  title: Yup.string().required('Campo Obrigatório'),
  description: Yup.string().required('Campo Obrigatório'),
  final_date: Yup.date()
    .required('Campo Obrigatório')
    .min(new Date(), 'Escolha uma data futura para a tarefa.'),
  status: Yup.string().required('Campo Obrigatório'),
  responsible_id: Yup.string().required('Campo Obrigatório'),
});

export function TaskModal({ task, status, ...props }: Props) {
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const removeMutation = useRemoveTask();
  const form = useForm<TaskRequest>({
    validate: yupResolver(schema),
    initialValues: {
      title: '',
      description: '',
      status: 'todo',
      responsible_id: null,
      final_date: null,
    },
  });

  const confirmRemove = (obj: Task) =>
    modals.openConfirmModal({
      title: 'Remover Tarefa',
      children: <Text size="sm">Deseja realmente remover essa tarefa?</Text>,
      labels: { confirm: 'Remover', cancel: 'Cancelar' },
      confirmProps: { loading: removeMutation.isLoading },
      centered: true,
      onConfirm: async () => {
        await removeMutation.mutateAsync(obj);
        handleClose();
      },
    });

  async function handleSave(values: TaskRequest) {
    try {
      if (task) {
        await updateMutation.mutateAsync({
          ...values,
          id: task.id,
        });
      } else {
        await createMutation.mutateAsync({
          ...values,
        });
      }

      handleClose();
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }

  function handleClose() {
    form.reset();
    props.onClose();
  }

  useEffect(() => {
    if (task) {
      form.setValues({
        ...task,
        final_date: dayjs(task.final_date).toDate(),
        responsible_id: task.responsible.id,
      });
    }

    if (status) {
      form.setFieldValue('status', status);
    }
  }, [task, status]);

  return (
    <Modal
      {...props}
      title={task ? 'Editar Tarefa' : 'Nova Tarefa'}
      centered
      size="md"
      onClose={handleClose}
    >
      <form onSubmit={form.onSubmit((values) => handleSave(values))}>
        <Stack gap="md">
          <TextInput
            {...form.getInputProps('title')}
            label="Título"
            placeholder="Informe o título da tarefa"
            withAsterisk
          />
          <Textarea
            {...form.getInputProps('description')}
            label="Descrição"
            placeholder="Informe com detalhes o será executado na tarefa"
            rows={6}
            withAsterisk
          />
          {/* <Select
            {...form.getInputProps("status")}
            label="Status da tarefa"
            withAsterisk
            data={taskStatusOptions}
          /> */}
          <UserSelect
            {...form.getInputProps('responsible_id')}
            label="Responsável"
            placeholder="Selecione o responsável da tarefa"
            withAsterisk
          />
          <DateInput
            {...form.getInputProps('final_date')}
            label="Prazo Final"
            placeholder="Informe o prazo para a conclusão da tarefa"
            valueFormat="DD/MM/YYYY"
            withAsterisk
            clearable
          />
          <Divider />

          <Group gap="sm" justify="flex-end">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            {task && (
              <Button
                variant="filled"
                color="red"
                onClick={() => confirmRemove(task)}
              >
                Excluir Tarefa
              </Button>
            )}
            <Button type="submit" loading={false}>
              Salvar Tarefa
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
