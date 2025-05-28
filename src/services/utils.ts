export const toDateBr = ( date?: Date|string ):string => {
    if(!date) return ""

    const dt = typeof date === 'string'? new Date(date.slice(0,10)) : date

    if(dt <= new Date(0)) return ""

    const day = (dt.getDate() +1).toString().padStart(2,'0')
    const month = (dt.getMonth() +1).toString().padStart(2,'0')
    const year = dt.getFullYear().toString().padStart(4,'0')
    return `${day}/${month}/${year}`
}

export const somarData = ( date?: Date|string, qtdDias?:number ):string => {
    if(!date) return ""

    const dt = typeof date === 'string'? new Date(date.slice(0,10)) : date

    if(dt <= new Date(0)) return ""

    const dtNova = new Date(dt.getTime() + (qtdDias ?? 0) * 24 * 60 * 60 * 1000)

    const day = dtNova.getDate().toString().padStart(2,'0')
    const month = dtNova.getMonth().toString().padStart(2,'0')
    const year = dtNova.getFullYear().toString().padStart(4,'0')
    return `${day}/${month}/${year}`
}

export const dateBrToISO = (date: string): string => {
    const [dia, mes, ano] = date.split('/')
    return `${ano}-${mes}-${dia}`
}

export const dateToISO = (date: Date|string): string => {
    if(!date) return ""

    const dt = typeof date === 'string'? new Date(date.slice(0,10)) : date

    if(dt <= new Date(0)) return ""

    const day = (dt.getDate() +1).toString().padStart(2,'0')
    const month = (dt.getMonth() +1).toString().padStart(2,'0')
    const year = dt.getFullYear().toString().padStart(4,'0')
    return `${year}-${month}-${day}`
}

export const diferencaEntreDatas = (data1: Date|string, data2: Date|string): number => {
    if(!data1 || !data2) return 0

    const dt1 = typeof data1 === 'string'? new Date(data1.slice(0,10)) : data1
    const dt2 = typeof data2 === 'string'? new Date(data2.slice(0,10)) : data2    
    const diferencaEmDias = Math.abs(dt2.getDate() - dt1.getDate());
    console.log(dt1, dt2, diferencaEmDias)
    return diferencaEmDias;
}

export const filtraNumeros = (entrada: string): string => {
    return entrada.replace(/\D/g, '');
}

export const normalizarTexto = (entrada?: string): string => {
    if(!entrada) return ''
    return decodeURIComponent(entrada)
    .normalize('NFD')                   // separa letras de acentos
    .replaceAll(/[\u0300-\u036f]/g, '')    // remove os acentos
    .replaceAll(/[^a-zA-Z0-9\s]/g, '')     // remove símbolos (deixa letras, números e espaços)
    .toLowerCase();    
}

export const toCurrencyBr = (value?: number): string => {
    if(!value) return "R$ 0,00"
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}