import { Container, Stack, Text, Title } from '@mantine/core';

export default function PrivacyPage() {
  return (
    <Container py="md">
      <Stack>
        <Text size="sm" c="dimmed">
          Última atualização: 18/01/2024
        </Text>
        <Title order={1}>Bem vindo ao BuscaSim</Title>
        <Text>
          A sua privacidade é importante para nós. Por favor, leia atentamente
          esta Política de Privacidade, que explica como coletamos, usamos,
          divulgamos e protegemos as suas informações pessoais de acordo com a
          Lei Geral de Proteção de Dados (LGPD).
        </Text>

        <Title order={2}>1. Informações Coletadas</Title>

        <Title order={3}>1.1 Informações Pessoais:</Title>
        <Text>
          - Podemos coletar informações pessoais que você fornece
          voluntariamente, como nome, endereço de e-mail, número de telefone,
          entre outras, durante a navegação no nosso site.
        </Text>

        <Title order={3}>1.2 Informações de Navegação:</Title>
        <Text>
          - Coletamos automaticamente informações sobre o seu dispositivo e a
          sua interação com o nosso site, incluindo endereço IP, tipo de
          navegador, páginas visitadas e tempos de acesso.
        </Text>

        <Title order={2}>2. Uso das Informações</Title>
        <Title order={3}>2.1 Fornecimento de Serviços:</Title>
        <Text>
          - Utilizamos suas informações para fornecer e melhorar os nossos
          serviços, personalizar sua experiência e responder às suas
          solicitações.
        </Text>

        <Title order={3}>2.2 Comunicações:</Title>
        <Text>
          - Podemos utilizar suas informações para enviar comunicações
          relacionadas aos serviços prestados, atualizações, notícias e
          promoções, sempre com a opção de cancelamento.
        </Text>

        <Title order={2}>3. Compartilhamento de Informações</Title>
        <Title order={3}>3.1 Parceiros e Fornecedores:</Title>
        <Text>
          - Podemos compartilhar suas informações com terceiros prestadores de
          serviços que nos auxiliam na operação do site e na prestação dos
          serviços.
        </Text>

        <Title order={3}>3.2 Requisitos Legais:</Title>
        <Text>
          - Podemos divulgar suas informações em conformidade com requisitos
          legais, como ordens judiciais, processos legais e solicitações
          governamentais.
        </Text>

        <Title order={2}>4. Armazenamento e Segurança</Title>
        <Title order={3}>4.1 Segurança das Informações:</Title>
        <Text>
          - Implementamos medidas de segurança para proteger suas informações
          contra acesso não autorizado, alteração, divulgação ou destruição não
          autorizada.
        </Text>

        <Title order={3}>4.2 Retenção de Dados:</Title>
        <Text>
          - Manteremos suas informações apenas pelo tempo necessário para
          cumprir os fins para os quais foram coletadas, a menos que uma
          retenção mais longa seja necessária por requisitos legais.
        </Text>

        <Title order={2}>5. Seus Direitos e Escolhas</Title>
        <Title order={3}>5.1 Acesso e Atualização:</Title>
        <Text>
          - Você tem o direito de acessar e corrigir suas informações pessoais
          mantidas por nós.
        </Text>

        <Title order={3}>5.2 Cancelamento de Assinatura:</Title>
        <Text>
          - Caso não queira mais receber nossas comunicações, você pode cancelar
          a assinatura seguindo as instruções fornecidas ou entrando em contato
          conosco.
        </Text>

        <Title order={2}>6. Alterações nesta Política</Title>
        <Title order={3}>6.1 Atualizações:</Title>
        <Text>
          - Esta Política de Privacidade pode ser atualizada periodicamente. A
          data da última atualização será destacada no início do documento.
        </Text>

        <Title order={2}>7. Contato</Title>
        <Title order={3}>7.1 Dúvidas:</Title>
        <Text>
          - Se você tiver alguma dúvida sobre esta Política de Privacidade,
          entre em contato conosco através do suporte@buscasim.com.br.
        </Text>

        <Text>
          Ao utilizar nosso site, você concorda com os termos desta Política de
          Privacidade.
        </Text>
      </Stack>
    </Container>
  );
}
