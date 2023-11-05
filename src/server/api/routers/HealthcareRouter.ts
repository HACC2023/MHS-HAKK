import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

const InsuranceValidator = z.union([z.literal("FQHC"), z.literal("QI")]);

export type InsuranceProviders = z.infer<typeof InsuranceValidator>;

const HealthcareRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await db.healthCenter.findFirst({
        where: {
          id: input.id,
        },
        include: {
          procedureTypes: true,
          reviews: true,
        },
      });
    }),
  // must be FQHC or QI for 'quest insurance'
  getByPlan: publicProcedure
    .input(z.object({ insurance: InsuranceValidator }))
    .query(async ({ input }) => {
      const a = await db.healthCenter.findMany({
        where: {
          insurancePlans: {
            has: input.insurance,
          },
        },
        take: 100,
      });

      return a;
    }),
  getSome: publicProcedure.query(async () => {
    const a = await db.healthCenter.findMany({
      take: 100,
    });

    return a;
  }),

  createReview: publicProcedure
    .input(
      z.object({
        hadQuest: z.boolean(),
        healthCenterID: z.string().min(1),
        reviewedProcedures: z.array(
          z.object({
            type: z.string().min(1),
            name: z.string().min(1),
            covered: z.boolean(),
            hadQuest: z.boolean(),
            healthCenterID: z.string().min(1),
            procedureTypeID: z.string().min(1),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const returnedProcedureTypeIDs = input.reviewedProcedures.reduce(
        (returnedProcedureTypeIDs, reviewedProcedure) => {
          if (
            !returnedProcedureTypeIDs.includes({
              id: reviewedProcedure.procedureTypeID,
            })
          ) {
            returnedProcedureTypeIDs.push({
              id: reviewedProcedure.procedureTypeID,
            });
          }
          return returnedProcedureTypeIDs;
        },
        [] as Array<{ id: string }>,
      );

      return await ctx.db.review.create({
        data: {
          hadQuest: input.hadQuest,
          healthCenterID: input.healthCenterID,
          procedureReviews: {
            create: input.reviewedProcedures,
          },
          procedureTypes: {
            connect: returnedProcedureTypeIDs,
          },
        },
      });
    }),
  getData: publicProcedure.query(async () => {
    const allData = await db.healthCenter.findMany();
    const features = allData.map((entry: { names: string[] }) => {
      return [entry.names];
    });
    return features;
  }),
});

export default HealthcareRouter;
