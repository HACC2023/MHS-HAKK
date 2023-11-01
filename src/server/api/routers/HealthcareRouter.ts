import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";

const HealthcareRouter = createTRPCRouter({
    getRandom: publicProcedure.query(async () => {
        const randInd = Math.random() * await db.data.count();
        return await db.data.findFirst({
            skip: randInd
        });
    })
})

export default HealthcareRouter;