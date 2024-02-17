import { defineStore } from "pinia";
import Storage from "@/helper/Storage";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
    loading: false,
    error: null,
    tokenId: null,
  }),
  getters: {
    // getRoom: (state) => {
    //   return (authorId) => state.posts.filter((post) => post.userId === authorId)
    // }
  },
  actions: {
    async storeAuthenticate(loginUser) {
      this.loading = true;
      try {
        Storage.Set("user", loginUser);
        this.user = loginUser;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async unauthenticate() {
      this.loading = true;
      try {
        this.user = null;
        Storage.Set("user", null);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async storeToken(TOKEN) {
      this.loading = true;
      try {
        Storage.Set("token", TOKEN);
        this.token = TOKEN;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
});
