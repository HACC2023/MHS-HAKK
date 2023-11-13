import { createTRPCRouter } from "~/server/api/trpc";
import HealthcareRouter from "./routers/HealthcareRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  healthcare: HealthcareRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
