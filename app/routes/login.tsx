import { data, redirect } from "react-router";
import { commitSession, getSession } from "../sessions.server";
import type { Route } from "./+types/login";

async function validateCredentials(
  username: FormDataEntryValue | null,
  password: FormDataEntryValue | null
): Promise<string | null> {
  // TODO: Implement your actual authentication logic here
  if (username === "admin" && password === "admin") {
    return "user";
  }
  return null;
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  return data(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  const userId = await validateCredentials(username, password);

  if (userId == null) {
    session.flash("error", "Usuario o contraseña incorrectos");

    // Redirect back to the login page with errors.
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("userId", userId);

  // Login succeeded, send them to the home page.
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login({ loaderData }: Route.ComponentProps) {
  const { error } = loaderData;

  return (
    <>
      <form method="POST" className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Iniciar sesión
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Ingresa tus credenciales para acceder a tu cuenta.
          </p>
        </div>
        {error ? (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        ) : null}
        <div className="space-y-4">
          <label className="block">
            <span className="block text-gray-700 dark:text-gray-200 mb-1">
              Usuario
            </span>
            <input
              type="text"
              name="username"
              autoComplete="username"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </label>
          <label className="block">
            <span className="block text-gray-700 dark:text-gray-200 mb-1">
              Contraseña
            </span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded shadow transition"
        >
          Iniciar sesión
        </button>
      </form>
    </>
  );
}
