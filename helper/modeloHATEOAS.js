
const modeloHATEOAS = (joyas) =>{
    const stock_Total = joyas.reduce((suma, objeto) => {
        return suma + objeto.stock;
    }, 0);
    
    
    const results = joyas.map((m) => {
    return {
    name: m.nombre,
    href: `/joyas/joya/${m.id}`,
    }
    }).slice(0, 4)
    const total = joyas.length;
    const HATEOAS = {
    total,
    stock_Total,
    results,
    }
    return HATEOAS
}
export default modeloHATEOAS;;