import React, { useEffect } from "react";
import {
  Button,
  ColorInput,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import * as Yup from "yup";
import { DateInput, DateTimePicker } from "@mantine/dates";
import { UserSelect } from "@/components/Users";
import {
  Event,
  EventRequest,
  useCreateEvent,
  useRemoveEvent,
  useUpdateEvent,
} from "@/core/services/schedule";
import { useForm, yupResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { AxiosError } from "axios";
import { getFormErrors } from "@/core/utils";
import dayjs from "dayjs";

const schema = Yup.object().shape({
  title: Yup.string().required("Campo Obrigatório"),
  color: Yup.string().required("Campo Obrigatório"),
  location: Yup.string().required("Campo Obrigatório"),
  start_date: Yup.date()
    .required("Campo Obrigatório")
    .min(new Date(), "Escolha uma data futura para o evento."),
  final_date: Yup.date()
    .required("Campo Obrigatório")
    .min(
      Yup.ref("start_date"),
      "A data final não pode ser menor que o início do evento"
    ),
  responsible_id: Yup.string().required("Campo Obrigatório"),
});

interface Props {
  event?: Event;
  onClear: () => void;
}

export function ScheduleForm({ event, onClear }: Props) {
  const createMutation = useCreateEvent();
  const updateMutation = useUpdateEvent();
  const removeMutation = useRemoveEvent();
  const form = useForm<EventRequest>({
    validate: yupResolver(schema),
    initialValues: {
      title: "",
      color: "",
      location: "",
      start_date: null,
      final_date: null,
      responsible_id: null,
    },
  });

  const confirmRemove = (obj: Event) =>
    modals.openConfirmModal({
      title: "Remover Evento",
      children: <Text size="sm">Deseja realmente remover esse evento?</Text>,
      labels: { confirm: "Remover", cancel: "Cancelar" },
      confirmProps: { loading: removeMutation.isLoading },
      centered: true,
      onConfirm: async () => {
        await removeMutation.mutateAsync(obj);
        form.reset();
      },
    });

  async function handleSave(values: EventRequest) {
    try {
      if (event) {
        await updateMutation.mutateAsync({
          ...values,
          id: event.id,
        });
      } else {
        await createMutation.mutateAsync({
          ...values,
        });
      }

      form.reset();
    } catch (error) {
      form.setErrors({ ...getFormErrors(error as AxiosError) });
    }
  }

  // TODO: Excluir Evento

  useEffect(() => {
    if (event) {
      form.setValues({
        ...event,
        start_date: dayjs(event.start_date).toDate(),
        final_date: dayjs(event.final_date).toDate(),
        responsible_id: event.responsible.id,
      });
    }

    if (status) {
      form.setFieldValue("status", status);
    }
  }, [event]);

  return (
    <form onSubmit={form.onSubmit((values) => handleSave(values))}>
      <Stack>
        <Title order={3}>Eventos</Title>
        <TextInput
          {...form.getInputProps("title")}
          label="Título"
          placeholder="Informe o título do evento"
          withAsterisk
        />
        <TextInput
          {...form.getInputProps("location")}
          label="Local"
          placeholder="Informe o local onde será o evento"
          withAsterisk
        />
        <ColorInput
          {...form.getInputProps("color")}
          label="Cor"
          placeholder="Escolha uma cor para identificar seu evento"
          withAsterisk
        />
        <UserSelect
          {...form.getInputProps("responsible_id")}
          label="Responsável"
          placeholder="Selecione o responsável por esse evento"
          withAsterisk
        />
        <DateInput
          {...form.getInputProps("start_date")}
          label="Início do Evento"
          placeholder="DD/MM/YYYY"
          valueFormat="DD/MM/YYYY"
          withAsterisk
          clearable
        />
        <DateInput
          {...form.getInputProps("final_date")}
          label="Final do Evento"
          placeholder="DD/MM/YYYY"
          valueFormat="DD/MM/YYYY"
          withAsterisk
          clearable
        />

        <Divider />
        <Group gap="sm" justify="flex-end">
          {event && (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  onClear();
                  form.reset();
                }}
              >
                Limpar
              </Button>
              <Button
                variant="filled"
                color="red"
                onClick={() => confirmRemove(event)}
                loading={
                  createMutation.isLoading ||
                  updateMutation.isLoading ||
                  removeMutation.isLoading
                }
              >
                Remover Evento
              </Button>
            </>
          )}
          <Button
            type="submit"
            loading={
              createMutation.isLoading ||
              updateMutation.isLoading ||
              removeMutation.isLoading
            }
          >
            {event ? "Editar Evento" : "Novo Evento"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
