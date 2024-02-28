import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgre",
    database: "joyas",
    port: 5432,
    allowExitOnIdle: true
})

export default pool;
