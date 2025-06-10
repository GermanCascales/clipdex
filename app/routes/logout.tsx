import { Form, Link, redirect } from "react-router";
import { authService } from "~/services/auth.service";

export async function clientAction() {
  await authService.signOut();
  return redirect("/login");
}

export default function LogoutRoute() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Cerrar sesión
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
        ¿Estás seguro de que deseas cerrar sesión?
      </p>
      <Form method="post" className="space-y-2">
        <button className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded shadow transition">
          Cerrar sesión
        </button>
      </Form>
      <Link
        to="/"
        className="block text-center text-indigo-600 hover:underline dark:text-indigo-400 text-sm"
      >
        Cancelar y volver al inicio
      </Link>
    </div>
  );
}
