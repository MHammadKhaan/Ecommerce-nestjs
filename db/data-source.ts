import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv'
config()
export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
    logging: false,
    synchronize: false
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource