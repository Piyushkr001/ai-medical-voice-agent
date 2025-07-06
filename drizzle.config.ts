import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_Oy9JEHK2PprL@ep-jolly-shape-a8hbcgn5-pooler.eastus2.azure.neon.tech/MediNova%20AI?sslmode=require",
  },
});
