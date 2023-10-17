export interface LoginPayload {
  email: string;
  password: string;
}

export interface CommentPayload {
  message: string;
  user_id: string;
}

export interface UpdateCommentPayload {
  message: string;
}

export interface Comment {
  id: number;
  link_user_id: number;
  message: string;
  created_at: string;
}
export interface FetchComments {
  data: Comment[];
}
