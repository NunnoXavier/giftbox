import pg, { PoolConfig, QueryResult } from 'pg'

const { Pool } = pg

// Converte os tipos numéricos do Postgres para Number no Node.js
pg.types.setTypeParser(1700, (val:string) => parseFloat(val)); // 1700 é o OID para NUMERIC/DECIMAL
pg.types.setTypeParser(20, (val:string) => parseInt(val, 10)); // 20 é o OID para BIGINT
pg.types.setTypeParser(21, (val:string) => parseInt(val, 10)); // 21 é o OID para SMALLINT
pg.types.setTypeParser(23, (val:string) => parseInt(val, 10)); // 23 é o OID para INTEGER

// Aqui você configura o parser antes de usar qualquer conexão
pg.types.setTypeParser(1082, str => new Date(str)); // 1082 = DATE

const config: PoolConfig ={
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
}

const pool = new Pool(config)


const query = async( command: string ) => {
    const str = command.replaceAll(`"`,`'`)
    try {
        const result:QueryResult<any> = await pool.query(str)
        return result
        
    } catch (error:any) {
        throw new Error(`Postgres Error. Code: ${error.code} 
            sql: ${str}`)
        
    }
}

export type getQueryProps = {campo?:string, valor?:any}
export type ResultId = {data:|number|null, error: |string|null}

export default query
