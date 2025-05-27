import {
  BrowserOAuthClient,
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

  private constructor() {}

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

  async initializeAuth(): Promise<{ session: any } | undefined> {
    const client = this.getOAuthClient();
    if (client) {
      return await client.init();
    }
    return undefined;
  }

  async signIn(handle: string): Promise<void> {
    const client = this.getOAuthClient();
    if (!client) {
      throw new Error("Error de inicialización del cliente OAuth");
    }
    await client.signIn(handle.trim());
  }

  async isAuthenticated(): Promise<boolean> {
    if (typeof window === "undefined") {
      return false;
    }

    const result = await this.initializeAuth();
    return !!result?.session;
  }
}

export const authService = AuthService.getInstance();
