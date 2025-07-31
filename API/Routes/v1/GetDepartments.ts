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
  .get('/GetDepartments', async ( ctx: RouterContext<string> ) => {
    const Mongo: DBHandler = ctx.state.Mongo;

    console.log( 'Returning no departments for now.' );

    ctx.response.body = {
      status: 200,
      message: 'Success',
      success: true,
      departments: []
    };
  });

export default {
  name: 'GetDepartments',
  router: router
};