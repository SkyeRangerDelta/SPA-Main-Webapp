// Imports
import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { RecordStatus } from "../../Interfaces.ts";

interface RecordStatusesRes {
  status: number;
  message: string;
  success: boolean;
  recordStatuses: { value: string; label: string }[];
}

// Record status labels mapping
const RecordStatusLabels: Record<RecordStatus, string> = {
  [RecordStatus.ACTIVE]: 'Active',
  [RecordStatus.ARCHIVED]: 'Archived',
  [RecordStatus.PENDING_REVIEW]: 'Pending Review',
  [RecordStatus.DRAFT]: 'Draft',
  [RecordStatus.EXPIRED]: 'Expired'
};

// Logic
const router = new Router();

router
  .get('/GetRecordStatuses', async ( ctx: RouterContext<string> ) => {
    // Get all record status enum values
    const recordStatuses = Object.values(RecordStatus).map((status) => ({
      value: status,
      label: RecordStatusLabels[status]
    }));

    const res: RecordStatusesRes = {
      status: 200,
      message: 'Record statuses retrieved successfully.',
      success: true,
      recordStatuses: recordStatuses
    };

    ctx.response.status = 200;
    ctx.response.body = res;
  });

export default {
  name: 'GetRecordStatuses',
  router: router
};
