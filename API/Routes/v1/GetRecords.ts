// Imports
import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { DBHandler } from "../../Utilities/DBHandler.ts";
import { RegistryRecord } from "../../Interfaces.ts";

interface RecordRes {
  status: number;
  message: string;
  success: boolean;
  record?: RegistryRecord | null;
}

// Logic
const router = new Router();

router
  .get('/GetRecords', async ( ctx: RouterContext<string> ) => {
    const Mongo: DBHandler = ctx.state.Mongo;

    const recordIdParam = ctx.request.url.searchParams.get('id');
    const recordId = recordIdParam !== null ? parseInt(recordIdParam) : null;
    const departmentParam = ctx.request.url.searchParams.get('department');
    const departmentId = departmentParam !== null ? parseInt(departmentParam) : null;
    const recordTypeParam = ctx.request.url.searchParams.get('recordType');
    const recordType = recordTypeParam !== null ? recordTypeParam : null;

    if ( recordId ) {
      const recordRes = await Mongo.selectOneById( `SPA_Records`, recordId );

      if ( !recordRes ) {
        console.log(`Record with ID ${recordId} not found.`);

        ctx.response.status = 404;
        ctx.response.body = {
          status: 404,
          message: 'Record not found',
          success: false,
          record: null
        } as RecordRes;
        return;
      }

      ctx.response.body = {
        status: 200,
        message: 'Success',
        record: recordRes,
        success: true
      } as RecordRes;
      return;
    }
    else {
      const limit = parseInt( ctx.request.url.searchParams.get('limit') || '10' );
      const offset = parseInt( ctx.request.url.searchParams.get('offset') || '0' );

      let query: any = {};
      if ( departmentId ) {
        query.department = departmentId;
      }
      if ( recordType ) {
        query.recordType = recordType;
      }

      const recordsRes = await Mongo.selectManyDateSorted( `SPA_Records`, query, { limit: limit, skip: offset }, { createdAt: -1 } );

      return ctx.response.body = {
        status: 200,
        message: 'Success',
        records: recordsRes,
        success: true
      };
    }
  });

export default {
  name: 'GetRecords',
  router: router
};
