// Imports
import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { DBHandler } from "../../Utilities/DBHandler.ts";
import { Department, Notice } from "../../../frontend/src/app/TypeDefs.ts";

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

    const deps = await Mongo.selectMany('SPA_Departments', {}, {} );
    const depMap = deps.map((dep: any) => {
      return {
        id: dep.id,
        name: dep.name,
        shortName: dep.shortName,
        description: dep.description,
        href: dep.href
      } as Department;
    });

    if ( !depMap || depMap.length === 0 ) {
      console.log('No departments found.');

      ctx.response.status = 404;
      ctx.response.body = {
        status: 404,
        message: 'No departments found',
        success: false,
        departments: []
      };
      return;
    }

    ctx.response.body = {
      status: 200,
      message: 'Success',
      success: true,
      departments: depMap
    };
  });

export default {
  name: 'GetDepartments',
  router: router
};