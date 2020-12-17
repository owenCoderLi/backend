// src/access.ts
export default function access(initialState: { currentUser?: User.UserState | undefined }) {
  const { currentUser } = initialState || {};
  return {
    isAdmin: currentUser && currentUser.role_id === 0, // 管理员
  };
}
