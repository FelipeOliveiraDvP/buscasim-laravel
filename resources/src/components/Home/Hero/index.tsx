import {
  BackgroundImage,
  Button,
  Container,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import heroBg from '@/assets/hero.jpeg';
import classes from './styles.module.css';

export function Hero() {
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
          <div className={classes.controls}>
            <TextInput
              placeholder="Digite uma placa"
              classNames={{ input: classes.input, root: classes.inputWrapper }}
            />
            <Button className={classes.control}>Buscar</Button>
          </div>
        </Stack>
      </Container>
    </BackgroundImage>
  );
}
