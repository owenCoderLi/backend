// src/access.ts
export default function access(initialState: { currentUser?: User.UserState | undefined }) {
  const { currentUser } = initialState || {};
  return {
    isAdmin: currentUser && currentUser.access === 'admin', // 管理员
    isMiddle: currentUser && currentUser.access === 'middle', // 中台
    isBack: currentUser && currentUser.access === 'backend', // 后台
    isMarket: currentUser && currentUser.access === 'market', // 市场
    isDesign: currentUser && currentUser.access === 'design', // 设计
    isDevloper: currentUser && currentUser.access === 'devloper', // 开发
    isFinance: currentUser && currentUser.access === 'finance', // 财务
    isFinancePr: currentUser && currentUser.access === 'financepr', // 财关
  };
}
