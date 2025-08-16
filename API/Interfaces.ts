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
