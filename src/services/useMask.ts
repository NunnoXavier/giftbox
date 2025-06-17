
/**
 * Removes all non-numeric characters from a given string.
 * 
 * @param {string} entrada - The input string to be filtered
 * @returns {string} A string containing only numeric characters
 * @example
 * // Returns "12345"
 * apenasNumeros("123-45")
 */
export const  apenasNumeros = ( entrada?: string) => {
  if(!entrada) return ''
  return entrada.replace(/\D/g, '')  
}

/**
 * Formats a CPF (individual taxpayer registry) or CNPJ (corporate taxpayer registry) number with appropriate masks.
 * 
 * @param {string} [value] - The CPF or CNPJ number to format
 * @returns {string} Formatted CPF or CNPJ number with dots and dashes/slashes, or empty string if no value provided
 * @example
 * // Returns "123.456.789-01"
 * cpfCnpj("12345678901")
 * 
 * // Returns "12.345.678/0001-23"
 * cpfCnpj("12345678000123")
 * 
 * @description Supports formatting for:
 * - CPF (11 digits): xxx.xxx.xxx-xx
 * - CNPJ (14 digits): xx.xxx.xxx/xxxx-xx
 */
export const cpfCnpj = (value?: string) => {
    if(!value) return ''
    value = value.replace(/\D/g, '')
  
    if (value.length <= 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    return value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    )
}
  
  /**
   * Formats a credit card number with spaces based on its length.
   * 
   * @param {string} [value] - The credit card number to format
   * @returns {string} Formatted credit card number with spaces, or empty string if no value provided
   * @example
   * // Returns "1234 5678 9012 3456"
   * cartao("1234567890123456")
   * 
   * @description Supports formatting for:
   * - 13-digit cards (e.g., some Visa cards)
   * - 15-digit cards (e.g., American Express)
   * - 16-digit cards (e.g., Mastercard, Discover)
   */
  export const cartao = (value?:string) => {
    if(!value) return ""
    // Remove qualquer caractere que não seja número
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

  /**
   * Formats a credit card expiration date with a MM/YY mask.
   * 
   * @param {string} [value] - The credit card expiration date to format
   * @returns {string} Formatted expiration date with MM/YY format, or empty string if no value provided
   * @example
   * // Returns "12/25"
   * validadeCartao("1225")
   * 
   * @description Removes non-numeric characters and formats the date as MM/YY
   */
  export const validadeCartao = (value?:string) => {
    if(!value) return ""
    value = value.replace(/\D/g, '');  

    return value.replace(/(\d{2})(\d{2})/, '$1/$2');
  };


  /**
   * Formats a numeric value as a monetary amount with decimal places.
   * 
   * @param {string} [rawValue] - The numeric value to format as currency
   * @returns {string} Formatted monetary value with decimal point, or empty string if no value provided
   * @example
   * // Returns "10.50"
   * dinheiro("1050")
   * 
   * @description Converts input to a decimal representation with two cents places
   */
  export function dinheiro (rawValue?: string){
    if(!rawValue) return ""
    let numericValue = rawValue.replace(/\D/g, "");
    numericValue = (parseInt(numericValue, 10) || 0).toString();

    if (numericValue.length < 3) {
      numericValue = numericValue.padStart(3, "0");
    }

    let cents = numericValue.slice(-2);
    let reais = numericValue.slice(0, -2);
    return `${reais}.${cents}`;
}

/**
 * Formats a Brazilian postal code (CEP) with a hyphen separator.
 * 
 * @param {string} [cep] - The postal code to format
 * @returns {string} Formatted postal code with 5-3 digit format, or empty string if no value provided
 * @example
 * // Returns "12345-678"
 * maskCep("12345678")
 * 
 * @description Removes non-numeric characters and formats the CEP as XXXXX-XXX
 */
export function maskCep(cep?: string): string {
  if(!cep) return ""
  const numeros = cep.replace(/\D/g, '');

  return numeros.replace(/^(\d{5})(\d{3}).*/, '$1-$2');
}