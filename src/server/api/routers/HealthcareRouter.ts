import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const InsuranceValidator = z.union([
    z.literal("FQHC"),
    z.literal("QI")
]);

export type InsuranceProviders = z.infer<typeof InsuranceValidator>;

const HealthcareRouter = createTRPCRouter({
    getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
        const entry = await db.healthCenter.findFirst({
            where: {
                id: input.id
            },
            include: {
                procedureTypes: true
            }
        });
        if(!entry) throw new TRPCError({ code: "NOT_FOUND", message: "Clinic not found." });
        return entry;
    }),
    // must be FQHC or QI for 'quest insurance'
    getByPlan: publicProcedure
    .input(z.object({ insurance: InsuranceValidator }))
    .query(async ({ input }) => {
        const a = await db.healthCenter.findMany({
            where: {
                insurancePlans: {
                    has: input.insurance
                }
            },
            take: 100,
        });

        return a;
    }),
    getSome: publicProcedure
    .query(async () => {
        const a = await db.healthCenter.findMany({
            take: 100,
        });

        return a;
    }),
})

export default HealthcareRouter;