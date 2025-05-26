import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <span className="inline-block text-3xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
            Clipdex
          </span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
