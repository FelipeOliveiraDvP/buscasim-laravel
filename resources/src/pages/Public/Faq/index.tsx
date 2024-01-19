import { Container, Title, Accordion } from '@mantine/core';
import classes from './styles.module.css';

export default function FaqPage() {
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Perguntas Frequentes
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control>O que é a BuscaSim?</Accordion.Control>
          <Accordion.Panel>
            Somos uma empresa que oferece serviços de consulta de placas
            automotivas, auxiliando o consumidor a tomar a melhor decisão antes
            de comprar o seu próximo veículo.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control>A consulta é grátis?</Accordion.Control>
          <Accordion.Panel>
            Nós oferecemos uma consulta grátis com informações mais simples
            sobre o veículo, por exemplo cor, marca, modelo, ano etc. Caso
            precise de informações mais detalhadas, oferecemos uma consulta
            premium com todas as informações.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control>
            Vou poder consultar o meu histórico de consultas?
          </Accordion.Control>
          <Accordion.Panel>
            Nós armazenamos um histórico das suas consultas premium, para você
            consultar e comparar as informações dos veículos quando quiser.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
