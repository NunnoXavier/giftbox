import  { calcDistancia } from "./calcDistancia";

describe('calcDistancia', () => {
    it('deve calcular a distancia entre dois ceps', () => {
        const latitudeCasa = -23.509808009212026
        const longitudeCasa = -46.689968693803344
        const latitudePaulista = -23.558124645243666
        const longitudePaulista = -46.65597974144957            
        const distanciaCalculada = calcDistancia(latitudeCasa, longitudeCasa, latitudePaulista, longitudePaulista);
        const distanciaEsperada = 6.39 //aproximadamente 6km
        expect(distanciaCalculada).toBeCloseTo(distanciaEsperada, 0);
    })
    it('deve retornar zero se as coordenadas forem iguais', () => {
        const latitudeCasa = -23.509808009212026
        const longitudeCasa = -46.689968693803344
        const latitudePaulista = -23.509808009212026
        const longitudePaulista = -46.689968693803344
        const distanciaCalculada = calcDistancia(latitudeCasa, longitudeCasa, latitudePaulista, longitudePaulista);
        const distanciaEsperada = 0;
        expect(distanciaCalculada).toBe(distanciaEsperada);
    })
})
