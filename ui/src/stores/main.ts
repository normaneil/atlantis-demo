import { defineStore } from "pinia";
import { getComments } from "../api/index";
import type { CommentPayload, Comment } from "../entities/entities";

export interface MainState {
  message: string;
  isAuth: boolean;
  name: string | null;
  id: string | null;
  comments: Comment[] | null;
}

export const useMainStore = defineStore("main", {
  state: (): MainState => ({
    message: "",
    isAuth: false,
    name: null,
    id: null,
    comments: null
  }),
  getters: {
    getMessage: (state) => state.message
  },
  actions: {
    setAuth(isAuth: boolean) {
      this.isAuth = isAuth;
      if (this.isAuth) {
        localStorage.setItem("authtoken", "valid");
      } else {
        localStorage.removeItem("authtoken");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_is_admin");
      }
    },
    setUser(name: string, id: string, is_admin: string) {
      this.name = name;
      this.id = id;
      if (this.isAuth) {
        localStorage.setItem("user_name", this.name);
        localStorage.setItem("user_id", this.id);
        localStorage.setItem("user_is_admin", is_admin);
      }
    },
    async getComments() {
      const result = await getComments();

      this.comments = result.data;
    }
  }
});
