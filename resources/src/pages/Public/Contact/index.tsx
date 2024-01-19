import {
  Button,
  Container,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';
import classes from './styles.module.css';

const schema = yup.object().shape({
  name: yup.string().required('Campo Obrigatório'),
  email: yup.string().required('Campo Obrigatório').email('E-mail inválido'),
  subject: yup.string().required('Campo Obrigatório'),
  message: yup.string().required('Campo Obrigatório'),
});

export default function ContactPage() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: yupResolver(schema),
  });

  return (
    <Container className={classes.wrapper}>
      <Stack>
        <Title className={classes.title} order={1}>
          Ainda está com dúvidas?
        </Title>
        <Text>
          Nos mande uma mensagem que vamos responder todas as suas dúvidas.
        </Text>
        <form onSubmit={form.onSubmit(() => {})} className={classes.form}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              label="Nome"
              placeholder="Informe seu nome"
              name="name"
              variant="filled"
              {...form.getInputProps('name')}
            />
            <TextInput
              label="E-mail"
              placeholder="EX: exemplo@email.com"
              name="email"
              variant="filled"
              {...form.getInputProps('email')}
            />
          </SimpleGrid>

          <TextInput
            label="Assunto"
            placeholder="Qual o motivo do contato?"
            mt="md"
            name="subject"
            variant="filled"
            {...form.getInputProps('subject')}
          />
          <Textarea
            mt="md"
            label="Sua mensagem"
            placeholder="Conte para nós qual é a sua dúvida"
            maxRows={10}
            minRows={5}
            autosize
            name="message"
            variant="filled"
            {...form.getInputProps('message')}
          />

          <Button type="submit" size="md" mt="md">
            Enviar mensagem
          </Button>
        </form>
      </Stack>
    </Container>
  );
}
