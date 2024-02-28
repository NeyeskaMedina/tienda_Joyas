import pool from './joyasDB/conectionDB.js';
import format from 'pg-format';

//
const getJoyas = async ({ limits = 6, page = 1, order_by = "id_ASC" }) =>{
    const [ campo, direccion ] = order_by.split("_");
    const offset = (page - 1) * limits;
    const formattedQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);
    const { rows: inventario } = await pool.query(formattedQuery);
    return inventario
}
const getJoyasFilters = async ({ precio_max, precio_min, categoria, metal }) =>{
    let filtros = [];
    const values = []; 
        const addJoyas = (campo, comparador, valor) =>{
            // values.push(valor);
            // const { length } = filtros;
          
            filtros.push(`${campo} ${comparador} ${valor}`)
        }
    if (precio_max) {
        const precioMax_Int = parseInt(precio_max);
        console.log(precioMax_Int, typeof precioMax_Int);
        addJoyas('precio', '<=', precioMax_Int);
    }
    if (precio_min) {
        const precioMin_Int = parseInt(precio_min);
        console.log(precioMin_Int, typeof precioMin_Int);
        addJoyas('precio', '>=', precioMin_Int);
    }
    if (categoria) addJoyas('categoria', '=', `'${categoria}'`);
    if (metal) addJoyas('metal', '=', `'${metal}'`);
    let consulta = "SELECT * FROM inventario"
    if (filtros.length > 0){
        filtros = filtros.join(" AND ");
        consulta += ` WHERE ${filtros}`
    }
    console.log(consulta);
    const { rows: inventario } = await pool.query(consulta, values)
    return inventario
};
export { getJoyas, getJoyasFilters };