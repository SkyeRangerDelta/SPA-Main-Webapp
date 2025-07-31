// Imports
import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { DBHandler } from "../../Utilities/DBHandler.ts";
// import { ClientSettingsResult } from "../../../../webapp/src/app/customTypes.ts";

// Logic
const router = new Router();

router
  .get('/GetNotices', async ( ctx: RouterContext<string> ) => {
    const Mongo: DBHandler = ctx.state.Mongo;

    if ( parseInt( ctx.request.url.searchParams.get('noticeId') ) ) {
      const noticeId = parseInt( ctx.request.url.searchParams.get('noticeId') );
      const noticeRes = await Mongo.selectOneById( `SPA_Notices`, noticeId );

      if ( !noticeRes ) {
        ctx.response.status = 404;
        ctx.response.body = {
          status: 404,
          message: 'Notice not found',
          success: false
        };
        return;
      }

      ctx.response.body = {
        status: 200,
        message: 'Success',
        notice: noticeRes,
        success: true
      };
      return;
    }

    const limit = parseInt( ctx.request.url.searchParams.get('limit') || '5' );

    const noticesRes = await Mongo.selectMany( `SPA_Notices`, {}, { limit: limit } );

    ctx.response.body = {
      status: 200,
      message: 'Success',
      notices: noticesRes,
      success: true
    };
  });

export default {
  name: 'GetNotices',
  router: router
};