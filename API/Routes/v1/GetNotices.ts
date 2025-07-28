// Imports
import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { DBHandler } from "../../Utilities/DBHandler.ts";
// import { ClientSettingsResult } from "../../../../webapp/src/app/customTypes.ts";

// Logic
const router = new Router();

router
  .get('/GetNotices', async ( ctx: RouterContext<string> ) => {
    const Mongo: DBHandler = ctx.state.Mongo;

    const noticesRes = await Mongo.selectMany( `SPA_Notices`, {}, {} );

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