'use server'

export const actionRecuperarSenha = async (email: string) => {
    const res = await fetch('http://localhost:3000/api/usuarios/recuperar-senha', {
        method: 'POST',
        headers: { "Content-type": "Application-json" },
        body: JSON.stringify({ email: email }),
        cache: "no-cache"
    })

    return res.ok
}