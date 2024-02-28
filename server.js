import express from 'express';
import modeloHATEOAS from './helper/modeloHATEOAS.js'
import { getJoyas, getJoyasFilters } from './consultas.js'

const app = express();

app.listen(3000, console.log('¡Servidor encendido!'))
app.use((req, res, next) => {
    console.log(`Nueva solicitud: ${req.method} ${req.url}`);
    next();
});

app.get('/joyas', async (req, res) => {
    try {
        const joyas = await getJoyas(req.query);
        const HATEOAS = await modeloHATEOAS(joyas);
        res.json(HATEOAS);
    } catch (err) {
        console.error({Error: "Error al obtener las joyas", err});
        res.status(500).json({Error: "Error al obtener las joyas", err})
    }
})
app.get('/joyas/filtros', async (req, res) =>{
    try {
        const joyas = await getJoyasFilters(req.query);
        const HATEOAS = await modeloHATEOAS(joyas);
        res.json(HATEOAS);
    } catch (error) {
        console.error({Error: "Error al obtener las joyas", err});
        res.status(500).json({Error: "Error al obtener las joyas", err})
    }
    
})

app.get("*", (req, res) => {
    res.status(404).send("La ruta que intenta acceder, ¡NO EXISTE!")
    })
    
