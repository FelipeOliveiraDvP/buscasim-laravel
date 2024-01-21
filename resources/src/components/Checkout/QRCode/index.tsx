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
import dayjs from 'dayjs';

import qrcode from '@/assets/qrcode.png';
import { useCountdown } from '@/core/hooks';

export function CheckoutQRCode() {
  const { minutes, seconds } = useCountdown(dayjs().add(5, 'minutes').toDate());

  function formatSeconds(seconds: number) {
    if (seconds > 10) return seconds;

    return `0${seconds}`;
  }

  return (
    <Stack align="center">
      <Title order={3}>Confirmação do pagamento</Title>
      <Text ta="center">
        Escaneie o QRCode ou copie o código PIX para efetuar o pagamento. As
        informações vão ser liberadas assim que o pagamento for confirmado.
      </Text>
      <Image src={qrcode} maw={200} />
      <Text fw={700} size="lg">
        {minutes}:{formatSeconds(seconds)}
      </Text>
      <Flex w="100%">
        <Input readOnly radius={0} flex={1} />
        <CopyButton value="https://mantine.dev">
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
