// Imports
import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { DBHandler } from "../../Utilities/DBHandler.ts";
import { Notice } from "../../../frontend/src/app/TypeDefs.ts";

interface NoticeRes {
  status: number;
  message: string;
  success: boolean;
  notice?: Notice | null;
}

// Logic
const router = new Router();

router
  .get('/GetNotices', async ( ctx: RouterContext<string> ) => {
    const Mongo: DBHandler = ctx.state.Mongo;

    if ( parseInt( ctx.request.url.searchParams.get('noticeId') ) ) {
      const noticeId = parseInt( ctx.request.url.searchParams.get('noticeId') );
      const noticeRes = await Mongo.selectOneById( `SPA_Notices`, noticeId );

      if ( !noticeRes ) {
        console.log(`Notice with ID ${noticeId} not found.`);

        ctx.response.status = 404;
        ctx.response.body = {
          status: 404,
          message: 'Notice not found',
          success: false,
          notice: null
        } as NoticeRes;
        return;
      }

      ctx.response.body = {
        status: 200,
        message: 'Success',
        notice: noticeRes,
        success: true
      } as NoticeRes;
      return;
    }
    else {
      const limit = parseInt( ctx.request.url.searchParams.get('limit') || '6' );
      const offset = parseInt( ctx.request.url.searchParams.get('offset') || '0' );

      const noticesRes = await Mongo.selectMany( `SPA_Notices`, {}, { limit: limit, skip: offset } );

      return ctx.response.body = {
        status: 200,
        message: 'Success',
        notices: noticesRes,
        success: true
      };
    }
  });

export default {
  name: 'GetNotices',
  router: router
};