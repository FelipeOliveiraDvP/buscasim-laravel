import React, { useState } from "react";
import { Input, InputProps, TextInputProps } from "@mantine/core";
import { InputMask, MaskEventDetail } from "@react-input/mask";

type MaksType = "cpf" | "phone" | "cep";

type Props = { mask: MaksType } & InputProps & TextInputProps;

const masks: Record<MaksType, string> = {
  cpf: "___.___.___-__",
  cep: "________",
  phone: "(__)_____-____",
};

const masksErrors: Record<MaksType, string> = {
  cpf: "Informe um CPF válido",
  cep: "Informe um CEP válido",
  phone: "Informe um telefone válido",
};

export function MaskedInput({ mask, withAsterisk, ...props }: Props) {
  const [maskDetail, setMaskDetail] = useState<MaskEventDetail | null>(null);

  return (
    <>
      <Input.Label required={withAsterisk}>{props.label}</Input.Label>
      <Input
        {...props}
        component={InputMask}
        mask={masks[mask]}
        replacement={{ _: /\d/ }}
        onMask={(e) => setMaskDetail(e.detail)}
      />
      {maskDetail?.input && !maskDetail?.isValid && (
        <Input.Error>{masksErrors[mask]}</Input.Error>
      )}
      <Input.Error>{props.error}</Input.Error>
    </>
  );
}
