// Imports
import { Router } from 'https://deno.land/x/oak/mod.ts';

// Logic
async function loadRoutes( router: Router ) {
  console.log('Loading routes...');

  const routesDir = './Routes/v1';

  for await ( const dirEntry of Deno.readDirSync( routesDir ) ) {
    if ( dirEntry.isFile && dirEntry.name.endsWith('.ts') ) {
      try {
        const modulePath = `./v1/${ dirEntry.name }`;
        const module = await import( modulePath );

        console.log( `Loaded ${ dirEntry.name } route.` );

        router.use( module.default.router.routes(), module.default.router.allowedMethods() );
      }
      catch ( error ) {
        console.error(`Error loading route from ${ dirEntry.name }:`, error);
      }
    }
  }
}

export async function getRouter(): Promise<Router> {
  const router = new Router();

  await loadRoutes( router );

  return router;
}