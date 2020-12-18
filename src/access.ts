import _ from 'lodash';
// src/access.ts
export default function access(initialState) {
  const { perms } = initialState || {}; // => [{'perms': 'path'}, {}]
  return {
    permRouterFilter: (route) => {
      const res = _.findIndex(perms, (item: any) => { // 匹配不在权限列表中的url地址
        return Object.values(item)[0] === route.path
      })
      if(res !== -1) {
        return true;
      }
      return false;
    }
  };
}
