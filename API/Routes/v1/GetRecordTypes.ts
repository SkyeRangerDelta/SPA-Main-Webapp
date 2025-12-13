// Imports
import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { RecordType } from "../../Interfaces.ts";

interface RecordTypesRes {
  status: number;
  message: string;
  success: boolean;
  recordTypes: { value: string; label: string }[];
}

// Record type labels mapping
const RecordTypeLabels: Record<RecordType, string> = {
  [RecordType.VESSEL_REGISTRATION]: 'Vessel Registration',
  [RecordType.CARGO_MANIFEST]: 'Cargo Manifest',
  [RecordType.CREW_ROSTER]: 'Crew Roster',
  [RecordType.PORT_ENTRY_LOG]: 'Port Entry Log',
  [RecordType.PORT_DEPARTURE_LOG]: 'Port Departure Log',
  [RecordType.TRADE_AGREEMENT]: 'Trade Agreement',
  [RecordType.CUSTOMS_DECLARATION]: 'Customs Declaration',
  [RecordType.CHARTER_DOCUMENT]: 'Charter Document',
  [RecordType.ADMINISTRATIVE_POLICY]: 'Administrative Policy',
  [RecordType.CORRESPONDENCE]: 'Official Correspondence',
  [RecordType.INCIDENT_REPORT]: 'Incident Report',
  [RecordType.OTHER]: 'Other'
};

// Logic
const router = new Router();

router
  .get('/GetRecordTypes', async ( ctx: RouterContext<string> ) => {
    // Get all record type enum values
    const recordTypes = Object.values(RecordType).map((type) => ({
      value: type,
      label: RecordTypeLabels[type]
    }));

    const res: RecordTypesRes = {
      status: 200,
      message: 'Record types retrieved successfully.',
      success: true,
      recordTypes: recordTypes
    };

    ctx.response.status = 200;
    ctx.response.body = res;
  });

export default {
  name: 'GetRecordTypes',
  router: router
};
