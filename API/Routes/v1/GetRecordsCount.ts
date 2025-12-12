// Imports
import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { DBHandler } from "../../Utilities/DBHandler.ts";

interface RecordRes {
  status: number;
  message: string;
  success: boolean;
  count: number;
}

// Logic
const router = new Router();

router
  .get('/GetRecordsCount', async ( ctx: RouterContext<string> ) => {
    const Mongo: DBHandler = ctx.state.Mongo;

    const records = await Mongo.getRecordCount( 'SPA_Records' );

    const res: RecordRes = {
      status: 200,
      message: 'Records retrieved successfully.',
      success: true,
      count: records
    };

    ctx.response.status = 200;
    ctx.response.body = res;
  });

export default {
  name: 'GetRecordsCount',
  router: router
};
