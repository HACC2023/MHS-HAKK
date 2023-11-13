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

// from Stack Overflow lol - If someone enters a hospital with a period, regex thinks that it'll accept any char. When searching the db raw, regexes are ez to do but you have to escape some special characters soooo here we are.
const REGEXFix = (str: string) => str.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");

export type InsuranceProviders = z.infer<typeof InsuranceValidator>;
export type ProcedureProviders = z.infer<typeof ProcedureValidator>;
export type IDToMeta = Array<{ names: string[]; address: string }>;
export type CenterResult = Array<{ _id: { $oid: string }; } & Prisma.HealthCenterGroupByOutputType>;

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
        forAutocomplete: z.boolean().or(z.undefined()),
        query: z.string().or(z.undefined())
      }).or(z.undefined()),
    )
    .query(async ({ input }): Promise<CenterResult | IDToMeta> => {
      const lol: CenterResult =
        (await db.healthCenter.findRaw({
          filter: {
            // hey prisma, id really appreciate it if u could search mongodb, and if the user types in something that matches either the name or address of a hospital, plz add it to a list you will give me later thx
            $or: [
              {
                // prisma doesnt have an elegant way of filtering if a letter occurs in a string[] so we use regexes.
                address: input?.query?.length
                  ? {
                      $regex: REGEXFix(input.query),
                      $options: "i",
                    }
                  : undefined,
              },
              {
                // if the string exists and isnt empty, make a regex that is case insensitive.
                names: input?.query?.length
                  ? {
                      $regex: REGEXFix(input.query),
                      $options: "i",
                    }
                  : undefined,
              },
            ],
            // oh also, if they requested a specific insurance or provider, make sure that the hospitals also satisfy these conditions as well.
            $and: [
              {
                supportedInsurances: input?.insurance
                  ? { $eq: input.insurance }
                  : undefined,
              },
              {
                procedureTypeNames: input?.procedure
                  ? { $eq: input.procedure }
                  : undefined,
              },
            ]
          },
          options: {
            limit: 50
          }
        })) as unknown as [];
      // the type of lol is off, .id does not exist until we copy _id to id
      if(input?.forAutocomplete) return lol.map((center) => ({ names: center.names, address: center.address }))
      else {
        lol.forEach((place, index) => (lol[index]!.id = place._id.$oid));
        return lol;
      }
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
    })
});

export default HealthcareRouter;
