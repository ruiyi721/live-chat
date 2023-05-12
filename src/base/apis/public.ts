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
      $http<{success: boolean, message: string}>('post', '/login', data)
    );
    if (!isResponseOK(err, result, true)) {
      return null;
    }
    return result;
  }
}
