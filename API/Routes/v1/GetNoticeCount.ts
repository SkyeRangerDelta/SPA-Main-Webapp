// Imports
import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { DBHandler } from "../../Utilities/DBHandler.ts";

interface NoticeRes {
  status: number;
  message: string;
  success: boolean;
  count: number;
}

// Logic
const router = new Router();

router
  .get('/GetNoticesCount', async ( ctx: RouterContext<string> ) => {
    const Mongo: DBHandler = ctx.state.Mongo;

    const notices = await Mongo.getRecordCount( 'SPA_Notices' );

    const res: NoticeRes = {
      status: 200,
      message: 'Notices retrieved successfully.',
      success: true,
      count: notices
    };

    ctx.response.status = 200;
    ctx.response.body = res;
  });

export default {
  name: 'GetNoticesCount',
  router: router
};