import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

// Force dynamic rendering to always check session
export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { loginHistory: true }
      },
      loginHistory: {
        orderBy: { createdAt: "desc" },
        take: 5,
      }
    }
  });

  const totalLogins = users.reduce((acc, u) => acc + u._count.loginHistory, 0);
  const now = new Date();
  const activeToday = users.filter(u => {
    const lastLogin = u.loginHistory[0];
    if (!lastLogin) return false;
    const diff = now.getTime() - new Date(lastLogin.createdAt).getTime();
    return diff < 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">사용자 관리</h1>
        <p className="text-white/50 text-sm">로그인한 사용자 목록 및 기록을 조회합니다.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="text-4xl font-bold text-green-400">{users.length}</div>
          <div className="text-white/60 text-sm mt-1">Total Users</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="text-4xl font-bold text-blue-400">{totalLogins}</div>
          <div className="text-white/60 text-sm mt-1">Total Logins</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="text-4xl font-bold text-purple-400">{activeToday}</div>
          <div className="text-white/60 text-sm mt-1">Active Today</div>
        </div>
      </div>

      {/* User List */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-black/20 text-white/40 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Logins</th>
              <th className="px-6 py-4 font-semibold">Last Login</th>
              <th className="px-6 py-4 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-white/30">
                  아직 로그인한 사용자가 없습니다.
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img src={user.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                          {user.name?.[0] || user.email?.[0] || "?"}
                        </div>
                      )}
                      <span className="font-medium text-white">{user.name || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/70">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/70">{user._count.loginHistory}</td>
                  <td className="px-6 py-4 text-white/50 text-xs">
                    {user.loginHistory[0] ? (
                      <div>
                        <div>{new Date(user.loginHistory[0].createdAt).toLocaleString("ko-KR")}</div>
                        <div className="text-white/30">{user.loginHistory[0].provider}</div>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4 text-white/40 font-mono text-xs">
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
