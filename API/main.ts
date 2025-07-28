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
import { DBHandler } from "./Utilities/DBHandler.ts";
import { MainRouter } from "./Routes/MainRouter.ts";

// Server
const app = new Application();

const port = parseInt( Deno.env.get('APP_PORT') ) || 3000;
const hostname = Deno.env.get('APP_HOST') || "localhost";

const Mongo = new DBHandler();

// Attach Mongo
app.use( async ( ctx, next ) => {
  ctx.state.Mongo = Mongo;
  await next();
});

// Log
app.use( async ( ctx, next ) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
});

// Pages/Routes
app.use( MainRouter.routes(), MainRouter.allowedMethods() );

app.use( async ( ctx, next ) => {
  const indexPath = Deno.cwd() + "/frontend/dist/spa-main-webapp/browser";

  try {
    await ctx.send({
      root: indexPath,
      index: "index.html",
    });
  }
  catch (error) {
    console.error("Error serving index.html:", error);
    ctx.response.status = 500;
    ctx.response.body = "Internal Server Error";
    await next();
  }
});

// Error handling
app.use( ( ctx ) => {
  if (ctx.response.status === 404) {
    ctx.response.body = "404 Not Found";
  } else if (ctx.response.status >= 500) {
    ctx.response.body = "500 Internal Server Error";
  }
} );

// Start the server
console.log( `Serving app on ${ hostname }:${ port }` );
await app.listen( { port: port, hostname: hostname } );