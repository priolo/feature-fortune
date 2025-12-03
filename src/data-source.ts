import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres", // o mysql, sqlite, etc.
    host: "localhost",
    username: "admin",
    password: "password",
    database: "prod_db",
    entities: ["src/repository/*.ts"], 
    
    // IMPORTANTE PER LE MIGRATION
    migrations: ["src/migration/*.ts"], // Dove leggere le migration
    migrationsTableName: "migrations",  // Tabella nel DB che tiene traccia della storia
    synchronize: false, // Disabilitato in prod
});