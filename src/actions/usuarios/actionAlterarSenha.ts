'use server'

export const actionAlterarSenha = async ( novasenha: string, token: string ): Promise<boolean> => {
    const res = await fetch('http://localhost:3000/api/usuarios/nova-senha', {
        method: 'POST',
        headers: { "Content-type": "Application-json" },
        body: JSON.stringify({ token: token, password: novasenha }),
        cache: "no-cache"
    })

    return res.ok
}