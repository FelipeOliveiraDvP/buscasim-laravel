import {
  Button,
  CopyButton,
  Flex,
  Image,
  Input,
  Stack,
  Text,
} from '@mantine/core';
import dayjs from 'dayjs';

import qrcode from '@/assets/qrcode.png';
import { useCountdown } from '@/core/hooks';

export function CheckoutQRCode() {
  const { minutes, seconds } = useCountdown(dayjs().add(5, 'minutes').toDate());

  return (
    <Stack align="center">
      <Image src={qrcode} maw={200} />
      <Text>
        {minutes}:{seconds}
      </Text>
      <Flex>
        <Input readOnly radius={0} />
        <CopyButton value="https://mantine.dev">
          {({ copied, copy }) => (
            <Button color={copied ? 'teal' : 'blue'} radius={0} onClick={copy}>
              {copied ? 'Copiado' : 'Copiar'}
            </Button>
          )}
        </CopyButton>
      </Flex>
      <Text>
        Efetue o pagamento via PIX lendo o QRCode ou copiando o código.
      </Text>
    </Stack>
  );
}
