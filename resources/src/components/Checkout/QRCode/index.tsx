import { useCheckoutContext } from '@/core/providers';
import {
  Button,
  CopyButton,
  Flex,
  Image,
  Input,
  Stack,
  Text,
  Title,
} from '@mantine/core';

export function CheckoutQRCode() {
  const { payment } = useCheckoutContext();

  if (!payment) return null;

  return (
    <Stack align="center">
      <Title order={3}>Confirmação do pagamento</Title>
      <Text ta="center">
        Escaneie o QRCode ou copie o código PIX para efetuar o pagamento. As
        informações vão ser liberadas assim que o pagamento for confirmado.
      </Text>

      <Image src={`data:image/jpeg;base64,${payment?.qrcode}`} maw={200} />

      <Flex w="100%">
        <Input value={payment?.code} readOnly radius={0} flex={1} />
        <CopyButton value={payment?.code}>
          {({ copied, copy }) => (
            <Button color={copied ? 'teal' : 'blue'} radius={0} onClick={copy}>
              {copied ? 'Copiado' : 'Copiar'}
            </Button>
          )}
        </CopyButton>
      </Flex>
    </Stack>
  );
}
