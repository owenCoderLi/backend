// 验证权限匹配
export const hasPerms = (perm: string, perms: Array<string> | undefined): boolean => {
  const res = perms && perms.some(item => { // 判断perms的key是否为传入参数
    return Object.keys(item)[0] === perm;
  });
  return res || false;
}