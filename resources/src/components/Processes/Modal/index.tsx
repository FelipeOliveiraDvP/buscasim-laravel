import React, { useEffect } from "react";
import { Modal, ModalProps } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { Process, ProcessRequest } from "@/core/services/processes";

type Props = ModalProps & {
  process?: Process;
};

const schema = Yup.object().shape({
  customer_id: Yup.string().required("Campo Obrigatório"),
  process_number: Yup.string().required("Campo Obrigatório"),
  situation: Yup.string().required("Campo Obrigatório"),
  expertise: Yup.string().required("Campo Obrigatório"),
  tribunal: Yup.string().required("Campo Obrigatório"),
  amount: Yup.number().min(1, "Informe o valor do processo"),
});

export function ProcessModal({ process, ...props }: Props) {
  const form = useForm<ProcessRequest>({
    validate: yupResolver(schema),
    initialValues: {
      customer_id: null,
      process_number: "",

      // expertise: null,
      // situation: null,
      // tribunal: "",
    },
  });

  async function handleSave(values: ProcessRequest) {
    console.log("Salvar: ", values);
    handleClose();
  }

  function handleClose() {
    form.reset();
    props.onClose();
  }

  useEffect(() => {
    if (process) {
      form.setValues({
        ...process,
        customer_id: process.customer.id,
      });
    }
  }, [process]);

  return (
    <Modal
      {...props}
      title={process ? "Editar Processo" : "Novo Processo"}
      centered
      onClose={handleClose}
    >
      {/* <form onSubmit={form.onSubmit((values) => handleSave(values))}>
        <Stack gap="md">
          <Select
            {...form.getInputProps("customer_id")}
            label="Cliente"
            placeholder="Selecione um cliente"
            data={[]}
            withAsterisk
          />
          <TextInput
            {...form.getInputProps("process_number")}
            label="Número do processo"
            placeholder="Informe o número do processo"
            withAsterisk
          />
          <TextInput
            {...form.getInputProps("tribunal")}
            label="Tribunal"
            placeholder="Informe o tribunal"
            withAsterisk
          />
          <NumberInput
            {...form.getInputProps("amount")}
            label="Valor do processo"
            placeholder="0,00"
            min={0}
            withAsterisk
          />
          <Select
            {...form.getInputProps("situation")}
            label="Situação"
            placeholder="Selecione a situação do processo"
            data={getOptions(processesSituations)}
            withAsterisk
          />
          <Select
            {...form.getInputProps("expertise")}
            label="Área de atuação"
            placeholder="Selecione a área de atuação"
            data={getOptions(processesExpertises)}
            withAsterisk
          />
          <Divider />
          <Group gap="sm" justify="flex-end">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" loading={false}>
              Salvar Processo
            </Button>
          </Group>
        </Stack>
      </form> */}
    </Modal>
  );
}
