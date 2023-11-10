import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../api/root";
import superjson from "superjson";
import { db } from "../db";
const getServerSideHelper = () => createServerSideHelpers({
    router: appRouter,
    ctx: { db },
    transformer: superjson
});
export default getServerSideHelper;