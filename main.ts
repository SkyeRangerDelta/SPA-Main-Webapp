/*
 * ======= SARIM PORT AUTHORITY WEBAPP =======
 * This file is part of the Sarim Port Authority WebApp.
 * It is licensed under the GNU General Public License v3.0.
 *
 * Composed by: SkyeRangerDelta
 *
 * The Sarim Port Authority is a fictional entity for the
 * entertainment purposes of the communities of Planetary
 * Dynamics (PlDyn) and Christian Crew Gaming (CCG).
 * ============================================
 */

// Imports
import { Application } from "https://deno.land/x/oak/mod.ts";
import "https://deno.land/std@0.224.0/dotenv/load.ts";

// Server
const app = new Application();

app.use( (ctx) => {
  ctx.response.body = "Welcome to the Sarim Port Authority WebApp!";
});

await app.listen( { port: 3000 } );