import { config } from "dotenv";

config();
export const configApp = {
  appName: "Discus",
  secret_key: process.env.SECRET_KEY,
  database_url: process.env.DATABASE_URL,
  frontend_url: process.env.FRONTEND_URL,
  ssr_cookie: "SSR_ACCESS",
  csr_cookie: "CSR_ACCESS",
};
