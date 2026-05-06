import { defineConfig } from "prisma/config";

export default defineConfig({
  migrations: {
    seed: "ts-node prisma/seed/seed.ts",
  },
  datasource: {
    url: "mysql://root:4278TgeV%3F@localhost:3307/dositej_db",
  },
});
// mysql://stsedu_uros:4278TgeV%3F@localhost:3306/stsedu_dositej_db
