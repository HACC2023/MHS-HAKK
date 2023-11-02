import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

const InsuranceValidator = z.union([
    z.literal("FQHC"),
    z.literal("QI")
]);

const HealthcareRouter = createTRPCRouter({
    getRandom: publicProcedure
    .query(async () => {
        const randInd = Math.random() * await db.data.count();
        return await db.data.findFirst({
            skip: randInd
        });
    }),
    // must be FQHC or QI for 'quest insurance'
    getByPlan: publicProcedure
    .input(z.object({ insurance: InsuranceValidator }))
    .query(async ({ input }) => {
        const a = await db.data.findMany({
            where: {
                INSURANCE_PLAN: input.insurance
            },
            take: 10
        });

        return a;
    })
})

export default HealthcareRouter;