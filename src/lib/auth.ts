import { createAuthClient } from "@neon/auth";

const authUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.["VITE_NEON_AUTH_URL"]) ||
  process.env["NEON_AUTH_BASE_URL"] ||
  "https://ep-falling-shadow-bel8mq12.neonauth.c-9.us-east-2.aws.neon.tech/neondb/auth";

export const authClient = createAuthClient(authUrl);
