// Imports
import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { DBHandler } from "../../Utilities/DBHandler.ts";
import { DraftNoticeRes, Notice } from "../../Interfaces.ts";

interface NoticeRes {
  status: number;
  message: string;
  success: boolean;
  count: number;
}

// Logic
const router = new Router();

router
  .post('/PostNewNotice', async ( ctx: RouterContext<string> ) => {
    const Mongo: DBHandler = ctx.state.Mongo;
    const data = await ctx.request.body.json();

    // Get the highest notice in the DB
    const notices = await Mongo.getRecordCount( 'SPA_Notices' );
    const id = notices + 1;

    const postDate = new Date();

    const noticeToPost = {
      id: id,
      title: data.title,
      content: data.content,
      createdAt: postDate,
      updatedAt: postDate,
      createdAtFriendly: postDate.toDateString(),
      updatedAtFriendly: postDate.toDateString(),
      class: data.class
    } as Notice;

    const noticePost = await Mongo.insertOne( 'SPA_Notices', noticeToPost );

    if ( !noticePost || noticePost.inserted < 1 ) {
      const res: DraftNoticeRes = {
        status: 500,
        message: 'Failed to post notice.',
        success: false
      };

      ctx.response.status = 500;
      ctx.response.body = res;
      return;
    }

    const res: DraftNoticeRes = {
      status: 200,
      message: 'Notice drafted successfully.',
      success: true,
      postId: noticePost.insertedId
    };

    ctx.response.status = 200;
    ctx.response.body = res;
  });

export default {
  name: 'PostNewNotice',
  router: router
};