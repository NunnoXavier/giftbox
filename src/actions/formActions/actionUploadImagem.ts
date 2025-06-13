export const actionUploadImagem = async (data: FormData): Promise<string|null> => {

    const res = await fetch(`http://localhost:3000/api/protegido/imagens/upload`,{
        method: 'POST',
        body: data
    })

    const { data: caminhoArquivo, error } = await res.json()
    if(error){
        console.log(error)
        return null
    }

    return caminhoArquivo
}
