import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { authService } from "../services/auth.service";
import type { Route } from "./+types/login";

export default function Login({ loaderData }: Route.ComponentProps) {
  const [handle, setHandle] = useState("");
  const [errorMessage, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await authService.isAuthenticated();
      if (isAuthenticated) {
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await authService.signIn(handle);
    } catch (err: any) {
      setError("No se pudo iniciar sesión. Intenta de nuevo.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Iniciar sesión con ATProto
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Ingresa tu handle de Bluesky o PDS para continuar.
        </p>
      </div>
      {errorMessage && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded text-sm">
          {errorMessage}
        </div>
      )}
      <div className="space-y-4">
        <label className="block">
          <span className="block text-gray-700 dark:text-gray-200 mb-1">
            Handle de usuario
          </span>
          <input
            ref={inputRef}
            type="text"
            name="handle"
            autoComplete="username"
            required
            autoFocus
            placeholder="ejemplo.bsky.social"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded shadow transition"
      >
        Iniciar sesión con ATProto
      </button>
    </form>
  );
}
