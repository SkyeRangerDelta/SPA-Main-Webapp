export interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  createdAtFriendly: string,
  updatedAtFriendly: string;
  class: string;
  author: string;
}

export interface NoticeRes {
  status: number;
  message: string;
  success: boolean;
  notice?: Notice | null;
}

export interface DraftNoticeRes {
  status: number;
  message: string;
  success: boolean;
  postId?: number;
}

export interface Department {
  id: number;
  name: string;
  shortName: string;
  description: string;
  href: string;
}

// Record Types for the Office of the Harbour Registry
export enum RecordType {
  VESSEL_REGISTRATION = 'vessel_registration',
  CARGO_MANIFEST = 'cargo_manifest',
  CREW_ROSTER = 'crew_roster',
  PORT_ENTRY_LOG = 'port_entry_log',
  PORT_DEPARTURE_LOG = 'port_departure_log',
  TRADE_AGREEMENT = 'trade_agreement',
  CUSTOMS_DECLARATION = 'customs_declaration',
  CHARTER_DOCUMENT = 'charter_document',
  ADMINISTRATIVE_POLICY = 'administrative_policy',
  CORRESPONDENCE = 'correspondence',
  INCIDENT_REPORT = 'incident_report',
  OTHER = 'other'
}

// Record Status Types
export enum RecordStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  PENDING_REVIEW = 'pending_review',
  DRAFT = 'draft',
  EXPIRED = 'expired'
}

export interface RegistryRecord {
  id: number;
  title: string;
  description: string;
  content: string;
  fileUrl?: string;
  status: RecordStatus;
  createdAt: Date;
  updatedAt: Date;
  createdAtFriendly: string;
  updatedAtFriendly: string;
  recordType: RecordType;
  department?: string;
  author: string;
}

export interface RecordRes {
  status: number;
  message: string;
  success: boolean;
  record?: RegistryRecord | null;
}
