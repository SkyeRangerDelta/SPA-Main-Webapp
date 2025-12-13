// Imports
import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { DBHandler } from "../../Utilities/DBHandler.ts";
import { RegistryRecord } from "../../Interfaces.ts";
import { randomUUID } from "node:crypto";

interface PostRecordsRes {
  status: number;
  message: string;
  success: boolean;
  insertedCount?: number;
  insertedIds?: number[];
}

// Logic
const router = new Router();

router
  .post('/PostNewRecords', async ( ctx: RouterContext<string> ) => {
    const Mongo: DBHandler = ctx.state.Mongo;
    const data = await ctx.request.body.json();

    const adminToken = Deno.env.get( 'ADMIN_TOKEN' ) || randomUUID;

    // Check headers for a predefined ENV token
    const token = ctx.request.headers.get( 'x-admin-token' );

    if ( !token || token !== adminToken ) {
      const res: PostRecordsRes = {
        status: 401,
        message: 'Unauthorized. Invalid or missing token.',
        success: false
      }
      ctx.response.status = 401;
      ctx.response.body = res;
      return;
    }

    // Validate that data is an array
    if ( !Array.isArray(data) || data.length === 0 ) {
      const res: PostRecordsRes = {
        status: 400,
        message: 'Bad request. Expected non-empty array of records.',
        success: false
      }
      ctx.response.status = 400;
      ctx.response.body = res;
      return;
    }

    // Get the current record count to generate IDs
    const currentRecordCount = await Mongo.getRecordCount( 'SPA_Records' );
    let nextId = currentRecordCount + 1;

    const insertedIds: number[] = [];
    const recordsToInsert: RegistryRecord[] = [];

    // Prepare all records for insertion
    for ( const recordData of data ) {
      const postDate = recordData.createdAt ? new Date( recordData.createdAt ) : new Date();

      const recordToPost = {
        id: nextId,
        title: recordData.title,
        description: recordData.description || '',
        content: recordData.content || '',
        fileUrl: recordData.fileUrl || undefined,
        status: recordData.status,
        createdAt: postDate,
        updatedAt: postDate,
        createdAtFriendly: postDate.toDateString(),
        updatedAtFriendly: postDate.toDateString(),
        recordType: recordData.recordType,
        department: recordData.department || undefined,
        author: recordData.author
      } as RegistryRecord;

      recordsToInsert.push( recordToPost );
      insertedIds.push( nextId );
      nextId++;
    }

    // Insert all records
    let successCount = 0;
    for ( const record of recordsToInsert ) {
      try {
        const insertResult = await Mongo.insertOne( 'SPA_Records', record );
        if ( insertResult && insertResult.inserted >= 1 ) {
          successCount++;
        }
      } catch ( error ) {
        console.error(`Failed to insert record ${record.id}:`, error);
      }
    }

    if ( successCount === 0 ) {
      const res: PostRecordsRes = {
        status: 500,
        message: 'Failed to insert any records.',
        success: false
      };

      ctx.response.status = 500;
      ctx.response.body = res;
      return;
    }

    const res: PostRecordsRes = {
      status: 200,
      message: `Successfully inserted ${successCount} of ${data.length} records.`,
      success: true,
      insertedCount: successCount,
      insertedIds: insertedIds.slice(0, successCount)
    };

    ctx.response.status = 200;
    ctx.response.body = res;
  });

export default {
  name: 'PostNewRecords',
  router: router
};
