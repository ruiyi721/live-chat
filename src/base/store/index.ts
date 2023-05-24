import { defineStore } from 'pinia';
import { ILogin } from '@/base/apis/interfaces/public';

export const useBaseStore = defineStore('baseStore', {
  persist: true,
  state: () => {
    const user: ILogin = null;

    return {
      user,
    }
  },
  getters: {
    isLogin(): boolean {
      return this.user ? true : false;
    }
  },
  actions: {
    login(data: ILogin) {
      if(!data) {
        return;
      }
      localStorage.setItem("token", data.token);
      this.user = data;
    },
    logout() {
      localStorage.removeItem('token');
      this.user = null;
    },
  }
});

export default useBaseStore;
