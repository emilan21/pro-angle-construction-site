import { describe, expect, it } from "vitest";
import { handleRequest, securityHeaders } from "../src/worker";

function environment(preview = "true"): Env {
  return {
    PREVIEW_MODE: preview,
    ASSETS: { fetch: async () => new Response("site", { headers: { "Content-Type": "text/html" } }) },
  } as unknown as Env;
}

describe("edge behavior", () => {
  it("redirects www to the canonical apex while preserving the request", async () => {
    const response = await handleRequest(new Request("https://www.proangleconstructionpa.com/path?q=1"), environment());
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://proangleconstructionpa.com/path?q=1");
  });

  it("adds preview and security headers to static assets", async () => {
    const response = await handleRequest(new Request("https://proangleconstructionpa.com/"), environment());
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex, nofollow");
    for (const [name, value] of Object.entries(securityHeaders)) expect(response.headers.get(name)).toBe(value);
  });

  it("omits the robots header after preview mode is intentionally disabled", async () => {
    const response = await handleRequest(new Request("https://proangleconstructionpa.com/"), environment("false"));
    expect(response.headers.has("X-Robots-Tag")).toBe(false);
  });
});
