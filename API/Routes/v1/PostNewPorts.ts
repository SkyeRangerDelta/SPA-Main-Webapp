// Imports
import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { DBHandler } from "../../Utilities/DBHandler.ts";
import { PortRecord } from "../../Interfaces.ts";
import { randomUUID } from "node:crypto";

interface PostPortsRes {
  status: number;
  message: string;
  success: boolean;
  insertedCount?: number;
  insertedIds?: number[];
}

// Logic
const router = new Router();

router
  .post('/PostNewPorts', async ( ctx: RouterContext<string> ) => {
    const Mongo: DBHandler = ctx.state.Mongo;

    const adminToken = Deno.env.get( 'ADMIN_TOKEN' ) || randomUUID;

    // Check headers for a predefined ENV token
    const token = ctx.request.headers.get( 'x-admin-token' );

    if ( !token || token !== adminToken ) {
      const res: PostPortsRes = {
        status: 401,
        message: 'Unauthorized. Invalid or missing token.',
        success: false
      }
      ctx.response.status = 401;
      ctx.response.body = res;
      return;
    }

    // Parse and validate request body
    let data;
    try {
      data = await ctx.request.body.json();
    } catch ( error ) {
      const res: PostPortsRes = {
        status: 400,
        message: 'Bad request. Invalid or missing JSON body.',
        success: false
      }
      ctx.response.status = 400;
      ctx.response.body = res;
      return;
    }

    // Validate that data is an array
    if ( !Array.isArray(data) || data.length === 0 ) {
      const res: PostPortsRes = {
        status: 400,
        message: 'Bad request. Expected non-empty array of port records.',
        success: false
      }
      ctx.response.status = 400;
      ctx.response.body = res;
      return;
    }

    // Get the current port count to generate IDs
    const currentPortCount = await Mongo.getRecordCount( 'SPA_Ports' );
    let nextId = currentPortCount + 1;

    const insertedIds: number[] = [];
    const portsToInsert: PortRecord[] = [];

    // Prepare all ports for insertion
    for ( const portData of data ) {
      const portToPost = {
        id: nextId,
        name: portData.name,
        parentMunicipality: portData.parentMunicipality || '',
        alignment: portData.alignment || '',
        description: portData.description || '',
        services: portData.services || [],
        harbormaster: portData.harbormaster || '',
        docks: portData.docks || 0,
        berths: portData.berths || 0
      } as PortRecord;

      portsToInsert.push( portToPost );
      insertedIds.push( nextId );
      nextId++;
    }

    // Insert all ports
    let successCount = 0;
    for ( const port of portsToInsert ) {
      try {
        const insertResult = await Mongo.insertOne( 'SPA_Ports', port );
        if ( insertResult && insertResult.inserted >= 1 ) {
          successCount++;
        }
      } catch ( error ) {
        console.error(`Failed to insert port ${port.id}:`, error);
      }
    }

    if ( successCount === 0 ) {
      const res: PostPortsRes = {
        status: 500,
        message: 'Failed to insert any ports.',
        success: false
      };

      ctx.response.status = 500;
      ctx.response.body = res;
      return;
    }

    const res: PostPortsRes = {
      status: 200,
      message: `Successfully inserted ${successCount} of ${data.length} ports.`,
      success: true,
      insertedCount: successCount,
      insertedIds: insertedIds.slice(0, successCount)
    };

    ctx.response.status = 200;
    ctx.response.body = res;
  });

export default {
  name: 'PostNewPorts',
  router: router
};
