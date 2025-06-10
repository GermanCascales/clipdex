import {
  BrowserOAuthClient,
  OAuthSession,
  type OAuthClientMetadataInput,
} from "@atproto/oauth-client-browser";

const APP_URL = import.meta.env.VITE_APP_URL;

const CLIENT_METADATA: OAuthClientMetadataInput = {
  client_id: `${APP_URL}/client-metadata.json`,
  client_name: "Clipdex",
  client_uri: APP_URL,
  logo_uri: `${APP_URL}/logo.png`,
  tos_uri: `${APP_URL}/tos`,
  policy_uri: `${APP_URL}/policy`,
  redirect_uris: [`${APP_URL}/login`],
  scope: "atproto",
  grant_types: ["authorization_code", "refresh_token"],
  response_types: ["code"],
  token_endpoint_auth_method: "none",
  application_type: "web",
  dpop_bound_access_tokens: true,
};

class AuthService {
  private static instance: AuthService;
  private oauthClient: BrowserOAuthClient | null = null;
  private sub: string | null = null;

  private constructor() {
    if (typeof window !== "undefined") {
      this.sub =
        localStorage.getItem("@@atproto/oauth-client-browser(sub)") || null;
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private getOAuthClient(): BrowserOAuthClient | null {
    if (typeof window !== "undefined" && !this.oauthClient) {
      this.oauthClient = new BrowserOAuthClient({
        clientMetadata: CLIENT_METADATA,
        handleResolver: "https://bsky.social",
      });
    }
    return this.oauthClient;
  }

  async initializeAuth(): Promise<{ session: OAuthSession } | undefined> {
    const client = this.getOAuthClient();
    if (client) {
      const result = await client.init();
      if (this.sub === null && result?.session) {
        this.sub = result.session.sub;
      }
      return result;
    }
    return undefined;
  }

  async signIn(handle: string): Promise<void> {
    const client = this.getOAuthClient();
    if (!client) {
      throw new Error("Error de inicialización del cliente OAuth");
    }
    await client.signIn(handle.trim());
    const session = await client.restore(client.clientMetadata.client_id);
    if (session) {
      this.sub = session.sub;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    if (typeof window === "undefined") {
      return false;
    }

    const result = await this.initializeAuth();

    return !!result?.session;
  }

  async getSession(): Promise<OAuthSession | null> {
    const client = this.getOAuthClient();
    if (!client) {
      throw new Error("Error de inicialización del cliente OAuth");
    }
    try {
      return await client.restore(client.clientMetadata.client_id);
    } catch (error) {
      console.error("Error al obtener la sesión:", error);
      return null;
    }
  }

  async signOut(): Promise<void> {
    const client = this.getOAuthClient();
    if (!client) {
      throw new Error("Error de inicialización del cliente OAuth");
    }
    if (!this.sub) {
      throw new Error("No hay sesión activa para cerrar sesión");
    }
    await client.revoke(this.sub);

    this.sub = null;
  }
}

export const authService = AuthService.getInstance();
