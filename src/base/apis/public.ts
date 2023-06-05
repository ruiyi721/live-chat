import { asyncDo } from '@/base/utils/index';
import { $http, isResponseOK } from './http';
import { ILogin } from '@/base/apis/interfaces/public';

export namespace PublicApi {
  /**
   * 獲取六角學院產品
   */
  export async function getProducts() {
    const [err, result] = await asyncDo($http('get', '/products'));
    if (err) {
      return;
    }
    return result;
  }
  /**
   * 登入
   */
  export async function login(data: {
    /**
     * 帳號
     */
    account: string,
    /**
     * 密碼
     */
    password: string
  }) {
    const [err, result] = await asyncDo(
      $http<ILogin>('post', '/login', data)
    );
    if (!isResponseOK(err, result, true)) {
      return null;
    }
    return result;
  }
  /**
   * 註冊
   */
  export async function register(data: {
    /**
     * 帳號
     */
    account: string,
    /**
     * 密碼
     */
    password: string
  }) {
    const [err, result] = await asyncDo(
      $http<{ success: boolean }>('post', '/register', data)
    );
    if(!isResponseOK(err, result, true)) {
      return null;
    }
    return result;
  }
  /**
   * 谷哥註冊登入
   */
  export async function googleAuth(
  data: {
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string,
    authuser: string,
    propt: string
  },
  method: string
  ) {
    const [err, result] = await asyncDo($http('post', `/google/${method}`, data));
    if(!isResponseOK(err, result, true)) {
      return null;
    }
    return result;
  }

  export async function checkAuth() {
    const [err, result] = await asyncDo($http('get', '/login/checkauth'));
    if(!isResponseOK(err, result, true)) {
      return null;
    }
    return result;
  }
}
