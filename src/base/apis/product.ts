import { asyncDo } from '@/base/utils/index';
import { $http } from './http';

export namespace ProductApi {
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
}
