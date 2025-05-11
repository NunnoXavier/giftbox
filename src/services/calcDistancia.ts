export const calcDistancia = (lat1:number, lon1:number, lat2:number, lon2:number):number => {
    try {
        if(lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
            throw new Error('Parâmetros inválidos');
        }
        if(isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
            throw new Error('Parâmetros inválidos');
        }
        
        const R = 6371; // Raio da Terra en kilômetros
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        console.log(distance);
        return distance;        
    } catch (error:any) {
        throw new Error(error.message);
    }
}