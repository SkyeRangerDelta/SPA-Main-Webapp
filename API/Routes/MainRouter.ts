//Imports
import { Router } from "https://deno.land/x/oak/mod.ts";
import { getRouter } from "./RouterLoader.ts";

// Logic
export const MainRouter = new Router();

const loadedRouter = await getRouter();

MainRouter.use( '/api/v1', loadedRouter.routes(), loadedRouter.allowedMethods() );