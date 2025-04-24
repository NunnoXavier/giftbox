export const  apenasNumeros = ( entrada: string ) => {
  return entrada.replace(/\D/g, '')  
}

export const cpfCnpj = (value: string) => {
    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '')
  
    // Verifica se o valor tem 11 dígitos (CPF)
    if (value.length <= 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    // Caso contrário, é um CNPJ
    return value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    )
  }

  export const cartao = (value:string) => {
    value = value.replace(/\D/g, '');

    // Define a máscara dependendo do comprimento do número do cartão
    if (value.length <= 13) {
      // Cartões com 13 dígitos (por exemplo, alguns Visa)
      return value.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3').replace(/(\d{4})(\d{4})/, '$1 $2');
    } else if (value.length <= 15) {
      // Cartões com 15 dígitos (exemplo: American Express)
      return value.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
    } else {
      // Cartões com 16 dígitos (padrão para muitos, como Mastercard, Discover, etc.)
      return value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
    }
  };

  export const validadeCartao = (value:string) => {
    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');
  
    // Aplica a máscara: MM/YY
    return value.replace(/(\d{2})(\d{2})/, '$1/$2');
  };

  export function dinheiro (rawValue: string){
    let numericValue = rawValue.replace(/\D/g, ""); // Remove caracteres não numéricos
    numericValue = (parseInt(numericValue, 10) || 0).toString();

    if (numericValue.length < 3) {
      numericValue = numericValue.padStart(3, "0");
    }

    let cents = numericValue.slice(-2);
    let reais = numericValue.slice(0, -2);
    //reais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `${reais}.${cents}`;
}

export function cep(cep: string): string {
  // Remove tudo que não for número
  const numeros = cep.replace(/\D/g, '');

  // Aplica a máscara do CEP
  return numeros.replace(/^(\d{5})(\d{3}).*/, '$1-$2');
}