import fs from "fs";
import { ENV_TYPE, envInit } from "../types/env.js";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { DataSourceOptions } from "typeorm";



envInit();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// in base ai settaggi dell'env imposto la connessione al DB
export const getDBConnectionConfig = (noLog: boolean = false): DataSourceOptions => {

	let config: any = null

	// se c'e' una path allora stiamo parlando di SQLITE
	if (process.env.DB_DIR != null) {
		config = buildSqlite();
	} else {
		// MYSQL
		//config = buildMySQL();
		// POSTGRESQL
		config = buildPostgreSQL();
	}

	return {
		...config,
		synchronize: true, // process.env.NODE_ENV != ENV_TYPE.PROD, // in prod mai
		//migrations: ["src/migration/*.ts"], // Dove leggere le migration
		//migrationsTableName: "migrations",  // Tabella nel DB che tiene traccia della storia
		logging: !noLog //&& process.env.NODE_ENV != ENV_TYPE.PROD, // in prod mai
	}

}


function buildSqlite() {
	let dbPath: string
	const base = path.join(__dirname, "../", process.env.DB_DIR)

	if (process.env.NODE_ENV == ENV_TYPE.TEST) {
		if (!dbPath) dbPath = path.join(base, "/database.test.sqlite")
		try { if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath) }
		catch (e) { console.log(e) }
	} else if (process.env.NODE_ENV == ENV_TYPE.DEV) {
		dbPath = path.join(base, "/database.dev.sqlite")
		// Delete database file in dev mode when DB_DEV_RESET is true
		if (process.env.DB_DEV_RESET == "true") {
			try { if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath) }
			catch (e) { console.log(e) }
		}
	} else {
		dbPath = path.join(base, "/database.sqlite")
	}

	return {
		type: "sqlite",
		database: dbPath,
	}
}

function buildMySQL() {
	return {
		type: "mysql",
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	}
}

function buildPostgreSQL() {
	return {
		type: "postgres",
		url: process.env.DB_URL,
		ssl: true,
		extra: {
			ssl: {
				rejectUnauthorized: false // NECESSARIO per connettersi a Render da locale
			}
		}
	}
}

export function getTimestampType() {
	// in SQLITE il tipo è 'datetime'
	if (process.env.DB_DIR != null) {
		return 'datetime'
	}
	// in MYSQL e POSTGRESQL il tipo è 'timestamp'
	return 'timestamp'
}