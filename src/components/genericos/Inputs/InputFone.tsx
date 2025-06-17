// components/genericos/Inputs/InputFone.tsx
'use client';

import { useState } from "react";

const aplicarMascaraTelefone = (valor: string): string => {
  const numeros = valor.replace(/\D/g, '');
  if (numeros.length <= 2) return `(${numeros}`;
  if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  if (numeros.length <= 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
};

const InputFone = () => {
  const [valorMascarado, setValorMascarado] = useState("");
  const [valorLimpo, setValorLimpo] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const apenasNumeros = e.target.value.replace(/\D/g, '');
    const valorComMascara = aplicarMascaraTelefone(apenasNumeros);

    setValorLimpo(apenasNumeros);
    setValorMascarado(valorComMascara);
  };

  return (
    <div>
      <label htmlFor="telefone">Telefone:</label><br />
      <input
        type="text"
        value={valorMascarado}
        onChange={handleChange}
        placeholder="(99) 99999-9999"
      />
      {/* Campo real que será lido pelo FormData */}
      <input type="hidden" name="telefone" value={valorLimpo} />
    </div>
  );
};

export default InputFone;
