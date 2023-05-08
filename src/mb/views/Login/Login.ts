import { defineComponent, onMounted } from "vue";
import { ProductApi } from '@/base/apis/product';

export default defineComponent({
  name: 'Login',

  setup() {
    async function login() {
      const res = await ProductApi.login();
      if (!res) {
        return
      }
      console.log(res);
    }
    
    return {
      login
    };
  }
})