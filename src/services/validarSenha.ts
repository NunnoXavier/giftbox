export const validarSenha = (senha?: string): 
{valido: boolean, mensagem: string} => {
    if(!senha){
        return {valido: false, mensagem: "Senha não informada!"}
    }
    const mensagemPadrao = "A Senha deve conter, no mínimo 8 caracteres, entre letras maiúsculas, minúsculas, números e caracteres especiais!"
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#$%&*!?_\\-]{8,}$/
    if(!regex.test(senha)){
        return {valido: false, mensagem: mensagemPadrao}
    }
    return {valido: true, mensagem: ""}
}