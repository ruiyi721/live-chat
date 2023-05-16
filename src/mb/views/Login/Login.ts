import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router';
import { PublicApi } from '@/base/apis/public';
import useBaseStore from '@/base/store';

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useBaseStore();
    const router = useRouter();

    const loginFormData = ref({
      account: '',
      password: '',
    });
    const afterLogin = (data) => {
      store.login(data);
    };

    async function login() {
      const info = await PublicApi.login(loginFormData.value);
      if(info) {
        afterLogin(info);
        localStorage.setItem('token', info.token);
        loginFormData.value.account = '';
        loginFormData.value.password = '';
        router.push({ name: 'Home' });
      }
    }
    
    return {
      loginFormData,
      login
    };
  }
})