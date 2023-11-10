import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

const InsuranceValidator = z.union([z.literal("FQHC"), z.literal("QI")]);

export type InsuranceProviders = z.infer<typeof InsuranceValidator>;
export type IDToMeta = Record<string, { names: string[], address: string }>;

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
          supportedInsurances: {
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
  getDataByName: publicProcedure.input(z.object({ name: z.string() })).query(async ({ input }) => {
    const lol: ({_id: {$oid: string }} & Prisma.HealthCenterGroupByOutputType)[] = await db.healthCenter.findRaw({
        filter: {
            names: {
                // prisma doesnt have an elegant way of filtering if a letter occurs in a string[] so we use regexes.
                $regex: input.name.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&'),
                $options: 'i'
            }
        }
    }) as unknown as [];
    const format:IDToMeta = {};
    for(const place of lol)
      format[place._id.$oid] = { names: place.names, address: place.address }; 
    return format;
  }),
  getAllProcedureTypes: publicProcedure.query(async () => {
    const t = await db.procedureType.findMany();
    return t.filter((item,index,self) => self.findIndex(e=>item.name === e.name) === index);
  }),
});

export default HealthcareRouter;
