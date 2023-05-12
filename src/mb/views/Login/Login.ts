import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router';
import { PublicApi } from '@/base/apis/public';

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    const loginFormData = ref({
      account: '',
      password: '',
    });

    async function login() {
      const info = await PublicApi.login(loginFormData.value);
      if(info) {
        console.log('info', info);
        loginFormData.value.account = '';
        loginFormData.value.password = '';
        // router.push({ name: 'Home' });
      }
    }
    
    return {
      loginFormData,
      login
    };
  }
})