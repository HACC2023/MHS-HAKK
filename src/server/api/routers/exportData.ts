const { PrismaClient } = require("@prisma/client");
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from 'zod'

const prisma = new PrismaClient();

async function getDataFromPrisma() {
    const allData = await prisma.centers.findMany();
    const uniqueNames = new Set();
    const features = allData
        .filter((entry: {
            Health_Center_Organization_Street_Address: string
        }) => {
            if (uniqueNames.has(entry.Health_Center_Organization_Street_Address)) {
                return false;
            }
            uniqueNames.add(entry.Health_Center_Organization_Street_Address);
            return true;
        })
        .map((entry: {
            Health_Center_Organization_Street_Address: string,
            Health_Center_Name: string,
            Geocoding_Artifact_Address_Primary_X_Coordinate: number,
            Geocoding_Artifact_Address_Primary_Y_Coordinate: number
        }) => {
            return {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [
                        entry.Geocoding_Artifact_Address_Primary_X_Coordinate,
                        entry.Geocoding_Artifact_Address_Primary_Y_Coordinate,
                    ],
                },
                properties: {
                    // Add any additional properties
                    name: entry.Health_Center_Name,
                    address: entry.Health_Center_Organization_Street_Address,
                },
            };
        });
    return features;
}
const dataExport = createTRPCRouter({
    lat: publicProcedure
        .input(z.object({ Geocoding_Artifact_Address_Primary_X_Coordinate: z.number() }))
        .query(({ ctx, input }) => {
            return ctx.db.centers.findMany({
                where: {
                    Geocoding_Artifact_Address_Primary_X_Coordinate: input.Geocoding_Artifact_Address_Primary_X_Coordinate
                }
            });
        }),
    lng: publicProcedure
        .input(z.object({ Geocoding_Artifact_Address_Primary_Y_Coordinate: z.number() }))
        .query(({ ctx, input }) => {
            return ctx.db.centers.findMany({
                where: {
                    Geocoding_Artifact_Address_Primary_Y_Coordinate: input.Geocoding_Artifact_Address_Primary_Y_Coordinate
                }
            });
        }),
    getAll: publicProcedure.query(() => {
        return getDataFromPrisma()
    })
    
});

export default dataExport;