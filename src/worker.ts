const APEX_HOST = "proangleconstructionpa.com";
const WWW_HOST = `www.${APEX_HOST}`;

const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
} as const;

type SiteEnv = { ASSETS: Env["ASSETS"]; PREVIEW_MODE: string };

export async function handleRequest(request: Request, env: SiteEnv): Promise<Response> {
  const url = new URL(request.url);
  if (url.hostname === WWW_HOST) {
    url.hostname = APEX_HOST;
    return Response.redirect(url, 301);
  }

  const assetResponse = await env.ASSETS.fetch(request);
  const response = new Response(assetResponse.body, assetResponse);
  for (const [name, value] of Object.entries(securityHeaders)) response.headers.set(name, value);
  if (env.PREVIEW_MODE === "true") response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export default {
  async fetch(request, env): Promise<Response> {
    return handleRequest(request, env);
  },
} satisfies ExportedHandler<Env>;

export { APEX_HOST, WWW_HOST, securityHeaders };
