// components/genericos/Inputs/InputFone.tsx
'use client';

import { useState } from "react";
import InputBase, {InputBaseProps} from "./InputBase";

const aplicarMascaraTelefone = (valor?: string): string => {
  if (!valor) return '';
  const numeros = valor.replace(/\D/g, '');
  if (numeros.length <= 2) return `(${numeros}`;
  if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  if (numeros.length <= 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
};

type InputFoneProps = Omit<InputBaseProps, 'onHandleChange'> & {
  onChange?: (value: string) => void;
};

const InputFone = ({value, name, className, onChange, ...rest}: InputFoneProps) => {
  const [valorMascarado, setValorMascarado] = useState(aplicarMascaraTelefone(value));
  const [valorLimpo, setValorLimpo] = useState(value);

  const handleChange = (value: string) => {
    const apenasNumeros = value.replace(/\D/g, '');
    const valorComMascara = aplicarMascaraTelefone(apenasNumeros);
    onChange && onChange(apenasNumeros);

    setValorLimpo(apenasNumeros);
    setValorMascarado(valorComMascara);
    return valorComMascara;
  };

  return (
    <div className={`${className} flex items-center justify-start relative border-2 border-borda rounded-md`}>
      <InputBase
        type="text"
        value={valorMascarado}
        name=""
        onHandleChange={handleChange}
        placeHolder="(99) 99999-9999"
        className="w-full h-full px-2 py-1"
        {...rest}
      />
      {/* Campo real que será lido pelo FormData */}
      <input type="hidden" name={name} id={name} value={valorLimpo} />
    </div>
  );
};

export default InputFone;
