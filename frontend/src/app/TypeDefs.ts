export interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  createdAtFriendly: string,
  updatedAtFriendly: string;
  class: string;
}

export interface NoticeRes {
  status: number;
  message: string;
  success: boolean;
  notice?: Notice | null;
}
