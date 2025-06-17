export const setCookieToken = async(token: string) => {
    const resCookieToken = await fetch(`http://localhost:3000/api/usuarios/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token: token})
    })

    if(resCookieToken.status !== 200) {        
        return false
    } 

    return true
}