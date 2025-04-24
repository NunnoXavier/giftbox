export const fetchSecoes = async () => {
    const res = await fetch(`http://localhost:3000/api/secoes`, {
        cache: "force-cache",
        next: {
            tags: ['secoes']
        }
    })
    return res
}
