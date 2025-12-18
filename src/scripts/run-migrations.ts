import "reflect-metadata";
import { AppDataSource } from "../data-source.js"; // adjust import if named differently

(async () => {
  const ds = await AppDataSource.initialize();
  await ds.runMigrations();
  await ds.destroy();
  console.log("Migrations applied");
})();