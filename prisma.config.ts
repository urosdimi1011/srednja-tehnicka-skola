import { defineConfig } from "prisma/config";

export default defineConfig({
  migrations: {
    seed: "ts-node prisma/seed/seed.ts",
  },
  datasource: {
    url: "mysql://stsedu_uros:4278TgeV%3F@localhost:3306/stsedu_dositej_db",
  },
});
