import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

const InsuranceValidator = z.union([
  z.literal("FQHC"),
  z.literal("QI"),
  z.undefined(),
]);
const ProcedureValidator = z.union([
  z.literal("Comprehensive Care"),
  z.literal("Obstetrician and Gynecologist"),
  z.literal("Internal Medicine"),
  z.literal("RN Family Nurse Practitioner"),
  z.literal("Family Medicine"),
  z.literal("Pediatrician"),
  z.literal("Podiatrist"),
  z.literal("Nephrologist"),
  z.undefined(),
]);

const REGEXFix = (str: string) => str.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");

export type InsuranceProviders = z.infer<typeof InsuranceValidator>;
export type ProcedureProviders = z.infer<typeof ProcedureValidator>;
export type IDToMeta = Record<string, { names: string[]; address: string }>;

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
    .input(
      z.object({
        insurance: InsuranceValidator,
        procedure: ProcedureValidator,
        query: z.string().or(z.undefined()),
      }),
    )
    .query(async ({ input }) => {
      const lol: ({
        _id: { $oid: string };
      } & Prisma.HealthCenterGroupByOutputType)[] =
        (await db.healthCenter.findRaw({
          filter: {
            $or: [
              {
                // prisma doesnt have an elegant way of filtering if a letter occurs in a string[] so we use regexes.
                address: input.query?.length
                  ? {
                      $regex: REGEXFix(input.query),
                      $options: "i",
                    }
                  : undefined,
              },
              {
                // if the string exists and isnt empty, make a regex that is case insensitive.
                names: input.query?.length
                  ? {
                      $regex: REGEXFix(input.query),
                      $options: "i",
                    }
                  : undefined,
              },
            ],
            $and: [
              {
                supportedInsurances: input.insurance
                  ? { $eq: input.insurance }
                  : undefined,
              },
              {
                procedureTypeNames: input.procedure
                  ? { $eq: input.procedure }
                  : undefined,
              },
            ],
          },
        })) as unknown as [];
      // the type of lol is off, .id does not exist until we copy _id to id
      lol.forEach((place, index) => (lol[index]!.id = place.id));
      return lol;
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
  // i feel like we can get rid of this procedure given that we now have getByPlan, which accepts a name, insurance, and procedure (all of which are optional iirc)
  getDataByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const lol: ({
        _id: { $oid: string };
      } & Prisma.HealthCenterGroupByOutputType)[] =
        (await db.healthCenter.findRaw({
          filter: {
            $or: [
              {
                // prisma doesnt have an elegant way of filtering if a letter occurs in a string[] so we use regexes.
                address: {
                  $regex: REGEXFix(input.name),
                  $options: "i",
                },
              },
              {
                names: {
                  $regex: REGEXFix(input.name),
                  $options: "i",
                },
              },
            ],
          },
        })) as unknown as [];
      const format: IDToMeta = {};
      for (const place of lol)
        format[place._id.$oid] = { names: place.names, address: place.address };
      return format;
    }),
  getAllProcedureTypes: publicProcedure.query(() => {
    return [];
    //const t = await db.procedureType.findMany();
    //return t.filter(
    //  (item, index, self) =>
    //    self.findIndex((e) => item.name === e.name) === index,
    //);
  }),
});

export default HealthcareRouter;
