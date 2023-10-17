import axios from "axios";
import { getAxiosInstance } from "./utils";
import type {
  LoginPayload,
  CommentPayload,
  FetchComments,
  UpdateCommentPayload
} from "../entities/entities";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (payload: LoginPayload) => {
  const axios = getAxiosInstance();
  const response = await axios.post(`${API_URL}/api/login`, payload);
  return response.data;
};

export const addComment = async (payload: CommentPayload) => {
  const axios = getAxiosInstance();
  const response = await axios.post(`${API_URL}/api/comments`, payload);
  return response.data;
};

export const getComments = async () => {
  const axios = getAxiosInstance();
  const response = await axios.get(`${API_URL}/api/comments`);

  const result: FetchComments = response.data;
  return result;
};

export const updateComment = async (
  id: string,
  payload: UpdateCommentPayload
) => {
  const axios = getAxiosInstance();
  const response = await axios.put(`${API_URL}/api/comments/${id}`, payload);
  return response.data;
};

export const deleteComment = async (id: number) => {
  const axios = getAxiosInstance();
  const response = await axios.delete(`${API_URL}/api/comments/${id}`);
  return response.data;
};
